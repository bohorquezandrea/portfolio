import { describe, it, expect } from 'vitest';
import { PAISES, PAISES_FRECUENTES, listaPaises, prefijoDe, ciudadesDe, CIUDADES } from './paises.js';

describe('integridad de los datos', () => {
  it('no hay códigos repetidos', () => {
    const isos = PAISES.map(([iso]) => iso);
    expect(new Set(isos).size).toBe(isos.length);
  });

  it('todos los códigos son ISO de dos letras mayúsculas', () => {
    const malos = PAISES.filter(([iso]) => !/^[A-Z]{2}$/.test(iso));
    expect(malos).toEqual([]);
  });

  it('todos los prefijos son numéricos', () => {
    const malos = PAISES.filter(([, pref]) => !/^\d{1,4}$/.test(pref));
    expect(malos).toEqual([]);
  });

  it('los países frecuentes existen en la lista', () => {
    const isos = PAISES.map(([iso]) => iso);
    PAISES_FRECUENTES.forEach((iso) => expect(isos).toContain(iso));
  });

  it('cada país con ciudades existe en la lista', () => {
    const isos = PAISES.map(([iso]) => iso);
    Object.keys(CIUDADES).forEach((iso) => expect(isos).toContain(iso));
  });
});

describe('prefijos conocidos', () => {
  it.each([
    ['CO', '57'], ['MX', '52'], ['ES', '34'], ['US', '1'],
    ['AR', '54'], ['BR', '55'], ['PA', '507'], ['CR', '506']
  ])('%s tiene prefijo +%s', (iso, esperado) => {
    expect(prefijoDe(iso)).toBe(esperado);
  });

  it('devuelve cadena vacía si el país no existe', () => {
    expect(prefijoDe('ZZ')).toBe('');
  });
});

describe('listaPaises', () => {
  it('traduce los nombres al idioma pedido', () => {
    const es = listaPaises('es');
    const en = listaPaises('en');
    const buscar = (lista, iso) => lista.todos.find((p) => p.iso === iso).nombre;

    expect(buscar(es, 'US')).toBe('Estados Unidos');
    expect(buscar(en, 'US')).toBe('United States');
    expect(buscar(es, 'ES')).toBe('España');
    expect(buscar(en, 'ES')).toBe('Spain');
  });

  it('pone los frecuentes primero y en su orden', () => {
    const { frecuentes } = listaPaises('es');
    expect(frecuentes.map((p) => p.iso)).toEqual(PAISES_FRECUENTES);
  });

  it('el resto va ordenado alfabéticamente respetando los acentos', () => {
    const { resto } = listaPaises('es');
    const nombres = resto.map((p) => p.nombre);
    const cotejador = new Intl.Collator('es', { sensitivity: 'base' });
    const ordenado = [...nombres].sort((a, b) => cotejador.compare(a, b));
    expect(nombres).toEqual(ordenado);
  });

  it('frecuentes y resto suman el total, sin repetir ninguno', () => {
    const { frecuentes, resto } = listaPaises('es');
    expect(frecuentes.length + resto.length).toBe(PAISES.length);
    const isos = [...frecuentes, ...resto].map((p) => p.iso);
    expect(new Set(isos).size).toBe(PAISES.length);
  });
});

describe('ciudades', () => {
  it('Colombia trae Barranquilla la primera', () => {
    expect(ciudadesDe('CO')[0]).toBe('Barranquilla');
  });

  it('un país sin lista devuelve un array vacío, no undefined', () => {
    expect(ciudadesDe('LV')).toEqual([]);
    expect(ciudadesDe('')).toEqual([]);
  });

  it('ninguna lista tiene ciudades repetidas', () => {
    Object.entries(CIUDADES).forEach(([iso, ciudades]) => {
      expect(new Set(ciudades).size, `repetidas en ${iso}`).toBe(ciudades.length);
    });
  });
});
