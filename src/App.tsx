/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { AboutUs } from './components/AboutUs';
import { Catalog } from './components/Catalog';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ServiceId } from './types';
import { checkIsAdsMode } from './utils/analytics';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceId | ''>('');
  const [isAdsMode, setIsAdsMode] = useState(false);

  useEffect(() => {
    setIsAdsMode(checkIsAdsMode());
  }, []);

  const handleSelectService = (serviceId: ServiceId) => {
    setSelectedService(serviceId);
  };

  return (
    <div className="min-h-screen bg-white text-[#191919] font-sans antialiased selection:bg-[#8C0000] selection:text-white flex flex-col relative">
      {/* 1. Header Superior Sticky (Se adapta en Modo Ads eliminando menú distractor) */}
      <Header isAdsMode={isAdsMode} />

      {/* Secciones Principales */}
      <main className="flex-1 w-full">
        {/* SECCIÓN 1: INICIO */}
        <Hero />

        {/* SECCIÓN 2: SERVICIOS Y PROCESO DE TRABAJO */}
        <Services onSelectService={handleSelectService} />

        {/* SECCIÓN 3: SOBRE NOSOTROS */}
        <AboutUs />

        {/* SECCIÓN 4: CATÁLOGO */}
        <Catalog />

        {/* SECCIÓN 5: CONTACTOS */}
        <ContactForm 
          selectedService={selectedService} 
          onServiceChange={setSelectedService} 
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* CTA Flotante WhatsApp */}
      <FloatingWhatsApp />

      {/* Barra de Navegación Ergonómica Inferior para Móviles (Modo Ads: Botón único WhatsApp) */}
      <MobileBottomNav isAdsMode={isAdsMode} />
    </div>
  );
}
