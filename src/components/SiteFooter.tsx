export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
        <p className="font-display text-xl">
          E-Setu <span className="text-sm text-ivory/50">— a digital bridge, not a seller.</span>
        </p>
        <p className="eyebrow text-ivory/50">
          Buyer → Requirement → Artisan → Order → Delivery
        </p>
      </div>
    </footer>
  );
}
