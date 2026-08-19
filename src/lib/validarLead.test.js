import { describe, it, expect } from 'vitest';
import { validarCampo, validarTodo, esValido, sugerenciaDeCorreo, PROYECTOS, METODOS_CONTACTO } from './validarLead.js';

/* Un lead completo y correcto, del que parten los casos que cambian
   una sola cosa para comprobar que esa cosa es la que falla. */
const VALIDO = {
  nombre: 'Ana Restrepo',
  correo: 'ana@constructoradelcaribe.co',
  proyecto: 'automatizacion-ventas',
  proyectoOtro: '',
  metodo: 'whatsapp',
  metodoOtro: '',
  pais: 'CO',
  ciudad: 'Barranquilla',
  telefono: '300 555 4433',
  nota: 'Queremos dejar de perseguir cotizaciones por WhatsApp a mano.'
};

describe('validarTodo', () => {
  it('acepta un lead completo', () => {
    expect(validarTodo(VALIDO)).toEqual({});
    expect(esValido(VALIDO)).toBe(true);
  });

  it('exige los siete campos obligatorios y ninguno más', () => {
    const errores = validarTodo({});
    expect(Object.keys(errores).sort()).toEqual(
      ['ciudad', 'correo', 'metodo', 'nombre', 'nota', 'pais', 'proyecto'].sort()
    );
  });
});

describe('correo', () => {
  it.each([
    ['ana@empresa.com', null],
    ['ana.maria+lead@sub.dominio.co', null],
    ['a@b.co', null],
    ['sin-arroba.com', 'correoInvalido'],
    ['ana@sindominio', 'correoInvalido'],
    ['ana con espacio@empresa.com', 'correoInvalido'],
    ['@empresa.com', 'correoInvalido'],
    ['ana@@empresa.com', 'correoInvalido'],
    ['ana@empresa..com', 'correoInvalido'],
    ['ana@empresa.c', 'correoInvalido'],
    ['ana@.com', 'correoInvalido'],
    ['ana@empresa.com.', 'correoInvalido'],
    ['', 'correoVacio']
  ])('%s', (entrada, esperado) => {
    expect(validarCampo('correo', entrada)).toBe(esperado);
  });

  it('avisa de las erratas típicas de dominio en vez de tragárselas', () => {
    expect(validarCampo('correo', 'ana@gmail.co')).toBe('correoErrata');
    expect(validarCampo('correo', 'ana@hotmial.com')).toBe('correoErrata');
    expect(validarCampo('correo', 'ana@gmail.com')).toBeNull();
  });

  it('sugiere el dominio corregido', () => {
    expect(sugerenciaDeCorreo('ana@gmial.com')).toBe('ana@gmail.com');
    expect(sugerenciaDeCorreo('ANA@Gmail.CO')).toBe('ana@gmail.com');
    expect(sugerenciaDeCorreo('ana@empresa.com')).toBeNull();
    expect(sugerenciaDeCorreo('sin arroba')).toBeNull();
  });
});

describe('campos condicionales', () => {
  it('proyectoOtro solo se exige cuando el proyecto es "otro"', () => {
    expect(validarCampo('proyectoOtro', '', { proyecto: 'landing-web' })).toBeNull();
    expect(validarCampo('proyectoOtro', '', { proyecto: 'otro' })).toBe('proyectoOtroVacio');
    expect(validarCampo('proyectoOtro', 'Integrar el ERP', { proyecto: 'otro' })).toBeNull();
  });

  it('metodoOtro solo se exige cuando el método es "otro"', () => {
    expect(validarCampo('metodoOtro', '', { metodo: 'correo' })).toBeNull();
    expect(validarCampo('metodoOtro', '', { metodo: 'otro' })).toBe('metodoOtroVacio');
    expect(validarCampo('metodoOtro', 'Telegram', { metodo: 'otro' })).toBeNull();
  });

  it('un lead con "otro" sin detallar no es válido', () => {
    expect(esValido({ ...VALIDO, proyecto: 'otro', proyectoOtro: '' })).toBe(false);
    expect(esValido({ ...VALIDO, proyecto: 'otro', proyectoOtro: 'Integrar el ERP' })).toBe(true);
  });
});

