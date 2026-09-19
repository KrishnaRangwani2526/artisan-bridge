import { createFileRoute, Link } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import {
  addResponse,
  advance,
  chooseArtisan,
  emptyOrders,
  getOrders,
  markShipped,
  orderStages,
  subscribeOrders,
  type Order,
  type OrderStage,
} from "@/lib/orders";
import { artisans, getArtisan } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your orders and delivery timeline | E-Setu" },
      {
        name: "description",
        content:
          "Follow every order from the moment the artisan is notified to the day it is delivered — acceptance, making, local logistics pickup and the delivery timeline.",
      },
      { property: "og:title", content: "Your orders and delivery timeline | E-Setu" },
      {
        property: "og:description",
        content: "Order placed, artisan notified, accepted, in making, shipped, delivered.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrdersPage,
});

function useOrders() {
  return useSyncExternalStore(subscribeOrders, getOrders, emptyOrders);
}

const stageIndex = (s: OrderStage) => orderStages.findIndex((x) => x.key === s);

function OrdersPage() {
  const orders = useOrders();
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="eyebrow reveal mb-4 text-terra">{t("Order tracking")}</p>
      <h1 className="reveal font-display text-4xl md:text-5xl">{t("Your orders")}</h1>
      <p className="reveal mt-3 max-w-2xl leading-relaxed text-foreground/70">
        {t(
          "Each step below is written by the artisan's own app — acceptance, making, the local courier pickup and delivery. E-Setu only shows what the maker reports.",
        )}
      </p>

      {orders.length === 0 ? (
        <div className="reveal mt-10 rounded-sm border border-dashed border-input p-10 text-center">
          <p className="font-display text-2xl">{t("No orders yet")}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("Place an order or send a bulk requirement and it will appear here.")}
          </p>
          <Link
            to="/discover"
            className="mt-6 inline-block rounded-sm bg-primary px-5 py-3 text-sm text-primary-foreground"
          >
            {t("Browse handicrafts")}
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({ order: o }: { order: Order }) {
  const { t } = useLang();
  const current = stageIndex(o.stage);
  const artisan = getArtisan(o.chosenArtisanId ?? o.artisanId);
  const candidates = artisans.filter((a) => a.id !== o.artisanId).slice(0, 2);

  return (
    <article className="reveal overflow-hidden rounded-sm border border-border bg-card">
      <div className="flex flex-wrap items-center gap-4 border-b border-border p-5">
        <img
          src={o.image}
          alt={o.productTitle}
          width={816}
          height={816}
          loading="lazy"
          className="size-16 rounded-sm object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-tight">{o.productTitle}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {o.id} · {o.quantity} pcs · ₹{o.total.toLocaleString("en-IN")} ·{" "}
            {o.kind === "bulk" ? t("Bulk requirement") : t("Single order")} · {o.city}
          </p>
        </div>
        <span className="rounded-full border border-terra/40 bg-terra/10 px-3 py-1 text-xs text-terra">
          {t(orderStages[current]?.label ?? "Order placed")}
        </span>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-12">
        <ol className="lg:col-span-7">
          {orderStages.map((s, i) => {
            const done = i <= current;
            const event = [...o.events].reverse().find((e) => e.stage === s.key);
            return (
              <li key={s.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 size-3 shrink-0 rounded-full border ${
                      done ? "border-terra bg-terra" : "border-input bg-background"
                    }`}
                  />
                  {i < orderStages.length - 1 && (
                    <span className={`w-px flex-1 ${done ? "bg-terra/40" : "bg-border"}`} />
                  )}
                </div>
                <div className={`pb-6 ${done ? "" : "opacity-45"}`}>
                  <p className="text-sm font-medium">{t(s.label)}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.who}
                    {event ? ` · ${new Date(event.at).toLocaleString("en-IN")}` : ""}
                    {event?.note ? ` · ${event.note}` : ""}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <aside className="lg:col-span-5">
          {artisan && (
            <div className="rounded-sm bg-ink p-4 text-ivory">
              <p className="eyebrow mb-3 text-brass">
                {o.chosenArtisanId ? t("Your maker") : t("Notified artisan")}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={artisan.photo}
                  alt={artisan.name}
                  width={816}
                  height={816}
                  loading="lazy"
                  className="size-12 rounded-sm object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display">{artisan.name}</p>
                  <p className="text-xs text-ivory/60">
                    {artisan.city} · ★ {artisan.rating}
                  </p>
                </div>
              </div>
              {o.trackingId && (
                <p className="mt-4 border-t border-ivory/10 pt-3 text-xs text-ivory/70">
                  {o.courier} · {t("Tracking")} {o.trackingId}
                </p>
              )}
            </div>
          )}

          {o.kind === "bulk" && o.responses.length > 0 && !o.chosenArtisanId && (
            <div className="mt-4 rounded-sm border border-input p-4">
              <p className="eyebrow mb-3 text-terra">{t("Artisans who accepted")}</p>
              <div className="space-y-2">
                {o.responses.map((r) => {
                  const a = getArtisan(r.artisanId);
                  return (
                    <div key={r.artisanId} className="flex items-center justify-between gap-3 text-sm">
                      <span className="min-w-0 truncate">
                        {a?.name} · ₹{r.quote.toLocaleString("en-IN")} · {r.days}d
                      </span>
                      <button
                        onClick={() => chooseArtisan(o.id, r.artisanId)}
                        className="shrink-0 rounded-sm bg-terra px-3 py-1.5 text-xs text-ivory"
                      >
                        {t("Choose")}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-4 rounded-sm border border-dashed border-input p-4">
            <p className="eyebrow mb-1 text-muted-foreground">{t("Artisan app simulator")}</p>
            <p className="mb-3 text-xs text-muted-foreground">
              {t("Until the artisan app is linked, these buttons stand in for what the maker taps there.")}
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {o.kind === "bulk" && o.responses.length === 0 && (
                <button
                  onClick={() => {
                    addResponse(o.id, {
                      artisanId: o.artisanId,
                      quote: o.unitPrice,
                      days: o.expectedDays,
                      acceptedAt: new Date().toISOString(),
                    });
                    candidates.forEach((c, i) =>
                      addResponse(o.id, {
                        artisanId: c.id,
                        quote: Math.round(o.unitPrice * (1 + (i + 1) * 0.06)),
                        days: o.expectedDays + i + 1,
                        acceptedAt: new Date().toISOString(),
                      }),
                    );
                  }}
                  className="rounded-sm border border-input px-3 py-1.5"
                >
                  {t("Artisans accept")}
                </button>
              )}
              {o.kind === "single" && current < stageIndex("artisan_chosen") && (
                <button
                  onClick={() => chooseArtisan(o.id, o.artisanId)}
                  className="rounded-sm border border-input px-3 py-1.5"
                >
                  {t("Artisan accepts")}
                </button>
              )}
              <button
                onClick={() => advance(o.id, "in_making")}
                className="rounded-sm border border-input px-3 py-1.5"
              >
                {t("In making")}
              </button>
              <button
                onClick={() => markShipped(o.id, "Local logistics", `LG${o.id.slice(-5)}`)}
                className="rounded-sm border border-input px-3 py-1.5"
              >
                {t("Shipped")}
              </button>
              <button
                onClick={() => advance(o.id, "out_for_delivery")}
                className="rounded-sm border border-input px-3 py-1.5"
              >
                {t("Out for delivery")}
              </button>
              <button
                onClick={() => advance(o.id, "delivered")}
                className="rounded-sm border border-input px-3 py-1.5"
              >
                {t("Delivered")}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
