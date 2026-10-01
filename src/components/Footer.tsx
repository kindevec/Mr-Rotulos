import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { PHONE_NUMBER, FORMATTED_PHONE, buildWhatsAppUrl, trackConversionEvent } from '../utils/analytics';

const kindevIcon = '/kindev_icon.webp';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.34a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.63a6.34 6.34 0 0 0 10.74 4.54 6.27 6.27 0 0 0 1.95-4.57V8.58a8.3 8.3 0 0 0 3.9 1.02V6.69z" />
  </svg>
);

const WhatsAppOfficialIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.18 8.18 0 0 1-5.82 2.41c-1.47 0-2.91-.4-4.16-1.15l-.3-.18-3.1.81.83-3.02-.19-.31a8.21 8.21 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.24-8.24zm4.5 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3z" />
  </svg>
);

export const Footer: React.FC = () => {
  const handleLinkClick = (href: string) => {
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (platform: string) => {
    trackConversionEvent('click_whatsapp', {
      category: 'Lead',
      label: `Social Link: ${platform}`,
      source: 'footer_whatsapp' as any,
    });
  };

  return (
    <footer
      id="main-footer"
      className="relative z-10 border-t border-[#8C0000]/50 pt-8 sm:pt-12 pb-28 lg:pb-10 overflow-hidden text-[#F0EDE8] shadow-[0_-8px_30px_rgba(140,0,0,0.3)] bg-[#0d0202]"
    >
      {/* ========================================================
          FONDO DIFUMINADO ROJO #8C0000
         ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#1f0303] via-[#120202] to-[#080000] pointer-events-none">
        {/* Auras luminosas difuminadas en rojo #8C0000 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-96 rounded-full bg-[#8C0000]/30 blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full bg-[#8C0000]/35 blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-[#8C0000]/25 blur-[140px] pointer-events-none" />
      </div>

      {/* Destellos y líneas lumínicas sutiles */}
      <div className="absolute inset-0 pointer-events-none opacity-25 -z-5">
        <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <circle cx="180" cy="90" r="1.8" fill="#8C0000" />
          <circle cx="720" cy="160" r="1.4" fill="#FFFFFF" />
          <circle cx="1220" cy="70" r="2.0" fill="#8C0000" />
          <circle cx="1020" cy="380" r="1.6" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            GRID DE 4 COLUMNAS BALANCEADO
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 mb-8 sm:mb-10 items-start">
          
          {/* ----------------------------------------------------
              COLUMNA 1: Logo Oficial, Misión & Redes Sociales
             ---------------------------------------------------- */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col gap-3 sm:gap-4 text-left">
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <motion.a
                href="#inicio"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#inicio');
                }}
                className="flex items-center gap-3 group cursor-pointer select-none shrink-0 relative"
                aria-label="Mr. Rótulos - Volver arriba"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1.05, 1.15, 1],
                      opacity: [0.4, 0.8, 0.5, 0.75, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#8C0000]/70 via-[#a00000]/40 to-[#8C0000]/30 blur-md pointer-events-none"
                  />
                  <div className="absolute -inset-0.5 rounded-full bg-[#8C0000]/50 blur-xs group-hover:bg-[#8C0000]/80 transition-all duration-300 pointer-events-none" />

                  <motion.img
                    src="/logo.png"
                    alt="Mr. Rótulos Logo"
                    width="40"
                    height="40"
                    animate={{
                      y: [0, -2, 0, 1.5, 0],
                      scale: [1, 1.04, 1, 1.02, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-[0_0_14px_rgba(140,0,0,0.9)] filter contrast-[1.1] brightness-[1.05]"
                  />
                </div>
                <div className="flex flex-col text-left relative z-10">
                  <span className="font-black text-base sm:text-lg lg:text-xl tracking-tight text-white uppercase leading-none font-display">
                    MR <span className="text-white">RÓTULOS</span>
                  </span>
                  <span className="text-[9.5px] sm:text-[10.5px] tracking-[0.2em] font-bold uppercase text-white select-none mt-1">
                    INGENIERÍA PUBLICITARIA
                  </span>
                </div>
              </motion.a>

              {/* En móvil: redes sociales compactas en la misma fila con sus colores distintivos */}
              <div className="flex sm:hidden items-center gap-1.5 shrink-0">
                <motion.a
                  href="https://www.tiktok.com/@misterrotulosquito"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Mr. Rótulos"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick('TikTok')}
                  className="w-7 h-7 rounded-lg bg-black border border-white/25 flex items-center justify-center text-white shadow-[0_0_12px_rgba(254,44,85,0.45),0_0_8px_rgba(37,244,238,0.4)]"
                >
                  <TikTokIcon className="w-3.5 h-3.5 text-white" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/mr_rotulos?stkn=MWlrMTluZ2NkYTcyMg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Mr. Rótulos"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick('Instagram')}
                  className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] border border-white/25 flex items-center justify-center text-white shadow-[0_0_12px_rgba(220,39,67,0.5)]"
                >
                  <Instagram className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/mr.rotulos3d/?locale=es_LA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Mr. Rótulos"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick('Facebook')}
                  className="w-7 h-7 rounded-lg bg-[#1877F2] border border-white/25 flex items-center justify-center text-white shadow-[0_0_12px_rgba(24,119,242,0.5)]"
                >
                  <Facebook className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                </motion.a>
                <motion.a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Mr. Rótulos"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick('WhatsApp')}
                  className="w-7 h-7 rounded-lg bg-[#25D366] border border-white/25 flex items-center justify-center text-white shadow-[0_0_12px_rgba(37,211,102,0.5)]"
                >
                  <WhatsAppOfficialIcon className="w-3.5 h-3.5 text-white" />
                </motion.a>
              </div>
            </div>

            {/* Misión y Especialidad */}
            <p className="text-[11.5px] sm:text-[12.5px] text-slate-300 font-medium leading-relaxed max-w-sm text-left">
              Especialistas en rótulos luminosos LED, letras corpóreas 3D, cajas de luz y fachadas en Alucobond. Realizamos trabajos en Sierra y Oriente, próximamente en la Costa.
            </p>

            {/* Redes Sociales Oficiales en PC/Tablet con sus Colores Distintivos */}
            <div className="hidden sm:block pt-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Síguenos en Redes
              </span>
              <div className="flex items-center gap-2.5">
                <motion.a
                  href="https://www.tiktok.com/@misterrotulosquito"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Mr. Rótulos"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick('TikTok')}
                  className="w-8.5 h-8.5 rounded-xl bg-black border border-white/25 hover:border-white/50 flex items-center justify-center text-white shadow-[0_0_14px_rgba(254,44,85,0.45),0_0_10px_rgba(37,244,238,0.4)] transition-all duration-300"
                >
                  <TikTokIcon className="w-4 h-4 text-white" />
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/mr_rotulos?stkn=MWlrMTluZ2NkYTcyMg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Mr. Rótulos"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick('Instagram')}
                  className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] border border-white/25 hover:border-white/50 flex items-center justify-center text-white shadow-[0_0_16px_rgba(220,39,67,0.55)] transition-all duration-300"
                >
                  <Instagram className="w-4 h-4 text-white stroke-[2.2]" />
                </motion.a>

                <motion.a
                  href="https://www.facebook.com/mr.rotulos3d/?locale=es_LA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Mr. Rótulos"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick('Facebook')}
                  className="w-8.5 h-8.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] border border-white/25 hover:border-white/50 flex items-center justify-center text-white shadow-[0_0_16px_rgba(24,119,242,0.55)] transition-all duration-300"
                >
                  <Facebook className="w-4 h-4 text-white stroke-[2.2]" />
                </motion.a>

                <motion.a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Mr. Rótulos"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick('WhatsApp')}
                  className="w-8.5 h-8.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] border border-white/25 hover:border-white/50 flex items-center justify-center text-white shadow-[0_0_16px_rgba(37,211,102,0.55)] transition-all duration-300"
                >
                  <WhatsAppOfficialIcon className="w-4.5 h-4.5 text-white" />
                </motion.a>
              </div>
            </div>

          </div>

          {/* ----------------------------------------------------
              COLUMNA 2: Secciones / Navegación (Solo PC / Tablet)
             ---------------------------------------------------- */}
          <div className="hidden md:block col-span-1 space-y-2 sm:space-y-3 text-left">
            <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-white pb-1 border-b border-white/10">
              Secciones
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[12px] sm:text-[13px] font-medium text-slate-300">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#inicio');
                  }}
                  className="text-slate-300 hover:text-white hover:bg-black/80 px-2 py-1 rounded-md hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  <span className="text-white text-[10px]">✦</span>
                  <span>Inicio</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#servicios');
                  }}
                  className="text-slate-300 hover:text-white hover:bg-black/80 px-2 py-1 rounded-md hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  <span className="text-white text-[10px]">✦</span>
                  <span>Servicios</span>
                </a>
              </li>
              <li>
                <a
                  href="#catalogo"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#catalogo');
                  }}
                  className="text-slate-300 hover:text-white hover:bg-black/80 px-2 py-1 rounded-md hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  <span className="text-white text-[10px]">✦</span>
                  <span>Catálogo de Proyectos</span>
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#nosotros');
                  }}
                  className="text-slate-300 hover:text-white hover:bg-black/80 px-2 py-1 rounded-md hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  <span className="text-white text-[10px]">✦</span>
                  <span>Nosotros & Taller</span>
                </a>
              </li>
              <li>
                <a
                  href="#contactos"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#contactos');
                  }}
                  className="text-white font-bold hover:text-white hover:bg-black px-2 py-1 rounded-md hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 border border-white/20"
                >
                  <span className="text-white text-[10px]">✦</span>
                  <span>Contacto & Cotización</span>
                </a>
              </li>
            </ul>
          </div>

          {/* ----------------------------------------------------
              COLUMNA 3: Especialidades & Líneas de Fabricación
             ---------------------------------------------------- */}
          <div className="hidden md:block col-span-1 space-y-2 sm:space-y-3 text-left">
            <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-white pb-1 border-b border-white/10">
              Especialidades
            </h4>
            
            <ul className="space-y-1.5 sm:space-y-2 text-[12px] sm:text-[13px] text-slate-300 font-medium">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-white text-[10px]">✦</span>
                <span>Rótulos luminosos</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-white text-[10px]">✦</span>
                <span>Letras en bloques & corpóreas</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-white text-[10px]">✦</span>
                <span>Letras en acero inoxidable</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-white text-[10px]">✦</span>
                <span>Letras en acero galvanizado</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-white text-[10px]">✦</span>
                <span>Letras en madera</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-white text-[10px]">✦</span>
                <span>Fachadas en ALUCOBOND</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-white text-[10px]">✦</span>
                <span>Avisos con Neón, LED, etc.</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-white text-[10px]">✦</span>
                <span>Señaléticas viales & Vallas</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-white text-[10px]">✦</span>
                <span>Vinil para vehículos y Más...</span>
              </li>
            </ul>
          </div>

          {/* ----------------------------------------------------
              COLUMNA 4: Contacto & Horarios
             ---------------------------------------------------- */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 space-y-2 sm:space-y-3 text-left">
            <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-white pb-1 border-b border-white/10">
              Contacto
            </h4>

            <div className="space-y-2.5 sm:space-y-3 text-[11.5px] sm:text-[12.5px] font-medium">
              
              {/* Ubicación */}
              <motion.div
                whileHover={{ x: 3 }}
                className="flex items-start gap-2.5 group cursor-default select-none"
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 flex items-center justify-center shrink-0 shadow-xs mt-0.5 text-white icon-color-shift">
                  <MapPin className="w-4 h-4 text-white stroke-[2.3]" />
                </div>
                <div className="leading-snug pt-0.5">
                  <a
                    href="https://maps.google.com/maps?q=Av.+Maldonado+s38-200+y+Susana+Letor,+Quito,+Ecuador"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors block font-medium hover:underline"
                    title="Abrir ubicación en Google Maps"
                  >
                    Av. Maldonado s38-200 y Susana Letor, Quito
                  </a>
                </div>
              </motion.div>

              {/* Teléfono */}
              <motion.div
                whileHover={{ x: 3 }}
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 flex items-center justify-center shrink-0 shadow-xs text-white icon-color-shift">
                  <Phone className="w-4 h-4 text-white stroke-[2.3]" />
                </div>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={() => trackConversionEvent('click_to_call', {
                    category: 'Contact',
                    label: 'Llamada desde footer',
                    source: 'contact_call',
                  })}
                  className="text-slate-300 group-hover:text-white transition-colors font-semibold"
                >
                  {FORMATTED_PHONE}
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ x: 3 }}
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 flex items-center justify-center shrink-0 shadow-xs text-white icon-color-shift">
                  <Mail className="w-4 h-4 text-white stroke-[2.3]" />
                </div>
                <a
                  href="mailto:mrrotulosquito@gmail.com"
                  className="text-slate-300 group-hover:text-white transition-colors truncate max-w-[220px] font-semibold"
                >
                  mrrotulosquito@gmail.com
                </a>
              </motion.div>

              {/* Horarios de Atención Actualizados */}
              <motion.div
                whileHover={{ x: 3 }}
                className="flex items-center gap-2.5 group cursor-default select-none"
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 flex items-center justify-center shrink-0 shadow-xs text-white icon-color-shift">
                  <Clock className="w-4 h-4 text-white stroke-[2.3]" />
                </div>
                <div className="leading-snug text-slate-300 select-none">
                  <span className="font-semibold text-white">Lunes a domingo:</span>
                  <span className="block text-slate-300">9:00 AM – 5:00 PM</span>
                </div>
              </motion.div>

              {/* Cobertura en Provincias */}
              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-300">
                <span className="text-[#ff4d4d] font-bold block">📍 Cobertura Nacional:</span>
                <span>Sierra y Oriente (próximamente Costa)</span>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================
            BARRA INFERIOR / SUB-FOOTER
           ======================================================== */}
        <div className="pt-4 sm:pt-6 border-t border-white/10 text-[11px] sm:text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-medium">
          
          {/* Izquierda: Copyright y Enlaces Legales */}
          <div className="flex wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Mr. Rótulos. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#contactos"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contactos');
                }}
                className="text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Privacidad
              </a>
              <span>·</span>
              <a
                href="#contactos"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contactos');
                }}
                className="text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Términos
              </a>
            </div>
          </div>

          {/* Derecha: Firma Oficial KINDEV */}
          <div className="flex justify-center">
            <a 
              href="https://www.kindevsas.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-95 transition-all text-[11px] sm:text-sm flex items-center gap-2 group"
              title="Desarrollado por KINDEV"
              aria-label="Desarrollado por KINDEV"
            >
              <div className="relative inline-flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#8C0000]/40 blur-md opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                
                <img 
                  src={kindevIcon} 
                  alt="KINDEV Logo" 
                  width="28" 
                  height="28" 
                  loading="lazy" 
                  decoding="async" 
                  className="relative z-10 w-6 h-6 sm:w-7.5 sm:h-7.5 object-contain drop-shadow-[0_2px_8px_rgba(140,0,0,0.6)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 ease-out inline-block"
                />
              </div>
              <span className="text-[11px] sm:text-xs text-slate-300 group-hover:text-white transition-colors font-semibold tracking-wide">
                Desarrollado por{" "}
                <span className="font-bold text-[#F0EDE8] inline-block">
                  KINDEV
                </span>
              </span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
