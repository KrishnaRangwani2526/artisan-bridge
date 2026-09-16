import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { artisans, crafts, getArtisan, products } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  craft: fallback(z.string(), "All crafts").default("All crafts"),
  mode: fallback(z.string(), "customer").default("customer"),
});

export const Route = createFileRoute("/discover")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Discover handicrafts and artisans — E-Setu" },
      {
        name: "description",
        content:
          "Search and scroll handmade pottery, woodwork, textiles, brass and more. Open any piece for photos, price, the maker and bulk rates.",
      },
      { property: "og:title", content: "Discover handicrafts and artisans — E-Setu" },
      {
        property: "og:description",
        content: "A scrollable catalogue of Indian handicrafts where every piece leads back to its maker.",
      },
    ],
  }),
  component: Discover,
});

const sorts = ["Popular", "Price: low to high", "Price: high to low", "Fastest"];

function Discover() {
  const { t } = useLang();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState("Popular");

  const q = search.q.trim().toLowerCase();
  const bulk = search.mode === "bulk";

  const list = useMemo(() => {
    let out = products.filter((p) => {
      const craftOk = search.craft === "All crafts" || p.craft === search.craft;
      const maker = getArtisan(p.artisanId)?.name.toLowerCase() ?? "";
      const hay = `${p.title} ${p.craft} ${p.city} ${p.tags.join(" ")} ${maker}`.toLowerCase();
      return craftOk && (q === "" || hay.includes(q));
    });
    if (bulk) out = out.filter((p) => p.moq > 0);
    const sorted = [...out];
    if (sort === "Price: low to high") sorted.sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") sorted.sort((a, b) => b.price - a.price);
    if (sort === "Fastest") sorted.sort((a, b) => a.makeDays - b.makeDays);
    if (sort === "Popular") sorted.sort((a, b) => b.likes - a.likes);
    return sorted;
  }, [q, search.craft, bulk, sort]);

  const set = (patch: Partial<typeof search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="eyebrow mb-3 text-terra">{t("Explore")}</p>
      <h1 className="font-display text-3xl md:text-5xl">Handicrafts from across India</h1>

      {/* search + buyer mode */}
      <div className="sticky top-[104px] z-30 -mx-4 mt-6 space-y-3 border-b border-border bg-background px-4 py-3 sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          <input
            value={search.q}
            onChange={(e) => set({ q: e.target.value })}
            placeholder={t("Search handicrafts, crafts, cities")}
            aria-label={t("Search")}
            className="w-full rounded-sm border border-input bg-card px-3 py-3 text-sm outline-hidden focus:border-terra"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-sm border border-input p-1">
            {(["customer", "bulk"] as const).map((m) => (
              <button
                key={m}
                onClick={() => set({ mode: m })}
                className={`rounded-sm px-3 py-1.5 text-xs ${
                  search.mode === m ? "bg-primary text-primary-foreground" : "text-foreground/70"
                }`}
              >
                {m === "customer" ? t("Customer") : t("Bulk buyer")}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label={t("Sort")}
            className="rounded-sm border border-input bg-card px-2 py-2 text-xs outline-hidden focus:border-terra"
          >
            {sorts.map((s) => (
              <option key={s} value={s}>
                {t(s)}
              </option>
            ))}
          </select>
          <span className="ml-auto text-xs text-muted-foreground">{list.length} items</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {crafts.map((c) => (
            <button
              key={c}
              onClick={() => set({ craft: c })}
              className={`shrink-0 rounded-sm px-3 py-1.5 text-xs transition-colors ${
                search.craft === c
                  ? "bg-terra text-ivory"
                  : "border border-input text-foreground/70 hover:text-foreground"
              }`}
            >
              {t(c)}
            </button>
          ))}
        </div>
      </div>

      {/* Instagram-style post feed */}
      {list.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted-foreground">{t("No results found")}</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const maker = getArtisan(p.artisanId);
            return (
              <article key={p.id} className="overflow-hidden rounded-sm border border-border bg-card">
                <Link
                  to="/products/$productId"
                  params={{ productId: p.id }}
                  className="flex items-center gap-3 p-3"
                >
                  <img
                    src={maker?.photo}
                    alt={maker?.name ?? ""}
                    width={816}
                    height={816}
                    loading="lazy"
                    className="size-9 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{maker?.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.city} · {t(p.craft)}
                    </p>
                  </div>
                </Link>
                <Link to="/products/$productId" params={{ productId: p.id }} className="block">
                  <PostImages images={p.images} title={p.title} />
                </Link>
                <div className="space-y-1 p-3">
                  <p className="font-display text-base">{p.title}</p>
                  <p className="text-sm">
                    {bulk ? (
                      <>
                        <span className="text-terra">₹{p.bulkPrice.toLocaleString("en-IN")}</span>{" "}
                        <span className="text-xs text-muted-foreground">
                          / pc · {t("Minimum order")} {p.moq}
                        </span>
                      </>
                    ) : (
                      <span className="text-terra">₹{p.price.toLocaleString("en-IN")}</span>
                    )}
                  </p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                  <div className="flex items-center justify-between pt-2 text-xs">
                    <span className="text-muted-foreground">♥ {p.likes}</span>
                    <Link
                      to="/products/$productId"
                      params={{ productId: p.id }}
                      className="rounded-sm bg-primary px-3 py-1.5 text-primary-foreground"
                    >
                      {bulk ? t("Ask for bulk quote") : t("Place order")}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-14 mb-6 flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-10">
        <h2 className="font-display text-2xl md:text-3xl">{t("Artisans")}</h2>
        <span className="eyebrow text-muted-foreground">{t("Verified by E-Setu")}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artisans.map((a) => (
          <Link
            key={a.id}
            to="/artisans/$artisanId"
            params={{ artisanId: a.id }}
            className="rounded-sm border border-input p-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={a.photo}
                alt={`${a.name} at work`}
                width={816}
                height={816}
                loading="lazy"
                className="size-14 rounded-sm object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-display text-lg">{a.name}</p>
                <p className="truncate text-xs text-muted-foreground">{a.city}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-brass">
              ★ {a.rating} · {a.orders} orders · {a.onTime}% on time
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PostImages({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="relative">
      <img
        src={images[i]}
        alt={`${title} — photo ${i + 1}`}
        width={816}
        height={816}
        loading="lazy"
        className="aspect-square w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
        {images.map((_, n) => (
          <span
            key={n}
            onClick={(e) => {
              e.preventDefault();
              setI(n);
            }}
            className={`size-1.5 rounded-full ${n === i ? "bg-ivory" : "bg-ivory/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
