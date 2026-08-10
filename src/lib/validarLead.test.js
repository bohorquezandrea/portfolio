import { describe, it, expect } from 'vitest';
import { validarCampo, validarTodo, esValido, PROYECTOS, METODOS_CONTACTO } from './validarLead.js';

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

  it('exige los seis campos obligatorios y ninguno más', () => {
    const errores = validarTodo({});
    expect(Object.keys(errores).sort()).toEqual(
      ['ciudad', 'correo', 'metodo', 'nombre', 'pais', 'proyecto'].sort()
    );
  });
});

describe('correo', () => {
  it.each([
    ['ana@empresa.com', null],
    ['ana.maria+lead@sub.dominio.co', null],
    ['sin-arroba.com', 'correoInvalido'],
    ['ana@sindominio', 'correoInvalido'],
    ['ana con espacio@empresa.com', 'correoInvalido'],
    ['@empresa.com', 'correoInvalido'],
    ['', 'correoVacio']
  ])('%s', (entrada, esperado) => {
    expect(validarCampo('correo', entrada)).toBe(esperado);
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
    ['+57 300 5554433', 'telefonoInvalido'],   // el prefijo lo pone el formulario, no se escribe
    ['no tengo', 'telefonoInvalido'],
    ['12345', 'telefonoInvalido']              // demasiado corto
  ])('%s', (entrada, esperado) => {
    expect(validarCampo('telefono', entrada)).toBe(esperado);
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
