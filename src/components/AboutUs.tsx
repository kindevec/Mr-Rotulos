import React from 'react';
import { Target, Compass, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="nosotros" className="relative pt-6 md:pt-10 pb-16 md:pb-24 bg-white overflow-hidden">
      
      {/* Sutil halo difuminado claro de fondo */}
      <div 
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8C0000]/[0.03] blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Grid con separación adecuada */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* ========================================================
              LADO IZQUIERDO: Cuadrícula 2x2 de 4 Imágenes Reales
             ======================================================== */}
          <div className="lg:col-span-6 relative flex justify-start">
            
            {/* Resplandor decorativo sutil de fondo */}
            <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-gradient-to-tr from-[#8C0000]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-[540px]">
              
              {/* Grid 2x2 de 4 imágenes con esquinas exteriores redondeadas */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4.5">
                
                {/* 1. Imagen Superior Izquierda */}
                <div className="relative min-h-[180px] sm:min-h-[230px] md:min-h-[260px] aspect-[4/3] rounded-tl-[36px] sm:rounded-tl-[44px] rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden bg-slate-900 shadow-md group">
                  <img
                    src="/autotec-rotulo.jpg"
                    alt="Rótulo corpóreo 3D AUTOTEC fabricado en taller"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* 2. Imagen Superior Derecha */}
                <div className="relative min-h-[180px] sm:min-h-[230px] md:min-h-[260px] aspect-[4/3] rounded-tr-[36px] sm:rounded-tr-[44px] rounded-tl-xl rounded-br-xl rounded-bl-xl overflow-hidden bg-slate-900 shadow-md group">
                  <img
                    src="/reypollo-rotulo.jpg"
                    alt="Rótulo publicitario luminoso La Brasa del Rey Pollo"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* 3. Imagen Inferior Izquierda */}
                <div className="relative min-h-[180px] sm:min-h-[230px] md:min-h-[260px] aspect-[4/3] rounded-bl-[36px] sm:rounded-bl-[44px] rounded-tl-xl rounded-tr-xl rounded-br-xl overflow-hidden bg-slate-900 shadow-md group">
                  <img
                    src="/catalog/catalog-1.jpg"
                    alt="Rótulo comercial Sabores Lojanos con letras 3D"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* 4. Imagen Inferior Derecha */}
                <div className="relative min-h-[180px] sm:min-h-[230px] md:min-h-[260px] aspect-[4/3] rounded-br-[36px] sm:rounded-br-[44px] rounded-tl-xl rounded-tr-xl rounded-bl-xl overflow-hidden bg-slate-900 shadow-md group">
                  <img
                    src="/catalog/catalog-2.jpg"
                    alt="Rótulos comerciales para restaurantes El Arepazo Paisa"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

              </div>

              {/* Insignia Central en el centro exacto de las fotos */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-slate-100 text-center pointer-events-none">
                <div className="w-7 h-7 sm:w-9 sm:h-9 mx-auto rounded-xl bg-[#8C0000]/10 text-[#8C0000] flex items-center justify-center mb-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.3]" />
                </div>
                <div className="text-lg sm:text-xl font-black text-[#191919] font-display tracking-tight leading-none mb-0.5">
                  10+ Años
                </div>
                <div className="text-[9px] sm:text-[11px] font-bold text-slate-600 leading-tight">
                  Experiencia
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================
              LADO DERECHO: Título, Historia, Misión y Visión
             ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191919] tracking-tight font-display leading-[1.15]">
                Impulsamos la Visibilidad y Prestigio de tu Negocio
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              En <strong className="text-[#191919] font-bold">Mr. Rótulos</strong> combinamos ingeniería publicitaria, corte láser CNC de alta precisión y tecnología LED Samsung de bajo consumo. Diseñamos y fabricamos rótulos duraderos y fachadas comerciales preparadas para resistir la radiación solar y el clima de Quito, captando clientes las 24 horas del día.
            </p>

            {/* Misión y Visión en Filas con Íconos */}
            <div className="space-y-6 pt-2">
              
              {/* 1. Nuestra Misión */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#8C0000]/10 text-[#8C0000] flex items-center justify-center shrink-0 group-hover:bg-[#8C0000] group-hover:text-white transition-colors duration-300 shadow-xs">
                  <Target className="w-6 sm:w-7 h-6 sm:h-7 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#191919] font-display tracking-tight mb-1">
                    Nuestra Misión
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Diseñar, fabricar e instalar soluciones de rotulación exterior e interior de máxima calidad y durabilidad, transformando la presencia visual y comercial de los negocios en Quito y todo el Ecuador.
                  </p>
                </div>
              </div>

              {/* 2. Nuestra Visión */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#8C0000]/10 text-[#8C0000] flex items-center justify-center shrink-0 group-hover:bg-[#8C0000] group-hover:text-white transition-colors duration-300 shadow-xs">
                  <Compass className="w-6 sm:w-7 h-6 sm:h-7 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#191919] font-display tracking-tight mb-1">
                    Nuestra Visión
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ser la empresa líder y referente nacional en ingeniería publicitaria y rotulación arquitectónica, reconocida por su precisión técnica, acabados de alta gama y excelencia en servicio.
                  </p>
                </div>
              </div>

            </div>

            {/* Puntos de Confianza Rápida */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#191919]">
                <CheckCircle2 className="w-4 h-4 text-[#8C0000] shrink-0" />
                <span>Garantía Escrita de 2 a 3 Años</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#191919]">
                <ShieldCheck className="w-4 h-4 text-[#8C0000] shrink-0" />
                <span>Visita Técnica en Quito</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutUs;
