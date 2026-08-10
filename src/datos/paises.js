/* =============================================================
   Países y ciudades para el formulario de contacto

   Decisión técnica: aquí solo se guardan el código ISO y el prefijo
   telefónico. Los NOMBRES de los países los traduce el navegador con
   `Intl.DisplayNames`, que viene incorporado.

   Por qué: escribir 195 nombres a mano en español y en inglés son 390
   cadenas que hay que mantener y donde es fácil colar una errata. Con
   Intl salen siempre bien escritos, en el idioma que toque, y este
   archivo pesa unos 3 KB en vez de 20.
   ============================================================= */

/* [código ISO 3166-1 alfa-2, prefijo telefónico] */
export const PAISES = [
  ['AF', '93'],  ['AL', '355'], ['DE', '49'],  ['AD', '376'], ['AO', '244'],
  ['AI', '1'],   ['AG', '1'],   ['SA', '966'], ['DZ', '213'], ['AR', '54'],
  ['AM', '374'], ['AW', '297'], ['AU', '61'],  ['AT', '43'],  ['AZ', '994'],
  ['BS', '1'],   ['BD', '880'], ['BB', '1'],   ['BH', '973'], ['BE', '32'],
  ['BZ', '501'], ['BJ', '229'], ['BM', '1'],   ['BY', '375'], ['BO', '591'],
  ['BA', '387'], ['BW', '267'], ['BR', '55'],  ['BN', '673'], ['BG', '359'],
  ['BF', '226'], ['BI', '257'], ['BT', '975'], ['CV', '238'], ['KH', '855'],
  ['CM', '237'], ['CA', '1'],   ['QA', '974'], ['TD', '235'], ['CZ', '420'],
  ['CL', '56'],  ['CN', '86'],  ['CY', '357'], ['VA', '39'],  ['CO', '57'],
  ['KM', '269'], ['CG', '242'], ['CD', '243'], ['KP', '850'], ['KR', '82'],
  ['CI', '225'], ['CR', '506'], ['HR', '385'], ['CU', '53'],  ['CW', '599'],
  ['DK', '45'],  ['DM', '1'],   ['EC', '593'], ['EG', '20'],  ['SV', '503'],
  ['AE', '971'], ['ER', '291'], ['SK', '421'], ['SI', '386'], ['ES', '34'],
  ['US', '1'],   ['EE', '372'], ['ET', '251'], ['PH', '63'],  ['FI', '358'],
  ['FJ', '679'], ['FR', '33'],  ['GA', '241'], ['GM', '220'], ['GE', '995'],
  ['GH', '233'], ['GI', '350'], ['GD', '1'],   ['GR', '30'],  ['GL', '299'],
  ['GP', '590'], ['GU', '1'],   ['GT', '502'], ['GF', '594'], ['GG', '44'],
  ['GN', '224'], ['GW', '245'], ['GQ', '240'], ['GY', '592'], ['HT', '509'],
  ['HN', '504'], ['HK', '852'], ['HU', '36'],  ['IN', '91'],  ['ID', '62'],
  ['IQ', '964'], ['IE', '353'], ['IR', '98'],  ['IS', '354'], ['IM', '44'],
  ['IL', '972'], ['IT', '39'],  ['JM', '1'],   ['JP', '81'],  ['JE', '44'],
  ['JO', '962'], ['KZ', '7'],   ['KE', '254'], ['KG', '996'], ['KI', '686'],
  ['KW', '965'], ['LA', '856'], ['LS', '266'], ['LV', '371'], ['LB', '961'],
  ['LR', '231'], ['LY', '218'], ['LI', '423'], ['LT', '370'], ['LU', '352'],
  ['MO', '853'], ['MK', '389'], ['MG', '261'], ['MY', '60'],  ['MW', '265'],
  ['MV', '960'], ['ML', '223'], ['MT', '356'], ['MA', '212'], ['MQ', '596'],
  ['MU', '230'], ['MR', '222'], ['MX', '52'],  ['FM', '691'], ['MD', '373'],
  ['MC', '377'], ['MN', '976'], ['ME', '382'], ['MZ', '258'], ['MM', '95'],
  ['NA', '264'], ['NR', '674'], ['NP', '977'], ['NI', '505'], ['NE', '227'],
  ['NG', '234'], ['NO', '47'],  ['NC', '687'], ['NZ', '64'],  ['OM', '968'],
  ['NL', '31'],  ['PK', '92'],  ['PW', '680'], ['PA', '507'], ['PG', '675'],
  ['PY', '595'], ['PE', '51'],  ['PF', '689'], ['PL', '48'],  ['PT', '351'],
  ['PR', '1'],   ['GB', '44'],  ['CF', '236'], ['DO', '1'],   ['RE', '262'],
  ['RW', '250'], ['RO', '40'],  ['RU', '7'],   ['EH', '212'], ['WS', '685'],
  ['AS', '1'],   ['BL', '590'], ['KN', '1'],   ['SM', '378'], ['MF', '590'],
  ['PM', '508'], ['VC', '1'],   ['LC', '1'],   ['ST', '239'], ['SN', '221'],
  ['RS', '381'], ['SC', '248'], ['SL', '232'], ['SG', '65'],  ['SX', '1'],
  ['SY', '963'], ['SO', '252'], ['LK', '94'],  ['SZ', '268'], ['ZA', '27'],
  ['SD', '249'], ['SS', '211'], ['SE', '46'],  ['CH', '41'],  ['SR', '597'],
  ['TH', '66'],  ['TW', '886'], ['TZ', '255'], ['TJ', '992'], ['TL', '670'],
  ['TG', '228'], ['TO', '676'], ['TT', '1'],   ['TN', '216'], ['TM', '993'],
  ['TR', '90'],  ['TV', '688'], ['UA', '380'], ['UG', '256'], ['UY', '598'],
  ['UZ', '998'], ['VU', '678'], ['VE', '58'],  ['VN', '84'],  ['YE', '967'],
  ['DJ', '253'], ['ZM', '260'], ['ZW', '263']
];