describe('teléfono, que es opcional', () => {
  it('vacío es válido', () => {
    expect(validarCampo('telefono', '')).toBeNull();
    expect(esValido({ ...VALIDO, telefono: '' })).toBe(true);
  });

  it.each([
    ['300 555 4433', null],
    ['(605) 385-1122', null],
    ['3005554433', null],
    ['+57 300 5554433', 'telefonoInvalido'],   // el prefijo lo pone el formulario, no se escribe
    ['no tengo', 'telefonoInvalido'],
    ['300-555-4433 ext 2', 'telefonoInvalido'],
    ['12345', 'telefonoCorto'],
    ['1234567890123456', 'telefonoLargo']
  ])('%s', (entrada, esperado) => {
    expect(validarCampo('telefono', entrada)).toBe(esperado);
  });

  it('cuenta dígitos, no caracteres: el formato no infla la longitud', () => {
    // seis dígitos con mucha decoración sigue siendo válido
    expect(validarCampo('telefono', '(12) 34-56')).toBeNull();
    // cinco dígitos por muchos espacios que lleve, sigue siendo corto
    expect(validarCampo('telefono', '1 2 3 4 5')).toBe('telefonoCorto');
  });
});

describe('valores fuera del catálogo', () => {
  it('rechaza un proyecto que no existe', () => {
    expect(validarCampo('proyecto', 'hackear-la-nasa')).toBe('proyectoInvalido');
  });

  it('rechaza un método que no existe', () => {
    expect(validarCampo('metodo', 'paloma-mensajera')).toBe('metodoInvalido');
  });

  it('acepta todos los del catálogo', () => {
    PROYECTOS.forEach((p) => expect(validarCampo('proyecto', p)).toBeNull());
    METODOS_CONTACTO.forEach((m) => expect(validarCampo('metodo', m)).toBeNull());
  });
});

/* La nota pasó a ser obligatoria: una consulta sin contexto obliga a una
   llamada entera solo para averiguar de qué va. */
describe('la nota es obligatoria', () => {
  it('rechaza la nota vacía', () => {
    expect(validarCampo('nota', '')).toBe('notaVacia');
    expect(validarCampo('nota', '   ')).toBe('notaVacia');
  });

  it('rechaza el relleno que solo cumple con estar ahí', () => {
    expect(validarCampo('nota', 'hola')).toBe('notaCorta');
    expect(validarCampo('nota', '.')).toBe('notaCorta');
  });

  it('rechaza texto largo sin una sola letra', () => {
    // Pasa la cuenta de caracteres pero no dice absolutamente nada
    expect(validarCampo('nota', '1234567890123456789012345')).toBe('notaSinLetras');
  });

  it('acepta una frase corta de verdad', () => {
    expect(validarCampo('nota', 'Necesito una web para mi clínica')).toBeNull();
  });

  it('cuenta como letras las tildes y la ñ', () => {
    expect(validarCampo('nota', 'Añadir inscripción en línea')).toBeNull();
  });

  it('un lead sin nota no es válido de conjunto', () => {
    expect(esValido({ ...VALIDO, nota: '' })).toBe(false);
    expect(validarTodo({ ...VALIDO, nota: '' }).nota).toBe('notaVacia');
  });
});

describe('límites de longitud', () => {
  it('corta nombres absurdos', () => {
    expect(validarCampo('nombre', 'a'.repeat(81))).toBe('nombreLargo');
    expect(validarCampo('nombre', 'a'.repeat(80))).toBeNull();
  });

  it('corta notas absurdas', () => {
    expect(validarCampo('nota', 'a'.repeat(1501))).toBe('notaLarga');
    expect(validarCampo('nota', 'a'.repeat(1500))).toBeNull();
  });

  it('ignora los espacios de sobra', () => {
    expect(validarCampo('nombre', '   ')).toBe('nombreVacio');
    expect(validarCampo('nombre', '  Ana  ')).toBeNull();
  });
});
