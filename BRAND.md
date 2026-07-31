# Manual de Marca · Andrea Bohorquez

Sistema visual inspirado en la pieza **Sweet Alhambra Pendant** de Van Cleef &amp; Arpels — opal rosa engarzado en oro champagne sobre cordón crema. La paleta combina rosas polvo (signature) con cremas papel y un acento champagne para puntos de luz.

---

## 1. Inspiración

| Elemento referencia | Origen Van Cleef · Sweet Alhambra |
|---|---|
| Opal rosa central | `#F2C9CC` ↔ `#E5A6B0` |
| Oro champagne (engarce) | `#B69365` ↔ `#D9C7A6` |
| Cordón crema (papel) | `#F4F1EA` ↔ `#FAF8F3` |
| Negro tinta (firma) | `#1A1A1A` ↔ `#0E0E0E` |

La regla: **rosa predomina como acento de marca**; el crema sigue siendo el lienzo; el dorado actúa como hairline / detalle de joyería; el negro sostiene la jerarquía tipográfica.

---

## 2. Tipografía

| Rol | Fuente | Pesos | Uso |
|---|---|---|---|
| Display & headings | **Cormorant Garamond** | 300 · 400 · 500 · 600 · 700 (regular & itálica) | H1, H2, H3, números grandes, casos |
| Acento decorativo | **Italiana** | 400 | Palabras enfatizadas en cursiva, sellos, eyebrows de joyería |
| Body & UI | **Inter** | 300 · 400 · 500 · 600 · 700 | Párrafos, navegación, botones, micro‑copy |

Pareja base: titular en *Cormorant Garamond* con palabra acento en *Italiana itálica color rosa*; cuerpo en *Inter 16px / line‑height 1.55*.

---

## 3. Paleta · Modo claro (default)

| Token CSS | Hex | Rol |
|---|---|---|
| `--bg-cream` | `#F4F1EA` | Fondo principal (papel mate) |
| `--bg-paper` | `#FAF8F3` | Tarjetas, hover, superficies elevadas |
| `--bg-blush` | `#FCEBEE` | Bloques destacados (firma rosa) |
| `--bg-blush-soft` | `#F8E0E5` | Banda secundaria, divisores suaves |
| `--ink` | `#1A1A1A` | Texto principal |
| `--ink-soft` | `#5C5C5C` | Texto secundario |
| `--ink-muted` | `#8A8579` | Eyebrows, captions, micro‑copy |
| `--line` | `#E5E0D4` | Hairlines, bordes, separadores |
| `--noir` | `#0E0E0E` | Secciones negras de contraste |
| `--rose` | `#E5A6B0` | **Acento principal** — botones de marca, números, sellos |
| `--rose-soft` | `#F2C9CC` | Acento light, glows, gradientes radiales |
| `--rose-deep` | `#C97A86` | Hover de botones rosa, énfasis fuerte |
| `--gold` | `#B69365` | Hairline de joyería, separadores premium |
| `--gold-soft` | `#D9C7A6` | Acento sobre fondos oscuros |

## 4. Paleta · Modo oscuro (auto + toggle)

| Token CSS | Hex | Rol |
|---|---|---|
| `--bg-cream` | `#141113` | Fondo principal noche |
| `--bg-paper` | `#1C181A` | Tarjetas |
| `--bg-blush` | `#2A1D21` | Bloque rosa profundo |
| `--bg-blush-soft` | `#241A1D` | Banda secundaria |
| `--ink` | `#F4F1EA` | Texto principal (crema invertido) |
| `--ink-soft` | `#C9C2B9` | Texto secundario |
| `--ink-muted` | `#8A8579` | Eyebrows |
| `--line` | `#2E2826` | Hairlines |
| `--noir` | `#0A0809` | Secciones de contraste extremo |
| `--rose` | `#F0B4BE` | Acento rosa (más luminoso para legibilidad) |
| `--rose-soft` | `#F8C8D0` | Glows |
| `--rose-deep` | `#D89098` | Hover |
| `--gold` | `#D9C7A6` | Acento dorado |
| `--gold-soft` | `#EBD9B7` | Hairlines premium |

El modo oscuro se activa por:
1. `prefers-color-scheme: dark` automáticamente.
2. Toggle ☾/☼ en el nav que escribe `data-theme="light|dark"` en `<html>` y persiste en `localStorage`.

---

## 5. Espaciado y layout

- Unidad base: `4px`
- Radios: `4px` (líneas finas), `14px` (tarjetas), `999px` (botones)
- Contenedor: `max-width 1280px`
- Padding mobile: `28px` · Desktop: `56px`
- Separación entre secciones: `110px` desktop · `80px` mobile
- Grid base: 12 columnas con `gap: 32px`

---

## 6. Motion

- **Easing principal**: `cubic-bezier(0.22, 1, 0.36, 1)` — entradas suaves de joyería
- **Reveal on scroll**: `opacity 0 → 1` y `translateY(28px → 0)` en 1s
- **Hero**: cada palabra del titular entra en cascada (50ms entre palabras)
- **Marquee de marcas**: loop infinito a 28s
- **Hover en cards**: `translateY(-6px)` + glow rosa suave
- **FAQ**: expansión por `grid-template-rows 0fr → 1fr` (no destruye el DOM)
- **Slideshow Olímpica**: cross‑fade 600ms, autoplay 4.5s, pausa al hover

---

## 7. Iconografía y detalles

- Separadores tipográficos: `◆` (rombo) · `·` (medio punto) · `↗` (link externo) · `→` (CTA)
- Sin imágenes de stock. Las imágenes son: capturas reales de proyectos, screenshots de Olímpica, logo monograma AB.
- Logo: monograma cursivo **AB** sobre transparente, color tinta — ver `src/assets/logo-ab.png`

---

## 8. Voz y tono (copy)

Estilo **directo y sin promesas vacías**, calibrado al lujo silencioso:

- Hablo de **lo que construyo**, no de "ventas garantizadas" — el copy y la conversión son responsabilidad del cliente / su marketer.
- Promesa específica → mecanismo → garantía.
- Cada paquete se nombra por **lo que el cliente recibe**, no por la stack.
- Sin jerga técnica innecesaria. Si menciono React es porque importa para la decisión.
- Garantía: *"Trabajo contigo hasta que el resultado te enamore."*

---

## 9. Personalidad

- **Calidad de joyería, foco en código.** Cada espacio es intencional, cada animación silenciosa.
- **Sin imágenes de stock.** El diseño descansa en tipografía, ritmo, y screenshots reales.
- **Silenciosamente confiada.** No grita ofertas — las pone en una vitrina con luz tenue rosa.