/* Los que salen primero en el desplegable: son de donde vienen o pueden
   venir sus clientes. El resto va detrás, ordenado alfabéticamente en el
   idioma que esté activo. */
export const PAISES_FRECUENTES = ['CO', 'MX', 'ES', 'US', 'AR', 'CL', 'PE', 'EC', 'PA', 'CR'];

/* Ciudades para el autocompletado. No es una base de datos mundial: son
   las principales de los países desde donde es realista que le escriban.
   El campo siempre admite texto libre, así que un cliente de Letonia
   puede escribir Riga aunque no esté en la lista. */
export const CIUDADES = {
  CO: ['Barranquilla', 'Bogotá', 'Medellín', 'Cali', 'Cartagena', 'Bucaramanga',
       'Santa Marta', 'Pereira', 'Manizales', 'Cúcuta', 'Ibagué', 'Villavicencio',
       'Montería', 'Neiva', 'Armenia', 'Valledupar', 'Popayán', 'Sincelejo'],
  MX: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Querétaro',
       'Mérida', 'Tijuana', 'León', 'Cancún', 'Toluca', 'San Luis Potosí',
       'Aguascalientes', 'Chihuahua', 'Culiacán', 'Hermosillo'],
  ES: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga',
       'Zaragoza', 'Murcia', 'Palma', 'Las Palmas de Gran Canaria', 'Alicante',
       'Valladolid', 'Vigo', 'Granada', 'San Sebastián', 'Santa Cruz de Tenerife'],
  US: ['Miami', 'New York', 'Los Angeles', 'Houston', 'Chicago', 'Dallas',
       'Atlanta', 'San Francisco', 'Austin', 'Boston', 'Seattle', 'Denver',
       'Orlando', 'Phoenix', 'San Diego', 'Washington'],
  AR: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata',
       'Mar del Plata', 'San Miguel de Tucumán', 'Salta', 'Santa Fe', 'Neuquén'],
  CL: ['Santiago', 'Valparaíso', 'Viña del Mar', 'Concepción', 'Antofagasta',
       'La Serena', 'Temuco', 'Rancagua', 'Puerto Montt', 'Iquique'],
  PE: ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Cusco',
       'Huancayo', 'Iquitos', 'Tacna', 'Chimbote'],
  EC: ['Quito', 'Guayaquil', 'Cuenca', 'Santo Domingo', 'Machala', 'Manta',
       'Portoviejo', 'Ambato', 'Loja', 'Riobamba'],
  PA: ['Ciudad de Panamá', 'Colón', 'David', 'Santiago', 'Chitré', 'La Chorrera'],
  CR: ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Liberia', 'Puntarenas'],
  UY: ['Montevideo', 'Salto', 'Punta del Este', 'Paysandú', 'Maldonado'],
  DO: ['Santo Domingo', 'Santiago de los Caballeros', 'Punta Cana', 'La Romana'],
  GT: ['Ciudad de Guatemala', 'Quetzaltenango', 'Escuintla', 'Antigua Guatemala'],
  BO: ['La Paz', 'Santa Cruz de la Sierra', 'Cochabamba', 'Sucre', 'Oruro'],
  PY: ['Asunción', 'Ciudad del Este', 'Encarnación', 'San Lorenzo'],
  VE: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay', 'Mérida'],
  BR: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Curitiba',
       'Porto Alegre', 'Salvador', 'Recife', 'Fortaleza'],
  CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa', 'Edmonton'],
  GB: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow', 'Bristol'],
  DE: ['Berlín', 'Múnich', 'Hamburgo', 'Fráncfort', 'Colonia', 'Stuttgart'],
  FR: ['París', 'Lyon', 'Marsella', 'Toulouse', 'Burdeos', 'Niza'],
  IT: ['Roma', 'Milán', 'Nápoles', 'Turín', 'Florencia', 'Bolonia'],
  PT: ['Lisboa', 'Oporto', 'Braga', 'Coímbra', 'Faro']
};

/* Devuelve los países ordenados por nombre en el idioma activo, con los
   frecuentes arriba. Se memoriza por idioma porque ordenar 195 cadenas
   con Intl.Collator en cada repintado del formulario es trabajo tirado. */
const cache = new Map();

export function listaPaises(idioma) {
  if (cache.has(idioma)) return cache.get(idioma);

  let nombreDe;
  try {
    const dn = new Intl.DisplayNames([idioma], { type: 'region' });
    nombreDe = (iso) => dn.of(iso) || iso;
  } catch {
    // Navegador sin Intl.DisplayNames: se muestra el código y sigue siendo usable
    nombreDe = (iso) => iso;
  }

  const cotejador = new Intl.Collator(idioma, { sensitivity: 'base' });
  const todos = PAISES.map(([iso, prefijo]) => ({ iso, prefijo, nombre: nombreDe(iso) }));

  const frecuentes = PAISES_FRECUENTES
    .map((iso) => todos.find((p) => p.iso === iso))
    .filter(Boolean);

  const resto = todos
    .filter((p) => !PAISES_FRECUENTES.includes(p.iso))
    .sort((a, b) => cotejador.compare(a.nombre, b.nombre));

  const lista = { frecuentes, resto, todos };
  cache.set(idioma, lista);
  return lista;
}

export function prefijoDe(iso) {
  const p = PAISES.find(([codigo]) => codigo === iso);
  return p ? p[1] : '';
}

export function ciudadesDe(iso) {
  return CIUDADES[iso] || [];
}
