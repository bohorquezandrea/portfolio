import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { content } from './i18n.js';

/* =============================================================
   useReveal: IntersectionObserver hook
   Marca los .reveal con data-in="" al entrar en viewport.

   Va como ATRIBUTO y no como clase a propósito: React reescribe el
   `className` entero cuando un componente re-renderiza, así que una
   clase añadida aquí con classList.add se perdía. Se notaba al abrir
   un ítem del FAQ: cambiaba `isOpen`, React reescribía className sin
   `is-in`, y la pregunta se desvanecía (opacity 0). Como ya habíamos
   hecho unobserve, no volvía nunca. React no toca data-in.
   ============================================================= */
function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-in', ''));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', '');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* =============================================================
   useTheme: light/dark with system preference + localStorage
   ============================================================= */
function useTheme() {
  // Oscuro es el tema de marca: es la paleta elegida, no una preferencia
  // del sistema. Sólo una elección explícita en el toggle lo cambia.
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage?.getItem('ab-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#10231C' : '#EDF2ED'
    );
    try {
      window.localStorage.setItem('ab-theme', theme);
    } catch (_) { /* private mode */ }
  }, [theme]);

  return [theme, setTheme];
}

/* =============================================================
   AlhambraOrnament: small SVG flower (clover) inspired by the
   Sweet Alhambra silhouette. Used as decorative dot near scroll cue
   and section markers.
   ============================================================= */
function AlhambraOrnament({ className = '', size = 22 }) {
  return (
    <svg
      className={`alhambra ${className}`}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <path d="M20 4 C24 4 27 7 27 11 C27 13 26 15 24 16 C26 17 27 19 27 21 C27 22 27 23 26 24 C29 24 31 26 31 29 C31 33 28 36 24 36 C22 36 20 35 20 33 C20 35 18 36 16 36 C12 36 9 33 9 29 C9 26 11 24 14 24 C13 23 13 22 13 21 C13 19 14 17 16 16 C14 15 13 13 13 11 C13 7 16 4 20 4 Z" />
        <circle cx="20" cy="20" r="3" fill="var(--bg-cream)" />
      </g>
    </svg>
  );
}

/* =============================================================
   LogoAB: monograma vectorial.
   Antes era un SVG de 165 kB que envolvia dos PNG en base64 (uno de
   color y otro de mascara) mas dos copias sin usar en <defs>, y traia
   incrustada la marca de agua "www.bressidesign.com". Ahora es un path
   real de 5,8 kB: hereda currentColor, asi que ya no hace falta el
   filter: invert(1) que se aplicaba en tema oscuro.
   ============================================================= */
