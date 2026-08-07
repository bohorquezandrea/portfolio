# Publicar: los dos pasos que faltan

Actualizado el 7 de agosto de 2026, justo después de subir el portfolio.

## Dónde estamos

Ya está hecho:

- El portfolio nuevo está subido a `bohorquezandrea/portfolio`, rama `main`.
- Tu sitio anterior (mayo de 2024) quedó guardado entero en la rama
  `v1-2024`. No se perdió nada y se puede recuperar cuando quieras.
- El workflow de despliegue corrió y terminó bien.

Falta esto, y son dos cosas que solo puedes hacer tú porque necesitan tu
sesión de GitHub y la de GoDaddy.

> **Ojo:** hasta que hagas el paso 1, la web se ve rota. No es un error de
> código, es la configuración de GitHub. Está explicado abajo.

---

## Paso 1: cambiar el origen de Pages a GitHub Actions

### Por qué

GitHub Pages puede publicar de dos maneras. Ahora mismo tu repo está en la
antigua: coge los archivos de la rama y los sirve tal cual, sin construir
nada. Pero un proyecto de React no se puede servir tal cual, hay que
compilarlo primero.

Se nota en que la web pide el archivo `/src/main.jsx`, que es el código
fuente, en vez de `/assets/index-....js`, que es el compilado. El navegador
no sabe qué hacer con el fuente y la página sale en blanco o a medias.

El workflow que dejé en el repo (`.github/workflows/deploy.yml`) ya hace la
compilación y ya corrió bien. Solo hay que decirle a GitHub que publique
**ese** resultado y no la rama.

### Cómo

1. Entra a **https://github.com/bohorquezandrea/portfolio/settings/pages**
2. En **Build and deployment**, busca el desplegable **Source**
3. Cámbialo de `Deploy from a branch` a **`GitHub Actions`**
4. Se guarda solo, no hay botón de guardar

Con eso ya debería verse bien en unos dos minutos. Compruébalo aquí:

**https://bohorquezandrea.github.io/portfolio/**

Aunque ahí los estilos van a seguir fallando, y es normal: el sitio está
configurado para vivir en la raíz de tu dominio (`andreabohorquez.co/`), no
en una subcarpeta (`github.io/portfolio/`). Eso se arregla solo con el
paso 2. Lo que sí debes ver es que el HTML ya pide `/assets/algo.js` y no
`/src/main.jsx`.

---

## Paso 2: apuntar andreabohorquez.co a GitHub

### En GoDaddy

Entra a tu dominio → **DNS** → **Administrar zonas DNS**.

**Primero borra lo que hay.** Ahora mismo el dominio apunta al
aparcamiento de GoDaddy, en estas dos direcciones:

```
3.33.130.190
15.197.148.33
```

Busca los registros de tipo **A** con nombre `@` que tengan esos valores y
bórralos. Si no los quitas, el dominio sigue yendo a la página de GoDaddy.

**Después crea estos cuatro registros A**, todos con nombre `@`:

| Tipo | Nombre | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Son las cuatro direcciones de GitHub Pages. Se ponen las cuatro para que si
una se cae el sitio siga en pie.

**Y un CNAME** para que `www.andreabohorquez.co` también funcione:

| Tipo | Nombre | Valor |
|---|---|---|
| CNAME | www | bohorquezandrea.github.io |

### En GitHub

1. Vuelve a **https://github.com/bohorquezandrea/portfolio/settings/pages**
2. En **Custom domain**, escribe `andreabohorquez.co` y dale a **Save**

   Puede que ya salga puesto: en el repo hay un archivo `public/CNAME` con
   el dominio y GitHub suele leerlo solo. Si ya está, no toques nada.

3. Espera a que aparezca el check verde de verificación (unos minutos)
4. Cuando aparezca, marca la casilla **Enforce HTTPS**

Esa casilla no se puede marcar antes de que el DNS esté funcionando, porque
GitHub necesita validar el dominio para emitir el certificado. Si la ves
gris, espera y vuelve.

---

## Paso 3: comprobar que quedó

El DNS tarda entre 10 minutos y unas horas en propagarse. Para ver cómo va:

```bash
dig andreabohorquez.co +short
```

Tiene que devolver las cuatro direcciones `185.199.x.153`. Mientras siga
devolviendo las de GoDaddy, todavía no se ha propagado.

Cuando ya salgan las de GitHub, revisa la web entera:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -L https://andreabohorquez.co
```

Debe responder `200`. Y ábrela en el navegador para ver que carga con
estilos, que el carrusel de PlanEat gira y que el cambio de tema funciona.

---

## Más adelante: cuando tengas el .com

1. Cambia `public/CNAME` a `andreabohorquez.com` y sube el cambio
2. Repite los mismos cuatro registros A en el DNS del `.com`
3. Actualiza el **Custom domain** en GitHub a `andreabohorquez.com`
4. En el `.co`, configura un **reenvío de dominio** (Domain Forwarding)
   hacia el `.com` con redirección **permanente (301)**

El 301 le dice a Google que la dirección buena es la nueva, así no pierdes
el posicionamiento que hayas ganado ni te penaliza por contenido duplicado.

---

## Si algo sale mal

**La web sigue rota después del paso 1.** Mira que el despliegue haya
corrido: **https://github.com/bohorquezandrea/portfolio/actions**. Si el
último tiene una equis roja, ábrelo y mándame lo que dice.

**El dominio lleva horas sin cambiar.** Comprueba en GoDaddy que
efectivamente borraste los registros viejos. Es el fallo más común: quedan
los dos de aparcamiento conviviendo con los cuatro nuevos y el dominio va
a veces a un sitio y a veces a otro.

**Quiero volver al sitio de 2024.** Está entero en la rama `v1-2024`:

```bash
git push --force origin v1-2024:main
```

---

## Lo que quedó pendiente y no bloquea nada

- **README del perfil de GitHub** (el repo `bohorquezandrea`). No se ha
  tocado. Es lo que se ve al entrar a tu perfil.
- **Rotar el secreto de Spotify.** El que pegaste en el chat sigue
  comprometido. Los pasos están en `SPOTIFY.md`, en la carpeta de
  `artist_finder_api`.
- **Registrar la Redirect URI de Spotify**:
  `https://bohorquezandrea.github.io/artist_finder_api/`
