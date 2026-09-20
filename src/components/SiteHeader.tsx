import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { languages, useLang } from "@/lib/i18n";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/fairs", label: "Craft fairs" },
  { to: "/post", label: "Post a need" },
  { to: "/requirement", label: "Responses" },
  { to: "/orders", label: "Your orders" },
  { to: "/artisan-app", label: "For artisans" },
] as const;

export function SiteHeader() {
  const { t, lang, setLang } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">E-Setu</span>
          <span className="eyebrow hidden truncate text-muted-foreground lg:inline">
            {t("Bridge for artisans")}
          </span>
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/discover", search: { q, craft: "All crafts", mode: "customer" } });
          }}
          className="order-3 flex w-full min-w-0 items-center gap-2 sm:order-none sm:ml-4 sm:w-auto sm:flex-1"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search handicrafts, crafts, cities")}
            aria-label={t("Search")}
            className="w-full rounded-sm border border-input bg-card px-3 py-2 text-sm outline-hidden focus:border-terra"
          />
          <button type="submit" className="shrink-0 rounded-sm border border-input px-3 py-2 text-sm">
            {t("Search")}
          </button>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <label className="sr-only" htmlFor="lang-select">
            Language
          </label>
          <select
            id="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value as typeof lang)}
            className="rounded-sm border border-input bg-card px-2 py-2 text-sm outline-hidden focus:border-terra"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.native}
              </option>
            ))}
          </select>
          <Link
            to="/post"
            className="hidden rounded-sm bg-primary px-4 py-2 text-sm text-primary-foreground sm:inline-block"
          >
            {t("Post a need")}
          </Link>
        </div>
      </div>

      <nav className="flex gap-5 overflow-x-auto border-t border-border px-4 py-2 text-sm text-foreground/70 sm:px-6">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="shrink-0 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground underline underline-offset-4" }}
          >
            {t(item.label)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
