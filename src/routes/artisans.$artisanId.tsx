import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { artisans } from "@/lib/data";

export const Route = createFileRoute("/artisans/$artisanId")({
  loader: ({ params }) => {
    const artisan = artisans.find((a) => a.id === params.artisanId);
    if (!artisan) throw notFound();
    return { artisan };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artisan not found — E-Setu" }, { name: "robots", content: "noindex" }] };
    }
    const { artisan } = loaderData;
    const title = `${artisan.name} — ${artisan.craft} in ${artisan.city} | E-Setu`;
    const description = `${artisan.name}: ${artisan.orders} completed orders, ★ ${artisan.rating}, ${artisan.onTime}% on time. See their catalogue and commission custom work.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ArtisanProfile,
  notFoundComponent: ArtisanNotFound,
});

function ArtisanProfile() {
  const { artisan } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <img
            src={artisan.photo}
            alt={`${artisan.name} at work in their workshop`}
            width={816}
            height={816}
            className="aspect-square w-full rounded-sm object-cover"
          />
          <div className="mt-6 rounded-sm bg-ink p-6 text-ivory">
            <p className="eyebrow mb-4 text-brass">Record</p>
            <dl className="space-y-3 text-sm">
              {[
                ["Rating", `★ ${artisan.rating}`],
                ["Completed orders", String(artisan.orders)],
                ["On-time delivery", `${artisan.onTime}%`],
                ["Repeat buyers", `${artisan.repeatBuyers}%`],
                ["Verified", artisan.verified.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-ivory/10 pb-2 last:border-0">
                  <dt className="shrink-0 text-ivory/50">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="eyebrow mb-3 text-terra">{artisan.craft}</p>
          <h1 className="font-display text-4xl md:text-5xl">{artisan.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{artisan.city}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-foreground/70">{artisan.about}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/post" className="rounded-sm bg-terra px-5 py-3 text-sm text-ivory">
              Request custom work
            </Link>
            <Link to="/discover" className="rounded-sm border border-input px-5 py-3 text-sm">
              Back to discover
            </Link>
          </div>

          <h2 className="mt-12 mb-6 border-t border-border pt-8 font-display text-3xl">Catalogue</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {artisan.work.map((w) => (
              <div key={w.title} className="overflow-hidden rounded-sm border border-border">
                <img
                  src={w.image}
                  alt={w.title}
                  width={816}
                  height={816}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <div className="p-3">
                  <p className="font-display text-sm">{w.title}</p>
                  <p className="text-xs text-muted-foreground">{w.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtisanNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl">We couldn't find that artisan</h1>
      <p className="mt-3 text-sm text-muted-foreground">They may have left the platform.</p>
      <Link to="/discover" className="mt-6 inline-block rounded-sm bg-primary px-5 py-3 text-sm text-primary-foreground">
        Browse artisans
      </Link>
    </div>
  );
}
