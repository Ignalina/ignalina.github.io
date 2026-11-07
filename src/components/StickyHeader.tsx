import { useState, useEffect } from 'preact/hooks';

export interface LangLink {
  lang: string;
  name: string;
  flag: string;
  href: string;
  current: boolean;
}

export interface NavLink {
  href: string;
  label: string;
  current?: boolean;
}

interface Props {
  homeHref: string;
  links: NavLink[];
  languagesLabel: string;
  menuLabel: string;
  languages: LangLink[];
}

function Flags({ languages, label, small }: { languages: LangLink[]; label: string; small: boolean }) {
  return (
    <ul class="flex items-center gap-0.5 shrink-0" aria-label={label}>
      {languages.map((l) => (
        <li key={l.lang}>
          <a
            href={l.href}
            hreflang={l.lang}
            lang={l.lang}
            aria-current={l.current ? 'page' : undefined}
            title={l.name}
            class={`block p-1.5 rounded-md transition-opacity ${
              l.current ? 'opacity-100' : 'opacity-55 hover:opacity-100'
            }`}
          >
            <img
              src={l.flag}
              alt={l.name}
              width="27"
              height="18"
              class={`block w-auto rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.18)] transition-all duration-300 ${
                small ? 'h-[15px]' : 'h-[18px]'
              } ${l.current ? 'outline outline-2 outline-offset-2 outline-blaek' : ''}`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

// Samma sidhuvud som vetra.se: fullbrett överst, en flytande pill när sidan
// rullats ner och en menyknapp på mobil. Här på ljus grund, med ordmärket i
// skyltsnittet och språken som flaggor.
export default function StickyHeader({ homeHref, links, languagesLabel, menuLabel, languages }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 80);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onScroll();
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const compact = scrolled && !isMobile;

  return (
    <>
      <header
        class={`fixed left-0 right-0 z-50 transition-all duration-300 ease-out ${
          compact ? 'top-4 mx-auto max-w-3xl px-3' : 'top-0 mx-0 max-w-none px-0'
        }`}
      >
        <div
          class={`transition-all duration-300 ease-out ${
            compact
              ? 'rounded-full py-1.5 px-5 border border-blaek/10 shadow-lg shadow-blaek/10'
              : 'rounded-none py-0 px-0 border-b border-blaek/10'
          }`}
          style={{
            background: compact ? 'rgba(239, 237, 238, 0.82)' : 'rgba(239, 237, 238, 0.94)',
            backdropFilter: isMobile ? 'none' : 'blur(16px)',
            WebkitBackdropFilter: isMobile ? 'none' : 'blur(16px)',
          }}
        >
          <nav
            class={`flex items-center justify-between gap-4 transition-all duration-300 ${
              compact ? 'h-10' : 'h-14 md:h-16 max-w-site mx-auto px-5 sm:px-8'
            }`}
            aria-label="Ignalina"
          >
            <a
              href={homeHref}
              class={`skilt shrink-0 no-underline text-blaek hover:text-cherenkov transition-all duration-300 ${
                compact ? 'text-[0.8rem]' : 'text-[0.92rem]'
              }`}
            >
              Ignalina ApS
            </a>

            <ul class="hidden md:flex items-center gap-1 ml-auto">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={l.current ? 'page' : undefined}
                    class={`block px-3 rounded-full no-underline hover:text-cherenkov transition-colors ${
                      compact ? 'py-1 text-[0.9rem]' : 'py-1.5 text-[0.95rem]'
                    } ${l.current ? 'text-cherenkov' : 'text-blaek'}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div class="hidden md:block">
              <Flags languages={languages} label={languagesLabel} small={compact} />
            </div>

            <button
              type="button"
              class="md:hidden -mr-2 p-2.5 text-blaek hover:text-cherenkov transition-colors"
              aria-label={menuLabel}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                {open ? (
                  <path stroke-linecap="round" d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </nav>
        </div>

        {open && (
          <div class="md:hidden px-5 pt-1 pb-3 border-b border-blaek/10 bg-grund">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={l.current ? 'page' : undefined}
                    class={`block py-2.5 no-underline ${l.current ? 'text-cherenkov' : 'text-blaek'}`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div class="pt-2 -ml-1.5">
              <Flags languages={languages} label={languagesLabel} small={false} />
            </div>
          </div>
        )}
      </header>

      <div class="h-14 md:h-16" />
    </>
  );
}
