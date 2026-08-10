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
   válidos. Esta descarta lo que de verdad está mal escrito (sin arroba,
   sin dominio, con espacios) y del resto se encarga el correo de
   confirmación, que es la única prueba real de que la dirección existe. */
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function limpiar(texto) {
  return typeof texto === 'string' ? texto.trim() : '';
}

/* Deja solo dígitos, espacios, guiones y paréntesis. Se aceptan varios
   formatos porque cada país escribe sus números a su manera. */
const TELEFONO = /^[\d\s().-]{6,20}$/;

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
      if (!CORREO.test(v)) return 'correoInvalido';
      if (v.length > 120) return 'correoLargo';
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

    case 'telefono':
      // Opcional: vacío es válido
      if (!v) return null;
      if (!TELEFONO.test(v)) return 'telefonoInvalido';
      return null;

    case 'nota':
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
