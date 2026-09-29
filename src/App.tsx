/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceId | ''>('');

  const handleSelectService = (serviceId: ServiceId) => {
    setSelectedService(serviceId);
  };

  return (
    <div className="min-h-screen bg-white text-[#191919] font-sans antialiased selection:bg-[#8C0000] selection:text-white flex flex-col relative">
      {/* 1. Header Superior Sticky */}
      <Header />

      {/* Secciones Principales */}
      <main className="flex-1 w-full">
        {/* SECCIÓN 1: INICIO */}
        <Hero />

        {/* SECCIÓN 2: SERVICIOS Y PROCESO DE TRABAJO */}
        <Services onSelectService={handleSelectService} />

        {/* SECCIÓN 3: SOBRE NOSOTROS (Reubicada después del proceso de pasos) */}
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

      {/* Barra de Navegación Ergonómica Inferior para Móviles */}
      <MobileBottomNav />
    </div>
  );
}
