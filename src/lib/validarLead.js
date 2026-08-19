/* =============================================================
   Validación del formulario de contacto

   Funciones puras y sin nada de React a propósito: así las mismas reglas
   se usan en el navegador (avisos en tiempo real) y se pueden comprobar
   con tests sin montar un componente. La Edge Function repite estas
   comprobaciones en el servidor, porque la validación del cliente es
   comodidad para el usuario, no seguridad.
   ============================================================= */

export const PROYECTOS = [
  'automatizacion-ventas',
  'inscripciones-formularios',
  'landing-web',
  'automatizacion-claude-code',
  'chatbot-quiz',
  'otro'
];

export const METODOS_CONTACTO = ['correo', 'whatsapp', 'otro'];

/* No se usa una expresión regular exhaustiva a propósito. Las que
   pretenden cubrir el RFC 5322 entero son ilegibles y rechazan correos
   válidos. Esta descarta lo que de verdad está mal escrito y del resto se
   encarga el correo de confirmación, que es la única prueba real de que la
   dirección existe.

   Reglas: una sola arroba, algo antes y después, dominio con punto y una
   extensión de dos letras o más, sin espacios y sin puntos pegados ni al
   principio ni al final de ninguna de las dos partes. */
const CORREO = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export function limpiar(texto) {
  return typeof texto === 'string' ? texto.trim() : '';
}

/* Errores de escritura que son casi siempre un dedazo y no una dirección
   real. Se avisa en vez de dejar que el lead se pierda por una errata. */
const DOMINIOS_CON_ERRATA = {
  'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com', 'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmail.om': 'gmail.com',
  'hotmail.co': 'hotmail.com', 'hotmial.com': 'hotmail.com', 'hotmail.con': 'hotmail.com',
  'outlook.co': 'outlook.com', 'outloo.com': 'outlook.com',
  'yahoo.co': 'yahoo.com', 'yaho.com': 'yahoo.com',
  'iclod.com': 'icloud.com', 'icloud.co': 'icloud.com'
};

export function sugerenciaDeCorreo(valor) {
  const v = limpiar(valor).toLowerCase();
  const dominio = v.split('@')[1];
  if (!dominio) return null;
  const bueno = DOMINIOS_CON_ERRATA[dominio];
  return bueno ? v.replace(new RegExp(`${dominio}$`), bueno) : null;
}

/* El teléfono se guarda con el prefijo del país aparte, así que aquí solo
   va el número nacional. Se permiten espacios, guiones y paréntesis porque
   cada país lo escribe a su manera, pero se cuentan los DÍGITOS: entre 6 y
   15, que es el rango del estándar E.164 descontando el prefijo. */
const TELEFONO_FORMATO = /^[\d\s().-]+$/;

export function validarCampo(campo, valor, datos = {}) {
  const v = limpiar(valor);

  switch (campo) {
    case 'nombre':
      if (!v) return 'nombreVacio';
      if (v.length < 2) return 'nombreCorto';
      if (v.length > 80) return 'nombreLargo';
      return null;

    case 'correo':
      if (!v) return 'correoVacio';
      if (v.length > 120) return 'correoLargo';
      if (!CORREO.test(v)) return 'correoInvalido';
      if (v.includes('..')) return 'correoInvalido';
      if (sugerenciaDeCorreo(v)) return 'correoErrata';
      return null;

    case 'proyecto':
      if (!v) return 'proyectoVacio';
      if (!PROYECTOS.includes(v)) return 'proyectoInvalido';
      return null;

    case 'proyectoOtro':
      // Solo obligatorio si eligió "Otro" en el desplegable
      if (datos.proyecto !== 'otro') return null;
      if (!v) return 'proyectoOtroVacio';
      if (v.length > 120) return 'proyectoOtroLargo';
      return null;

    case 'metodo':
      if (!v) return 'metodoVacio';
      if (!METODOS_CONTACTO.includes(v)) return 'metodoInvalido';
      return null;

    case 'metodoOtro':
      if (datos.metodo !== 'otro') return null;
      if (!v) return 'metodoOtroVacio';
      if (v.length > 80) return 'metodoOtroLargo';
      return null;

    case 'pais':
      if (!v) return 'paisVacio';
      return null;

    case 'ciudad':
      if (!v) return 'ciudadVacia';
      if (v.length > 80) return 'ciudadLarga';
      return null;

    case 'telefono': {
      // Opcional: vacío es válido
      if (!v) return null;
      if (!TELEFONO_FORMATO.test(v)) return 'telefonoInvalido';
      const digitos = v.replace(/\D/g, '').length;
      if (digitos < 6) return 'telefonoCorto';
      if (digitos > 15) return 'telefonoLargo';
      return null;
    }

    /* La nota es obligatoria a propósito.

       Una consulta sin contexto obliga a una llamada de descubrimiento
       entera solo para averiguar de qué va, y esa llamada se paga con
       tiempo. Pedir dos frases aquí filtra al que no tiene nada concreto
       y ahorra esa llamada.

       El mínimo no es "no vacío": con eso basta un punto. Se piden 20
       caracteres, que es una frase corta de verdad ("necesito una web
       para mi clínica"), y que además haya letras, porque "........."
       pasa cualquier cuenta de caracteres. */
    case 'nota':
      if (!v) return 'notaVacia';
      if (v.length < 20) return 'notaCorta';
      if (!/\p{L}/u.test(v)) return 'notaSinLetras';
      if (v.length > 1500) return 'notaLarga';
      return null;

    default:
      return null;
  }
}

export const CAMPOS_VALIDABLES = [
  'nombre', 'correo', 'proyecto', 'proyectoOtro',
  'metodo', 'metodoOtro', 'pais', 'ciudad', 'telefono', 'nota'
];

export function validarTodo(datos) {
  const errores = {};
  for (const campo of CAMPOS_VALIDABLES) {
    const error = validarCampo(campo, datos[campo], datos);
    if (error) errores[campo] = error;
  }
  return errores;
}

export function esValido(datos) {
  return Object.keys(validarTodo(datos)).length === 0;
}
