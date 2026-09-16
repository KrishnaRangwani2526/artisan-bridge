import { languages, useLang } from "@/lib/i18n";

export function LanguageGate() {
  const { chosen, setLang } = useLang();
  if (chosen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-sm border border-border bg-background p-6">
        <p className="eyebrow mb-3 text-terra">E-Setu · ई-सेतु</p>
        <h2 className="font-display text-2xl">Choose your language</h2>
        <p className="mt-1 text-sm text-muted-foreground">अपनी भाषा चुनें</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          Every page will show English along with your language.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className="rounded-sm border border-input px-4 py-3 text-left text-sm transition-colors hover:border-terra hover:text-terra"
            >
              <span className="block font-display text-lg">{l.native}</span>
              <span className="text-xs text-muted-foreground">{l.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setLang("en")}
          className="mt-4 w-full rounded-sm bg-primary px-4 py-3 text-sm text-primary-foreground"
        >
          Continue in English
        </button>
      </div>
    </div>
  );
}
