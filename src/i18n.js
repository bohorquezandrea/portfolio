// =============================================================
// i18n. Copy escrito para quien dirige un negocio (no developer).
// Sin promesas de venta (no soy marketer).
// Sin precios en la web (cotizo en propuesta privada).
// Dos idiomas: Español (default) y English.
// =============================================================

export const content = {
  es: {
    nav: {
      portfolio: 'Portfolio',
      ai: 'AI Automation',
      services: 'Servicios',
      stack: 'Lo que hago',
      work: 'Proyectos',
      process: 'Proceso',
      faq: 'FAQ',
      cta: 'Hablemos',
      themeLight: 'Claro',
      themeDark: 'Oscuro',
      themeToggleLabel: 'Cambiar tema'
    },
    hero: {
      eyebrow: 'Andrea Bohorquez · Barranquilla, Colombia',
      titleWords: ['Webs', 'y', 'automatizaciones'],
      titleEmphasis: 'a la medida de tu negocio.',
      roleLine: 'AI Product Engineer · Full-Stack Web Developer',
      sub: 'Diseño y construyo el sitio o la aplicación que tu marca necesita, y automatizo con IA el trabajo repetitivo de tu operación. Sin plantillas genéricas y sin atajos.',
      ctaPrimary: 'Empecemos tu proyecto',
      ctaSecondary: 'Ver proyectos',
      stats: [
        { num: '6+', label: 'Marcas que ya confiaron' },
        { num: '4d', label: 'Entrega promedio de una landing' },
        { num: '4-6h', label: 'Semanales ahorradas automatizando' }
      ],
      scrollWord: 'desliza',
      scrollLine: '· hay mucho por mostrarte ·'
    },
    portfolio: {
      eyebrow: 'Proyectos propios',
      title: 'Lo que construyo',
      titleEm: 'por mi cuenta.',
      sub: 'Proyectos donde escribo cada capa: modelo de datos, API, interfaz y tests. Aquí no hay cliente que apruebe wireframes. Hay decisiones técnicas que sostengo yo.',
      stackLabel: 'Stack',
      shotsNext: 'Ver la siguiente pantalla',
      noLinkNote: 'Repositorio privado',
      items: [
        {
          n: '01',
          title: 'PlanEat',
          shotsLabel: 'Pantallas de la app',
          shots: [
            { src: 'planeat/01.webp', nombre: 'Bienvenida',
              desc: 'Registro y acceso. Una misma cuenta sirve para coach y para atleta.' },
            { src: 'planeat/02.webp', nombre: 'Inicio del atleta',
              desc: 'La próxima sesión, lo hecho y lo pendiente, de un vistazo.' },
            { src: 'planeat/03.webp', nombre: 'Nutrición',
              desc: 'Macros del día calculadas con Mifflin-St Jeor sobre la actividad real.' },
            { src: 'planeat/04.webp', nombre: 'Entrenamiento',
              desc: 'Lo planeado contra lo ejecutado, con el esfuerzo percibido de cada sesión.' },
            { src: 'planeat/05.webp', nombre: 'Test de perfil',
              desc: 'Cinco preguntas que definen el tono con el que la app le habla a cada quien.' },
            { src: 'planeat/06.webp', nombre: 'Perfil y conexiones',
              desc: 'Coach asignado, entrenador vinculado y la conexión con Strava.' },
            { src: 'planeat/07.webp', nombre: 'Panel del coach',
              desc: 'Sus atletas vinculados, con lo pendiente y lo hecho por cada uno.' },
            { src: 'planeat/08.webp', nombre: 'Asignar entreno',
              desc: 'Tipo, fecha, duración e indicaciones, directo al calendario del atleta.' }
          ],
          titleEm: 'Coach',
          year: '2026 · Trabajo Fin de Máster',
          role: 'Full-Stack · diseño, backend, app y tests',
          desc: 'Aplicación para coaches deportivos y sus atletas: planes de entrenamiento y nutrición que se ajustan a la actividad real, no a una plantilla. El backend expone una API REST con autenticación JWT y se integra con Strava y TrainingPeaks para importar los entrenamientos ya registrados. 47 tests automatizados cubren autenticación, coaching, integraciones, macros, usuarios y workouts.',
          stack: ['React Native', 'Expo', 'TypeScript', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'pytest'],
          link: null,
          note: 'Repositorio privado mientras termino el TFM'
        },
        {
          n: '02',
          title: 'Automatizaciones',
          img: 'claude-skills.webp',
          titleEm: 'con Claude Code',
          year: '2026 · Tucan',
          role: 'AI Product Engineer',
          desc: 'Gestiono contenido enriquecido para marcas enterprise en VTEX. Cada landing de producto pasaba por recibir el código en crudo, adaptarlo a mano, subirlo y validarlo: dos horas por pieza. Construí un skill propio en Claude Code que recibe el código, lo adapta al formato de la plataforma y aplica las reglas de estilo de cada marca. De 2 horas a 20 minutos, entre 4 y 6 horas menos de trabajo manual cada semana.',
          stack: ['Claude Code', 'Skills', 'MCP', 'VTEX', 'Nebula', 'HTML/CSS'],
          link: 'https://www.linkedin.com/feed/update/urn:li:activity:7488971086550970368/',
          linkLabel: 'Leer el caso completo'
        },
        {
          n: '03',
          title: 'Pimp',
          img: 'pimp-my-shoes.webp',
          titleEm: 'My Shoes',
          year: '2023 → presente',
          role: 'Negocio propio · operación y backend',
          desc: 'Negocio de restauración y personalización de calzado que llevo hace más de dos años. Además de la operación, construí la API que gestiona clientes y pedidos, con validación de entrada y capa de caché.',
          stack: ['Node.js', 'Express', 'Sequelize', 'MySQL', 'Redis', 'Joi'],
          link: 'pimp/index.html',
          linkLabel: 'Ver la landing'
        },
        {
          n: '04',
          title: 'Artist Finder',
          img: 'artist-finder.webp',
          titleEm: 'API',
          year: '2025',
          role: 'Backend · Python',
          desc: 'API en Python para buscar y consultar información de artistas musicales a partir de una fuente externa.',
          stack: ['Python', 'REST'],
          link: 'https://bohorquezandrea.github.io/artist_finder_api/',
          linkLabel: 'Abrir la app'
        },
        {
          n: '05',
          title: 'Pokémon',
          img: 'pokemon-fetch.webp',
          titleEm: 'Fetch',
          year: '2025',
          role: 'Front-End · JavaScript',
          desc: 'Aplicación que consume la PokéAPI y renderiza los resultados en cliente: manejo de estados de carga y error, y construcción dinámica del DOM.',
          stack: ['JavaScript', 'Fetch API', 'HTML/CSS'],
          link: 'https://bohorquezandrea.github.io/pokemon_fetch_app/',
          linkLabel: 'Abrir la app'
        },
        {
          n: '06',
          title: 'Simon',
          img: 'simon-game.webp',
          titleEm: 'Game',
          year: '2024',
          role: 'Front-End · JavaScript',
          desc: 'El juego de memoria clásico: secuencias generadas, captura de input del jugador y control del estado de la partida en JavaScript puro, sin librerías.',
          stack: ['JavaScript', 'DOM', 'CSS'],
          link: 'https://bohorquezandrea.github.io/simongame/',
          linkLabel: 'Jugar'
        }
      ]
    },
    aiAutomation: {
      eyebrow: 'AI Automation',
      title: 'Lo que automatizo',
      titleEm: 'con IA.',
      sub: 'No uso IA para escribir el mismo código más rápido. La uso para construir herramientas que hacen el trabajo repetitivo sin mí, y que siguen funcionando cuando cierro el portátil.',
      stat: { num: '2h → 20min', label: 'por landing de producto, tras automatizar el proceso' },
      items: [
        {
          n: '01',
          h: 'Skills',
          p: 'Instrucciones empaquetadas que el agente carga sólo cuando la tarea las necesita. La de VTEX/Nebula convierte una descripción de producto a la estructura de la plataforma sin que yo toque el HTML.'
        },
        {
          n: '02',
          h: 'Subagentes',
          p: 'Agentes con su propio contexto para tareas que ensuciarían la conversación principal: barridos de búsqueda en repos grandes, revisiones de código, investigación en paralelo.'
        },
        {
          n: '03',
          h: 'Servidores MCP',
          p: 'Conexiones a herramientas reales (calendario, archivos, repositorios) para que el agente lea y actúe sobre datos vivos, en vez de sobre lo que yo le pegue a mano.'
        },
        {
          n: '04',
          h: 'Prompts como código',
          p: 'Si un prompt define un flujo de trabajo, se trata como código: se versiona, se revisa y se itera. No se improvisa cada vez.'
        }
      ]
    },
    marquee: {
      label: 'Han confiado',
      items: ['Eleva Tu Vida', 'Zalve Tattoo', 'Olímpica × Tucan', 'Miguel Trainer', 'La Birra Bar', 'Julio Carvajal Filmmaker', 'Ingenin HVAC']
    },
    problem: {
      eyebrow: 'Por qué importa',
      title: 'Tu sitio actual no representa lo que ofreces',
      sub: 'No se trata sólo de "tener web". Se trata de que tu marca se vea como lo que cobras. Si reconoces alguna de estas tres, estamos hablando el mismo idioma:',
      items: [
        {
          n: '01',
          h: 'Se ve igual a las otras 50 webs del nicho',
          p: 'Plantillas genéricas, animaciones torpes, celular descuadrado. La marca pierde personalidad antes de que alcancen a leerte.'
        },
        {
          n: '02',
          h: 'Está hecha, pero no es tuya',
          p: 'Cada decisión visual debería responder a tu posicionamiento. Si la única paleta es "lo que vino con la plantilla", ahí hay deuda.'
        },
        {
          n: '03',
          h: 'Carga lenta y se ve mal en celular',
          p: 'Cada segundo extra de carga te cuesta atención real. Las webs que construyo van por debajo de 2s y se ven impecables en celular y tablet.'
        }
      ],
      cta: 'Hablemos de tu proyecto'
    },
    offers: {
      eyebrow: 'Cómo trabajamos juntos',
      title: 'Cuatro maneras de poner tu marca online',
      sub: 'Elige según el momento de tu negocio. Cada paquete incluye diseño, construcción y acompañamiento. El precio se cotiza según el alcance, sin tarifas ocultas.',
      items: [
        {
          tag: 'Paquete 01',
          title: 'Landing en',
          titleEm: 'WordPress',
          desc: 'Una página completa para presentar tu negocio o un servicio puntual. Lista en pocos días, conectada a tu WhatsApp y a tu correo.',
          features: [
            'Hasta 10 secciones diseñadas a medida',
            'Diseño previo en Figma para tu aprobación',
            'Animaciones suaves y consistentes',
            'Se ve impecable en celular y tablet',
            'Formulario de contacto + botón de WhatsApp',
            'Conexión con tu dominio y hosting actual',
            'Entrega promedio: 4 días hábiles'
          ],
          deliv: '4 días',
          cta: 'Hablemos'
        },
        {
          tag: 'Paquete 02 · Más popular',
          title: 'Sitio en',
          titleEm: 'React',
          desc: 'Para marcas que quieren un sitio único, con identidad fuerte y experiencia que ninguna plantilla logra. Multi‑página, animaciones a medida, modo claro/oscuro.',
          features: [
            'Diseño y arquitectura desde cero, sin temas prefabricados',
            'Identidad visual coherente en cada sección',
            'Animaciones e interacciones cuidadas',
            'Multi‑idioma (ES/EN o el que necesites)',
            'Modo claro y oscuro adaptable al usuario',
            'Accesibilidad y buenas prácticas',
            'Carga rápida en celular y desktop'
          ],
          deliv: '3–5 semanas',
          cta: 'Hablemos'
        },
        {
          tag: 'Paquete 03 · Sugerido',
          title: 'Integraciones',
          titleEm: 'a medida',
          desc: 'Tu web conectada a las herramientas que ya usas. Pasarela de pago, sistema de reservas, CRM, IA conversacional, lo que tu negocio necesite. Se diseña según tu flujo, no al revés.',
          features: [
            'Diagnóstico de qué herramientas conviene conectar',
            'Conexión con servicios externos vía API',
            'Asistente de IA entrenado con tu información',
            'Reservas, cotizaciones o pagos sin salir de tu web',
            'Sincronización con tu CRM o base de datos',
            'Capacitación para tu equipo',
            'Pensado para escalar sin tocar el código'
          ],
          deliv: '4–6 semanas',
          cta: 'Hablemos'
        },
        {
          tag: 'Paquete 04',
          title: 'Aplicación',
          titleEm: 'a la medida',
          desc: 'Cuando tu operación necesita más que una web. Una aplicación pensada sólo para tu negocio: área privada de clientes, panel interno, marketplace, plataforma de servicios.',
          features: [
            'Levantamiento de requerimientos contigo',
            'Arquitectura pensada para tu caso',
            'Panel de usuarios con permisos',
            'Pantallas a medida según tus procesos',
            'Conexiones con las herramientas que ya usas',
            'Acompañamiento durante el lanzamiento',
            'Documentación para que tu equipo la use'
          ],
          deliv: '6–10 semanas',
          cta: 'Hablemos'
        }
      ]
    },
    midCta: {
      eyebrow: 'Conversemos',
      line: '¿Tienes claro lo que necesitas o aún lo estás pensando?',
      sub: 'En una llamada de 30 minutos te ayudo a aterrizar el alcance, sin compromiso.',
      btn: 'Agenda una llamada'
    },
    stack: {
      eyebrow: 'Lo que sé construir contigo',
      title: 'Donde pongo mi',
      titleEm: 'foco',
      sub: 'Estos son los terrenos en los que me muevo cuando trabajamos juntos. Nada de marketing ni promesas de venta. Sólo diseño y construcción de la pieza digital.',
      slides: [
        {
          n: '01',
          icon: '◆',
          title: 'Diseño a medida',
          desc: 'Wireframes en Figma, paleta y tipografía elegidas para tu marca. Sin plantillas. Cada sección responde a una intención.'
        },
        {
          n: '02',
          icon: '◆',
          title: 'Construcción de la web',
          desc: 'WordPress + Elementor PRO para entregas rápidas, o React + Vite cuando hace falta algo único. Tú eliges según el momento del proyecto.'
        },
        {
          n: '03',
          icon: '◆',
          title: 'Animaciones e interacciones',
          desc: 'Transiciones suaves al hacer scroll, hover states cuidados, micro‑animaciones que guían la mirada sin distraer.'
        },
        {
          n: '04',
          icon: '◆',
          title: 'Modo claro y oscuro',
          desc: 'Tu sitio se adapta a la preferencia de quien lo visita. Detalle pequeño, percepción de marca enorme.'
        },
        {
          n: '05',
          icon: '◆',
          title: 'Multi‑idioma',
          desc: 'ES, EN, o el idioma de tu mercado. Toggle elegante en la nav y contenido organizado para que crezca contigo.'
        },
        {
          n: '06',
          icon: '◆',
          title: 'Velocidad y peso ligero',
          desc: 'Imágenes optimizadas, código liviano, sin dependencias innecesarias. Tu sitio carga rápido en cualquier conexión.'
        },
        {
          n: '07',
          icon: '◆',
          title: 'Acompañamiento',
          desc: 'Capacitación 1‑a‑1 después del lanzamiento. Te quedas con el sitio entendido, no con un misterio que sólo yo puedo tocar.'
        }
      ],
      languages: 'Idiomas para reuniones y copy: Español (nativo) · Inglés C1 · Alemán B2',
      controlPrev: 'Anterior',
      controlNext: 'Siguiente'
    },
    cases: {
      eyebrow: 'Proyectos seleccionados',
      title: 'Algunas marcas con las que trabajo',
      sub: 'Cada uno respondía a algo distinto: programa de transformación, portafolio de tatuador, e‑commerce de gran retail, app de entrenamiento. Lo que tienen en común es que están en línea.',
      items: [
        {
          n: '01',
          title: 'Eleva',
          titleEm: 'Tu Vida',
          role: 'Web Developer · 100% mío · live',
          desc: 'Sitio para el programa de transformación de Arju Vasquez, influencer reposicionado en la industria del fitness y bienestar. Diseño limpio, jerarquía clara y CTAs cuidados a lo largo de toda la página.',
          link: 'https://elevatuvida.pro',
          live: true
        },
        {
          n: '02',
          title: 'Zalve',
          titleEm: 'Tattoo',
          role: 'Web Developer · 100% mío · live',
          desc: 'Sitio para estudio de tatuajes. Muestra el portfolio del artista de forma elegante y dirige a reserva por WhatsApp. WordPress + Elementor PRO.',
          link: 'https://zalvetattoo.com',
          live: true
        },
        {
          n: '03',
          title: 'Olímpica',
          titleEm: '× Tucan Marketing',
          role: 'Front‑End Developer · 2025 → presente',
          desc: 'Maquetación y publicación de páginas de producto en olimpica.com. Trabajo basado en la descripción del producto: HTML/CSS personalizado, responsive y consistente con la línea visual.',
          linkLabel: 'Ver descripción del producto en olimpica.com',
          link: 'https://www.olimpica.com/capsulas-cafe-juan-valdez-mujeres-44-8g/p#description',
          live: true,
          slideshow: true
        },
        {
          n: '04',
          title: 'Miguel',
          titleEm: 'Trainer',
          role: 'Web Developer · 100% mío · live',
          desc: 'App‑landing para entrenador personal. Captura de leads, secciones de programas y prueba social en formato testimonial.',
          link: 'https://migueltrainer.com/app/',
          live: true
        },
        {
          n: '05',
          title: 'La Birra',
          titleEm: 'Bar',
          role: 'Web Developer · actualización de imagen · live',
          desc: 'Refresh visual del sitio existente. Reorganización de secciones, nueva paleta y mejoras en celular.',
          link: 'https://www.labirrabar.com',
          live: true
        },
        {
          n: '06',
          title: 'Julio Carvajal',
          titleEm: 'Filmmaker',
          role: 'Web Developer · 2024',
          desc: 'Landing page para filmmaker en Costa Rica. Galerías interactivas, reseñas dinámicas y UX adaptativa.',
          link: null,
          live: false,
          archived: true
        },
        {
          n: '07',
          title: 'Ingenin',
          titleEm: 'HVAC',
          role: 'Full Stack Developer · 2025',
          desc: 'Wireframes en Figma + landing en WordPress (Elementor PRO + CSS). Páginas de gracias, formularios y CTAs diferenciados.',
          link: null,
          live: false,
          archived: true
        }
      ],
      archivedNote: 'Sitio actualizado posteriormente por terceros. Disponible como captura en portafolio extendido.',
      slideshowLabel: 'Ejemplos publicados en olimpica.com'
    },
    olimpicaSlideshow: {
      title: 'Olímpica × Tucan',
      sub: 'Maquetación y publicación de fichas de producto en olimpica.com. Algunos ejemplos publicados:',
      slides: [
        {
          name: 'Café Juan Valdez Gourmet Set x4',
          note: 'Maqueta diseñada de cero. Caso destacado',
          url: 'https://www.olimpica.com/cafe-juan-valdez-gourmet-set-x4paq-28/p#description',
          file: 'olimpica-juan-valdez-gourmet.webp'
        },
        {
          name: 'Cápsulas Café Juan Valdez Mujeres',
          note: 'Maqueta y publicación · ver descripción',
          url: 'https://www.olimpica.com/capsulas-cafe-juan-valdez-mujeres-44-8g/p#description',
          file: 'olimpica-juan-valdez-mujeres.webp'
        },
        {
          name: 'ASUS TUF Gaming A15 · Ryzen 7',
          note: 'Ficha de producto con specs y galería',
          url: 'https://www.olimpica.com/asus-tuf-gaming-a15-fa506ncg-hn193w-amd-ryzen-7-8gb-512gb-rtx3050/p#description',
          file: 'olimpica-asus-tuf.webp'
        },
        {
          name: 'Lavadora automática Mabe 24kg',
          note: 'Ficha técnica con tabs de descripción',
          url: 'https://www.olimpica.com/lavadora-automatica-agitador-24kg-diamond-gray-mabe---lmc74215wdab0/p#description',
          file: 'olimpica-lavadora-mabe.webp'
        }
      ]
    },
    process: {
      eyebrow: 'Cómo trabajamos',
      title: 'De la idea al sitio publicado, sin sorpresas',
      sub: 'Un proceso simple, en cuatro pasos, con entregables concretos en cada uno.',
      steps: [
        {
          n: '01',
          h: 'Llamada de descubrimiento',
          p: '30–45 minutos para entender tu marca, tu cliente y tu objetivo. Salimos con un brief claro y un mood board base.'
        },
        {
          n: '02',
          h: 'Diseño y aprobación',
          p: 'Wireframes y prototipo navegable en Figma. Iteramos hasta que digas "esto soy yo".'
        },
        {
          n: '03',
          h: 'Construcción',
          p: 'Code o Elementor (según paquete), animaciones a medida, optimización del peso y la velocidad. Tú revisas en preview.'
        },
        {
          n: '04',
          h: 'Lanzamiento + acompañamiento',
          p: 'Publicación en tu dominio, capacitación 1‑a‑1 y soporte post‑lanzamiento. Te quedas con todo entendido.'
        }
      ],
      cta: 'Empecemos juntos'
    },
    guarantee: {
      seal: 'Mi promesa',
      title: 'Trabajo contigo hasta que el',
      titleEm: 'resultado te enamore.',
      sub: 'No te entrego algo sólo porque "ya está listo". Lo iteramos las veces que haga falta dentro del alcance acordado, hasta que abras el preview y digas "sí, esto soy yo". Esa es la única firma que cierra el proyecto.',
      cta: 'Quiero empezar'
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que la gente suele preguntarme',
      items: [
        {
          q: '¿Por qué no muestras precios en la web?',
          a: 'Porque cada proyecto es distinto: una landing de 5 secciones no se cobra igual que un sitio con integraciones a medida. Cuéntame en una llamada qué necesitas y te envío una propuesta clara con alcance, cronograma y precio en menos de 24 horas.'
        },
        {
          q: '¿Cuánto tarda en estar lista?',
          a: 'Landing en WordPress + Elementor: 4 días hábiles promedio (con material completo entregado). Sitio en React a medida: 3–5 semanas. Integraciones a medida o aplicación personalizada: 4–10 semanas según alcance. Los plazos arrancan cuando tengo textos, imágenes y accesos en mano.'
        },
        {
          q: '¿Qué necesitas de mí para empezar?',
          a: 'Tres cosas: (1) accesos de dominio y hosting si ya los tienes (BanaHosting, Hostinger, GoDaddy, lo que uses), (2) referencias visuales (un board en Pinterest funciona perfecto), (3) los textos e imágenes de tu marca. Si no tienes copy ni imágenes, lo conversamos: te oriento con qué cosas conseguir y a quién contratar para esa parte.'
        },
        {
          q: '¿Haces el copy o el branding desde cero?',
          a: 'Honesta: no soy copywriter ni marketera. Mi terreno es diseño + código + integraciones. Si necesitas copy fuerte de ventas, te recomiendo apoyarte en alguien especializado en eso. Yo me encargo de que ese mensaje se vea impecable en pantalla.'
        },
        {
          q: '¿Qué pasa después del lanzamiento?',
          a: 'Quedas con la web publicada, con dominio conectado y con una capacitación 1‑a‑1 para que sepas cómo se mueve por dentro. Si más adelante quieres mantenimiento mensual o nuevas secciones, lo cotizamos a parte.'
        },
        {
          q: '¿Trabajas con clientes fuera de Colombia?',
          a: 'Sí. He trabajado con marcas en Colombia, Costa Rica y proyectos en Europa. Hablo español nativo, inglés C1 y alemán B2.'
        }
      ]
    },
    cta: {
      title: 'Trabajemos',
      titleEm: 'juntos.',
      sub: 'Cuéntame qué quieres automatizar y agendamos una llamada para explorarlo.',
      sec: 'Respuesta en menos de 24h'
    },
    contacto: {
      // Formulario
      leyendaDatos: 'Tus datos',
      leyendaProyecto: 'Tu proyecto',
      leyendaContacto: 'Cómo te contacto',
      nombre: 'Nombre completo',
      nombrePista: 'Como quieres que te llame',
      correo: 'Correo electrónico',
      proyecto: 'Proyecto de interés',
      proyectoElige: 'Elige una opción',
      proyectoOpciones: {
        'automatizacion-ventas': 'Automatización de ventas B2B',
        'inscripciones-formularios': 'Sistema de inscripciones o formularios',
        'landing-web': 'Landing page o web corporativa',
        'automatizacion-claude-code': 'Automatización con Claude Code para operaciones internas',
        'chatbot-quiz': 'Chatbot o quiz funnel',
        otro: 'Otro'
      },
      proyectoOtro: 'Cuéntame cuál',
      proyectoOtroPista: 'En una línea basta',
      metodo: 'Método preferido de contacto',
      metodoOpciones: { correo: 'Correo electrónico', whatsapp: 'WhatsApp', otro: 'Otro' },
      metodoOtro: 'Dime cuál',
      pais: 'País',
      paisElige: 'Elige tu país',
      paisFrecuentes: 'Más frecuentes',
      paisTodos: 'Todos los países',
      ciudad: 'Ciudad',
      ciudadPista: 'Escribe o elige de la lista',
      telefono: 'Teléfono',
      telefonoPista: 'El código de país se rellena solo',
      nota: 'Algo más que quieras contarme',
      notaPista: 'Contexto, plazos, presupuesto aproximado. Lo que ayude.',
      opcional: 'opcional',
      obligatorio: 'obligatorio',
      restantes: 'caracteres restantes',
      // Agenda
      agendaTitulo: 'Agenda la llamada',
      agendaSub: 'Son 45 minutos. Elige el hueco que te sirva y queda reservado al momento, sin correos de ida y vuelta.',
      agendaCargar: 'Ver mis horarios disponibles',
      agendaCargando: 'Cargando el calendario',
      agendaAlterna: 'Prefiero que me escribas y lo coordinamos',
      // Envío
      enviar: 'Enviar y agendar',
      enviando: 'Enviando',
      exitoTitulo: 'Recibido, {nombre}',
      exitoTexto: 'Te escribo a {correo} en menos de 24 horas con los siguientes pasos.',
      exitoOtro: 'Enviar otra consulta',
      // Errores de validación
      errores: {
        nombreVacio: 'Escribe tu nombre',
        nombreCorto: 'Necesito al menos dos letras',
        nombreLargo: 'Ese nombre es demasiado largo',
        correoVacio: 'Escribe tu correo',
        correoInvalido: 'Ese correo no parece válido. Revisa que tenga arroba y dominio.',
        correoLargo: 'Ese correo es demasiado largo',
        correoErrata: 'Revisa el dominio, parece que hay una errata',
        proyectoVacio: 'Elige el tipo de proyecto',
        proyectoInvalido: 'Esa opción no existe',
        proyectoOtroVacio: 'Cuéntame qué tipo de proyecto es',
        proyectoOtroLargo: 'Resúmelo un poco más',
        metodoVacio: 'Elige cómo prefieres que te contacte',
        metodoInvalido: 'Esa opción no existe',
        metodoOtroVacio: 'Dime por dónde te escribo',
        metodoOtroLargo: 'Resúmelo un poco más',
        paisVacio: 'Elige tu país',
        ciudadVacia: 'Escribe tu ciudad',
        ciudadLarga: 'Ese nombre es demasiado largo',
        telefonoInvalido: 'Solo números, espacios, guiones y paréntesis',
        telefonoCorto: 'Faltan dígitos para que sea un número real',
        telefonoLargo: 'Sobran dígitos. El código de país ya va aparte.',
        notaLarga: 'La nota es demasiado larga'
      },
      antispam: {
        error: 'La verificación antispam no se pudo completar.',
        expirado: 'La verificación caducó.',
        reintentar: 'Reintentar'
      },
      // Errores de envío
      fallos: {
        titulo: 'No se pudo enviar',
        antispamPendiente: 'Completa la verificación antispam antes de enviar. Si no aparece o falla, dale a Reintentar.',
        sinConfigurar: 'El formulario todavía no está conectado. Escríbeme directo a {correo} y lo vemos.',
        red: 'No hubo conexión con el servidor. Revisa tu internet e inténtalo otra vez.',
        demasiados: 'Se enviaron muchas consultas desde aquí en poco tiempo. Espera unos minutos.',
        antispam: 'La verificación antispam no pasó. Marca la casilla e inténtalo de nuevo.',
        validacion: 'Algún dato no pasó la validación del servidor. Revisa el formulario.',
        servidor: 'Algo falló de mi lado. Inténtalo otra vez o escríbeme a {correo}.',
        reintentar: 'Intentar de nuevo'
      },
      revisaCampos: 'Revisa los campos marcados antes de enviar.'
    },
    footer: {
      bio: 'Andrea Bohorquez. AI Product Engineer y Full-Stack Web Developer. Ingeniera mecánica con máster en desarrollo de aplicaciones web (Universidad Europea de Madrid). Construyo producto de punta a punta y automatizo lo repetitivo.',
      contactTitle: 'Contacto',
      email: 'andreabproyectos@gmail.com',
      city: 'Barranquilla, Colombia · trabajo remoto',
      socialTitle: 'Sígueme',
      menuTitle: 'Menú',
      linkedin: 'https://www.linkedin.com/in/bohorquezandrea/',
      github: 'https://github.com/bohorquezandrea',
      copy: '© 2026 Andrea Bohorquez'
    }
  },

  en: {
    nav: {
      portfolio: 'Portfolio',
      ai: 'AI Automation',
      services: 'Services',
      stack: 'What I do',
      work: 'Work',
      process: 'Process',
      faq: 'FAQ',
      cta: 'Let’s talk',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeToggleLabel: 'Toggle theme'
    },
    hero: {
      eyebrow: 'Andrea Bohorquez · Barranquilla, Colombia',
      titleWords: ['Websites', 'and', 'automation'],
      titleEmphasis: 'built around your business.',
      roleLine: 'AI Product Engineer · Full-Stack Web Developer',
      sub: 'I design and build the site or app your brand needs, and use AI to automate the repetitive work in your operation. No generic templates, no shortcuts.',
      ctaPrimary: 'Start your project',
      ctaSecondary: 'See work',
      stats: [
        { num: '6+', label: 'Brands trusted' },
        { num: '4d', label: 'Average landing delivery' },
        { num: '4-6h', label: 'Weekly hours saved by automating' }
      ],
      scrollWord: 'scroll',
      scrollLine: '· there’s plenty more to see ·'
    },
    portfolio: {
      eyebrow: 'Personal projects',
      title: 'What I build',
      titleEm: 'on my own.',
      sub: 'Projects where I write every layer: data model, API, interface and tests. No client signing off wireframes here. Just technical decisions I own.',
      stackLabel: 'Stack',
      shotsNext: 'See the next screen',
      noLinkNote: 'Private repository',
      items: [
        {
          n: '01',
          title: 'PlanEat',
          shotsLabel: 'App screens',
          shots: [
            { src: 'planeat/01.webp', nombre: 'Welcome',
              desc: 'Sign-up and login. One account works for both coach and athlete.' },
            { src: 'planeat/02.webp', nombre: 'Athlete home',
              desc: 'The next session, what is done and what is pending, at a glance.' },
            { src: 'planeat/03.webp', nombre: 'Nutrition',
              desc: 'Daily macros calculated with Mifflin-St Jeor against real activity.' },
            { src: 'planeat/04.webp', nombre: 'Training',
              desc: 'Planned against executed, with the perceived effort of each session.' },
            { src: 'planeat/05.webp', nombre: 'Profile quiz',
              desc: 'Five questions that set the tone the app uses with each person.' },
            { src: 'planeat/06.webp', nombre: 'Profile and connections',
              desc: 'Assigned coach, linked trainer and the Strava connection.' },
            { src: 'planeat/07.webp', nombre: 'Coach dashboard',
              desc: 'Their linked athletes, with what is pending and done for each one.' },
            { src: 'planeat/08.webp', nombre: 'Assign a workout',
              desc: 'Type, date, duration and notes, straight to the athlete calendar.' }
          ],
          titleEm: 'Coach',
          year: "2026 · Master's thesis",
          role: 'Full-Stack · design, backend, app and tests',
          desc: 'An app for sports coaches and their athletes: training and nutrition plans that adjust to real activity rather than a template. The backend exposes a REST API with JWT authentication and integrates with Strava and TrainingPeaks to pull in already-recorded workouts. 47 automated tests cover authentication, coaching, integrations, macros, users and workouts.',
          stack: ['React Native', 'Expo', 'TypeScript', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'pytest'],
          link: null,
          note: 'Repository private while I finish my thesis'
        },
        {
          n: '02',
          title: 'Automation',
          img: 'claude-skills.webp',
          titleEm: 'with Claude Code',
          year: '2026 · Tucan',
          role: 'AI Product Engineer',
          desc: 'I manage rich content for enterprise brands on VTEX. Every product landing meant receiving raw code, adapting it by hand, uploading and validating it: two hours per piece. I built a custom Claude Code skill that takes the raw code, adapts it to the platform format and applies each brand’s style rules. From 2 hours to 20 minutes, and 4 to 6 fewer hours of manual work every week.',
          stack: ['Claude Code', 'Skills', 'MCP', 'VTEX', 'Nebula', 'HTML/CSS'],
          link: 'https://www.linkedin.com/feed/update/urn:li:activity:7488971086550970368/',
          linkLabel: 'Read the full case'
        },
        {
          n: '03',
          title: 'Pimp',
          img: 'pimp-my-shoes.webp',
          titleEm: 'My Shoes',
          year: '2023 → present',
          role: 'My own business · operations and backend',
          desc: 'A shoe restoration and customisation business I have run for over two years. Beyond operations, I built the API that handles customers and orders, with input validation and a caching layer.',
          stack: ['Node.js', 'Express', 'Sequelize', 'MySQL', 'Redis', 'Joi'],
          link: 'pimp/index.html',
          linkLabel: 'View the landing'
        },
        {
          n: '04',
          title: 'Artist Finder',
          img: 'artist-finder.webp',
          titleEm: 'API',
          year: '2025',
          role: 'Backend · Python',
          desc: 'A Python API to search and retrieve information about musical artists from an external source.',
          stack: ['Python', 'REST'],
          link: 'https://bohorquezandrea.github.io/artist_finder_api/',
          linkLabel: 'Open the app'
        },
        {
          n: '05',
          title: 'Pokémon',
          img: 'pokemon-fetch.webp',
          titleEm: 'Fetch',
          year: '2025',
          role: 'Front-End · JavaScript',
          desc: 'An app that consumes the PokéAPI and renders results client-side: loading and error state handling, and dynamic DOM construction.',
          stack: ['JavaScript', 'Fetch API', 'HTML/CSS'],
          link: 'https://bohorquezandrea.github.io/pokemon_fetch_app/',
          linkLabel: 'Open the app'
        },
        {
          n: '06',
          title: 'Simon',
          img: 'simon-game.webp',
          titleEm: 'Game',
          year: '2024',
          role: 'Front-End · JavaScript',
          desc: 'The classic memory game: generated sequences, player input capture and game state control in plain JavaScript, no libraries.',
          stack: ['JavaScript', 'DOM', 'CSS'],
          link: 'https://bohorquezandrea.github.io/simongame/',
          linkLabel: 'Play it'
        }
      ]
    },
    aiAutomation: {
      eyebrow: 'AI Automation',
      title: 'What I automate',
      titleEm: 'with AI.',
      sub: 'I do not use AI to write the same code faster. I use it to build tools that do the repetitive work without me, and keep working after I close the laptop.',
      stat: { num: '2h → 20min', label: 'per product landing, after automating the process' },
      items: [
        {
          n: '01',
          h: 'Skills',
          p: 'Packaged instructions the agent loads only when a task calls for them. The VTEX/Nebula one turns a product description into the platform’s required structure without me touching the HTML.'
        },
        {
          n: '02',
          h: 'Subagents',
          p: 'Agents with their own context for work that would clutter the main conversation: broad searches across large repos, code reviews, parallel research.'
        },
        {
          n: '03',
          h: 'MCP servers',
          p: 'Connections to real tools (calendar, files, repositories) so the agent reads and acts on live data instead of whatever I paste in by hand.'
        },
        {
          n: '04',
          h: 'Prompts as code',
          p: 'If a prompt defines a workflow, it gets treated like code: versioned, reviewed and iterated. Not improvised every time.'
        }
      ]
    },
    marquee: {
      label: 'Trusted by',
      items: ['Eleva Tu Vida', 'Zalve Tattoo', 'Olímpica × Tucan', 'Miguel Trainer', 'La Birra Bar', 'Julio Carvajal Filmmaker', 'Ingenin HVAC']
    },
    problem: {
      eyebrow: 'Why it matters',
      title: 'Your current site doesn’t represent what you offer',
      sub: 'It’s not just about "having a site." It’s about your brand looking like what it charges. If any of these three rings true, we speak the same language:',
      items: [
        {
          n: '01',
          h: 'Looks like the other 50 sites in your niche',
          p: 'Generic templates, clumsy animations, off on phone screens. The brand loses personality before anyone reads a word.'
        },
        {
          n: '02',
          h: 'Built, but it isn’t yours',
          p: 'Every visual decision should serve your positioning. If the only palette is "what came with the template," there’s design debt to pay.'
        },
        {
          n: '03',
          h: 'Slow load and looks bad on phone',
          p: 'Every extra second of load time costs real attention. The sites I build sit under 2s and look impeccable on phone and tablet.'
        }
      ],
      cta: 'Let’s talk about your project'
    },
    offers: {
      eyebrow: 'How we work together',
      title: 'Four ways to put your brand online',
      sub: 'Pick based on where your business is right now. Each package includes design, build, and support. Pricing is quoted on scope, no hidden tiers.',
      items: [
        {
          tag: 'Package 01',
          title: 'Landing in',
          titleEm: 'WordPress',
          desc: 'A single page to present your business or a specific service. Live in days, connected to your WhatsApp and email.',
          features: [
            'Up to 10 custom-designed sections',
            'Figma design preview before building',
            'Smooth, consistent animations',
            'Looks impeccable on phone and tablet',
            'Contact form + WhatsApp button',
            'Connected to your existing domain and hosting',
            'Avg delivery: 4 business days'
          ],
          deliv: '4 days',
          cta: 'Let’s talk'
        },
        {
          tag: 'Package 02 · Most popular',
          title: 'Custom site in',
          titleEm: 'React',
          desc: 'For brands that want a unique site with strong identity and an experience no template can match. Multi-page, custom animations, light/dark mode.',
          features: [
            'Design and architecture from scratch, no themes',
            'Coherent visual identity in every section',
            'Curated animations and interactions',
            'Multi-language (ES/EN or whatever you need)',
            'Light and dark mode adapting to the user',
            'Accessibility and best practices',
            'Fast load on phone and desktop'
          ],
          deliv: '3–5 weeks',
          cta: 'Let’s talk'
        },
        {
          tag: 'Package 03 · Suggested',
          title: 'Custom',
          titleEm: 'integrations',
          desc: 'Your site connected to the tools you already use. Payment gateway, booking system, CRM, conversational AI, whatever your business needs. Designed around your flow, not the other way around.',
          features: [
            'Diagnosis of which tools to connect',
            'External services connected via API',
            'AI assistant trained on your information',
            'Bookings, quotes, or payments without leaving your site',
            'Sync with your CRM or database',
            'Training for your team',
            'Built to scale without touching the code'
          ],
          deliv: '4–6 weeks',
          cta: 'Let’s talk'
        },
        {
          tag: 'Package 04',
          title: 'Custom',
          titleEm: 'application',
          desc: 'When your operation needs more than a website. An app built only for your business: client area, internal panel, marketplace, services platform.',
          features: [
            'Requirements gathering with you',
            'Architecture designed for your case',
            'User panel with permissions',
            'Custom screens fitting your processes',
            'Connections to the tools you already use',
            'Hands-on launch support',
            'Documentation for your team'
          ],
          deliv: '6–10 weeks',
          cta: 'Let’s talk'
        }
      ]
    },
    midCta: {
      eyebrow: 'Let’s talk',
      line: 'Do you know exactly what you need, or are you still figuring it out?',
      sub: 'In a 30-minute call I help you scope the project, no commitment.',
      btn: 'Book a call'
    },
    stack: {
      eyebrow: 'What I can build with you',
      title: 'Where I put my',
      titleEm: 'focus',
      sub: 'These are the territories I move in when we work together. No marketing or sales promises. Just design and build of the digital piece.',
      slides: [
        {
          n: '01',
          icon: '◆',
          title: 'Custom design',
          desc: 'Figma wireframes, palette and typography chosen for your brand. No templates. Every section serves an intent.'
        },
        {
          n: '02',
          icon: '◆',
          title: 'Site build',
          desc: 'WordPress + Elementor PRO for fast deliveries, or React + Vite when something unique is needed. You pick based on where the project is.'
        },
        {
          n: '03',
          icon: '◆',
          title: 'Animations and interactions',
          desc: 'Smooth scroll transitions, curated hover states, micro-animations that guide the eye without distracting.'
        },
        {
          n: '04',
          icon: '◆',
          title: 'Light and dark mode',
          desc: 'Your site adapts to each visitor’s preference. Small detail, huge brand perception.'
        },
        {
          n: '05',
          icon: '◆',
          title: 'Multi-language',
          desc: 'ES, EN, or whatever language your market needs. Elegant nav toggle and content organized to grow with you.'
        },
        {
          n: '06',
          icon: '◆',
          title: 'Speed and lightness',
          desc: 'Optimized images, lean code, no unnecessary dependencies. Your site loads fast on any connection.'
        },
        {
          n: '07',
          icon: '◆',
          title: 'Hands-on handover',
          desc: '1-on-1 training after launch. You walk away understanding the site, not stuck with a mystery only I can touch.'
        }
      ],
      languages: 'Languages for meetings and copy: Spanish (native) · English C1 · German B2',
      controlPrev: 'Previous',
      controlNext: 'Next'
    },
    cases: {
      eyebrow: 'Selected work',
      title: 'A few brands I work with',
      sub: 'Each answered something different: a transformation program, a tattoo artist’s portfolio, retail e-commerce, a trainer’s app. What they share is being live online.',
      items: [
        {
          n: '01',
          title: 'Eleva',
          titleEm: 'Tu Vida',
          role: 'Web Developer · 100% mine · live',
          desc: 'Site for Arju Vasquez’s transformation program. Repositioned influencer in the fitness and wellness industry. Clean design, clear hierarchy, and curated CTAs throughout.',
          link: 'https://elevatuvida.pro',
          live: true
        },
        {
          n: '02',
          title: 'Zalve',
          titleEm: 'Tattoo',
          role: 'Web Developer · 100% mine · live',
          desc: 'Site for a tattoo studio. Showcases the artist’s portfolio elegantly and routes to WhatsApp booking. WordPress + Elementor PRO.',
          link: 'https://zalvetattoo.com',
          live: true
        },
        {
          n: '03',
          title: 'Olímpica',
          titleEm: '× Tucan Marketing',
          role: 'Front-End Developer · 2025 → now',
          desc: 'Layout and publishing of product pages on olimpica.com. Built from the product description: custom HTML/CSS, responsive and consistent with the visual line.',
          linkLabel: 'See product description on olimpica.com',
          link: 'https://www.olimpica.com/capsulas-cafe-juan-valdez-mujeres-44-8g/p#description',
          live: true,
          slideshow: true
        },
        {
          n: '04',
          title: 'Miguel',
          titleEm: 'Trainer',
          role: 'Web Developer · 100% mine · live',
          desc: 'App-landing for a personal trainer. Lead capture, program sections, and testimonial-style social proof.',
          link: 'https://migueltrainer.com/app/',
          live: true
        },
        {
          n: '05',
          title: 'La Birra',
          titleEm: 'Bar',
          role: 'Web Developer · image refresh · live',
          desc: 'Visual refresh of the existing site. Reorganized sections, new palette, and phone responsiveness improvements.',
          link: 'https://www.labirrabar.com',
          live: true
        },
        {
          n: '06',
          title: 'Julio Carvajal',
          titleEm: 'Filmmaker',
          role: 'Web Developer · 2024',
          desc: 'Landing page for a filmmaker in Costa Rica. Interactive galleries, dynamic reviews, and adaptive UX.',
          link: null,
          live: false,
          archived: true
        },
        {
          n: '07',
          title: 'Ingenin',
          titleEm: 'HVAC',
          role: 'Full Stack Developer · 2025',
          desc: 'Figma wireframes + WordPress landing (Elementor PRO + CSS). Thank-you pages, forms, and conversion-focused CTAs.',
          link: null,
          live: false,
          archived: true
        }
      ],
      archivedNote: 'Site later updated by a third party. Available as screenshot in extended portfolio.',
      slideshowLabel: 'Live examples on olimpica.com'
    },
    olimpicaSlideshow: {
      title: 'Olímpica × Tucan',
      sub: 'Layout and publishing of product pages on olimpica.com. A few live examples:',
      slides: [
        {
          name: 'Café Juan Valdez Gourmet Set x4',
          note: 'Layout designed from scratch. Featured case',
          url: 'https://www.olimpica.com/cafe-juan-valdez-gourmet-set-x4paq-28/p#description',
          file: 'olimpica-juan-valdez-gourmet.webp'
        },
        {
          name: 'Café Juan Valdez Mujeres capsules',
          note: 'Layout and publishing · view description',
          url: 'https://www.olimpica.com/capsulas-cafe-juan-valdez-mujeres-44-8g/p#description',
          file: 'olimpica-juan-valdez-mujeres.webp'
        },
        {
          name: 'ASUS TUF Gaming A15 · Ryzen 7',
          note: 'Product page with specs and gallery',
          url: 'https://www.olimpica.com/asus-tuf-gaming-a15-fa506ncg-hn193w-amd-ryzen-7-8gb-512gb-rtx3050/p#description',
          file: 'olimpica-asus-tuf.webp'
        },
        {
          name: 'Mabe 24kg automatic washer',
          note: 'Tech sheet with description tabs',
          url: 'https://www.olimpica.com/lavadora-automatica-agitador-24kg-diamond-gray-mabe---lmc74215wdab0/p#description',
          file: 'olimpica-lavadora-mabe.webp'
        }
      ]
    },
    process: {
      eyebrow: 'How we work',
      title: 'From idea to launched site, no surprises',
      sub: 'A simple, four-step process with concrete deliverables at every stage.',
      steps: [
        {
          n: '01',
          h: 'Discovery call',
          p: '30–45 minutes to understand your brand, client, and goal. We leave with a clear brief and a starting moodboard.'
        },
        {
          n: '02',
          h: 'Design & approval',
          p: 'Figma wireframes and clickable prototype. We iterate until you say "this is me."'
        },
        {
          n: '03',
          h: 'Build',
          p: 'Code or Elementor (per package), custom animations, weight and speed optimization. You review on preview.'
        },
        {
          n: '04',
          h: 'Launch & support',
          p: 'Published on your domain, 1-on-1 training, and post-launch support. You walk away with everything understood.'
        }
      ],
      cta: 'Let’s start'
    },
    guarantee: {
      seal: 'My promise',
      title: 'I work with you until the',
      titleEm: 'result feels like you.',
      sub: 'I don’t hand you something just because "it’s ready." We iterate as many times as needed within the agreed scope until you open the preview and say "yes, this is me." That’s the only signature that closes the project.',
      cta: 'I want to start'
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What people usually ask me',
      items: [
        {
          q: 'Why no prices on the site?',
          a: 'Because every project is different: a 5-section landing isn’t the same as a site with custom integrations. Tell me on a call what you need and I’ll send a clear proposal with scope, timeline and price, within 24 hours.'
        },
        {
          q: 'How long does it take?',
          a: 'WordPress + Elementor landing: 4 business days on average (with all material delivered). Custom React site: 3–5 weeks. Custom integrations or custom app: 4–10 weeks depending on scope. Timelines start when I have copy, images, and access in hand.'
        },
        {
          q: 'What do you need from me to start?',
          a: 'Three things: (1) domain and hosting access if you have them (BanaHosting, Hostinger, GoDaddy, whatever you use), (2) visual references (a Pinterest board works perfectly), (3) your brand’s copy and images. If you don’t have copy or images, we talk it through: I point you toward what to gather and who to hire for that piece.'
        },
        {
          q: 'Do you write copy or build branding from scratch?',
          a: 'Honest: I’m not a copywriter or marketer. My turf is design + code + integrations. If you need strong sales copy, lean on someone specialized in that. I’ll make sure that message looks impeccable on screen.'
        },
        {
          q: 'What happens after launch?',
          a: 'You walk away with the site live, domain connected, and a 1-on-1 training so you understand how it works under the hood. If you later want monthly maintenance or new sections, we quote it separately.'
        },
        {
          q: 'Do you work with clients outside Colombia?',
          a: 'Yes. I’ve worked with brands in Colombia, Costa Rica, and projects in Europe. Native Spanish, C1 English, B2 German.'
        }
      ]
    },
    cta: {
      title: 'Let us work',
      titleEm: 'together.',
      sub: 'Tell me what you want to automate and we will book a call to explore it.',
      sec: 'Reply within 24h'
    },
    contacto: {
      leyendaDatos: 'About you',
      leyendaProyecto: 'Your project',
      leyendaContacto: 'How I reach you',
      nombre: 'Full name',
      nombrePista: 'What should I call you',
      correo: 'Email address',
      proyecto: 'Project of interest',
      proyectoElige: 'Pick an option',
      proyectoOpciones: {
        'automatizacion-ventas': 'B2B sales automation',
        'inscripciones-formularios': 'Sign-up or form system',
        'landing-web': 'Landing page or company website',
        'automatizacion-claude-code': 'Claude Code automation for internal operations',
        'chatbot-quiz': 'Chatbot or quiz funnel',
        otro: 'Something else'
      },
      proyectoOtro: 'Tell me which',
      proyectoOtroPista: 'One line is enough',
      metodo: 'Preferred contact method',
      metodoOpciones: { correo: 'Email', whatsapp: 'WhatsApp', otro: 'Something else' },
      metodoOtro: 'Tell me which',
      pais: 'Country',
      paisElige: 'Pick your country',
      paisFrecuentes: 'Most common',
      paisTodos: 'All countries',
      ciudad: 'City',
      ciudadPista: 'Type it or pick from the list',
      telefono: 'Phone',
      telefonoPista: 'The country code fills in on its own',
      nota: 'Anything else you want to tell me',
      notaPista: 'Context, deadlines, rough budget. Whatever helps.',
      opcional: 'optional',
      obligatorio: 'required',
      restantes: 'characters left',
      agendaTitulo: 'Book the call',
      agendaSub: 'It is 45 minutes. Pick the slot that works for you and it is booked right away, no back and forth over email.',
      agendaCargar: 'See my available times',
      agendaCargando: 'Loading the calendar',
      agendaAlterna: 'I would rather you write me and we sort it out',
      enviar: 'Send and book',
      enviando: 'Sending',
      exitoTitulo: 'Got it, {nombre}',
      exitoTexto: 'I will email you at {correo} within 24 hours with next steps.',
      exitoOtro: 'Send another message',
      errores: {
        nombreVacio: 'Enter your name',
        nombreCorto: 'I need at least two letters',
        nombreLargo: 'That name is too long',
        correoVacio: 'Enter your email',
        correoInvalido: 'That email does not look valid. Check it has an @ and a domain.',
        correoLargo: 'That email is too long',
        correoErrata: 'Check the domain, it looks like a typo',
        proyectoVacio: 'Pick the type of project',
        proyectoInvalido: 'That option does not exist',
        proyectoOtroVacio: 'Tell me what kind of project it is',
        proyectoOtroLargo: 'Make it a little shorter',
        metodoVacio: 'Pick how you want me to reach you',
        metodoInvalido: 'That option does not exist',
        metodoOtroVacio: 'Tell me where to write you',
        metodoOtroLargo: 'Make it a little shorter',
        paisVacio: 'Pick your country',
        ciudadVacia: 'Enter your city',
        ciudadLarga: 'That name is too long',
        telefonoInvalido: 'Digits, spaces, dashes and brackets only',
        telefonoCorto: 'Too few digits for a real number',
        telefonoLargo: 'Too many digits. The country code goes separately.',
        notaLarga: 'That note is too long'
      },
      antispam: {
        error: 'The anti-spam check could not be completed.',
        expirado: 'The check expired.',
        reintentar: 'Try again'
      },
      fallos: {
        titulo: 'It could not be sent',
        antispamPendiente: 'Complete the anti-spam check before sending. If it does not appear or it fails, hit Try again.',
        sinConfigurar: 'The form is not connected yet. Write me straight to {correo} and we will take it from there.',
        red: 'No connection to the server. Check your internet and try again.',
        demasiados: 'Too many messages were sent from here in a short time. Wait a few minutes.',
        antispam: 'The anti-spam check did not pass. Tick the box and try again.',
        validacion: 'Some field did not pass the server validation. Check the form.',
        servidor: 'Something failed on my side. Try again or write me at {correo}.',
        reintentar: 'Try again'
      },
      revisaCampos: 'Check the marked fields before sending.'
    },
    footer: {
      bio: 'Andrea Bohorquez. AI Product Engineer and Full-Stack Web Developer. Mechanical engineer with a Master’s in Web Application Development (Universidad Europea de Madrid). I build product end to end and automate the repetitive parts.',
      contactTitle: 'Contact',
      email: 'andreabproyectos@gmail.com',
      city: 'Barranquilla, Colombia · remote work',
      socialTitle: 'Follow',
      menuTitle: 'Menu',
      linkedin: 'https://www.linkedin.com/in/bohorquezandrea/',
      github: 'https://github.com/bohorquezandrea',
      copy: '© 2026 Andrea Bohorquez'
    }
  }
};
