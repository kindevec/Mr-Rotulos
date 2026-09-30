import React from 'react';
import { Target, Compass, Award } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="nosotros" className="relative pt-6 md:pt-10 pb-16 md:pb-24 bg-white overflow-hidden">
      
      {/* Sutil halo difuminado claro de fondo */}
      <div 
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8C0000]/[0.03] blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Grid con mayor espacio para las tarjetas (7 cols vs 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* ========================================================
              LADO IZQUIERDO: Cuadrícula 2x2 de 4 Imágenes Reales (7 Columnas)
             ======================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex justify-center w-full">
            
            {/* Resplandor decorativo sutil de fondo */}
            <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-gradient-to-tr from-[#8C0000]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-[780px] xl:max-w-[820px]">
              
              {/* Grid 2x2 de 4 imágenes con mayor ancho horizontal y misma altura vertical */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5.5 w-full">
                
                {/* 1. Imagen Superior Izquierda: Instalación en proceso */}
                <div className="relative w-full min-w-0 aspect-[4/3.4] sm:aspect-[4/3.35] rounded-tl-[36px] sm:rounded-tl-[48px] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl overflow-hidden bg-slate-900 shadow-lg group">
                  <img
                    src="/about/about-instalacion-odontologia.jpg"
                    alt="Equipo técnico de MR Rótulos instalando rótulo luminoso en fachada"
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_30%] group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* 2. Imagen Superior Derecha: Chulpi */}
                <div className="relative w-full min-w-0 aspect-[4/3.4] sm:aspect-[4/3.35] rounded-tr-[36px] sm:rounded-tr-[48px] rounded-tl-2xl rounded-br-2xl rounded-bl-2xl overflow-hidden bg-slate-900 shadow-lg group">
                  <img
                    src="/about/about-chulpi-rotulo.jpg"
                    alt="Letras 3D corpóreas con retroiluminación LED Chulpi"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* 3. Imagen Inferior Izquierda: Sede Vida Abundante */}
                <div className="relative w-full min-w-0 aspect-[4/3.4] sm:aspect-[4/3.35] rounded-bl-[36px] sm:rounded-bl-[48px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl overflow-hidden bg-slate-900 shadow-lg group">
                  <img
                    src="/about/about-vida-abundante.jpg"
                    alt="Rótulo corpóreo luminoso SEDE VA Vida Abundante"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* 4. Imagen Inferior Derecha: Instalación El Ordeño con grúa y andamios */}
                <div className="relative w-full min-w-0 aspect-[4/3.4] sm:aspect-[4/3.35] rounded-br-[36px] sm:rounded-br-[48px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl overflow-hidden bg-slate-900 shadow-lg group">
                  <img
                    src="/about/about-el-ordeno-instalacion.jpg"
                    alt="Instalación industrial de rótulo gran formato El Ordeño con grúa y equipo técnico"
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
              LADO DERECHO: Título Centrado, Historia, Misión y Visión (5 Columnas)
             ======================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center items-center text-center space-y-6">
            
            <div className="text-center max-w-lg">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#191919] tracking-tight font-display leading-[1.15]">
                Impulsamos la Visibilidad y Prestigio de tu Negocio
              </h2>
              <div className="w-16 h-1 bg-[#8C0000] rounded-full mx-auto mt-4 mb-2"></div>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal text-center max-w-lg">
              En <strong className="text-[#191919] font-bold">Mr. Rótulos</strong> combinamos ingeniería publicitaria, corte láser CNC de alta precisión y tecnología LED Samsung de bajo consumo. Diseñamos y fabricamos rótulos duraderos y fachadas comerciales preparadas para resistir el clima de Quito, captando clientes las 24 horas del día.
            </p>

            {/* Misión y Visión Centradas */}
            <div className="space-y-6 pt-2 w-full max-w-lg">
              
              {/* 1. Nuestra Misión */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#8C0000]/10 text-[#8C0000] flex items-center justify-center mb-2.5 group-hover:bg-[#8C0000] group-hover:text-white transition-colors duration-300 shadow-xs">
                  <Target className="w-6 sm:w-7 h-6 sm:h-7 stroke-[2.2]" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#191919] font-display tracking-tight mb-1">
                  Nuestra Misión
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Diseñar, fabricar e instalar soluciones de rotulación exterior e interior de máxima calidad y durabilidad, transformando la presencia visual y comercial de los negocios en Quito y todo el Ecuador.
                </p>
              </div>

              {/* 2. Nuestra Visión */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#8C0000]/10 text-[#8C0000] flex items-center justify-center mb-2.5 group-hover:bg-[#8C0000] group-hover:text-white transition-colors duration-300 shadow-xs">
                  <Compass className="w-6 sm:w-7 h-6 sm:h-7 stroke-[2.2]" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#191919] font-display tracking-tight mb-1">
                  Nuestra Visión
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ser la empresa líder y referente nacional en ingeniería publicitaria y rotulación arquitectónica, reconocida por su precisión técnica, acabados de alta gama y excelencia en servicio.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutUs;
