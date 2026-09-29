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
    price: '$900.00',
    originalPrice: '$1,000.00',
    description: 'Rótulo con letras 3D más rótulo giratorio de 60 cm.',
    client: 'Sabores Lojanos',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-1.jpg',
    images: [
      '/catalog/catalog-1.jpg',
      '/hero/hero-1.png',
      '/hero/hero-7.png',
      '/hero/hero-8.jpg'
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
    badge: 'Desde $200',
    price: '$200.00',
    description: 'Rótulo de alto impacto visual para restaurantes, asaderos y locales gastronómicos.',
    client: 'El Arepazo Paisa',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-2.jpg',
    images: [
      '/catalog/catalog-2.jpg',
      '/hero/hero-4.png',
      '/hero/hero-2.jpg',
      '/hero/terramanaba-hero.png'
    ],
    lightingType: 'Luz LED 110V de alto brillo',
    dimension: 'A medida según fachada',
    materials: ['Base de alucobónd', 'Letras en acrílico', 'Luz LED 110V'],
    includes: 'Fabricación e instalación profesional'
  },
  {
    id: 'proj-3',
    title: 'Rótulos de Alto Impacto Comercial',
    category: 'comercial',
    categoryLabel: 'Comercial & Fachadas',
    badge: 'Gran Formato',
    price: '$450.00',
    originalPrice: '$550.00',
    description: 'Rótulos comerciales y fachadas de gran formato para negocios de alto tráfico vehicular y peatonal.',
    client: 'Asia Repuestos & La Trigana',
    location: 'Sector Comercial, Quito',
    image: '/catalog/catalog-3.jpg',
    images: [
      '/catalog/catalog-3.jpg',
      '/hero/hero-3.png',
      '/hero/hero-6.png',
      '/hero/hero-1.png'
    ],
    lightingType: 'Cajas de luz LED + Vinil traslúcido UV',
    dimension: 'Gran formato en doble nivel',
    materials: ['Estructura electrogalvanizada', 'Lona traslúcida pesada / Acrílico', 'Módulos LED de alto rendimiento'],
    includes: 'Estructura metálica, rotulación e instalación en altura'
  },
  {
    id: 'proj-4',
    title: 'Peluquerías & Spa',
    category: 'peluquerias',
    categoryLabel: 'Peluquerías & Salones',
    badge: 'Instalación Incluida',
    price: '$350.00',
    originalPrice: '$420.00',
    description: 'Elegancia y distinción para peluquerías, barberías y centros estéticos.',
    client: 'Karissma Peluquería & Salón',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-4.jpg',
    images: [
      '/catalog/catalog-4.jpg',
      '/hero/hero-3.png',
      '/hero/hero-5.png',
      '/hero/hero-7.png'
    ],
    lightingType: 'Luz LED 110V frontal difusa',
    dimension: 'Fachada frontal completa',
    materials: ['Marco metálico con alucobónd', 'Letras en acrílico', 'Luz LED 110V'],
    includes: 'Incluye fabricación e instalación garantizada'
  },
  {
    id: 'proj-5',
    title: 'Letras Acero Inoxidable',
    category: 'acero-inox',
    categoryLabel: 'Acero Inoxidable',
    badge: 'Garantía Total',
    price: '$380.00',
    description: 'Letras corpóreas de máxima distinción y durabilidad en acero inoxidable 304, aptas para exterior e interior.',
    client: 'Dentrix Odontología Especializada',
    location: 'Centro Médico, Quito',
    image: '/catalog/catalog-5.jpg',
    images: [
      '/catalog/catalog-5.jpg',
      '/hero/hero-6.png',
      '/hero/hero-8.jpg',
      '/hero/hero-1.png'
    ],
    lightingType: 'Opciones con o sin iluminación LED',
    dimension: 'Formato corpóreo volumétrico',
    materials: ['Acero inoxidable 304 cepillado / brillante', 'Aptas para exterior e interior', 'Garantía por escrito'],
    features: ['Aptas para el exterior', 'Con o sin luz', 'Garantía por escrito'],
    includes: 'Corte láser CNC de alta precisión, armado e instalación'
  },
  {
    id: 'proj-6',
    title: 'Letreros 3D Panaderías',
    category: 'panaderias',
    categoryLabel: 'Panaderías & Cafeterías',
    badge: 'Nuevo Modelo',
    price: '$250.00',
    originalPrice: '$310.00',
    description: 'Rótulo corpóreo sobre fondo de alucobónd tipo madera con logotipo circular y letras en acrílico con iluminación en la base.',
    client: 'Panadería Pastelería & Cafetería Kelly',
    location: 'Quito, Ecuador',
    image: '/catalog/catalog-6.jpg',
    images: [
      '/catalog/catalog-6.jpg',
      '/reypollo-rotulo.jpg',
      '/autotec-rotulo.jpg'
    ],
    lightingType: 'Iluminación LED en la base y letras de acrílico',
    dimension: 'A medida según fachada comercial',
    materials: ['Fondo de alucobónd', 'Letras en acrílico', 'Iluminación LED en la base'],
    features: ['Fondo alucobónd', 'Letras en acrílico', 'Iluminación en la base'],
    includes: 'Diseño, fabricación milimétrica e instalación garantizada'
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
