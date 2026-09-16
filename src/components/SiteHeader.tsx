import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/post", label: "Post a need" },
  { to: "/requirement", label: "Responses" },
  { to: "/artisan-app", label: "For artisans" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">E-Setu</span>
          <span className="eyebrow hidden truncate text-muted-foreground sm:inline">
            Bridge for artisans
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-6">
          <nav className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link to="/post" className="rounded-sm bg-primary px-4 py-2 text-sm text-primary-foreground">
            Post a need
          </Link>
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-border px-4 py-2 text-sm text-foreground/70 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="shrink-0"
            activeProps={{ className: "text-foreground underline underline-offset-4" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
