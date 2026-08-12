import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { content } from './i18n.js';
import logoClaro from './assets/logo-ab-claro.png';
import logoOscuro from './assets/logo-ab-oscuro.png';
import Contacto from './Contacto.jsx';

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
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage?.getItem('ab-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'light';
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
   Brand mark
   ============================================================= */
function BrandMark({ label = 'Andrea Bohorquez' }) {
  return (
    <a href="#top" className="brand" aria-label={label}>
      <span className="brand-mark">
        <img className="logo-claro" src={logoClaro} alt="" aria-hidden="true" width="160" height="135" />
        <img className="logo-oscuro" src={logoOscuro} alt="" aria-hidden="true" width="160" height="135" />
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
            {/* La profesion va aqui y no en el h1: el titular tiene que
                decirle al cliente que se vende, no que soy. */}
            {t.hero.roleLine && <p className="hero-role">{t.hero.roleLine}</p>}
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
      {/* El track va dentro de su propia ventana con overflow hidden.
          Antes compartia caja con la etiqueta y le pasaba por encima: el
          z-index no bastaba porque la animacion de transform crea una capa
          de composicion propia, que puede pintarse por delante. Con la
          ventana, el track no puede salirse de su area. */}
      <div className="marquee-viewport">
        <div className="track">
          {loop.map((label, i) => (
            <React.Fragment key={i}>
              <span>{label}</span>
              <span className="sep">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   Portfolio: proyectos propios (distinto de Cases, que son clientes)
   La tarjeta 01 va destacada: usa los tokens de superficie invertida,
   así que en oscuro es el bloque lavanda pleno y en claro se invierte.
   ============================================================= */
/* Las capturas de PlanEat son pantallas verticales de movil. Se muestran de
   una en una, completas y a buen tamano: apilarlas en una cinta las dejaba
   cortadas por los bordes y se leia como un mosaico, no como una app.
   Solo se usa en tarjetas sin enlace, asi que los botones no quedan
   anidados dentro de un <a>. */
function Pantallas({ shots, etiqueta, textoAvanzar }) {
  const [activa, setActiva] = useState(0);
  const [quieta, setQuieta] = useState(false);
  const total = shots.length;
  const toque = useRef(null);

  const mover = useCallback(
    (paso) => setActiva((v) => (v + paso + total) % total),
    [total]
  );

  // Deslizar en la pantalla. Se mide en touchend contra el punto de partida:
  // si el gesto es mas horizontal que vertical y pasa de 40px, cambia de
  // captura; si no, se deja pasar como scroll normal de la pagina.
  const alEmpezarToque = (e) => {
    const t = e.changedTouches[0];
    toque.current = { x: t.clientX, y: t.clientY, deslizo: false };
  };
  const alTerminarToque = (e) => {
    const p = toque.current;
    if (!p) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - p.x;
    const dy = t.clientY - p.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      p.deslizo = true;
      mover(dx < 0 ? 1 : -1);
    }
  };
  // El click llega despues del touchend en pantallas tactiles: si acaba de
  // haber un deslizamiento hay que ignorarlo o avanzaria dos veces.
  const alTocar = () => {
    if (toque.current && toque.current.deslizo) {
      toque.current.deslizo = false;
      return;
    }
    mover(1);
  };

  useEffect(() => {
    if (quieta) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // `activa` va en las dependencias a proposito: al hundir un punto el
    // temporizador se reinicia desde cero, si no la imagen elegida se iba
    // sola al segundo siguiente.
    const id = setTimeout(() => setActiva((v) => (v + 1) % total), 4600);
    return () => clearTimeout(id);
  }, [quieta, total, activa]);

  const actual = shots[activa];

  return (
    <div
      className="pe"
      onMouseEnter={() => setQuieta(true)}
      onMouseLeave={() => setQuieta(false)}
      onFocus={() => setQuieta(true)}
      onBlur={() => setQuieta(false)}
    >
      {/* Es un <button> y no un <div> con onClick para que tambien funcione
          con teclado y lo anuncien los lectores de pantalla. */}
      <button
        type="button"
        className="pe-visor"
        onClick={alTocar}
        onTouchStart={alEmpezarToque}
        onTouchEnd={alTerminarToque}
        aria-label={textoAvanzar}
      >
        {/* Todas montadas y superpuestas: el cambio es un fundido y la altura
            no salta. Solo la visible cuenta para lectores de pantalla. */}
        {shots.map((sh, k) => (
          <img
            key={sh.src}
            className="pe-img"
            data-activa={k === activa ? '' : undefined}
            src={`${import.meta.env.BASE_URL}img/proyectos/${sh.src}`}
            alt={k === activa ? sh.nombre : ''}
            aria-hidden={k !== activa}
            loading={k === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </button>

      <div className="pe-info">
        <span className="pe-etiqueta">
          {etiqueta}
          <span className="pe-contador">
            {String(activa + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </span>
        <p className="pe-nombre" aria-live="polite">{actual.nombre}</p>
        <p className="pe-desc">{actual.desc}</p>
        <div className="pe-puntos">
          {shots.map((sh, k) => (
            <button
              key={sh.src}
              type="button"
              className="pe-punto"
              data-activa={k === activa ? '' : undefined}
              aria-label={sh.nombre}
              aria-current={k === activa ? 'true' : undefined}
              onClick={() => setActiva(k)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
            // Un enlace relativo (la landing de Pimp, servida desde public/)
            // necesita el prefijo de base y abre en la misma pestana. Uno
            // externo abre en pestana nueva.
            const externo = isLink && /^https?:/.test(p.link);
            const href = externo ? p.link : `${import.meta.env.BASE_URL}${p.link}`;
            const Tag = isLink ? 'a' : 'article';
            const linkProps = isLink
              ? externo
                ? { href, target: '_blank', rel: 'noreferrer' }
                : { href }
              : {};
            return (
              <Tag
                key={i}
                {...linkProps}
                className={`proj reveal reveal-delay-${(i % 3) + 1}${i === 0 ? ' is-featured' : ''}${isLink ? ' is-link' : ''}`}
              >
                {/* Captura unica apaisada. Las pantallas verticales (`shots`)
                    van despues del texto, al final de la tarjeta. */}
                {!p.shots && p.img && (
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
                {/* El apartado tecnico va aparte de la descripcion: quien
                    contrata lee lo de arriba, quien revisa el codigo lee
                    esto. Mezclarlos hace que ninguno de los dos lea. */}
                {p.tech && (
                  <div className="proj-tech">
                    <span className="proj-tech-titulo">{t.portfolio.techLabel}</span>
                    <p>{p.tech}</p>
                  </div>
                )}
                <ul className="proj-stack" aria-label={t.portfolio.stackLabel}>
                  {p.stack.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ul>
                {isLink && <span className="proj-link">{p.linkLabel} ↗</span>}
                {!isLink && p.note && <span className="proj-note">{p.note}</span>}
                {p.shots && (
                  <Pantallas
                    shots={p.shots}
                    etiqueta={p.shotsLabel}
                    textoAvanzar={t.portfolio.shotsNext}
                  />
                )}
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

      {/* El pie sale del marco: superpuesto sobre la imagen en escritorio,
          pero debajo en movil, donde el degradado tapaba media captura y no
          se distinguia nada de la pagina. */}
      <div className="slideshow-marco">
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
              aria-label={s.name}
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
            </a>
          ))}
        </div>

        <a
          className="slideshow-caption"
          href={slides[idx].url}
          target="_blank"
          rel="noreferrer"
        >
          <span className="slide-name">{slides[idx].name}</span>
          <span className="slide-note">{slides[idx].note}</span>
          <span className="slide-link">olimpica.com ↗</span>
        </a>
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
      return 'es';
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
        <Contacto t={t} idioma={lang} tema={theme} />
      </main>
      <Footer t={t} />
    </>
  );
}
