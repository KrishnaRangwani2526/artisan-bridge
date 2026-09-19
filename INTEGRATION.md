# E-Setu — integration contract (read this first)

**Audience: the AI/developer wiring E-Setu to the artisan mobile app.**
Read this whole file before writing any code. Nothing in this repo should be
re-architected; the screens already exist and expect the shapes below.

---

## 1. What each side owns

```
        ┌──────────────────────────┐        ┌──────────────────────────┐
        │  E-SETU WEB (this repo)  │        │  ARTISAN APP (other app) │
        │  buyers + bulk buyers    │        │  artisans only, no web   │
        │                          │        │  login on this site      │
        │ • discovery feed         │        │ • artisan account        │
        │ • product pages          │        │ • catalogue builder      │
        │ • requirement posting    │        │ • inventory / orders     │
        │ • order timeline         │        │ • accept / decline       │
        └────────────┬─────────────┘        └────────────┬─────────────┘
                     │                                   │
                     │  A. catalogue sync  (app → web)   │
                     │──────────────────────────────────▶│
                     │  B. order + requirement events    │
                     │  (web → app, push notification)   │
                     │  C. fulfilment updates (app → web)│
                     └───────────────────────────────────┘
```

**Rule 1 — no artisan login on the website.** Artisans never authenticate here.
Every artisan identity, product and catalogue arrives from the artisan app.

**Rule 2 — automated data filling.** When an artisan creates an account in the
artisan app and builds a catalogue there, E-Setu pulls that catalogue and fills
the artisan profile, products, images, prices, MOQ and craft tags automatically.
There is no manual product entry on the web side, ever.

**Rule 3 — buying always ends up in the artisan app.** A single-customer buy or
a bulk requirement produces a notification in the artisan app. The artisan
accepts there; for bulk, the buyer then picks among the artisans who accepted;
for single orders the item lands straight in the artisan's inventory screen.

---

## 2. Where to plug in (files in this repo)

| Concern | File | What to change |
| --- | --- | --- |
| Artisans + products (currently demo data) | `src/lib/data.ts` | Replace the exported arrays with data fetched from the catalogue sync (A). Keep the `Artisan` and `Product` type shapes. |
| Order/requirement state | `src/lib/orders.ts` | Replace the `localStorage` read/write with API calls. Keep every exported function name and signature. |
| Outbound notification | `notifyArtisanApp()` in `src/lib/orders.ts` | Replace the console stub with the real POST (B). |
| Fulfilment updates | `advance()`, `markShipped()`, `addResponse()`, `chooseArtisan()` in `src/lib/orders.ts` | These should become reactions to inbound webhooks (C) rather than local writes. |
| Trade fair reference data | `src/lib/fairs.ts` | Static reference; keep or extend. |

Do **not** change the screen components to match a new payload — adapt the
payload to these types instead.

---

## 3. A. Catalogue sync (artisan app → E-Setu)

Direction: artisan app pushes on change, E-Setu may also pull on a schedule.

`POST /api/public/artisan-sync` (create this server route; the `/api/public/`
prefix bypasses site auth — verify the HMAC signature inside the handler).

```jsonc
{
  "artisan": {
    "id": "ramesh-handicrafts",      // stable id from the artisan app
    "name": "Ramesh Handicrafts",
    "craft": "Woodwork & furniture",
    "city": "Jaipur, Rajasthan",
    "photo": "https://.../ramesh.jpg",
    "about": "…",
    "sinceYear": 1998,
    "languages": ["Hindi", "English"],
    "verified": ["Identity", "Phone", "Workshop address"],
    "rating": 4.9, "orders": 126, "onTime": 98, "repeatBuyers": 41
  },
  "products": [
    {
      "id": "oak-study-table",
      "title": "Study Table, Oak",
      "craft": "Woodwork",
      "price": 9500,               // per piece, INR
      "bulkPrice": 8400,           // per piece at/above moq
      "moq": 10,
      "city": "Jaipur",
      "images": ["https://…1.jpg", "https://…2.jpg"],
      "description": "…",
      "materials": "Solid oak, walnut polish",
      "size": "48 × 24 × 30 in",
      "makeDays": 7,
      "tags": ["table", "furniture"]
    }
  ],
  "syncedAt": "2026-09-19T05:00:00Z"
}
```

Auth: `X-ESetu-Signature: sha256=<hmac of raw body using ARTISAN_APP_SHARED_SECRET>`.
Idempotent by `artisan.id` + `products[].id` — upsert, never duplicate.

