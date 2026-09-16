import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { artisans, catalogue } from "@/lib/data";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover artisans and their work — E-Setu" },
      {
        name: "description",
        content:
          "Browse pottery, woodwork, textiles and metalwork made by verified Indian artisans, then order directly from the maker.",
      },
      { property: "og:title", content: "Discover artisans and their work — E-Setu" },
      {
        property: "og:description",
        content: "A visual catalogue where every piece leads back to the person who made it.",
      },
    ],
  }),
  component: Discover,
});

const crafts = ["All crafts", "Pottery", "Woodwork", "Textiles", "Metalwork"];

function Discover() {
  const [active, setActive] = useState("All crafts");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="eyebrow mb-4 text-terra">Visual catalogue</p>
      <h1 className="font-display text-4xl md:text-5xl">Discover what artisans are making</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-foreground/70">
        Every piece here leads back to a person, not a listing. Open a maker to see their full body
        of work, their record, and to commission something of your own.
      </p>

      <div className="mt-8 flex flex-wrap gap-2 border-y border-border py-4">
        {crafts.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-sm px-4 py-2 text-sm transition-colors ${
              active === c
                ? "bg-primary text-primary-foreground"
                : "border border-input text-foreground/70 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {catalogue.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-sm border border-border">
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
              <p className="mt-1 text-xs text-terra">{item.artisan}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 mb-8 flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-10">
        <h2 className="font-display text-3xl">Makers on the bridge</h2>
        <span className="eyebrow text-muted-foreground">Verified artisans</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {artisans.map((a) => (
          <Link
            key={a.id}
            to="/artisans/$artisanId"
            params={{ artisanId: a.id }}
            className="rounded-sm border border-input p-5"
          >
            <img
              src={a.photo}
              alt={`${a.name} at work`}
              width={816}
              height={816}
              loading="lazy"
              className="aspect-4/3 w-full rounded-sm object-cover"
            />
            <p className="mt-4 font-display text-lg">{a.name}</p>
            <p className="text-xs text-muted-foreground">
              {a.city} · {a.craft}
            </p>
            <p className="mt-2 text-xs text-brass">
              ★ {a.rating} · {a.orders} orders · {a.onTime}% on time
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
