import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/post")({
  head: () => ({
    meta: [
      { title: "Post a requirement — E-Setu" },
      {
        name: "description",
        content:
          "Describe what you need in plain words with a budget and delivery city. Capable artisans near you will respond.",
      },
      { property: "og:title", content: "Post a requirement — E-Setu" },
      {
        property: "og:description",
        content: "Tell E-Setu what you need and let artisans tell you who can make it.",
      },
    ],
  }),
  component: PostRequirement,
});

function PostRequirement() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="eyebrow mb-4 text-terra">Requirement marketplace</p>
      <h1 className="font-display text-4xl md:text-5xl">Tell us what you need</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-5 lg:col-span-7"
        >
          <Field label="What do you need made?">
            <input
              required
              placeholder="Handmade wooden study table"
              className="w-full rounded-sm border border-input bg-card px-3 py-3 text-sm outline-hidden focus:border-terra"
            />
          </Field>
          <Field label="Describe it in your own words">
            <textarea
              required
              rows={5}
              placeholder="4 × 2 ft, walnut finish, two drawers. Should match a dark wooden chair."
              className="w-full rounded-sm border border-input bg-card px-3 py-3 text-sm outline-hidden focus:border-terra"
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Quantity">
              <input
                defaultValue="1"
                className="w-full rounded-sm border border-input bg-card px-3 py-3 text-sm outline-hidden focus:border-terra"
              />
            </Field>
            <Field label="Budget (₹)">
              <input
                placeholder="8,000 – 12,000"
                className="w-full rounded-sm border border-input bg-card px-3 py-3 text-sm outline-hidden focus:border-terra"
              />
            </Field>
            <Field label="Delivery city">
              <input
                placeholder="Jaipur"
                className="w-full rounded-sm border border-input bg-card px-3 py-3 text-sm outline-hidden focus:border-terra"
              />
            </Field>
            <Field label="Needed within">
              <select className="w-full rounded-sm border border-input bg-card px-3 py-3 text-sm outline-hidden focus:border-terra">
                <option>1 week</option>
                <option>2 weeks</option>
                <option>1 month</option>
                <option>Flexible</option>
              </select>
            </Field>
          </div>
          <Field label="Reference image (optional)">
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-sm border border-dashed border-input bg-card px-3 py-3 text-xs text-muted-foreground"
            />
          </Field>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className="rounded-sm bg-primary px-5 py-3 text-sm text-primary-foreground">
              Send to artisans
            </button>
            <Link to="/requirement" className="rounded-sm border border-input px-5 py-3 text-sm">
              See a sample response list
            </Link>
          </div>
          {sent && (
            <p className="rounded-sm border border-terra/40 bg-terra/10 px-4 py-3 text-sm text-terra">
              Sent. Artisans in your area can see it now — responses usually start within a few hours.
            </p>
          )}
        </form>

        <aside className="rounded-sm bg-ink p-6 text-ivory lg:col-span-5">
          <p className="eyebrow mb-4 text-brass">What happens next</p>
          <ol className="space-y-5 text-sm">
            {[
              ["01", "Artisans nearby see your requirement", "One card, one button: I can make this."],
              ["02", "They respond with price and delivery", "Only makers who can actually do it reply."],
              ["03", "You compare and choose", "Rating, completed orders, on-time record, catalogue."],
              ["04", "The artisan makes and ships", "They arrange local logistics; you track it here."],
            ].map(([n, t, d]) => (
              <li key={n} className="border-b border-ivory/10 pb-4 last:border-0">
                <span className="text-xs text-brass">{n}</span>
                <p className="mt-1 font-display text-lg">{t}</p>
                <p className="mt-1 text-ivory/60">{d}</p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
