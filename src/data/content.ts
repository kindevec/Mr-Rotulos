import { ServiceItem, GalleryProject } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'letras-3d',
    title: 'Letreros 3D & Letras Corpóreas',
    badge: '⭐ El Más Vendido',
    description: 'Fabricación directa de Letras en Acero Inoxidable 304, Acrílico virgen sobre Alucobond, Letras Retroiluminadas con Luz Halo LED, Letras con Césped Sintético, Alto Relieve y Letras Volumétricas monumentales.',
    features: [
      'Letras en Acero Inoxidable 304 (espejo/cepillado) y Acrílico virgen',
      'Iluminación halo indirecta (efecto silueta) o luz LED directa',
      'Combinaciones exclusivas con césped sintético y bandejas de Alucobond',
      'Logotipos empresariales en alto relieve y letras volumétricas monumentales'
    ],
    materials: 'Acero Inox 304, Acrílico virgen, Tool galvanizado, Césped sintético, MDF, LED IP67',
    warranty: 'Garantía por escrito de fabricación e instalación',
    image: '/catalog/catalog-retro-myjoker.webp',
  },
  {
    id: 'rotulos-luminosos',
    title: 'Rótulos Comerciales & Fachadas Alucobond',
    badge: 'Fachadas de Alto Impacto',
    description: 'Rótulos personalizados para restaurantes, panaderías, peluquerías y fachadas integrales en Alucobond (ACM) con electrocorte CNC computarizado y rótulos giratorios.',
    features: [
      'Rótulos para Restaurantes, Asaderos, Peluquerías y Panaderías',
      'Bandejas de Alucobond con electrocorte CNC y difusor acrílico',
      'Rótulos con sistema giratorio circular de 60cm',
      'Estructuras metálicas soldadas de alta resistencia para intemperie'
    ],
    materials: 'Alucobond (ACM), Acrílico virgen 2-5mm, Estructura soldada, Módulos LED IP67',
    warranty: 'Garantía extendida y soporte técnico',
    image: '/catalog/catalog-alucobond-concesol.webp',
  },
  {
    id: 'cajas-de-luz',
    title: 'Cajas de Luz LED, Menuderos & Neón Flex',
    badge: 'Visibilidad 24/7',
    description: 'Cajas de luz silueteadas tipo nube, menuderos modulares con película backlight intercambiable, letreros en Neón Flex 12V y rompetráficos redondos de doble cara.',
    features: [
      'Cajas de luz con silueta del contorno del logotipo (tipo nube)',
      'Menuderos individuales y modulares para comida rápida y restaurantes',
      'Letreros personalizados en Neón LED Flex de bajo consumo',
      'Rompe tráficos redondos de doble cara con soporte tipo bandera'
    ],
    materials: 'Cajas plásticas/metálicas, Backlight Film, Neón Flex 12V, Acrílico termoformado',
    warranty: 'Garantía en iluminación LED y fuentes de poder',
    image: '/catalog/catalog-luminoso-santamartha.webp',
  },
  {
    id: 'gigantografias',
    title: 'Stands para Ferias, Vallas & Señalética',
    badge: 'Gran Formato & Corporativo',
    description: 'Diseño y montaje de stands e islas para ferias (Dior, Pichincha), vallas publicitarias en azoteas con izaje en grúa, señalética en vidrio acrílico 4mm y arañas publicitarias.',
    features: [
      'Stands e islas comerciales para ferias y centros comerciales',
      'Vallas publicitarias de gran formato y cálculo estructural con grúa',
      'Señalética en vidrio acrílico de 4mm con tornillos decorativos de acero',
      'Displays portátiles tipo araña X-Banner 60x160cm'
    ],
    materials: 'Vidrio acrílico 4mm, Pernos decorativos inox, Estructuras tubulares, Lona intemperie',
    warranty: 'Montaje profesional garantizado',
    image: '/catalog/catalog-stands-dior.webp',
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Rótulos Promoción',
    category: 'promociones',
    categoryLabel: 'Promoción Especial',
    badge: 'Oferta Especial',
    description: 'Rótulo con letras 3D más rótulo giratorio de 60 cm.',
    client: 'Sabores Lojanos',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-saboreslojanos.webp',
    images: [
      '/catalog/catalog-saboreslojanos.webp'
    ],
    lightingType: 'Iluminación LED 3D Frontal + Caja Giratoria',
    dimension: 'Fachada completa + Rótulo giratorio 60cm',
    materials: ['Base de Alucobond', 'Letras en acrílico 3D', 'Rótulo circular giratorio 60cm', 'Módulos LED de alta potencia'],
    includes: 'Fabricación completa, rótulo giratorio e instalación'
  },
  {
    id: 'proj-2',
    title: 'Restaurantes & Asaderos',
    category: 'restaurantes',
    categoryLabel: 'Restaurantes & Asaderos',
    badge: 'Alta Demanda',
    description: 'Rótulos de alto impacto visual para restaurantes, asaderos, pollerías y locales gastronómicos.',
    client: 'Terra Manaba / Fritadas Sarita / Caravana / Rey Pollo / El Arepazo Paisa / Don Edgar',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-restaurante-terramanaba.webp',
    images: [
      '/catalog/catalog-restaurante-terramanaba.webp',
      '/catalog/catalog-restaurante-fritadassarita.webp',
      '/catalog/catalog-restaurante-caravana.webp',
      '/catalog/catalog-restaurante-reypollo.webp',
      '/catalog/catalog-restaurante-arepazo.webp',
      '/catalog/catalog-restaurante-donedgar.webp'
    ],
    lightingType: 'Luz LED 110V de alto brillo',
    dimension: 'A medida según fachada',
    materials: ['Base de alucobónd', 'Letras en acrílico', 'Luz LED 110V'],
    includes: 'Fabricación e instalación profesional'
  },
  {
    id: 'proj-3',
    title: 'Peluquerías',
    category: 'peluquerias',
    categoryLabel: 'Peluquerías & Barberías',
    badge: 'Instalación Incluida',
    description: 'Rótulos luminosos de alto estándar y distinción para peluquerías, salones de belleza y barberías.',
    client: 'Karissma / Balú / Unisex María Gabriela / Barbershop / Hombres Peluquería',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-peluqueria-karissma.webp',
    images: [
      '/catalog/catalog-peluqueria-karissma.webp',
      '/catalog/catalog-peluqueria-balu.webp',
      '/catalog/catalog-peluqueria-mariagabriela.webp',
      '/catalog/catalog-peluqueria-barbershop.webp',
      '/catalog/catalog-peluqueria-hombres.webp'
    ],
    lightingType: 'Luz led 110v',
    dimension: 'A medida según fachada comercial',
    materials: [
      'Marco metálico con alucubónd',
      'Letras en acrílico',
      'Luz led 110v'
    ],
    includes: 'Incluye fabricación e instalación'
  },
  {
    id: 'proj-4',
    title: 'Letras Acero Inoxidable',
    category: 'acero-inox',
    categoryLabel: 'Acero Inoxidable',
    badge: 'Garantía Total',
    description: 'Letras corpóreas de máxima distinción y durabilidad en acero inoxidable 304, de acabado elegante y profesional.',
    client: 'Dentrix Odontología / CT Hydraulic / Vida Abundante',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-acero-dentrix.webp',
    images: [
      '/catalog/catalog-acero-dentrix.webp',
      '/catalog/catalog-acero-cthydraulic.webp',
      '/catalog/catalog-acero-vida-abundante.webp'
    ],
    lightingType: 'Con o sin luz (LED frontal o halo indirecto)',
    dimension: 'Formato corpóreo volumétrico a medida',
    materials: [
      'Acero inoxidable',
      'Aptas para el exterior',
      'Con o sin luz',
      'Garantía'
    ],
    features: [
      'Aptas para el exterior',
      'Con o sin luz',
      'Garantía'
    ],
    includes: 'Corte de precisión CNC, armado, instalación y garantía escrita'
  },
  {
    id: 'proj-5',
    title: 'Rompe Tráfico 🚦 Redondos',
    category: 'rompetrafico',
    categoryLabel: 'Rompe Tráfico 🚦',
    badge: 'Doble Cara 360°',
    description: 'Letreros redondos de dos caras con iluminación e impresión de alta calidad para máxima visibilidad peatonal y vehicular.',
    client: 'Domus Fuego / Tattoo Ink / Locales Comerciales',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-rompetrafico-domusfuego.webp',
    images: [
      '/catalog/catalog-rompetrafico-domusfuego.webp',
      '/catalog/catalog-rompetrafico-redondos.webp',
      '/catalog/catalog-rompetrafico-tattoo.webp'
    ],
    lightingType: 'Iluminación LED interna de alta potencia',
    dimension: 'Redondo de dos caras con soporte tipo bandera',
    materials: [
      'Letreros redondos de dos caras',
      'Iluminación e impresión',
      'Soporte metálico resistente'
    ],
    features: [
      'Letreros redondos de dos caras',
      'Iluminación e impresión'
    ],
    includes: 'Fabricación completa de doble cara, soporte e instalación'
  },
  {
    id: 'proj-6',
    title: 'Letreros 3D Panaderías',
    category: 'panaderias',
    categoryLabel: 'Panaderías & Cafeterías',
    badge: 'Nuevo Modelo',
    description: 'Rótulo corpóreo sobre fondo de alucobónd con letras en acrílico e iluminación en la base.',
    client: 'Panadería Cafetería Alemar / Panadería Kelly',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-panaderia-alemar.webp',
    images: [
      '/catalog/catalog-panaderia-alemar.webp',
      '/catalog/catalog-panaderia-kelly.webp'
    ],
    lightingType: 'Iluminación en la base',
    dimension: 'A medida según fachada comercial',
    materials: [
      'Fondo alucobónd',
      'Letras en acrílico',
      'Iluminación en la base'
    ],
    features: [
      'Fondo alucobónd',
      'Letras en acrílico',
      'Iluminación en la base'
    ],
    includes: 'Diseño, fabricación milimétrica e instalación garantizada'
  },
  {
    id: 'proj-7',
    title: 'Letras en Acero inoxidable con césped sintético',
    category: 'acero-cesped',
    categoryLabel: 'Acero & Césped Sintético',
    badge: 'Diseño Exclusivo',
    description: 'Rótulo elegante con letras corpóreas de acero inoxidable sobre fondo verde de césped sintético o follaje artificial.',
    client: 'La Soñadora Hospedaje y Eventos / Explorers Kindergarten',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-cesped-lasonadora.webp',
    images: [
      '/catalog/catalog-cesped-lasonadora.webp',
      '/catalog/catalog-cesped-explorers.webp'
    ],
    lightingType: 'Luz LED con timer automático',
    dimension: 'A medida según pared o fachada',
    materials: [
      'Fabricación con acero inoxidable',
      'Luz LED',
      'Timer de encendido y apagado automático'
    ],
    features: [
      'Fabricación con acero inoxidable',
      'Luz LED',
      'Timer de encendido y apagado automático'
    ],
    includes: 'Fabricación con acero inoxidable, césped sintético, sistema LED, timer e instalación'
  },
  {
    id: 'proj-8',
    title: 'Letras 3D Acrílicas con Respaldo Alucubónd',
    category: 'acrilicas-alucobond',
    categoryLabel: 'Acrílico & Alucobónd',
    badge: 'Alta Demanda',
    description: 'Letras Acrílicas con respaldo de alucobónd con iluminación LED aptas para interior o exterior.',
    client: 'Pethouse / El Cacho Loco / Odontología Parker / Importadora',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-acrilico-pethouse.webp',
    images: [
      '/catalog/catalog-acrilico-pethouse.webp',
      '/catalog/catalog-acrilico-cacholoco.webp',
      '/catalog/catalog-acrilico-odontologiaparker.webp',
      '/catalog/catalog-acrilico-importadora.webp'
    ],
    lightingType: 'Iluminación LED de bajo consumo',
    dimension: 'A medida según fachada o interior',
    materials: [
      'Letras acrílicas con respaldo de alucobónd',
      'Iluminación LED',
      'Aptas para interior o exterior'
    ],
    features: [
      'Letras acrílicas con respaldo de alucobónd',
      'Iluminación LED',
      'Aptas para interior o exterior'
    ],
    includes: 'Fabricación completa con alucobónd, letras acrílicas 3D, sistema LED e instalación'
  },
  {
    id: 'proj-9',
    title: 'Letras volumétricas',
    category: 'volumetricas',
    categoryLabel: 'Letras Monumentales',
    badge: 'Gran Formato',
    description: 'Letras volumétricas disponibles en 2 tipos: en Tool galvanizado con alma de estructura (exterior) y en MDF (interiores y eventos). Altura de 1,5 metros y profundidad de 30cm.',
    client: 'Letras Monumentales Fajardo / ROKU',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-volumetricas-fajardo.webp',
    images: [
      '/catalog/catalog-volumetricas-fajardo.webp',
      '/catalog/catalog-volumetricas-roku.webp'
    ],
    dimension: 'Altura de 1,5 metros | Profundidad de 30cm',
    materials: [
      'Fabricación en Tool galvanizado con alma de estructura',
      'Fabricación en MDF de alta densidad',
      'Pintura automotriz según color corporativo',
      'VALOR NO INCLUYE BASE INSTALACIÓN'
    ],
    features: [
      'Disponibles en Tool galvanizado (exterior) y MDF (interior/eventos)',
      'Altura de 1,5 metros y profundidad de 30cm',
      'Pintura automotriz según color corporativo',
      'VALOR NO INCLUYE BASE INSTALACIÓN'
    ],
    includes: 'Fabricación en Tool galvanizado o MDF con pintura automotriz (VALOR NO INCLUYE BASE NI INSTALACIÓN)'
  },
  {
    id: 'proj-10',
    title: 'Arañas Publicitarias',
    category: 'aranas',
    categoryLabel: 'Display Publicitario',
    badge: 'Portátil & Económico',
    description: 'Estructuras tipo araña (X-Banner) portátiles y livianas con impresión full color en lona de alta resistencia.',
    client: 'Academia Bíblica Internacional / Eventos',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-aranas-publicitarias.webp',
    images: [
      '/catalog/catalog-aranas-publicitarias.webp'
    ],
    dimension: 'Tamaño 60x160 centímetros',
    materials: [
      'Estructura tipo araña (X-Banner)',
      'Lona impresa full color',
      'Ojalillos reforzados'
    ],
    features: [
      'Tamaño 60x160 centímetros',
      'Lona impresa full color'
    ],
    includes: 'Estructura tipo araña + Lona impresa full color'
  },
  {
    id: 'proj-11',
    title: 'Neón Flex',
    category: 'neon-flex',
    categoryLabel: 'Neón LED Flex',
    badge: 'Tendencia 2026',
    description: 'Letreros de Neón Flex modernos y luminosos con colores vivos y muy bajo consumo de energía eléctrica.',
    client: 'Oh My Dog! / BE Clinique / Burger / Clínica Biodent',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-neon-ohmydog.webp',
    images: [
      '/catalog/catalog-neon-ohmydog.webp',
      '/catalog/catalog-neon-beclinique.webp',
      '/catalog/catalog-neon-burger.webp',
      '/catalog/catalog-neon-biodent.webp',
      '/catalog/catalog-neon-campanas.webp'
    ],
    lightingType: 'Neón LED Flex continuo de 12V',
    dimension: 'A medida según diseño o silueta acrílica',
    materials: [
      'Letreros de Neon Flex',
      'Aptos para Interior y Exterior',
      'Consumo muy bajo de energía eléctrica'
    ],
    features: [
      'Letreros de Neon Flex',
      'Aptos para Interior y Exterior',
      'Consumo muy bajo de energía eléctrica'
    ],
    includes: 'Base acrílica ruteada, Neón LED Flex, transformador 12V e instalación'
  },
  {
    id: 'proj-12',
    title: 'Letras 3D luz directa',
    category: 'luz-directa',
    categoryLabel: 'Luz Directa 3D',
    badge: 'Impacto Visual',
    description: 'Rótulos luminosos de alto impacto con base de alucobónd y letras acrílicas 3D de iluminación frontal directa.',
    client: 'Maverlab / Óptica Veo Veo / Escuela Cenec / Tu Médico de Cabecera',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-luzdirecta-maverlab.webp',
    images: [
      '/catalog/catalog-luzdirecta-maverlab.webp',
      '/catalog/catalog-luzdirecta-opticaveoveo.webp',
      '/catalog/catalog-luzdirecta-cenec.webp',
      '/catalog/catalog-luzdirecta-tumedicodecabecera.webp'
    ],
    lightingType: 'Luz LED blanca directa',
    dimension: 'A medida según fachada comercial',
    materials: [
      'Alucobónd color azul o a elección',
      'Letras en acrílico para exterior',
      'Luz LED blanca'
    ],
    features: [
      'Alucobónd color azul o a elección',
      'Letras en acrílico para exterior',
      'Luz LED blanca'
    ],
    includes: 'Fabricación con alucobónd, letras acrílicas 3D, módulos LED blancos e instalación garantizada'
  },
  {
    id: 'proj-13',
    title: 'Logos circulares',
    category: 'logos-circulares',
    categoryLabel: 'Logos Circulares',
    badge: 'Elegancia Premium',
    description: 'Logos circulares en acrílico con letras en acabado espejo dorado, rosado o plateado y sofisticada luz indirecta.',
    client: 'Moonlight Mocktails / Rich Baby Store',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-circular-moonlight.webp',
    images: [
      '/catalog/catalog-circular-moonlight.webp',
      '/catalog/catalog-circular-richbaby.webp'
    ],
    lightingType: 'Con luz indirecta perimetral',
    dimension: 'Circular a medida según diseño',
    materials: [
      'Acrílico transparente',
      'Letras en acrílico dorado rosado o plateado',
      'Con luz indirecta y tornillos decorativos'
    ],
    features: [
      'Acrílico transparente',
      'Letras en acrílico dorado rosado o plateado',
      'Con luz indirecta y tornillos decorativos'
    ],
    includes: 'Placa de acrílico circular, letras acrílicas, luz indirecta y tornillos decorativos'
  },
  {
    id: 'proj-14',
    title: 'Logotipo Empresarial Alto Relieves',
    category: 'alto-relieve',
    categoryLabel: 'Corporativo & Oficinas',
    badge: 'Alta Distinción',
    description: 'Logotipos empresariales en alto relieve milimétrico para oficinas, recepciones y muros corporativos.',
    client: 'Cobro Fast / Andersen Tax / SISVAA / IMVEC / Ecofloor',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-altorelieve-cobrofast.webp',
    images: [
      '/catalog/catalog-altorelieve-cobrofast.webp',
      '/catalog/catalog-altorelieve-andersen.webp',
      '/catalog/catalog-altorelieve-sisvaa.webp',
      '/catalog/catalog-altorelieve-imvec.webp',
      '/catalog/catalog-altorelieve-ecofloor.webp'
    ],
    dimension: 'A medida según pared corporativa',
    materials: [
      'MDF',
      'Acrílico Blanco - Dorado - Plata - Rosado',
      'Instaladas',
      'Garantía'
    ],
    features: [
      'MDF y Acrílico (Blanco, Dorado, Plata, Rosado)',
      'Instaladas con acabado profesional',
      'Garantía por escrito'
    ],
    includes: 'Fabricación en MDF / Acrílico, corte de precisión, instalación y garantía'
  },
  {
    id: 'proj-15',
    title: 'Letras retro iluminacion',
    category: 'retroiluminadas',
    categoryLabel: 'Retroiluminadas',
    badge: 'Luz Halo 3D',
    description: 'Letras volumétricas retroiluminadas fabricadas en tool galvanizado con acabado en pintura automotriz y montaje directo a la pared.',
    client: 'AYMESA / Mikuna / Chulpi',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-retroiluminadas-aymesa.webp',
    images: [
      '/catalog/catalog-retroiluminadas-aymesa.webp',
      '/catalog/catalog-retroiluminadas-mikuna.webp',
      '/catalog/catalog-retroiluminadas-chulpi.webp'
    ],
    lightingType: 'Luz LED blanca (Efecto Halo)',
    dimension: 'Fabricación personalizada a medida',
    materials: [
      'Material tool galvanizado',
      'Luz led blanca',
      'Pintura automotriz a elección.',
      'Directo a la pared'
    ],
    features: [
      'Material tool galvanizado',
      'Luz led blanca',
      'Pintura automotriz a elección',
      'Directo a la pared'
    ],
    includes: 'Fabricación en tool galvanizado, pintura automotriz a elección, sistema LED blanco e instalación directa a la pared'
  },
  {
    id: 'proj-16',
    title: 'Letreros Forma de nube',
    category: 'forma-de-nube',
    categoryLabel: 'Cajas Silueteadas',
    badge: 'Silueta de Logotipo',
    description: 'Cajas de luz silueteadas en forma de nube siguiendo el contorno exacto de tu logotipo para un impacto visual único y personalizado.',
    client: 'Le Karbon´e / Dental Sí / Vicky Smile',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-nube-lekarbone.webp',
    images: [
      '/catalog/catalog-nube-lekarbone.webp',
      '/catalog/catalog-nube-dentalsi.webp',
      '/catalog/catalog-nube-vickysmile.webp'
    ],
    lightingType: 'Iluminación LED interna de alta intensidad',
    dimension: 'Silueta y medidas según el diseño del logotipo',
    materials: [
      'El logotipo dando su característica',
      'Acrílico difusor de alto impacto',
      'Módulos LED de alta luminosidad',
      'Estructura silueteada con cantos termoformados'
    ],
    features: [
      'El logotipo dando su característica silueta',
      'Caja de luz contorneada a medida',
      'Iluminación LED uniforme y nítida',
      'Apto para interior y fachada exterior'
    ],
    includes: 'Fabricación silueteada según forma del logotipo, sistema de iluminación LED interna e instalación'
  },
  {
    id: 'proj-17',
    title: 'Señalética en vidrio acrílico',
    category: 'senaletica',
    categoryLabel: 'Señalética & Directorios',
    badge: 'Vidrio 4mm + Pernos',
    description: 'Placas y señalética corporativa en vidrio acrílico de 4mm con tornillos decorativos de acero para clínicas, oficinas y consultorios.',
    client: 'Lafquén Constructora / Clínica Génesis',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-senaletica-lafquen.webp',
    images: [
      '/catalog/catalog-senaletica-lafquen.webp',
      '/catalog/catalog-senaletica-recepcion.webp',
      '/catalog/catalog-senaletica-signosvitales.webp',
      '/catalog/catalog-senaletica-ginecologia.webp'
    ],
    lightingType: 'Acabado esmerilado / traslúcido elegante',
    dimension: 'Medidas estándar y personalizadas según área',
    materials: [
      'Vidrio de 4mm',
      'Tornillos decorativos'
    ],
    features: [
      'Vidrio acrílico de 4mm',
      'Tornillos decorativos de acero inoxidable',
      'Impresión de alta resolución / vinil',
      'Ideal para consultorios, clínicas y oficinas'
    ],
    includes: 'Placa en vidrio acrílico 4mm, gráfica corporativa personalizada y kit de tornillos decorativos de fijación'
  },
  {
    id: 'proj-18',
    title: 'Letras retro iluminacion',
    category: 'retroiluminadas',
    categoryLabel: 'Retroiluminadas',
    badge: 'Efecto Halo LED',
    description: 'Letras volumétricas con retroiluminación halo fabricadas en tool galvanizado con acabado en pintura automotriz para fachadas e interiores.',
    client: 'Federación Ecuatoriana de Enfermeras / My Joker',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-retro-myjoker.webp',
    images: [
      '/catalog/catalog-retro-myjoker.webp',
      '/catalog/catalog-retro-enfermeras.webp'
    ],
    lightingType: 'Luz LED blanca (Halo indirecto)',
    dimension: 'Fabricación personalizada a medida',
    materials: [
      'Material tool galvanizado',
      'Luz led blanca',
      'Pintura automotriz a elección.',
      'Directo a la pared'
    ],
    features: [
      'Material tool galvanizado',
      'Luz led blanca',
      'Pintura automotriz a elección',
      'Directo a la pared'
    ],
    includes: 'Fabricación en tool galvanizado, pintura automotriz a elección, módulos LED blancos e instalación directa a la pared'
  },
  {
    id: 'proj-19',
    title: 'Stands',
    category: 'stands-ferias',
    categoryLabel: 'Stands & Ferias',
    badge: 'Todo para Ferias',
    description: 'Diseño, fabricación y montaje de stands corporativos e islas comerciales de alto impacto para ferias, exposiciones y centros comerciales.',
    client: 'Dior / Banco Pichincha / Floralp',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-stands-dior.webp',
    images: [
      '/catalog/catalog-stands-dior.webp',
      '/catalog/catalog-stands-bancopichincha.webp',
      '/catalog/catalog-stands-floralp.webp'
    ],
    lightingType: 'Iluminación LED integrada en estructuras y tarimas',
    dimension: 'Diseño y dimensiones a medida según espacio',
    materials: [
      'Todo para ferias',
      'MDF, Melamina y Acabados Dorados / Madera',
      'Sistemas de iluminación LED directa e indirecta',
      'Mobiliario y counter de atención'
    ],
    features: [
      'Todo para ferias',
      'Diseño personalizado y arquitectura comercial',
      'Montaje y desmontaje profesional',
      'Acabados de alta gama e iluminación integrada'
    ],
    includes: 'Diseño modular, fabricación de estructuras y counter, iluminación LED integrada, rotulación corporativa y montaje'
  },
  {
    id: 'proj-20',
    title: 'Letras 3D sin luz + Instalación',
    category: 'letras-sin-luz',
    categoryLabel: 'Rótulos Económicos 3D',
    badge: 'Rótulos Económicos',
    description: 'Rótulos económicos de alto impacto visual aptos para exterior con estructura metálica, lona impresa laminada y letras volumétricas en acero galvanizado.',
    client: 'Sweet Waffles / Sede Social / Maitane',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-sinluz-sweetwaffles.webp',
    images: [
      '/catalog/catalog-sinluz-sweetwaffles.webp',
      '/catalog/catalog-sinluz-sedesocial.webp',
      '/catalog/catalog-sinluz-maitane.webp'
    ],
    lightingType: 'Sin iluminación interna (Apto para reflectores)',
    dimension: 'A partir de 3 metros baja a $150',
    materials: [
      'Rótulos Económicos aptos para el exterior',
      'Estructura metálica, lona impresa laminada',
      'Letras metálicas en acero galvanizado',
      'Pintura a elección.',
      'Su costo baja a partir de los 3 metros a 150 dólares'
    ],
    features: [
      'Rótulos Económicos aptos para el exterior',
      'Estructura metálica y lona impresa laminada',
      'Letras metálicas en acero galvanizado',
      'Pintura a elección',
      'Su costo baja a partir de los 3 metros a $150'
    ],
    includes: 'Estructura metálica, lona laminada, letras en acero galvanizado con pintura a elección e instalación'
  },
  {
    id: 'proj-21',
    title: 'Rótulo luminoso',
    category: 'cajas-de-luz',
    categoryLabel: 'Cajas de Luz & Rótulos',
    badge: 'Instalación GRATIS',
    description: 'Cajas de luz y rótulos luminosos de alto impacto para negocios con estructura metálica reforzada, lona traslúcida 1440dpi y tecnología LED continua.',
    client: 'Farmacias Santa Martha / MDO Menudo / Chavitas',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-luminoso-santamartha.webp',
    images: [
      '/catalog/catalog-luminoso-santamartha.webp',
      '/catalog/catalog-luminoso-mdomenudo.webp',
      '/catalog/catalog-luminoso-chavitas.webp'
    ],
    lightingType: 'Luz LED 25.000 horas continuas de alta durabilidad',
    dimension: 'Fabricación a medida frontal o esquinera',
    materials: [
      'Estructura metálica',
      'Lona Impresa full color 1440dpi',
      'Luz LED 25mil horas continuas',
      'Instalación GRATIS'
    ],
    features: [
      'Estructura metálica reforzada',
      'Lona Impresa full color 1440dpi',
      'Luz LED 25mil horas continuas',
      'Instalación GRATIS incluida'
    ],
    includes: 'Estructura metálica, impresión en lona traslúcida 1440dpi, iluminación LED 25.000 hrs e instalación gratuita'
  },
  {
    id: 'proj-22',
    title: 'Menudero individuales',
    category: 'menuderos',
    categoryLabel: 'Menús & Displays',
    badge: 'Backlight HD',
    description: 'Cajas plásticas de luz y paneles menuderos modulares con película back light intercambiable de alta definición para locales gastronómicos.',
    client: 'Scooby Duu / La Salchipapería / Dorichoclo',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-menuderos-scoobyduu.webp',
    images: [
      '/catalog/catalog-menuderos-scoobyduu.webp',
      '/catalog/catalog-menuderos-choclito.webp'
    ],
    lightingType: 'Iluminación LED interna para película Backlight',
    dimension: 'Módulos individuales combinables a medida',
    materials: [
      'Caja plástica de luz',
      'Impresiones back light'
    ],
    features: [
      'Caja plástica de luz de fácil apertura',
      'Impresiones back light de alta definición',
      'Gráfica intercambiable rápida',
      'Iluminación uniforme de alto impacto'
    ],
    includes: 'Caja plástica de luz individual, lámina back light impresa full color y sistema de iluminación integrado'
  },
  {
    id: 'proj-23',
    title: 'Alucobond',
    category: 'alucobond-corte',
    categoryLabel: 'Alucobond & Fachadas',
    badge: 'Electrocorte CNC',
    description: 'Rótulos arquitectónicos tipo bandeja en panel de Alucobond con electrocorte CNC de alta precisión, difusor en acrílico blanco 2mm y luz LED interna.',
    client: 'CONCESOL Residencia para mayores',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-alucobond-concesol.webp',
    images: [
      '/catalog/catalog-alucobond-concesol.webp'
    ],
    lightingType: 'Luz LED interna con difusor acrílico',
    dimension: 'Bandeja arquitectónica a medida corporativa',
    materials: [
      'Alucobond con electrocorte',
      'Acrílico blanco 2mm',
      'Estructura metálica',
      'Luz led'
    ],
    features: [
      'Alucobond con electrocorte de precisión',
      'Acrílico blanco difusor de 2mm',
      'Estructura metálica interior reforzada',
      'Sistema de iluminación LED de alta duración'
    ],
    includes: 'Bandeja en Alucobond calada con electrocorte, acrílico blanco 2mm, estructura metálica, módulos LED e instalación'
  },
  {
    id: 'proj-24',
    title: 'Vallas publicitarias',
    category: 'vallas-publicitarias',
    categoryLabel: 'Vallas & Gran Formato',
    badge: 'Gran Formato',
    description: 'Estructuras de gran formato y vallas publicitarias en azoteas o exteriores con lonas de alta resistencia o letras volumétricas e izaje técnico con grúa.',
    client: 'El Ordeño / Hornados Venga Mi Rey',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-vallas-elordeno.webp',
    images: [
      '/catalog/catalog-vallas-elordeno.webp',
      '/catalog/catalog-vallas-vengamirey.webp'
    ],
    lightingType: 'Opción con reflectores LED o letras 3D luminosas',
    dimension: 'Gran formato a medida según terreno o azotea',
    materials: [
      'Estructura metálica de alta resistencia',
      'Lona de alta densidad para intemperie',
      'Letras volumétricas 3D (opcional)',
      'Montaje especializado con grúa'
    ],
    features: [
      'Estructuras de ingeniería para altura',
      'Materiales resistentes a viento y clima',
      'Izaje y montaje profesional con grúa',
      'Máximo alcance y visibilidad publicitaria'
    ],
    includes: 'Fabricación de estructura metálica, confección de lona/letras, transporte, montaje con grúa y fijación de seguridad'
  }
];

