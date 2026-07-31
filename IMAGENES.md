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
| `planeat-coach.png` | PlanEat Coach (tarjeta grande) | **2000 × 1250** | 300 KB | WebP o PNG |
| `claude-skills.png` | Automatizaciones Claude Code | **1200 × 750** | 150 KB | WebP o PNG |
| `pimp-my-shoes.png` | Pimp My Shoes | **1200 × 750** | 150 KB | WebP o JPG |
| `artist-finder.png` | Artist Finder API | **1200 × 750** | 150 KB | WebP o PNG |
| `pokemon-fetch.png` | Pokémon Fetch | **1200 × 750** | 150 KB | WebP o PNG |
| `simon-game.png` | Simon Game | **1200 × 750** | 150 KB | WebP o PNG |

**Por qué PlanEat es más grande:** su tarjeta ocupa el ancho completo de la
rejilla (hasta 1168 px en escritorio). Las otras cinco van en columnas de
~376 px, así que 1200 px de ancho ya es más del doble y se ve nítido en
pantallas retina.

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
| `olimpica-juan-valdez-gourmet.png` | Café Juan Valdez Gourmet Set x4 | **1600 × 1000** | 200 KB | WebP o PNG |
| `olimpica-juan-valdez-mujeres.png` | Cápsulas Juan Valdez Mujeres | **1600 × 1000** | 200 KB | WebP o PNG |
| `olimpica-asus-tuf.png` | ASUS TUF Gaming A15 | **1600 × 1000** | 200 KB | WebP o PNG |
| `olimpica-lavadora-mabe.png` | Lavadora Mabe 24kg | **1600 × 1000** | 200 KB | WebP o PNG |

**Cómo capturarlas bien:**

1. Abre el producto en `olimpica.com` con la ventana del navegador a
   **1440 px de ancho** (si tu pantalla es más grande, achica la ventana:
   así el sitio se ve en su layout de escritorio, no estirado).
2. Baja hasta la sección de descripción, que es la parte que maquetaste tú.
3. Captura con `cmd + shift + 4` y arrastra sobre la zona de la descripción.
4. Recorta a 1600 × 1000. Lo que quede arriba es lo que se verá.

## 3. Imagen para redes sociales · `public/og.png`

Es la que aparece cuando compartas el link por WhatsApp, LinkedIn o Slack.
Sin ella, el link sale como texto plano.

| Archivo | Dimensiones | Peso máx | Formato |
|---|---|---|---|
| `og.png` | **1200 × 630** (exacto) | 300 KB | PNG o JPG |

Estas medidas no son negociables: es el estándar de Open Graph y si no
coincide, las plataformas la recortan mal. Si quieres te la genero yo con
tu nombre, el cargo y el logo sobre el verde de marca; dime y la hago.

## 4. Foto profesional (para el CV web y el README de GitHub)

| Archivo | Dimensiones | Peso máx | Formato |
|---|---|---|---|
| `retrato.jpg` | **800 × 800** (cuadrada) | 120 KB | JPG o WebP |

Puedes reusar la misma del CV. Recórtala cuadrada, centrada en la cara,
con algo de aire arriba.

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

- **Favicon**: generado desde tu logo, ya está en `public/favicon.svg`.
- **Logo**: optimizado y vectorizado. Pasó de 165 KB a 5,8 KB.
