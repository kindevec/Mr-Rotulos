/**
 * Mock analytics tracker and Google Sheets webhook dispatcher
 * Supports Google Ads conversion tracking (gtag_report_conversion), GA4, and Meta Pixel
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export type ConversionSource = 
  | 'header_call' 
  | 'hero_call' 
  | 'contact_call' 
  | 'header_whatsapp' 
  | 'hero_whatsapp' 
  | 'hero_primary_cta' 
  | 'floating_whatsapp' 
  | 'service_quote' 
  | 'form_submission' 
  | 'catalog_card_cta' 
  | 'catalog_modal' 
  | 'footer_whatsapp'
  | 'contact_direct';

export const trackConversionEvent = (
  eventName: string,
  params: {
    category: 'Lead' | 'Contact' | 'Engagement';
    label: string;
    source: ConversionSource;
    value?: number;
    metadata?: Record<string, unknown>;
  }
) => {
  const timestamp = new Date().toISOString();
  
  // 1. Google Ads Conversion Report
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/LABEL_MISTER_ROTULOS',
        event_category: params.category,
        event_label: params.label,
        value: params.value ?? 1.0,
        currency: 'USD',
      });
    } catch {
      // ignore in dev
    }
  }

  // 2. Google Analytics 4 (GA4)
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, {
        ...params.metadata,
        event_category: params.category,
        event_label: params.label,
        source: params.source,
        timestamp,
      });
    } catch {
      // ignore
    }
  }

  // 3. Meta Pixel (fbq)
  if (typeof window.fbq === 'function') {
    try {
      window.fbq('track', params.category === 'Lead' ? 'Lead' : 'Contact', {
        content_name: params.label,
        source: params.source,
      });
    } catch {
      // ignore
    }
  }

  // Console telemetry for developer and Google Ads QA verification
  console.info(`[Analytics Tracking Dispatched] Event: ${eventName}`, {
    ...params,
    timestamp,
  });
};

/**
 * Simulates sending payload to Google Sheets Webhook / Apps Script
 */
export const sendToGoogleSheetsWebhook = async (payload: {
  nombre: string;
  telefono: string;
  servicio: string;
  medidas: string;
  visitaTecnica: boolean;
  fecha: string;
}): Promise<{ success: boolean; message: string }> => {
  // Log strictly as required: { nombre, telefono, servicio, medidas, fecha }
  console.log('--- GOOGLE SHEETS CAPTURE LOG READY FOR APPS SCRIPT ---');
  console.log(JSON.stringify(payload, null, 2));

  // Simulate network latency for authentic UI feedback
  await new Promise((resolve) => setTimeout(resolve, 850));

  return {
    success: true,
    message: 'Datos registrados correctamente en el sistema de cotizaciones.',
  };
};

export const PHONE_NUMBER = '+593994957377';
export const FORMATTED_PHONE = '099 495 7377';
export const WHATSAPP_BASE_URL = 'https://wa.me/593994957377';

export const buildWhatsAppUrl = (customText?: string) => {
  const defaultText = 'Hola Mister Rótulos, deseo cotizar un proyecto publicitario para mi negocio en Quito.';
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(customText || defaultText)}`;
};

export type SearchIntent = 'letras-3d' | 'rotulos' | 'cajas-de-luz' | 'stands' | 'general';

export const detectSearchIntent = (): SearchIntent => {
  if (typeof window === 'undefined') return 'general';
  try {
    const pathname = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const query = (
      params.get('servicio') || 
      params.get('kw') || 
      params.get('utm_term') || 
      params.get('utm_campaign') || 
      params.get('q') || 
      params.get('buscar') || 
      ''
    ).toLowerCase();

    // 1. Énfasis prioritario en Letras 3D & Corpóreas (el producto más demandado)
    if (
      pathname.includes('letra') || 
      pathname.includes('3d') || 
      pathname.includes('corporea') || 
      pathname.includes('acero') ||
      query.includes('letra') || 
      query.includes('corporea') || 
      query.includes('corpórea') || 
      query.includes('3d') || 
      query.includes('acero') || 
      query.includes('halo') ||
      query.includes('retroiluminad')
    ) {
      return 'letras-3d';
    }

    // 2. Cajas de Luz & Menuderos
    if (
      pathname.includes('caja') || 
      pathname.includes('luz') || 
      pathname.includes('menudero') || 
      pathname.includes('neon') ||
      query.includes('caja') || 
      query.includes('luz') || 
      query.includes('menudero') || 
      query.includes('neon') || 
      query.includes('neón') || 
      query.includes('backlight')
    ) {
      return 'cajas-de-luz';
    }

    // 3. Stands, Vallas & Señalética
    if (
      pathname.includes('stand') || 
      pathname.includes('valla') || 
      pathname.includes('senal') || 
      pathname.includes('giganto') ||
      query.includes('stand') || 
      query.includes('valla') || 
      query.includes('senal') || 
      query.includes('señal') || 
      query.includes('giganto') || 
      query.includes('vidrio') ||
      query.includes('placa')
    ) {
      return 'stands';
    }

    // 4. Rótulos Comerciales & Fachadas
    if (
      pathname.includes('rotulo') || 
      pathname.includes('fachada') || 
      pathname.includes('alucobond') ||
      query.includes('rotulo') || 
      query.includes('rótulo') || 
      query.includes('letrero') || 
      query.includes('fachada') || 
      query.includes('alucobond')
    ) {
      return 'rotulos';
    }

    return 'general';
  } catch {
    return 'general';
  }
};

export const checkIsAdsMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const pathname = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const hasPathRoute = 
      pathname.includes('/letras-3d') ||
      pathname.includes('/rotulos') ||
      pathname.includes('/cajas-de-luz') ||
      pathname.includes('/stands') ||
      pathname.includes('/gigantografias');

    return (
      hasPathRoute ||
      params.has('gclid') ||
      params.has('wbraid') ||
      params.has('gbraid') ||
      params.has('servicio') ||
      params.has('kw') ||
      params.has('utm_source') ||
      params.has('utm_medium') ||
      params.has('utm_campaign') ||
      params.has('utm_term') ||
      params.has('q') ||
      params.has('buscar') ||
      params.has('landing') ||
      params.has('ads') ||
      params.has('fbclid')
    );
  } catch {
    return false;
  }
};