export const WORK_PROCESS = [
  {
    step: '01',
    title: 'Asesoría y Medidas',
    description: 'Coordinamos una visita técnica a tu local en Quito o valles, o evaluamos tus fotos y planos para definir el tipo de rótulo óptimo para tu fachada.',
    timing: 'Mismo día / 24 horas',
  },
  {
    step: '02',
    title: 'Diseño y Render 3D Previo',
    description: 'Montamos un fotomontaje fotorrealista sobre la foto real de tu fachada para que veas con total certeza cómo lucirá de día y de noche antes de fabricar.',
    timing: '1 a 2 días hábiles',
  },
  {
    step: '03',
    title: 'Fabricación CNC y Armado',
    description: 'Corte milimétrico en Router CNC, ensamblaje de perfiles, instalación de módulos LED Samsung IP67 y cableado certificado bajo normativa de seguridad eléctrica.',
    timing: '3 a 6 días hábiles',
  },
  {
    step: '04',
    title: 'Instalación y Garantía Escrita',
    description: 'Nuestro equipo técnico ejecuta la fijación en altura con anclajes estructurales de alta resistencia y pruebas de encendido. Entrega de póliza de garantía.',
    timing: 'Entrega final probada',
  },
];

export const REVIEWS = [
  {
    quote: 'El rótulo en acrílico con luz indirecta para nuestro restaurante en La Carolina superó todas las expectativas. Los clientes identifican el local a 2 cuadras de distancia.',
    author: 'Ing. Carlos Mantilla',
    role: 'Gerente General',
    company: 'Palermo Bistro & Lounge',
    rating: 5,
  },
  {
    quote: 'Puntualidad impecable. Nos hicieron la visita técnica en Cumbayá el mismo día que llamamos y en una semana el rótulo corporativo ya estaba instalado con garantía de 3 años.',
    author: 'Dra. María Elena Viteri',
    role: 'Directora Médica',
    company: 'Clínica Dental Andina',
    rating: 5,
  },
  {
    quote: 'Excelente relación costo-calidad en la caja de luz de 6 metros. El consumo eléctrico es mínimo gracias a los LEDs Samsung y los acabados en aluminio son de primer nivel.',
    author: 'Lcdo. Roberto Morales',
    role: 'Administrador',
    company: 'Distribuidora Farmacéutica Pichincha',
    rating: 5,
  },
];
