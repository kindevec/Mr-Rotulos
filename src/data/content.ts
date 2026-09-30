import { ServiceItem, GalleryProject } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'rotulos-luminosos',
    title: 'Rótulos Luminosos y Fachadas',
    badge: 'Máximo Impacto Exterior',
    description: 'Transformación total de la fachada comercial con estructuras de acero electrogalvanizado, paneles de aluminio compuesto (ACM) y lonas tensadas traslúcidas.',
    features: [
      'Tratamiento anticorrosivo para el clima de Quito',
      'Iluminación uniforme sin sombras internas',
      'Diseño estructural sismo-resistente y seguro',
      'Acabados mate, brillante o madera arquitectónica'
    ],
    materials: 'ACM (Alucobond) + Estructura soldada + Módulos LED IP67',
    warranty: 'Garantía extendida de 24 meses',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cajas-de-luz',
    title: 'Cajas de Luz LED (Slim & Ultra-Bright)',
    badge: 'Ahorro 70% de Energía',
    description: 'Estructuras perimetrales de aluminio extruido con difusores acrílicos de alta transmitancia lumínica. Visibilidad 24/7 con consumo eléctrico mínimo.',
    features: [
      'Módulos LED Samsung de alta eficiencia lumínica',
      'Perfilería extrafina para acabados premium',
      'Fácil recambio de gráfica para promociones',
      'Fuentes de poder MeanWell con supresión de picos'
    ],
    materials: 'Aluminio anodizado + Acrílico colado 3-5mm + LED 6500K / 3000K',
    warranty: 'Garantía de 3 años en módulos LED',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'letras-3d',
    title: 'Letras 3D Corpóreas (Canal / Halo)',
    badge: 'Elegancia Corporativa',
    description: 'Letras volumétricas cortadas milimétricamente en Router CNC y láser de fibra. Opciones con luz frontal difusa, iluminación halo indirecta o acabado macizo sin luz.',
    features: [
      'Corte de precisión CNC en acrílico, acero y aluminio',
      'Iluminación indirecta Halo (luz cálida o fría sobre pared)',
      'Ideal para recepciones, edificios y locales de alto tráfico',
      'Pintura electrostática con código Pantone de tu marca'
    ],
    materials: 'Acero inoxidable 304, Acrílico virgen, MDF hidrófugo',
    warranty: 'Garantía estructural de 3 años',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gigantografias',
    title: 'Gigantografías y Gran Formato',
    badge: 'Alta Definición 1440 DPI',
    description: 'Impresión digital ecológica de alta resistencia a los rayos UV del sol andino de Quito. Vallas publicitarias, viniles microperforados para vitrinas y lonas frontlit.',
    features: [
      'Tintas eco-solventes con filtro UV de larga duración',
      'Vinil microperforado con homologación de visibilidad',
      'Lona frontlit y backlit pesada anti-desgarre (13oz y 15oz)',
      'Instalación profesional en vidrieras y alturas'
    ],
    materials: 'Lona Panamá / Lona Frontlit 13oz + Viniles Arlon / 3M',
    warranty: '12 meses contra decoloración solar',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
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
    client: 'Terra Manaba / Hornados Venga Mi Rey / Caravana / Rey Pollo / El Arepazo Paisa / Don Edgar',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-restaurante-terramanaba.webp',
    images: [
      '/catalog/catalog-restaurante-terramanaba.webp',
      '/catalog/catalog-restaurante-vengamirey.webp',
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
    description: 'Letras volumétricas de gran escala fabricadas en tool galvanizado con pintura automotriz de máxima durabilidad.',
    client: 'Letras Monumentales Fajardo',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-volumetricas-fajardo.webp',
    images: [
      '/catalog/catalog-volumetricas-fajardo.webp'
    ],
    dimension: 'Altura de 1,5 metros | Profundidad de 30cm',
    materials: [
      'Tool galvanizado con alma de estructura',
      'Pintura automotriz según color corporativo'
    ],
    features: [
      'Altura de 1,5 metros y profundidad de 30cm',
      'Tool galvanizado con alma de estructura',
      'Pintura automotriz según color corporativo'
    ],
    includes: 'Fabricación y pintura (VALOR NO INCLUYE BASE NI INSTALACIÓN)'
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
