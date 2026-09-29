import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { ServiceId, QuoteFormData } from '../types';
import { 
  trackConversionEvent, 
  sendToGoogleSheetsWebhook, 
  PHONE_NUMBER, 
  FORMATTED_PHONE, 
  buildWhatsAppUrl 
} from '../utils/analytics';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.34a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.63a6.34 6.34 0 0 0 10.74 4.54 6.27 6.27 0 0 0 1.95-4.57V8.58a8.3 8.3 0 0 0 3.9 1.02V6.69z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

interface ContactFormProps {
  selectedService: ServiceId | '';
  onServiceChange: (service: ServiceId | '') => void;
}

const sanitizeInput = (val: string): string => {
  return val.replace(/[<>]/g, '').trim();
};

export const ContactForm: React.FC<ContactFormProps> = ({ 
  selectedService, 
  onServiceChange 
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    nombre: '',
    telefono: '',
    servicio: selectedService,
    medidas: '',
    visitaTecnica: true,
  });

  const [companyName, setCompanyName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync external preselection from Services section
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, servicio: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Anti-spam Honeypot Check
    if (honeypot.trim()) {
      setSubmitted(true);
      return;
    }

    const cleanNombre = sanitizeInput(formData.nombre);
    const cleanPhone = sanitizeInput(formData.telefono);
    const cleanCompany = sanitizeInput(companyName);
    const cleanMedidas = sanitizeInput(formData.medidas);

    if (!cleanNombre) {
      setErrorMsg('Por favor ingresa tu nombre.');
      return;
    }
    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 8) {
      setErrorMsg('Ingresa un número de teléfono o WhatsApp válido (mínimo 8 dígitos).');
      return;
    }
    if (!formData.servicio) {
      setErrorMsg('Selecciona el tipo de servicio que deseas cotizar.');
      return;
    }

    setLoading(true);

    const submissionPayload = {
      nombre: cleanCompany ? `${cleanNombre} (${cleanCompany})` : cleanNombre,
      telefono: cleanPhone.startsWith('0') 
        ? `+593 ${cleanPhone.substring(1)}` 
        : cleanPhone.startsWith('+') ? cleanPhone : `+593 ${cleanPhone}`,
      servicio: formData.servicio,
      medidas: cleanMedidas || 'No especificadas aún (coordinar en llamada)',
      visitaTecnica: formData.visitaTecnica,
      fecha: new Date().toISOString(),
    };

    try {
      await sendToGoogleSheetsWebhook(submissionPayload);

      trackConversionEvent('lead_form_submitted', {
        category: 'Lead',
        label: `Formulario de Cotización: ${formData.servicio}`,
        source: 'form_submission',
        value: 10.0,
        metadata: {
          servicio: formData.servicio,
          visitaTecnica: formData.visitaTecnica,
        },
      });

      setSubmitted(true);
    } catch {
      setErrorMsg('Hubo un error al registrar la solicitud. Por favor contáctanos directamente por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const getServiceLabel = (id: string) => {
    switch (id) {
      case 'rotulos-luminosos':
        return 'Rótulo Luminoso / Fachada Comercial';
      case 'cajas-de-luz':
        return 'Caja de Luz LED (Slim)';
      case 'letras-3d':
        return 'Letras 3D Corpóreas (Acrílico / Acero / Neón)';
      case 'gigantografias':
        return 'Gigantografía / Impresión Gran Formato';
      default:
        return 'Cotización General de Rotulación';
    }
  };

  const generatedWhatsAppMessage = `Hola Mr Rótulos, acabo de enviar mi cotización web:%0A- *Nombre:* ${encodeURIComponent(formData.nombre)} ${companyName ? `(${encodeURIComponent(companyName)})` : ''}%0A- *Teléfono:* ${encodeURIComponent(formData.telefono)}%0A- *Servicio:* ${encodeURIComponent(getServiceLabel(formData.servicio))}%0A- *Detalles / Medidas:* ${encodeURIComponent(formData.medidas || 'Pendiente por definir')}%0A- *Requiere Visita en Quito:* ${formData.visitaTecnica ? 'Sí' : 'No'}`;

  return (
    <section id="contactos" className="relative w-full bg-[#f8f9fa]">
      
      {/* ========================================================
          1. HEADER BANNER SUPERIOR CON FONDO EXACTO DEL HERO / BANNER
         ======================================================== */}
      <div className="relative bg-[#0a0000] text-white pt-20 sm:pt-28 pb-32 sm:pb-44 px-4 overflow-hidden text-center border-b border-[#8C0000]/40">
        
        {/* Fondo base con degradado radial difuminado en rojo #8C0000 */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_15%,#2e0404_0%,#1c0202_45%,#0e0000_80%,#050000_100%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Halo de resplandor difuminado principal en rojo #8C0000 */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[450px] sm:h-[650px] bg-[#8C0000]/30 blur-[130px] sm:blur-[170px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Resplandor superior difuminado en rojo #8C0000 */}
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#8C0000]/25 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Sutil textura arquitectónica */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#8C0000_1.2px,transparent_1.2px)] [background-size:24px_24px]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight mb-4 drop-shadow-md">
            Contáctanos
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#E8E5DF]/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Mr. Rótulos está listo para brindarte la mejor solución publicitaria y lumínica de alta durabilidad para tu negocio en Quito.
          </p>
        </div>
      </div>

      {/* ========================================================
          2. TARJETA FLOTANTE BLANCA PRINCIPAL (ADAPTADA A PANTALLA COMPLETA EN MÓVIL)
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-20 mb-12 sm:mb-24 w-full">
        <div className="bg-white rounded-2xl xs:rounded-3xl sm:rounded-[44px] shadow-[0_25px_70px_rgba(0,0,0,0.14)] p-4 xs:p-6 sm:p-12 md:p-16 lg:p-20 color-changing-border w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-start">
            
            {/* ----------------------------------------------------
                COLUMNA IZQUIERDA: Información de Contacto Directo
               ---------------------------------------------------- */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191919] font-display tracking-tight mb-2 sm:mb-3">
                  Atención Directa
                </h3>
                <p className="text-xs sm:text-base text-slate-500 leading-relaxed">
                  Comunícate directamente con nuestro equipo de ingenieros publicitarios y maestros de taller en Quito.
                </p>
              </div>

              {/* Lista de Filas con Íconos Circulares de Alto Contraste */}
              <div className="space-y-4 sm:space-y-6 pt-1 text-sm sm:text-base">
                
                {/* 1. Taller & Showroom */}
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#191919] text-white flex items-center justify-center shrink-0 shadow-sm border border-slate-700 mt-0.5 group-hover:bg-black transition-colors">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#191919] text-xs sm:text-base">
                      Taller Principal & Showroom
                    </h4>
                    <a
                      href="https://maps.google.com/maps?q=-0.1444,-78.4839&z=13"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-black hover:underline transition-colors leading-relaxed block mt-0.5 sm:mt-1 text-xs sm:text-sm font-medium"
                    >
                      Av. Galo Plaza Lasso y Capitán Ramón Borja, Quito Norte
                    </a>
                  </div>
                </div>

                {/* 2. Correo Electrónico */}
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#191919] text-white flex items-center justify-center shrink-0 shadow-sm border border-slate-700 mt-0.5 group-hover:bg-black transition-colors">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#191919] text-xs sm:text-base">
                      Correo Electrónico
                    </h4>
                    <a
                      href="mailto:ventas@mrrotulosquito.com"
                      className="text-slate-600 hover:text-black hover:underline transition-colors block mt-0.5 sm:mt-1 text-xs sm:text-sm font-medium"
                    >
                      ventas@mrrotulosquito.com
                    </a>
                  </div>
                </div>

                {/* 3. Teléfono / WhatsApp */}
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#191919] text-white flex items-center justify-center shrink-0 shadow-sm border border-slate-700 mt-0.5 group-hover:bg-black transition-colors">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#191919] text-xs sm:text-base">
                      Llamadas & WhatsApp
                    </h4>
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      onClick={() => trackConversionEvent('click_to_call', {
                        category: 'Contact',
                        label: 'Llamada desde Get in touch',
                        source: 'contact_call',
                      })}
                      className="text-slate-600 hover:text-black font-bold block mt-0.5 sm:mt-1 transition-colors text-xs sm:text-sm"
                    >
                      {FORMATTED_PHONE} · +593 99 195 2889
                    </a>
                  </div>
                </div>

              </div>

              {/* Redes Sociales Oficiales en Íconos Circulares */}
              <div className="pt-4 sm:pt-6 border-t border-slate-100">
                <span className="block text-xs sm:text-sm font-bold text-slate-700 mb-2.5 sm:mb-3.5">
                  Síguenos en Redes Sociales
                </span>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok Mr. Rótulos"
                    className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-[#191919] hover:bg-black text-white flex items-center justify-center shadow-xs transition-all hover:scale-105 border border-slate-700"
                  >
                    <TikTokIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Mr. Rótulos"
                    className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-[#191919] hover:bg-black text-white flex items-center justify-center shadow-xs transition-all hover:scale-105 border border-slate-700"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Mr. Rótulos"
                    className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-[#191919] hover:bg-black text-white flex items-center justify-center shadow-xs transition-all hover:scale-105 border border-slate-700"
                  >
                    <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Mr. Rótulos"
                    className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xs transition-all hover:scale-105"
                  >
                    <WhatsAppIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
                  </a>
                </div>
              </div>

            </div>

            {/* ----------------------------------------------------
                COLUMNA DERECHA: "Envíanos un mensaje" Formulario
               ---------------------------------------------------- */}
            <div className="lg:col-span-7 lg:pl-6 w-full">
              
              <div className="mb-5 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191919] font-display tracking-tight">
                  Envíanos un mensaje
                </h3>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-8">
                  {/* Honeypot field (hidden from real users, traps automated spam bots) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_company_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  
                  {errorMsg && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-[#8C0000] text-xs sm:text-sm rounded-xl font-medium">
                      {errorMsg}
                    </div>
                  )}

                  {/* Fila 1: Nombre & Negocio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                    <div className="relative group">
                      <label htmlFor="nombre" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Tu Nombre"
                        className="w-full pb-2.5 sm:pb-3 pt-1 bg-transparent border-b-2 border-slate-200 focus:border-[#8C0000] text-sm text-[#191919] placeholder:text-slate-400 outline-none transition-colors"
                      />
                    </div>
                    <div className="relative group">
                      <label htmlFor="company" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">
                        Empresa / Local Comercial
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Nombre de tu negocio"
                        className="w-full pb-2.5 sm:pb-3 pt-1 bg-transparent border-b-2 border-slate-200 focus:border-[#8C0000] text-sm text-[#191919] placeholder:text-slate-400 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Fila 2: Teléfono & Servicio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                    <div className="relative group">
                      <label htmlFor="telefono" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="099 123 4567"
                        className="w-full pb-2.5 sm:pb-3 pt-1 bg-transparent border-b-2 border-slate-200 focus:border-[#8C0000] text-sm text-[#191919] placeholder:text-slate-400 outline-none transition-colors"
                      />
                    </div>
                    <div className="relative group">
                      <label htmlFor="servicio" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5">
                        Servicio a Cotizar *
                      </label>
                      <select
                        id="servicio"
                        required
                        value={formData.servicio}
                        onChange={(e) => {
                          const val = e.target.value as ServiceId;
                          setFormData({ ...formData, servicio: val });
                          onServiceChange(val);
                        }}
                        className="w-full pb-2.5 sm:pb-3 pt-1 bg-transparent border-b-2 border-slate-200 focus:border-[#8C0000] text-sm text-[#191919] outline-none transition-colors cursor-pointer"
                      >
                        <option value="">Selecciona una opción...</option>
                        <option value="rotulos-luminosos">Rótulos Luminosos & Fachadas</option>
                        <option value="cajas-de-luz">Cajas de Luz LED (Slim)</option>
                        <option value="letras-3d">Letras 3D Corpóreas (Acrílico/Acero)</option>
                        <option value="gigantografias">Gigantografías y Gran Formato</option>
                      </select>
                    </div>
                  </div>

                  {/* Fila 3: Mensaje / Medidas */}
                  <div className="relative group">
                    <label htmlFor="medidas" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                      Mensaje o Medidas de la Fachada
                    </label>
                    <textarea
                      id="medidas"
                      rows={3}
                      value={formData.medidas}
                      onChange={(e) => setFormData({ ...formData, medidas: e.target.value })}
                      placeholder="Escribe aquí los detalles, medidas o requerimientos de tu rótulo..."
                      className="w-full pb-2.5 pt-1 bg-transparent border-b-2 border-slate-200 focus:border-[#8C0000] text-sm text-[#191919] placeholder:text-slate-400 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Checkbox: Visita Técnica */}
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="visitaTecnica"
                      checked={formData.visitaTecnica}
                      onChange={(e) => setFormData({ ...formData, visitaTecnica: e.target.checked })}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C0000] rounded border-slate-300 focus:ring-[#8C0000] cursor-pointer accent-[#8C0000]"
                    />
                    <label htmlFor="visitaTecnica" className="text-xs sm:text-sm text-slate-600 cursor-pointer select-none">
                      Deseo visita técnica gratuita en mi local (Quito y Valles)
                    </label>
                  </div>

                  {/* Botón Enviar en #8C0000 */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-8 rounded-xl bg-[#8C0000] hover:bg-[#730000] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md shadow-[#8C0000]/25 transition-all active:scale-95 disabled:opacity-70 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <span>Enviar Mensaje</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              ) : (
                /* Estado de éxito */
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-[#191919]">
                    ¡Mensaje Enviado con Éxito!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Gracias <strong>{formData.nombre}</strong>. Hemos recibido tu solicitud para <strong>{getServiceLabel(formData.servicio)}</strong>.
                  </p>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/593991952889?text=${generatedWhatsAppMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Abrir Chat en WhatsApp</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          nombre: '',
                          telefono: '',
                          servicio: '',
                          medidas: '',
                          visitaTecnica: true,
                        });
                        setCompanyName('');
                      }}
                      className="text-xs text-slate-500 hover:text-[#8C0000] font-semibold underline"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          3. MAPA DE GOOGLE INTERACTIVO DE ANCHO COMPLETO
         ======================================================== */}
      <div className="w-full h-[320px] sm:h-[400px] border-t border-[#E8E5DF] relative">
        <iframe
          title="Ubicación de Mr. Rótulos en Quito, Ecuador"
          src="https://maps.google.com/maps?q=-0.1444,-78.4839&z=14&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-15 contrast-105 w-full h-full block"
        />
      </div>

    </section>
  );
};

export default ContactForm;