function LogoAB({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 352 298"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M284.00 291.50C269.17 292.17 226.75 291.75 215.00 291.50C203.25 291.25 213.75 312.25 213.50 290.00C213.25 267.75 216.92 182.42 213.50 158.00C210.08 133.58 201.08 149.92 193.00 143.50C184.92 137.08 170.08 123.25 165.00 119.50C159.92 115.75 164.75 117.58 162.50 121.00C160.25 124.42 156.17 132.67 151.50 140.00C146.83 147.33 139.17 158.50 134.50 165.00C129.83 171.50 128.42 173.58 123.50 179.00C118.58 184.42 110.58 192.92 105.00 197.50C99.42 202.08 95.83 204.00 90.00 206.50C84.17 209.00 76.00 211.50 70.00 212.50C64.00 213.50 58.00 212.83 54.00 212.50C50.00 212.17 49.17 211.67 46.00 210.50C42.83 209.33 39.00 208.00 35.00 205.50C31.00 203.00 25.75 199.25 22.00 195.50C18.25 191.75 15.08 187.75 12.50 183.00C9.92 178.25 7.67 172.00 6.50 167.00C5.33 162.00 5.50 155.50 5.50 153.00C5.50 150.50 6.17 154.00 6.50 152.00C6.83 150.00 6.17 145.50 7.50 141.00C8.83 136.50 12.50 128.83 14.50 125.00C16.50 121.17 16.92 120.92 19.50 118.00C22.08 115.08 25.58 111.25 30.00 107.50C34.42 103.75 39.83 99.17 46.00 95.50C52.17 91.83 61.00 87.83 67.00 85.50C73.00 83.17 74.33 82.33 82.00 81.50C89.67 80.67 106.67 80.33 113.00 80.50C119.33 80.67 118.00 82.17 120.00 82.50C122.00 82.83 121.50 81.67 125.00 82.50C128.50 83.33 136.67 85.83 141.00 87.50C145.33 89.17 148.33 90.83 151.00 92.50C153.67 94.17 155.25 97.58 157.00 97.50C158.75 97.42 159.75 94.92 161.50 92.00C163.25 89.08 165.67 83.17 167.50 80.00C169.33 76.83 165.67 85.00 172.50 73.00C179.33 61.00 202.08 19.25 208.50 8.00C214.92 -3.25 207.42 5.92 211.00 5.50C214.58 5.08 226.58 5.08 230.00 5.50C233.42 5.92 231.25 -7.75 231.50 8.00C231.75 23.75 223.08 84.58 231.50 100.00C239.92 115.42 269.58 99.42 282.00 100.50C294.42 101.58 300.50 104.67 306.00 106.50C311.50 108.33 311.75 109.08 315.00 111.50C318.25 113.92 322.75 117.58 325.50 121.00C328.25 124.42 330.17 128.83 331.50 132.00C332.83 135.17 333.17 136.33 333.50 140.00C333.83 143.67 333.83 150.33 333.50 154.00C333.17 157.67 332.50 159.33 331.50 162.00C330.50 164.67 329.92 166.75 327.50 170.00C325.08 173.25 321.00 178.17 317.00 181.50C313.00 184.83 305.50 188.33 303.50 190.00C301.50 191.67 303.75 191.08 305.00 191.50C306.25 191.92 307.33 190.83 311.00 192.50C314.67 194.17 322.25 197.75 327.00 201.50C331.75 205.25 336.75 211.42 339.50 215.00C342.25 218.58 342.50 220.33 343.50 223.00C344.50 225.67 345.17 227.00 345.50 231.00C345.83 235.00 345.83 243.00 345.50 247.00C345.17 251.00 344.83 251.83 343.50 255.00C342.17 258.17 340.08 262.58 337.50 266.00C334.92 269.42 330.58 273.25 328.00 275.50C325.42 277.75 326.00 277.50 322.00 279.50C318.00 281.50 310.33 285.50 304.00 287.50C297.67 289.50 298.83 290.83 284.00 291.50ZM213.50 146.00C214.08 126.92 213.75 50.25 213.50 31.00C213.25 11.75 215.83 23.67 212.00 30.50C208.17 37.33 195.08 63.58 190.50 72.00C185.92 80.42 186.83 76.67 184.50 81.00C182.17 85.33 178.17 94.83 176.50 98.00C174.83 101.17 175.50 98.00 174.50 100.00C173.50 102.00 168.75 105.75 170.50 110.00C172.25 114.25 178.42 119.58 185.00 125.50C191.58 131.42 205.25 142.08 210.00 145.50C214.75 148.92 212.92 165.08 213.50 146.00ZM65.50 200.00C70.33 200.00 73.25 199.58 77.00 198.50C80.75 197.42 84.67 195.50 88.00 193.50C91.33 191.50 93.58 189.75 97.00 186.50C100.42 183.25 103.58 180.25 108.50 174.00C113.42 167.75 119.50 159.50 126.50 149.00C133.50 138.50 146.33 117.83 150.50 111.00C154.67 104.17 152.08 109.25 151.50 108.00C150.92 106.75 149.08 105.08 147.00 103.50C144.92 101.92 143.00 100.50 139.00 98.50C135.00 96.50 128.33 93.17 123.00 91.50C117.67 89.83 112.17 89.00 107.00 88.50C101.83 88.00 94.67 88.33 92.00 88.50C89.33 88.67 92.33 89.33 91.00 89.50C89.67 89.67 86.83 89.17 84.00 89.50C81.17 89.83 78.33 90.17 74.00 91.50C69.67 92.83 63.67 94.67 58.00 97.50C52.33 100.33 44.75 105.08 40.00 108.50C35.25 111.92 32.75 114.42 29.50 118.00C26.25 121.58 23.00 125.67 20.50 130.00C18.00 134.33 15.83 139.33 14.50 144.00C13.17 148.67 12.33 153.33 12.50 158.00C12.67 162.67 14.33 168.33 15.50 172.00C16.67 175.67 16.58 176.58 19.50 180.00C22.42 183.42 28.25 189.42 33.00 192.50C37.75 195.58 42.58 197.25 48.00 198.50C53.42 199.75 60.67 200.00 65.50 200.00ZM282.50 185.00C284.67 184.83 286.25 185.25 289.00 184.50C291.75 183.75 295.75 182.58 299.00 180.50C302.25 178.42 306.25 174.42 308.50 172.00C310.75 169.58 311.33 169.00 312.50 166.00C313.67 163.00 315.00 157.83 315.50 154.00C316.00 150.17 316.00 146.67 315.50 143.00C315.00 139.33 313.50 134.83 312.50 132.00C311.50 129.17 311.58 128.75 309.50 126.00C307.42 123.25 303.92 118.42 300.00 115.50C296.08 112.58 289.83 110.00 286.00 108.50C282.17 107.00 286.00 106.83 277.00 106.50C268.00 106.17 239.58 97.75 232.00 106.50C224.42 115.25 228.83 148.00 231.50 159.00C234.17 170.00 242.75 168.75 248.00 172.50C253.25 176.25 258.33 179.33 263.00 181.50C267.67 183.67 272.75 184.92 276.00 185.50C279.25 186.08 280.33 185.17 282.50 185.00ZM274.50 285.00C282.67 284.50 288.92 283.58 294.00 282.50C299.08 281.42 301.83 280.00 305.00 278.50C308.17 277.00 310.42 275.58 313.00 273.50C315.58 271.42 318.58 268.42 320.50 266.00C322.42 263.58 323.33 262.17 324.50 259.00C325.67 255.83 327.00 251.00 327.50 247.00C328.00 243.00 328.00 239.33 327.50 235.00C327.00 230.67 326.00 225.17 324.50 221.00C323.00 216.83 321.25 213.25 318.50 210.00C315.75 206.75 311.42 203.58 308.00 201.50C304.58 199.42 303.17 198.83 298.00 197.50C292.83 196.17 283.33 195.17 277.00 193.50C270.67 191.83 265.17 189.67 260.00 187.50C254.83 185.33 250.67 183.33 246.00 180.50C241.33 177.67 234.42 153.42 232.00 170.50C229.58 187.58 231.33 264.00 231.50 283.00C231.67 302.00 230.92 284.25 233.00 284.50C235.08 284.75 242.00 284.33 244.00 284.50C246.00 284.67 239.92 285.42 245.00 285.50C250.08 285.58 266.33 285.50 274.50 285.00Z" />
    </svg>
  );
}

