import React from 'react';
import { DealerType } from '../types';
import { motion } from 'motion/react';

interface ModeSwitcherProps {
  activeMode: DealerType;
  onModeChange: (mode: DealerType) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ activeMode, onModeChange }) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dealer Option */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeChange('dealer')}
          className={`cursor-pointer p-8 rounded-xl border-2 transition-all duration-300 ${
            activeMode === 'dealer'
              ? 'border-[#F97316] bg-orange-50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-orange-200 hover:shadow-md'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-4 ${activeMode === 'dealer' ? 'text-[#F97316]' : 'text-gray-800'}`}>
            Найти официального дилера
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Подберите ближайший магазин или сертифицированную точку продаж в вашем городе, чтобы приобрести ectoControl с полной гарантией производителя.
          </p>
        </motion.div>

        {/* Installer Option */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeChange('installer')}
          className={`cursor-pointer p-8 rounded-xl border-2 transition-all duration-300 ${
            activeMode === 'installer'
              ? 'border-[#F97316] bg-orange-50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-orange-200 hover:shadow-md'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-4 ${activeMode === 'installer' ? 'text-[#F97316]' : 'text-gray-800'}`}>
            Заказать монтаж поблизости
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Выберите проверенного установщика в вашем районе для профессионального проектирования и настройки системы под ключ.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
