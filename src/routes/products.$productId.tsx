import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getArtisan, getProduct, productsByArtisan } from "@/lib/data";
import { fairsForProduct } from "@/lib/fairs";
import { createOrder } from "@/lib/orders";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    const artisan = getArtisan(product.artisanId)!;
    return { product, artisan, more: productsByArtisan(artisan.id).filter((p) => p.id !== product.id) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — E-Setu" }, { name: "robots", content: "noindex" }] };
    }
    const { product, artisan } = loaderData;
    const title = `${product.title} by ${artisan.name} — ₹${product.price.toLocaleString("en-IN")} | E-Setu`;
    const description = `${product.description.slice(0, 150)}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: ProductNotFound,
});

function ProductPage() {
  const { product, artisan, more } = Route.useLoaderData();
  const { t } = useLang();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [mode, setMode] = useState<"customer" | "bulk">("customer");
  const [placed, setPlaced] = useState<null | "order" | "quote">(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [buyer, setBuyer] = useState({ name: "", phone: "", city: product.city });

  const bulk = mode === "bulk";
  const unit = bulk ? product.bulkPrice : product.price;
  const count = bulk ? Math.max(qty, product.moq) : qty;
  const total = unit * count;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link to="/discover" className="text-xs text-muted-foreground">
        ← {t("Discover")}
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <img
            src={product.images[img]}
            alt={`${product.title} — photo ${img + 1}`}
            width={816}
            height={816}
            className="aspect-square w-full rounded-sm border border-border object-cover"
          />
          <div className="mt-3 flex gap-3">
            {product.images.map((src, n) => (
              <button
                key={n}
                onClick={() => setImg(n)}
                className={`overflow-hidden rounded-sm border ${n === img ? "border-terra" : "border-border"}`}
                aria-label={`Photo ${n + 1}`}
              >
                <img src={src} alt="" width={816} height={816} loading="lazy" className="size-20 object-cover" />
              </button>
            ))}
          </div>

          <h2 className="mt-8 border-t border-border pt-6 font-display text-2xl">{t("About this piece")}</h2>
          <p className="mt-3 leading-relaxed text-foreground/75">{product.description}</p>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            {[
              [t("Materials"), product.materials],
              [t("Size"), product.size],
              [t("Made in"), `${product.makeDays} ${t("days")}`],
              [t("Delivery city"), `${product.city} → all India`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-sm border border-border p-3">
                <dt className="text-xs text-muted-foreground">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Buy box */}
        <div className="lg:col-span-5">
          <p className="eyebrow mb-2 text-terra">{t(product.craft)}</p>
          <h1 className="font-display text-3xl md:text-4xl">{product.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.city} · ♥ {product.likes}
          </p>
          {fairsForProduct(product.id).length > 0 && (
            <p className="mt-3 flex flex-wrap gap-2">
              {fairsForProduct(product.id).map((f) => (
                <Link
                  key={f.id}
                  to="/fairs"
                  className="rounded-full border border-brass/50 bg-brass/10 px-3 py-1 text-xs text-terra"
                >
                  {t("Shown at")} {f.name}
                </Link>
              ))}
            </p>
          )}


          <div className="mt-5 rounded-sm border border-input p-4">
            <div className="mb-4 flex rounded-sm border border-input p-1">
              {(["customer", "bulk"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setQty(m === "bulk" ? product.moq : 1);
                    setPlaced(null);
                  }}
                  className={`flex-1 rounded-sm px-3 py-2 text-xs ${
                    mode === m ? "bg-primary text-primary-foreground" : "text-foreground/70"
                  }`}
                >
                  {m === "customer" ? t("Customer") : t("Bulk buyer")}
                </button>
              ))}
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">
                {bulk ? t("Bulk price") : t("Price per piece")}
              </span>
              <span className="font-display text-2xl text-terra">₹{unit.toLocaleString("en-IN")}</span>
            </div>
            {bulk && (
              <p className="mt-1 text-xs text-muted-foreground">
                {t("Minimum order")}: {product.moq}
              </p>
            )}

            <label className="mt-4 block text-sm">
              <span className="mb-1 block text-xs text-muted-foreground">{t("Quantity")}</span>
              <input
                type="number"
                min={bulk ? product.moq : 1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="w-full rounded-sm border border-input bg-card px-3 py-2 outline-hidden focus:border-terra"
              />
            </label>

            <div className="mt-4 space-y-3 text-sm">
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">{t("Your name")}</span>
                <input
                  value={buyer.name}
                  onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
                  className="w-full rounded-sm border border-input bg-card px-3 py-2 outline-hidden focus:border-terra"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">{t("Mobile number")}</span>
                <input
                  inputMode="numeric"
                  value={buyer.phone}
                  onChange={(e) => setBuyer((b) => ({ ...b, phone: e.target.value }))}
                  className="w-full rounded-sm border border-input bg-card px-3 py-2 outline-hidden focus:border-terra"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">{t("Delivery city")}</span>
                <input
                  value={buyer.city}
                  onChange={(e) => setBuyer((b) => ({ ...b, city: e.target.value }))}
                  className="w-full rounded-sm border border-input bg-card px-3 py-2 outline-hidden focus:border-terra"
                />
              </label>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-3">
              <span className="text-sm text-muted-foreground">Total · {count} pcs</span>
              <span className="font-display text-xl">₹{total.toLocaleString("en-IN")}</span>
            </div>

            <button
              onClick={() => {
                const order = createOrder({
                  kind: bulk ? "bulk" : "single",
                  productId: product.id,
                  productTitle: product.title,
                  image: product.images[0] ?? "",
                  artisanId: artisan.id,
                  quantity: count,
                  unitPrice: unit,
                  buyerName: buyer.name || "Guest buyer",
                  buyerPhone: buyer.phone,
                  city: buyer.city || product.city,
                  expectedDays: product.makeDays,
                });
                setOrderId(order.id);
                setPlaced(bulk ? "quote" : "order");
              }}
              className="lift mt-4 w-full rounded-sm bg-terra px-4 py-3 text-sm font-semibold text-ivory"
            >
              {bulk ? t("Ask for bulk quote") : t("Place order")}
            </button>
            <p className="mt-2 text-xs text-muted-foreground">
              {t("Cash on delivery or UPI. No advance to the artisan.")}
            </p>

            {placed && (
              <p className="reveal mt-3 rounded-sm border border-terra/40 bg-terra/10 px-3 py-3 text-sm text-terra">
                {placed === "order"
                  ? `${t("Order placed")} ${orderId ? `(${orderId})` : ""} — ${t("a notification is now on")} ${artisan.name}${t("'s artisan app. It lands in their inventory and they ship in about")} ${product.makeDays} ${t("days")}.`
                  : `${t("Bulk requirement sent")} ${orderId ? `(${orderId})` : ""} — ${count} pcs. ${t("Every capable artisan sees it in their app and can accept; you then choose the maker.")}`}
              </p>
            )}
            {placed && (
              <Link
                to="/orders"
                className="mt-3 block rounded-sm border border-input px-4 py-2 text-center text-xs"
              >
                {t("Track this order")}
              </Link>
            )}
          </div>

          {/* Seller card */}
          <div className="mt-6 rounded-sm bg-ink p-5 text-ivory">
            <p className="eyebrow mb-3 text-brass">{t("The maker")}</p>
            <div className="flex items-center gap-3">
              <img
                src={artisan.photo}
                alt={artisan.name}
                width={816}
                height={816}
                loading="lazy"
                className="size-14 rounded-sm object-cover"
              />
              <div className="min-w-0">
                <p className="font-display text-lg">{artisan.name}</p>
                <p className="text-xs text-ivory/60">
                  {artisan.city} · since {artisan.sinceYear}
                </p>
              </div>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ["Rating", `★ ${artisan.rating}`],
                ["Completed orders", String(artisan.orders)],
                ["On-time delivery", `${artisan.onTime}%`],
                ["Repeat buyers", `${artisan.repeatBuyers}%`],
                [t("Verified by E-Setu"), artisan.verified.join(", ")],
                ["Speaks", artisan.languages.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-ivory/10 pb-2 last:border-0">
                  <dt className="shrink-0 text-ivory/50">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <Link
              to="/artisans/$artisanId"
              params={{ artisanId: artisan.id }}
              className="mt-4 block rounded-sm bg-brass px-4 py-2 text-center text-sm text-ink"
            >
              {t("View full catalogue")}
            </Link>
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-14 border-t border-border pt-8">
          <h2 className="mb-5 font-display text-2xl">{t("More from this artisan")}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {more.map((p) => (
              <Link
                key={p.id}
                to="/products/$productId"
                params={{ productId: p.id }}
                className="overflow-hidden rounded-sm border border-border"
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  width={816}
                  height={816}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <div className="p-3">
                  <p className="font-display text-sm">{p.title}</p>
                  <p className="text-xs text-terra">₹{p.price.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl">We couldn't find that piece</h1>
      <Link
        to="/discover"
        className="mt-6 inline-block rounded-sm bg-primary px-5 py-3 text-sm text-primary-foreground"
      >
        Browse handicrafts
      </Link>
    </div>
  );
}
