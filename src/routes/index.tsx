import { createFileRoute, Link } from "@tanstack/react-router";
import { artisans, catalogue } from "@/lib/data";
import sketchTable from "@/assets/sketch-table.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "E-Setu — Tell us what you need, artisans answer" },
      {
        name: "description",
        content:
          "Post a requirement in plain words. Capable artisans respond with a price and delivery date. You choose the maker.",
      },
      { property: "og:title", content: "E-Setu — Tell us what you need, artisans answer" },
      {
        property: "og:description",
        content: "A capability marketplace: buyer requirements meet the artisans who can fulfil them.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "12", label: "New requirements near you" },
  { value: "8", label: "Artisans responded today" },
  { value: "4.8", label: "Average artisan rating" },
  { value: "126", label: "Orders completed" },
];

function Index() {
  return (
    <>
      <section className="paper mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6">
        <p className="eyebrow reveal mb-6 text-terra">The capability marketplace</p>
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h1 className="reveal font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Tell us what you need.
              <br />
              <span className="italic text-terra">Capable artisans</span> will answer.
            </h1>
            <div className="wipe mt-6 h-px w-full bg-terra/40" style={{ animationDelay: "300ms" }} />
          </div>
          <div className="reveal md:col-span-5" style={{ animationDelay: "140ms" }}>
            <p className="leading-relaxed text-foreground/70">
              E-Setu is a digital bridge between buyers and artisans — no technical complexity, no
              seller panels. Post a requirement, watch artisans respond, then choose who makes it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/post"
                className="lift rounded-sm bg-primary px-5 py-3 text-sm text-primary-foreground"
              >
                Post a requirement
              </Link>
              <Link to="/discover" className="lift rounded-sm border border-input px-5 py-3 text-sm">
                Explore catalogues
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal" style={{ animationDelay: `${200 + i * 70}ms` }}>
              <p className="font-display text-2xl">{s.value}</p>
              <p className="text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-border px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-3xl">The melas, open all year</h2>
          <Link to="/fairs" className="eyebrow text-terra">
            All craft fairs →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fairs.slice(0, 3).map((f, i) => (
            <Link
              key={f.id}
              to="/fairs"
              className="lift reveal rounded-sm border border-border bg-card p-5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="eyebrow mb-2 text-terra">{f.since ? `Since ${f.since}` : "Annual"}</p>
              <p className="font-display text-xl leading-tight">{f.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {f.place} · {f.season}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/70">{f.about}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-border px-4 py-12 sm:px-6">
        <h2 className="font-display text-3xl">Two apps, one bridge</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-foreground/70">
          Artisans never fill a form here. Their catalogue comes from their own app, and every order
          you place lands there as a notification.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["Catalogue arrives", "The artisan builds a catalogue in their app; E-Setu fills the profile, photos, prices and minimum quantities on its own."],
            ["You buy or ask", "A single buy or a bulk requirement becomes a notification on the artisan's phone."],
            ["Artisan accepts", "Single orders drop into their inventory. For bulk, several artisans can accept and you pick one."],
            ["Delivery", "The maker books nearby logistics and marks it shipped; your timeline updates here."],
          ].map(([title, body], i) => (
            <li
              key={title}
              className="reveal rounded-sm border border-border p-5"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <p className="eyebrow mb-2 text-brass">Step {i + 1}</p>
              <p className="font-display text-lg">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{body}</p>
            </li>
          ))}
        </ol>
      </section>


      <section className="mx-auto max-w-6xl border-t border-border px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-3xl">Your requirement</h2>
          <span className="eyebrow text-muted-foreground">8 artisans responded</span>
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="rounded-sm bg-ink p-6 text-ivory lg:col-span-4">
            <p className="eyebrow mb-4 text-brass">Requirement</p>
            <h3 className="mb-4 font-display text-2xl">Handmade wooden study table</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-ivory/10 pb-2">
                <dt className="text-ivory/50">Size</dt>
                <dd>4 × 2 ft</dd>
              </div>
              <div className="flex justify-between border-b border-ivory/10 pb-2">
                <dt className="text-ivory/50">Budget</dt>
                <dd>₹8,000–₹12,000</dd>
              </div>
              <div className="flex justify-between border-b border-ivory/10 pb-2">
                <dt className="text-ivory/50">Location</dt>
                <dd>Jaipur</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ivory/50">Status</dt>
                <dd className="text-brass">Choosing artisan</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-ivory/60">Reference image</p>
            <img
              src={sketchTable}
              alt="Pencil sketch of a rustic wooden study table with dimensions"
              width={880}
              height={752}
              loading="lazy"
              className="mt-2 w-full rounded-sm object-cover"
            />
          </aside>

          <div className="space-y-4 lg:col-span-8">
            {artisans.map((a) => (
              <div
                key={a.id}
                className="flex flex-col gap-4 rounded-sm border border-input p-5 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <img
                    src={a.photo}
                    alt={`${a.name} in their workshop`}
                    width={816}
                    height={816}
                    loading="lazy"
                    className="size-16 shrink-0 rounded-sm object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-lg">{a.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.city.split(",")[0]} · ★ {a.rating} · {a.orders} orders · {a.quote} ·{" "}
                      {a.quotedDays} days
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    to="/artisans/$artisanId"
                    params={{ artisanId: a.id }}
                    className="rounded-sm border border-input px-3 py-2 text-xs"
                  >
                    View catalogue
                  </Link>
                  <Link to="/requirement" className="rounded-sm bg-terra px-4 py-2 text-xs text-ivory">
                    Choose
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-border px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-3xl">Discover artisans</h2>
          <span className="eyebrow text-muted-foreground">Visual catalogue</span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {catalogue.map((item) => (
            <Link
              key={item.title}
              to="/discover"
              className="overflow-hidden rounded-sm border border-border"
            >
              <img
                src={item.image}
                alt={item.title}
                width={816}
                height={816}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="p-3">
                <p className="font-display text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.price} · {item.city}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
