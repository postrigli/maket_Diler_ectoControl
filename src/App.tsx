import React, { useState } from 'react';
import { Header } from './components/Header';
import { ModeSwitcher } from './components/ModeSwitcher';
import { DealerLocator } from './components/DealerLocator';
import { Footer } from './components/Footer';
import { DealerType } from './types';

export default function App() {
  const [activeMode, setActiveMode] = useState<DealerType>('dealer');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        {/* Page Title */}
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Где купить
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <span>Главная</span>
              <span>/</span>
              <span className="text-gray-900">Где купить</span>
            </div>
          </div>
        </div>

        <ModeSwitcher activeMode={activeMode} onModeChange={setActiveMode} />
        
        <DealerLocator activeMode={activeMode} />
      </main>

      <Footer />
    </div>
  );
}