/* =============================================================
   Brand mark
   ============================================================= */
function BrandMark({ label = 'Andrea Bohorquez' }) {
  return (
    <a href="#top" className="brand" aria-label={label}>
      <span className="brand-mark">
        <LogoAB />
      </span>
      <span className="brand-name">Andrea Bohorquez</span>
    </a>
  );
}

/* =============================================================
   Theme toggle
   ============================================================= */
function ThemeToggle({ theme, setTheme, t }) {
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={t.nav.themeToggleLabel}
      title={t.nav.themeToggleLabel}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === 'dark' ? '☼' : '☾'}
      </span>
      <span className="sr-only">{theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}</span>
    </button>
  );
}

/* =============================================================
   Nav: mobile menu locks body scroll and uses full opaque overlay
   ============================================================= */
function Nav({ lang, setLang, t, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-row">
        <BrandMark />

        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
          <a href="#portfolio" onClick={closeMenu}>{t.nav.portfolio}</a>
          <a href="#ai" onClick={closeMenu}>{t.nav.ai}</a>
          <a href="#services" onClick={closeMenu}>{t.nav.services}</a>
          <a href="#work" onClick={closeMenu}>{t.nav.work}</a>
          <a href="#process" onClick={closeMenu}>{t.nav.process}</a>
          <a href="#faq" onClick={closeMenu}>{t.nav.faq}</a>
          <a href="#cta" onClick={closeMenu} className="nav-mobile-cta">
            {t.nav.cta} <span className="arrow">→</span>
          </a>
        </nav>

        <div className="nav-actions">
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} />
          <div className="lang-toggle" role="tablist" aria-label="Language">
            <button
              role="tab"
              aria-selected={lang === 'es'}
              className={lang === 'es' ? 'is-active' : ''}
              onClick={() => setLang('es')}
            >
              ES
            </button>
            <button
              role="tab"
              aria-selected={lang === 'en'}
              className={lang === 'en' ? 'is-active' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          <a className="btn btn-sm hide-mobile" href="#cta">
            {t.nav.cta}
            <span className="arrow">→</span>
          </a>
          <button
            className="nav-burger"
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

/* =============================================================
   Hero: with elegant scroll invitation
   ============================================================= */
function Hero({ t }) {
  return (
    <section className="hero" id="top">
      <div className="hero-decor" aria-hidden="true" />
      <div className="hero-decor b" aria-hidden="true" />
      <div className="hero-decor petal" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow eyebrow">{t.hero.eyebrow}</div>
            <h1 className="hero-title" key={t.hero.titleWords.join(' ')}>
              {t.hero.titleWords.map((w, i) => (
                <span className="word" key={i}>
                  {w}&nbsp;
                </span>
              ))}
              <br />
              <em>{t.hero.titleEmphasis}</em>
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-cta">
              <a className="btn" href="#cta">
                {t.hero.ctaPrimary}
                <span className="arrow">→</span>
              </a>
              <a className="btn btn-ghost" href="#work">
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <aside className="hero-meta" aria-label="stats">
            {t.hero.stats.map((s, i) => (
              <div key={i}>
                <div className="stat">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </aside>
        </div>
      </div>

      <a href="#problem" className="hero-scroll-cue" aria-label={t.hero.scrollWord}>
        <AlhambraOrnament className="hero-scroll-clover" size={28} />
        <span className="scroll-word">{t.hero.scrollWord}</span>
        <span className="scroll-line">{t.hero.scrollLine}</span>
        <span className="scroll-track" aria-hidden="true">
          <span className="scroll-bead" />
        </span>
      </a>
    </section>
  );
}

/* =============================================================
   Marquee
   ============================================================= */
function Marquee({ t }) {
  const items = t.marquee.items;
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="false">
      <span className="label">{t.marquee.label}</span>
      <div className="track">
        {loop.map((label, i) => (
          <React.Fragment key={i}>
            <span>{label}</span>
            <span className="sep">◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* =============================================================
   Portfolio: proyectos propios (distinto de Cases, que son clientes)
   La tarjeta 01 va destacada: usa los tokens de superficie invertida,
   así que en oscuro es el bloque lavanda pleno y en claro se invierte.
   ============================================================= */
function Portfolio({ t }) {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.portfolio.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: '20px' }}>
              {t.portfolio.title} <em>{t.portfolio.titleEm}</em>
            </h2>
          </div>
          <p className="reveal reveal-delay-1">{t.portfolio.sub}</p>
        </div>

        <div className="proj-grid">
          {t.portfolio.items.map((p, i) => {
            const isLink = !!p.link;
            const Tag = isLink ? 'a' : 'article';
            const linkProps = isLink
              ? { href: p.link, target: '_blank', rel: 'noreferrer' }
              : {};
            return (
              <Tag
                key={i}
                {...linkProps}
                className={`proj reveal reveal-delay-${(i % 3) + 1}${i === 0 ? ' is-featured' : ''}${isLink ? ' is-link' : ''}`}
              >
                {/* La imagen es opcional: si el archivo no existe todavia,
                    onError la retira y la tarjeta queda igual de valida. */}
                {p.img && (
                  <div className="proj-shot">
                    <img
                      src={`${import.meta.env.BASE_URL}img/proyectos/${p.img}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.parentElement.remove();
                      }}
                    />
                  </div>
                )}
                <div className="proj-top">
                  <span className="proj-num">{p.n}</span>
                  <span className="proj-year">{p.year}</span>
                </div>
                <h3 className="proj-title">
                  {p.title} <em>{p.titleEm}</em>
                </h3>
                <div className="proj-role">{p.role}</div>
                <p className="proj-desc">{p.desc}</p>
                <ul className="proj-stack" aria-label={t.portfolio.stackLabel}>
                  {p.stack.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ul>
                {isLink && <span className="proj-link">{p.linkLabel} ↗</span>}
                {!isLink && p.note && <span className="proj-note">{p.note}</span>}
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   AI Automation
   ============================================================= */
function AIAutomation({ t }) {
  return (
    <section className="ai-auto" id="ai">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.aiAutomation.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: '20px' }}>
              {t.aiAutomation.title} <em>{t.aiAutomation.titleEm}</em>
            </h2>
          </div>
          <p className="reveal reveal-delay-1">{t.aiAutomation.sub}</p>
        </div>

        <div className="ai-stat reveal">
          <span className="ai-stat-num">{t.aiAutomation.stat.num}</span>
          <span className="ai-stat-label">{t.aiAutomation.stat.label}</span>
        </div>

        <div className="ai-grid">
          {t.aiAutomation.items.map((it, i) => (
            <div className={`ai-item reveal reveal-delay-${(i % 4) + 1}`} key={i}>
              <span className="ai-num">{it.n}</span>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   Problem
   ============================================================= */
function Problem({ t }) {
  return (
    <section className="problem" id="problem">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.problem.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: '20px' }}>
              {t.problem.title}
            </h2>
          </div>
          <p className="reveal reveal-delay-1">{t.problem.sub}</p>
        </div>
        <div className="pain-grid">
          {t.problem.items.map((it, i) => (
            <div className={`pain-item reveal reveal-delay-${i + 1}`} key={i}>
              <div className="pain-num">{it.n}</div>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
        <div className="problem-cta reveal">
          <a className="btn" href="#cta">
            {t.problem.cta}
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   Offers (4 cards · sin precios)
   ============================================================= */
function Offers({ t }) {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.offers.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: '20px' }}>
              {t.offers.title}
            </h2>
          </div>
          <p className="reveal reveal-delay-1">{t.offers.sub}</p>
        </div>

        <div className="offers-grid offers-grid-4">
          {t.offers.items.map((o, i) => (
            <article
              key={i}
              className={`offer reveal reveal-delay-${(i % 4) + 1} ${i === 1 ? 'featured' : ''}`}
            >
              <div className="offer-content">
                <span className="offer-tag">{o.tag}</span>
                <h3>
                  {o.title} <em>{o.titleEm}</em>
                </h3>
                <p className="desc">{o.desc}</p>
                <ul>
                  {o.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
                <div className="price-line">
                  <span className="deliv">{o.deliv}</span>
                  <a href="#cta" className="offer-cta">
                    {o.cta} <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   Mid CTA: band between Offers and Stack
   ============================================================= */
function MidCTA({ t }) {
  return (
    <section className="mid-cta">
      <div className="container">
        <div className="mid-cta-frame reveal">
          <AlhambraOrnament className="mid-cta-ornament" size={32} />
          <span className="eyebrow">{t.midCta.eyebrow}</span>
          <h3>{t.midCta.line}</h3>
          <p>{t.midCta.sub}</p>
          <a className="btn btn-ghost-rose" href="#cta">
            {t.midCta.btn} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   Stack: slideshow de tarjetas (no marketing, no técnico)
   ============================================================= */
function Stack({ t }) {
  const slides = t.stack.slides;
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const total = slides.length;

  const goPrev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const goNext = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  // Keyboard arrows when section is in focus
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    const el = trackRef.current?.closest('.stack-slideshow');
    el?.addEventListener('keydown', onKey);
    return () => el?.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  return (
    <section className="stack" id="stack">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.stack.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: '20px' }}>
              {t.stack.title} <em>{t.stack.titleEm}</em>
            </h2>
          </div>
          <p className="reveal reveal-delay-1">{t.stack.sub}</p>
        </div>

        <div className="stack-slideshow reveal" tabIndex={-1}>
          <div className="stack-stage" ref={trackRef}>
            <div
              className="stack-track"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {slides.map((s, i) => (
                <article
                  key={i}
                  className={`stack-slide ${i === idx ? 'is-active' : ''}`}
                  aria-hidden={i !== idx}
                >
                  <div className="stack-slide-num">{s.n}</div>
                  <AlhambraOrnament className="stack-slide-ornament" size={36} />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="stack-controls">
            <button
              type="button"
              className="stack-arrow"
              onClick={goPrev}
              aria-label={t.stack.controlPrev}
            >
              ←
            </button>

            <div className="stack-dots" role="tablist">
              {slides.map((s, i) => (
                <button
                  key={i}
                  role="tab"
                  type="button"
                  aria-selected={idx === i}
                  aria-label={`${i + 1}. ${s.title}`}
                  className={`stack-dot ${idx === i ? 'is-active' : ''}`}
                  onClick={() => setIdx(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="stack-arrow"
              onClick={goNext}
              aria-label={t.stack.controlNext}
            >
              →
            </button>
          </div>

          <div className="stack-counter">
            <span>{String(idx + 1).padStart(2, '0')}</span>
            <span className="stack-counter-sep">/</span>
            <span>{String(total).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="stack-languages reveal reveal-delay-3">
          {t.stack.languages}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   Olímpica Slideshow
   ============================================================= */
function OlimpicaSlideshow({ t }) {
  const slides = t.olimpicaSlideshow.slides;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, [paused, slides.length]);

  return (
    <div
      className="olimpica-slideshow reveal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="slideshow-head">
        <div>
          <span className="eyebrow">{t.olimpicaSlideshow.title}</span>
          <p className="slideshow-sub">{t.olimpicaSlideshow.sub}</p>
        </div>
        <div className="slideshow-controls" role="tablist">
          {slides.map((s, i) => (
            <button
              key={i}
              role="tab"
              type="button"
              aria-selected={idx === i}
              aria-label={s.name}
              className={`slideshow-dot ${idx === i ? 'is-active' : ''}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </div>

      <div className="slideshow-stage">
        {slides.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className={`slideshow-slide ${idx === i ? 'is-active' : ''}`}
            aria-hidden={idx !== i}
            tabIndex={idx === i ? 0 : -1}
          >
            <img
              src={`${import.meta.env.BASE_URL}img/cases/${s.file}`}
              alt={s.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.classList.add('no-image');
              }}
            />
            <div className="slideshow-caption">
              <span className="slide-name">{s.name}</span>
              <span className="slide-note">{s.note}</span>
              <span className="slide-link">olimpica.com ↗</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* =============================================================
   Cases
   ============================================================= */
function Cases({ t }) {
  const items = t.cases.items;
  return (
    <section id="work">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.cases.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: '20px' }}>
              {t.cases.title}
            </h2>
          </div>
          <p className="reveal reveal-delay-1">{t.cases.sub}</p>
        </div>

        <div className="cases-grid">
          {items.map((c, i) => {
            const isLink = !!c.link && !c.archived;
            const Tag = isLink ? 'a' : 'div';
            const props = isLink
              ? { href: c.link, target: '_blank', rel: 'noreferrer' }
              : {};
            return (
              <Tag
                key={i}
                {...props}
                className={`case reveal reveal-delay-${(i % 4) + 1} ${c.archived ? 'is-archived' : ''} ${isLink ? 'is-link' : ''}`}
                aria-label={`${c.title} ${c.titleEm}`}
              >
                <div className="case-num">{c.n}</div>
                <div className="case-title">
                  {c.title} <em>{c.titleEm}</em>
                </div>
                <div className="case-meta">
                  <span className="role">{c.role}</span>
                  {c.desc}
                  {c.linkLabel && isLink && (
                    <span className="case-link-label">{c.linkLabel} ↗</span>
                  )}
                  {c.archived && (
                    <span className="case-tag">{t.cases.archivedNote}</span>
                  )}
                </div>
                <div className="case-arrow">{isLink ? '↗' : '·'}</div>
              </Tag>
            );
          })}
        </div>

        <OlimpicaSlideshow t={t} />

        <div className="cases-cta reveal">
          <a className="btn btn-ghost-rose" href="#cta">
            {t.cta.btn} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   Process
   ============================================================= */
function Process({ t }) {
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.process.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: '20px' }}>
              {t.process.title}
            </h2>
          </div>
          <p className="reveal reveal-delay-1">{t.process.sub}</p>
        </div>
        <div className="process-grid">
          {t.process.steps.map((s, i) => (
            <div key={i} className={`step reveal reveal-delay-${i + 1}`}>
              <span className="step-num">{s.n}</span>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
        <div className="process-cta reveal">
          <a className="btn" href="#cta">
            {t.process.cta} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   Guarantee
   ============================================================= */
function Guarantee({ t }) {
  return (
    <section className="guarantee">
      <div className="container">
        <div className="frame reveal">
          <span className="seal">◆ {t.guarantee.seal} ◆</span>
          <h2>
            {t.guarantee.title} <em>{t.guarantee.titleEm}</em>
          </h2>
          <p>{t.guarantee.sub}</p>
          <a className="btn" href="#cta" style={{ marginTop: '36px' }}>
            {t.guarantee.cta} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   FAQ Item: usa medición real del contenido para que la
   transición funcione en cualquier browser (no depende del
   truco grid 0fr→1fr).
   ============================================================= */
function FAQItem({ q, a, isOpen, onToggle, idx }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  // Measure when content or window size changes
  useLayoutEffect(() => {
    const measure = () => {
      if (ref.current) setHeight(ref.current.scrollHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [a]);

  return (
    <div className={`faq-item reveal reveal-delay-${(idx % 4) + 1} ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={isOpen}
        aria-controls={`faq-a-${idx}`}
        onClick={onToggle}
      >
        <h3>{q}</h3>
        <span className="toggle" aria-hidden="true">+</span>
      </button>
      <div
        id={`faq-a-${idx}`}
        className="faq-answer-wrap"
        style={{ height: isOpen ? `${height}px` : '0px' }}
        aria-hidden={!isOpen}
      >
        <p ref={ref} className="answer">{a}</p>
      </div>
    </div>
  );
}

function FAQ({ t }) {
  const [open, setOpen] = useState(-1);
  return (
    <section id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.faq.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: '20px' }}>
              {t.faq.title}
            </h2>
          </div>
        </div>
        <div className="faq-grid">
          {t.faq.items.map((it, i) => (
            <FAQItem
              key={i}
              idx={i}
              q={it.q}
              a={it.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   CTA Final
   ============================================================= */
function CTAFinal({ t }) {
  return (
    <section className="cta-final" id="cta">
      <div className="container">
        <h2 className="reveal">
          {t.cta.title} <em>{t.cta.titleEm}</em>
        </h2>
        <p className="reveal reveal-delay-1">{t.cta.sub}</p>
        <a
          className="btn reveal reveal-delay-2"
          href={`mailto:${t.footer.email}?subject=${encodeURIComponent('Quiero construir algo contigo')}`}
        >
          {t.cta.btn}
          <span className="arrow">→</span>
        </a>
        <div className="cta-secondary reveal reveal-delay-3">{t.cta.sec}</div>
      </div>
    </section>
  );
}

/* =============================================================
   Footer
   ============================================================= */
function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <BrandMark />
            <p style={{ marginTop: '14px', maxWidth: '46ch' }}>{t.footer.bio}</p>
          </div>
          <div>
            <h5>{t.footer.contactTitle}</h5>
            <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
            <p>{t.footer.city}</p>
          </div>
          <div>
            <h5>{t.footer.socialTitle}</h5>
            <a href={t.footer.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={t.footer.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <div>
            <h5>{t.footer.menuTitle}</h5>
            <a href="#services">{t.nav.services}</a>
            <a href="#stack">{t.nav.stack}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#faq">{t.nav.faq}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footer.copy}</span>
          <span>{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}

/* =============================================================
   App
   ============================================================= */
export default function App() {
  const [lang, setLang] = useState(() => {
    if (typeof navigator !== 'undefined') {
      return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
    }
    return 'es';
  });
  const [theme, setTheme] = useTheme();
  const t = content[lang];

  useReveal([lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.setAttribute('data-in', '');
      });
    });
  }, [lang]);

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} theme={theme} setTheme={setTheme} />
      <main>
        <Hero t={t} />
        <Marquee t={t} />
        {/* Portfolio y AI Automation van arriba: son el "background de
            experiencia". La landing de venta arranca en Problem. */}
        <Portfolio t={t} />
        <AIAutomation t={t} />
        <Problem t={t} />
        <Offers t={t} />
        <MidCTA t={t} />
        <Stack t={t} />
        <Cases t={t} />
        <Process t={t} />
        <Guarantee t={t} />
        <FAQ t={t} />
        <CTAFinal t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