---

## 4. B. Order and requirement events (E-Setu → artisan app)

Fired from `notifyArtisanApp()`. One event type, two kinds.

`POST <ARTISAN_APP_WEBHOOK_URL>` with the same HMAC header.

```jsonc
{
  "type": "order.created",
  "order": {
    "id": "ES-K3F9Q1",
    "kind": "single",              // "single" | "bulk"
    "productId": "oak-study-table",
    "productTitle": "Study Table, Oak",
    "image": "https://…",
    "artisanId": "ramesh-handicrafts", // for "bulk" this is a hint, not exclusive
    "quantity": 1,
    "unitPrice": 9500,
    "total": 9500,
    "buyerName": "Aarti Rao",
    "buyerPhone": "98XXXXXXXX",
    "city": "Jaipur",
    "expectedDays": 7,
    "createdAt": "2026-09-19T05:26:00Z"
  }
}
```

Expected behaviour in the artisan app:

- `kind: "single"` → push notification, and the order appears directly in the
  artisan's **inventory / orders** screen as a confirmed job.
- `kind: "bulk"` → push notification to **every** artisan whose catalogue
  matches the craft/city, shown as a requirement card with a single
  **"I can make this"** action. Accepting sends event C1 below; the buyer then
  chooses one artisan on E-Setu.

Requirements posted from `/post` (no specific product) use the same event with
`productId: null` and a `requirement` object carrying title, quantity, budget,
city, timeline and reference image.

---

## 5. C. Fulfilment updates (artisan app → E-Setu)

`POST /api/public/artisan-events`, same HMAC header. One event per state change;
each maps to a call in `src/lib/orders.ts`.

| `type` | Payload | Maps to |
| --- | --- | --- |
| `artisan.accepted` | `{ orderId, artisanId, quote, days }` | `addResponse()` |
| `artisan.declined` | `{ orderId, artisanId }` | drop from candidate list |
| `order.in_making` | `{ orderId }` | `advance(id, "in_making")` |
| `order.shipped` | `{ orderId, courier, trackingId, expectedDate }` | `markShipped()` |
| `order.out_for_delivery` | `{ orderId }` | `advance(id, "out_for_delivery")` |
| `order.delivered` | `{ orderId, deliveredAt }` | `advance(id, "delivered")` |

E-Setu never invents these. The buyer's delivery timeline on `/orders` is
rendered purely from the event log, so anything not sent by the app simply does
not appear.

### Canonical stage order

`placed → artisan_notified → artisan_accepted → artisan_chosen → in_making → shipped → out_for_delivery → delivered`

Defined once in `orderStages` in `src/lib/orders.ts`. Keep the app's own state
machine aligned with those exact keys.

---

## 6. Buyer choice (bulk only)

When two or more artisans accept, E-Setu shows the responses with quote,
delivery days, rating, completed orders, on-time percentage and full catalogue.
The buyer picks one → E-Setu POSTs back:

```jsonc
{ "type": "order.awarded", "orderId": "ES-K3F9Q1", "artisanId": "sunita-woodworks" }
```

Losing artisans get `order.closed` with `{ orderId, reason: "not_selected" }`.
The winning artisan's app moves the job into inventory and the fulfilment
events in section 5 begin.

---

## 7. Secrets to create before coding

| Name | Purpose |
| --- | --- |
| `ARTISAN_APP_WEBHOOK_URL` | Where E-Setu posts order events |
| `ARTISAN_APP_SHARED_SECRET` | HMAC-SHA256 signing both directions |

Store them through the platform's secret store; never in the repo, never
prefixed `VITE_`.

---

## 8. Order of work (do it in this sequence)

1. Enable the backend (database + server routes) — do not skip; the local store
   in `src/lib/orders.ts` is demo-only.
2. Tables: `artisans`, `products`, `orders`, `order_events`, `artisan_responses`.
3. Build `POST /api/public/artisan-sync` (section 3) and switch `src/lib/data.ts`
   to read from the database.
4. Build `POST /api/public/artisan-events` (section 5) and make `orders.ts`
   read/write through server functions.
5. Implement the outbound webhook in `notifyArtisanApp()` (section 4) and the
   award callback (section 6).
6. Verify end to end: place a single order → it appears in the app inventory;
   post a bulk requirement → multiple artisans accept → buyer awards one →
   shipped/delivered events render on the buyer's timeline.

Anything ambiguous: prefer the shapes in `src/lib/orders.ts` and
`src/lib/data.ts` over your own design.
