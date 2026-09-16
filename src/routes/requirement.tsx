import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { artisans } from "@/lib/data";
import sketchTable from "@/assets/sketch-table.jpg";

export const Route = createFileRoute("/requirement")({
  head: () => ({
    meta: [
      { title: "Your requirement — artisans who responded | E-Setu" },
      {
        name: "description",
        content:
          "Compare the artisans who accepted your requirement by price, delivery time, rating and completed orders, then pick your maker.",
      },
      { property: "og:title", content: "Your requirement — artisans who responded | E-Setu" },
      {
        property: "og:description",
        content: "The heart of E-Setu: capable artisans respond, and the buyer chooses.",
      },
    ],
  }),
  component: RequirementPage,
});

function RequirementPage() {
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="eyebrow mb-3 text-terra">Requirement #1042</p>
          <h1 className="font-display text-4xl">Your requirement</h1>
        </div>
        <span className="eyebrow text-muted-foreground">3 artisans responded</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <aside className="rounded-sm bg-ink p-6 text-ivory lg:col-span-4">
          <p className="eyebrow mb-4 text-brass">Requirement</p>
          <h2 className="mb-4 font-display text-2xl">Handmade wooden study table</h2>
          <dl className="space-y-3 text-sm">
            {[
              ["Size", "4 × 2 ft"],
              ["Quantity", "1 unit"],
              ["Budget", "₹8,000–₹12,000"],
              ["Location", "Jaipur"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-ivory/10 pb-2">
                <dt className="text-ivory/50">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div className="flex justify-between">
              <dt className="text-ivory/50">Status</dt>
              <dd className="text-brass">{chosen ? "Artisan chosen" : "Choosing artisan"}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-ivory/60">Reference image</p>
          <img
            src={sketchTable}
            alt="Sketch of the requested wooden study table"
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
              className={`rounded-sm border p-5 ${
                chosen === a.id ? "border-terra bg-terra/5" : "border-input"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
                  <button
                    onClick={() => setChosen(a.id)}
                    className="rounded-sm bg-terra px-4 py-2 text-xs text-ivory"
                  >
                    {chosen === a.id ? "Chosen" : "Choose"}
                  </button>
                </div>
              </div>
              <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                Verified: {a.verified.join(" · ")} · On time {a.onTime}% · Repeat buyers{" "}
                {a.repeatBuyers}%
              </p>
            </div>
          ))}

          {chosen && (
            <p className="rounded-sm border border-terra/40 bg-terra/10 px-4 py-3 text-sm text-terra">
              {artisans.find((a) => a.id === chosen)?.name} has been chosen. They will confirm
              materials, then arrange local logistics for delivery to Jaipur.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
