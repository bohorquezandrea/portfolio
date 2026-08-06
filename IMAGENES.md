# Imágenes que faltan

Todo lo demás del portfolio ya funciona. Estas son las únicas piezas que
necesito de ti. **El sitio no se rompe si falta alguna**: cada imagen tiene
un `onError` que la retira y deja la tarjeta bien compuesta igual. Así que
puedes ir subiéndolas de a poco.

## Cómo funciona

Metes el archivo en la carpeta indicada, **con el nombre exacto de la tabla**,
y aparece sola. No hay que tocar código.

Las carpetas ya están creadas dentro del proyecto (`andrea-portfolio`):

```
public/img/proyectos/    ← tus 6 proyectos propios
public/img/cases/        ← las 4 capturas de Olímpica
public/                  ← la imagen para redes sociales
```

---

## 1. Proyectos propios · `public/img/proyectos/`

Se muestran arriba de cada tarjeta, recortadas a un ratio fijo de 8:5. El
recorte se ancla **arriba y al centro**, así que pon lo importante en la
parte superior de la captura.

| Archivo | Proyecto | Dimensiones | Peso máx | Formato |
|---|---|---|---|---|
| `planeat-coach.png` | PlanEat Coach (tarjeta grande) | **2000 × 1250** | 250 KB | WebP o PNG |
| `claude-skills.png` | Automatizaciones Claude Code | **1400 × 875** | 120 KB | WebP o PNG |
| `pimp-my-shoes.png` | Pimp My Shoes | **1400 × 875** | 120 KB | WebP o JPG |
| `artist-finder.png` | Artist Finder API | **1400 × 875** | 120 KB | WebP o PNG |
| `pokemon-fetch.png` | Pokémon Fetch | **1400 × 875** | 120 KB | WebP o PNG |
| `simon-game.png` | Simon Game | **1400 × 875** | 120 KB | WebP o PNG |

### De dónde salen estos números

Medidos sobre el sitio, no estimados. Ancho real del hueco de imagen:

| Ventana | Tarjeta PlanEat | Tarjetas normales | Slideshow |
|---|---|---|---|
| 390 px | 332 | 332 | 288 |
| 759 px | 701 | **701** (máximo) | 629 |
| 760 px | 702 | 340 | 630 |
| 1099 px | 985 | 482 | 913 |
| 1100 px | 986 | 314 | 914 |
| 1280 px o más | **1166** (máximo) | 374 | **1094** (máximo) |

Lo importante: **las tarjetas normales son más anchas en tablet (701 px)
que en escritorio (374 px)**, porque por debajo de 760 px la rejilla pasa a
una sola columna. Por eso piden 1400 px y no 800: es el doble de 701, que
es lo que necesita una pantalla retina en ese tamaño.

PlanEat lleva 2000 px en vez de los 2332 que serían el doble exacto de
1166: a 1,7x la diferencia no se percibe en una captura de pantalla y te
ahorra un 40 % de peso.

**Qué capturar en cada una:**

- **PlanEat**: la app corriendo en el simulador. Si puedes, un montaje con
  dos pantallas (por ejemplo el plan de entrenamiento y el de macros).
- **Claude Skills**: una captura de la skill funcionando. Puede ser la
  terminal con el resultado, o un antes/después de una ficha de producto.
- **Pimp My Shoes**: una foto real de tu trabajo (par de tenis restaurado)
  o la landing. Aquí sí funciona una foto, no hace falta que sea pantalla.
- **Artist Finder / Pokémon / Simon**: la app corriendo en el navegador.

## 2. Casos Olímpica · `public/img/cases/`

Van en el slideshow que ya existe, con ratio 16:10 y recorte anclado arriba.

| Archivo | Producto | Dimensiones | Peso máx | Formato |
|---|---|---|---|---|
| `olimpica-juan-valdez-gourmet.png` | Café Juan Valdez Gourmet Set x4 | **1800 × 1125** | 150 KB | WebP o PNG |
| `olimpica-juan-valdez-mujeres.png` | Cápsulas Juan Valdez Mujeres | **1800 × 1125** | 150 KB | WebP o PNG |
| `olimpica-asus-tuf.png` | ASUS TUF Gaming A15 | **1800 × 1125** | 150 KB | WebP o PNG |
| `olimpica-lavadora-mabe.png` | Lavadora Mabe 24kg | **1800 × 1125** | 150 KB | WebP o PNG |

**Cómo capturarlas bien:**

1. Abre el producto en `olimpica.com` con la ventana del navegador a
   **1440 px de ancho** (si tu pantalla es más grande, achica la ventana:
   así el sitio se ve en su layout de escritorio, no estirado).
2. Baja hasta la sección de descripción, que es la parte que maquetaste tú.
3. Captura con `cmd + shift + 4` y arrastra sobre la zona de la descripción.
4. Recorta a 1800 × 1125. Lo que quede arriba es lo que se verá.


---

## Cómo comprimir sin que se vean feas

El peso máximo importa: tu objetivo es que el sitio cargue en menos de 2
segundos, y las imágenes son casi siempre lo más pesado de una página.

1. Entra a **[squoosh.app](https://squoosh.app)** (es de Google, gratis, no
   sube nada a ningún servidor: comprime en tu propio navegador).
2. Arrastra la imagen.
3. En el panel derecho elige **WebP**, calidad **80**.
4. Mira el peso resultante abajo. Si sigue pasado, baja la calidad a 75.
5. Descarga y renombra con el nombre exacto de la tabla.

**WebP frente a PNG:** WebP pesa entre un 25 % y un 35 % menos con la misma
calidad visual y lo soportan todos los navegadores actuales. Para capturas
de pantalla con texto pequeño, si notas que el texto sale borroso, usa PNG.

**Si el archivo se llama `.webp`:** cámbiale el nombre en la tabla también,
o simplemente renómbralo a `.png`. El navegador detecta el formato por el
contenido, no por la extensión, así que funciona igual.

---

## Lo que ya no necesitas mandarme

- **Favicon**: generado desde tu logo, ya está en `public/favicon-32.png` y `public/favicon-180.png`.
- **Logo**: optimizado. Pasó de 165 KB a 6,5 KB por versión (clara y oscura).
- **`og.png`**: generada con tu paleta, tu logo y tu titular. 1200 × 630,
  85 KB. Ya está en `public/og.png` con sus meta tags.

## Presupuesto total

Sumando todo: **~1,4 MB**. Parece mucho, pero todas las imágenes cargan de
forma diferida (`loading="lazy"`): solo se descargan cuando el visitante
llega a esa sección. El hero no lleva ninguna imagen, que es lo que hace
que la primera pantalla aparezca casi al instante. Eso importa sobre todo
con tráfico de anuncios, donde la gente abandona si tarda.
