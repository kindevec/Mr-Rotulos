export type ServiceId = 'rotulos-luminosos' | 'cajas-de-luz' | 'letras-3d' | 'gigantografias';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  badge: string;
  description: string;
  features: string[];
  materials: string;
  warranty: string;
  image: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  client?: string;
  location?: string;
  image: string;
  images?: string[];
  lightingType?: string;
  dimension?: string;
  price?: string;
  originalPrice?: string;
  description?: string;
  materials?: string[];
  features?: string[];
  includes?: string;
  badge?: string;
}

export interface QuoteFormData {
  nombre: string;
  telefono: string;
  servicio: ServiceId | '';
  medidas: string;
  visitaTecnica: boolean;
  fecha?: string;
}
