/**
 * E-Setu order + requirement store.
 *
 * Today this is a browser-local store so the whole flow is demonstrable without
 * a backend. It is deliberately shaped like the payloads the artisan mobile app
 * will exchange — see INTEGRATION.md. Replacing the storage layer with real API
 * calls should not require changing any screen.
 */

export type OrderStage =
  | "placed"
  | "artisan_notified"
  | "artisan_accepted"
  | "artisan_chosen"
  | "in_making"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

export const orderStages: { key: OrderStage; label: string; who: string }[] = [
  { key: "placed", label: "Order placed", who: "Buyer · E-Setu web" },
  { key: "artisan_notified", label: "Notification sent to artisan app", who: "E-Setu" },
  { key: "artisan_accepted", label: "Artisan accepted", who: "Artisan app" },
  { key: "artisan_chosen", label: "Artisan confirmed for this order", who: "Buyer / auto" },
  { key: "in_making", label: "In making", who: "Artisan app · inventory" },
  { key: "shipped", label: "Handed to local logistics", who: "Artisan app" },
  { key: "out_for_delivery", label: "Out for delivery", who: "Logistics partner" },
  { key: "delivered", label: "Delivered", who: "Buyer confirmation" },
];

export type OrderKind = "single" | "bulk";

export type ArtisanResponse = {
  artisanId: string;
  quote: number;
  days: number;
  acceptedAt: string;
};

export type Order = {
  id: string;
  kind: OrderKind;
  productId: string;
  productTitle: string;
  image: string;
  artisanId: string;
  quantity: number;
  unitPrice: number;
  total: number;
  buyerName: string;
  buyerPhone: string;
  city: string;
  createdAt: string;
  stage: OrderStage;
  /** Only bulk requirements collect competing responses before a maker is picked. */
  responses: ArtisanResponse[];
  chosenArtisanId: string | null;
  trackingId: string | null;
  courier: string | null;
  expectedDays: number;
  events: { stage: OrderStage; at: string; note?: string | undefined }[];
};

const KEY = "esetu-orders";

const EMPTY_SNAPSHOT: Order[] = [];
let cache: Order[] | null = null;
const listeners = new Set<() => void>();

function read(): Order[] {
  if (cache) return cache;
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;
  try {
    cache = JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Order[];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: Order[]) {
  cache = next;
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

export function subscribeOrders(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getOrders(): Order[] {
  return read();
}

export function getOrder(id: string) {
  return read().find((o) => o.id === id);
}

const EMPTY: Order[] = [];

export function emptyOrders(): Order[] {
  return EMPTY;
}

function stamp(order: Order, stage: OrderStage, note?: string): Order {
  return {
    ...order,
    stage,
    events: [...order.events, { stage, at: new Date().toISOString(), note }],
  };
}

export function createOrder(input: {
  kind: OrderKind;
  productId: string;
  productTitle: string;
  image: string;
  artisanId: string;
  quantity: number;
  unitPrice: number;
  buyerName: string;
  buyerPhone: string;
  city: string;
  expectedDays: number;
}): Order {
  const id = `ES-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const now = new Date().toISOString();
  const order: Order = {
    ...input,
    id,
    total: input.unitPrice * input.quantity,
    createdAt: now,
    stage: "placed",
    responses: [],
    chosenArtisanId: input.kind === "single" ? input.artisanId : null,
    trackingId: null,
    courier: null,
    events: [{ stage: "placed", at: now }],
  };
  write([order, ...read()]);
  // Outbound event to the artisan app (stubbed until the app is linked).
  notifyArtisanApp(order);
  return order;
}

/**
 * Stub for the outbound webhook described in INTEGRATION.md.
 * The second AI replaces the body of this function with a server call; the
 * screens stay unchanged.
 */
export function notifyArtisanApp(order: Order) {
  const next = read().map((o) => (o.id === order.id ? stamp(o, "artisan_notified") : o));
  write(next);
  if (typeof console !== "undefined") {
    console.info("[e-setu] order.created → artisan app", {
      orderId: order.id,
      kind: order.kind,
      productId: order.productId,
      artisanId: order.artisanId,
      quantity: order.quantity,
    });
  }
}

export function advance(id: string, stage: OrderStage, patch: Partial<Order> = {}, note?: string) {
  write(read().map((o) => (o.id === id ? { ...stamp(o, stage, note), ...patch } : o)));
}

export function addResponse(id: string, response: ArtisanResponse) {
  write(
    read().map((o) =>
      o.id === id
        ? stamp({ ...o, responses: [...o.responses, response] }, "artisan_accepted")
        : o,
    ),
  );
}

export function chooseArtisan(id: string, artisanId: string) {
  advance(id, "artisan_chosen", { chosenArtisanId: artisanId });
}

export function markShipped(id: string, courier: string, trackingId: string) {
  advance(id, "shipped", { courier, trackingId }, `${courier} · ${trackingId}`);
}

export function clearOrders() {
  write([]);
}
