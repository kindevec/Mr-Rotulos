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

export type ConversionSource = 'header_call' | 'hero_call' | 'contact_call' | 'header_whatsapp' | 'hero_whatsapp' | 'floating_whatsapp' | 'service_quote' | 'form_submission';

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

export const PHONE_NUMBER = '+593991952889';
export const FORMATTED_PHONE = '099 195 2889';
export const WHATSAPP_BASE_URL = 'https://wa.me/593991952889';

export const buildWhatsAppUrl = (customText?: string) => {
  const defaultText = 'Hola Mister Rótulos, deseo cotizar un proyecto publicitario para mi negocio en Quito.';
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(customText || defaultText)}`;
};
