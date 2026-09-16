import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { openRequirements } from "@/lib/data";

export const Route = createFileRoute("/artisan-app")({
  head: () => ({
    meta: [
      { title: "For artisans — one card, one button | E-Setu" },
      {
        name: "description",
        content:
          "No seller panel, no listings, no product feeds. Artisans see nearby requirements and answer one question: can you make this?",
      },
      { property: "og:title", content: "For artisans — one card, one button | E-Setu" },
      {
        property: "og:description",
        content: "The simplest possible seller experience: see a requirement, tap I can make this.",
      },
    ],
  }),
  component: ArtisanApp,
});

function ArtisanApp() {
  const [replies, setReplies] = useState<Record<string, "yes" | "no">>({});
  const accepted = Object.values(replies).filter((v) => v === "yes");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="eyebrow mb-4 text-terra">For artisans</p>
      <h1 className="max-w-3xl font-display text-4xl md:text-5xl">
        No seller panel. No listings. Just: <span className="italic text-terra">can you make this?</span>
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-foreground/70">
        Requirements from buyers near you arrive as plain cards. Tap once if you can make it. If the
        buyer picks you, you make it and arrange local delivery — E-Setu handles the rest.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-display text-2xl">Custom orders near you</h2>
            <span className="eyebrow text-terra">{openRequirements.length} new</span>
          </div>
          <div className="space-y-4">
            {openRequirements.map((r) => {
              const reply = replies[r.title];
              return (
                <div key={r.title} className="rounded-sm border border-input p-5">
                  <p className="font-display text-xl">{r.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {r.qty} · {r.budget} · {r.city}
                  </p>
                  {"buyer" in r && (
                    <p className="mt-1 text-xs text-muted-foreground">Buyer: {(r as { buyer: string }).buyer}</p>
                  )}
                  {"note" in r && (
                    <p className="mt-2 text-sm text-foreground/70">{(r as { note: string }).note}</p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">Posted {r.posted}</p>
                  {reply ? (
                    <p
                      className={`mt-4 rounded-sm border px-4 py-4 text-center text-sm font-semibold ${
                        reply === "yes" ? "border-terra text-terra" : "border-input text-muted-foreground"
                      }`}
                    >
                      {reply === "yes" ? "SENT — WAITING FOR BUYER" : "DECLINED"}
                    </p>
                  ) : (
                    <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr]">
                      <button
                        onClick={() => setReplies((p) => ({ ...p, [r.title]: "yes" }))}
                        className="rounded-sm bg-terra px-4 py-4 text-sm font-semibold tracking-wide text-ivory"
                      >
                        I CAN MAKE THIS
                      </button>
                      <button
                        onClick={() => setReplies((p) => ({ ...p, [r.title]: "no" }))}
                        className="rounded-sm border border-input px-4 py-4 text-sm font-semibold tracking-wide text-foreground/70"
                      >
                        NOT NOW
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="rounded-sm bg-ink p-6 text-ivory lg:col-span-5">
          <p className="eyebrow mb-4 text-brass">Hello, Ramesh</p>
          <h2 className="font-display text-2xl">Your week</h2>
          <dl className="mt-5 space-y-3 text-sm">
            {[
              ["New requirements", "12"],
              ["Accepted by you", String(accepted.length)],
              ["Orders in progress", "3"],
              ["Paid out this month", "₹41,200"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-ivory/10 pb-2 last:border-0">
                <dt className="text-ivory/50">{k}</dt>
                <dd className="font-display text-lg">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-ivory/60">
            No SEO. No product feeds. No marketplace management. If you can make it, say yes — the
            buyer sees your past work and decides.
          </p>
        </aside>
      </div>
    </div>
  );
}
