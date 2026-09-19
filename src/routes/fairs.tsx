import { createFileRoute, Link } from "@tanstack/react-router";
import { fairs } from "@/lib/fairs";
import { getProduct } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/fairs")({
  head: () => ({
    meta: [
      { title: "Craft fairs — Shilpgram, Surajkund, IHGF and more | E-Setu" },
      {
        name: "description",
        content:
          "The craft melas where these makers already sell — Shilpgram Utsav, Surajkund International Crafts Mela, IHGF Delhi Fair, Dastkari Haat and Hunar Haat — now open all year on E-Setu.",
      },
      { property: "og:title", content: "Craft fairs all year — E-Setu" },
      {
        property: "og:description",
        content: "Shilpgram, Surajkund, IHGF Delhi Fair, Dastkari Haat, Hunar Haat — the stalls, online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FairsPage,
});

function FairsPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="eyebrow reveal mb-4 text-terra">{t("Craft fairs")}</p>
      <h1 className="reveal max-w-3xl font-display text-4xl leading-[1.05] md:text-6xl" style={{ animationDelay: "60ms" }}>
        {t("The mela does not have to end.")}
      </h1>
      <p className="reveal mt-4 max-w-2xl leading-relaxed text-foreground/70" style={{ animationDelay: "120ms" }}>
        {t(
          "For two weeks a year a buyer can walk up to the maker and talk. E-Setu keeps those same stalls open the other fifty weeks.",
        )}
      </p>

      <div className="mt-12 space-y-16">
        {fairs.map((f, i) => (
          <section key={f.id} className="reveal" style={{ animationDelay: `${80 + i * 60}ms` }}>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="sticky top-32 rounded-sm bg-ink p-6 text-ivory">
                  <p className="eyebrow mb-3 text-brass">
                    {f.since ? `${t("Since")} ${f.since}` : t("Annual")}
                  </p>
                  <h2 className="font-display text-2xl text-ivory">{f.name}</h2>
                  <p className="mt-1 text-sm text-ivory/60">{f.place}</p>
                  <dl className="mt-5 space-y-3 text-sm">
                    {[
                      [t("When"), f.season],
                      [t("Organised by"), f.organiser],
                      [t("Scale"), f.scale],
                    ].map(([k, v]) => (
                      <div key={k} className="border-b border-ivory/10 pb-2 last:border-0">
                        <dt className="text-xs text-ivory/50">{k}</dt>
                        <dd className="mt-0.5">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {f.crafts.map((c) => (
                      <span key={c} className="rounded-full border border-ivory/20 px-3 py-1 text-xs text-ivory/70">
                        {c}
                      </span>
                    ))}
                  </div>
                  <a
                    href={f.source}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-xs text-brass underline underline-offset-4"
                  >
                    {t("Official information")} ↗
                  </a>
                </div>
              </div>

              <div className="lg:col-span-8">
                <p className="max-w-2xl text-lg leading-relaxed text-foreground/75">{f.about}</p>
                <p className="eyebrow mt-8 mb-4 text-muted-foreground">{t("On E-Setu from this circuit")}</p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {f.productIds.map((pid) => {
                    const p = getProduct(pid);
                    if (!p) return null;
                    return (
                      <Link
                        key={pid}
                        to="/products/$productId"
                        params={{ productId: p.id }}
                        className="lift overflow-hidden rounded-sm border border-border bg-card"
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
                          <p className="font-display text-sm leading-tight">{p.title}</p>
                          <p className="mt-1 text-xs text-terra">₹{p.price.toLocaleString("en-IN")}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-sm border border-input p-6 text-sm text-foreground/70">
        {t(
          "Fair names, dates and organisers are from the fairs' own public pages. Artisan and product records are E-Setu demo entries until the artisan app catalogue is linked.",
        )}
      </div>
    </div>
  );
}
