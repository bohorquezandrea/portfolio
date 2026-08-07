# Manual de Marca · Andrea Bohorquez

## Paleta

Alto croma sobre verde botella. El lavanda es el acento principal y el
durazno el cálido. Todos los contrastes están medidos contra el fondo.

### Modo oscuro (por defecto)

| Token | Hex | Contraste | Uso |
|---|---|---|---|
| `--bg-cream` | `#10231C` | — | Fondo |
| `--bg-paper` | `#163026` | — | Tarjetas |
| `--ink` | `#F5EEE0` | 14.5:1 | Texto principal |
| `--ink-soft` | `#C3D6CC` | 10.8:1 | Texto secundario |
| `--ink-muted` | `#8FA89C` | 6.5:1 | Eyebrows, captions |
| `--rose` | `#C9B8F5` | 9.1:1 | Lavanda, acento principal |
| `--gold` | `#EDBEB0` | 9.9:1 | Durazno, acento cálido |

### Modo claro (derivado)

El lavanda y el durazno sobre fondo claro no llegan ni a 2:1, así que se
profundizan a `#5B3FA8` (6.8:1) y `#9C5340` (5.0:1). Los tonos claros
quedan como relleno y hairlines, donde el contraste no aplica.

### Tokens que no giran con el tema

Las secciones que son oscuras siempre (`--noir`) usan `--on-noir-*`. Si
usaran `--ink-soft`, en modo claro quedaría texto oscuro sobre fondo
oscuro.

## Tipografía

**Inter para todo.** Sin serif y sin cursivas: una serif de trazo fino
sobre fondo oscuro se deshace, y era lo que hacía ilegible la versión
anterior.

| Rol | Peso | Token |
|---|---|---|
| Titulares grandes | 700 | `--w-display` |
| Titulares medianos | 600 | `--w-heading` |
| Cuerpo | 400 | — |

El énfasis (`<em>`) se marca **con color**, nunca con otra familia ni con
cursiva.

## Reglas de accesibilidad

Todo texto pasa **AA como mínimo** (4.5:1 normal, 3:1 grande). Cada vez
que se toca un color hay que reauditar los dos temas.

Trampa recurrente: los `<button>` no heredan `color` del padre. Si no se
les asigna explícitamente, usan el del navegador y pueden quedar oscuros
sobre fondo oscuro.

## Voz

Directa, sin promesas vacías. Se habla de **lo que se construye**, no de
ventas garantizadas. Sin guiones largos y sin lenguaje que asuma el
género de quien lee.
