import React from 'react';
import { Phone, ShoppingCart, User, HelpCircle, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full font-sans">
      {/* Top Info Bar (Desktop) */}
      <div className="hidden lg:block bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-2 flex justify-end items-center space-x-6 text-sm text-gray-600">
          <a href="#" className="flex items-center hover:text-[#F97316] transition-colors">
            <HelpCircle className="w-4 h-4 mr-1" />
            Техподдержка
          </a>
          <a href="#" className="flex items-center hover:text-[#F97316] transition-colors">
            <User className="w-4 h-4 mr-1" />
            Личный кабинет
          </a>
          <div className="flex flex-col items-end">
            <a href="tel:88005552269" className="font-bold text-gray-800 hover:text-[#F97316]">8 800 555-22-69</a>
            <span className="text-xs text-gray-400">Отдел продаж</span>
          </div>
          <div className="flex flex-col items-end">
            <a href="tel:+74951202269" className="font-bold text-gray-800 hover:text-[#F97316]">+7 495 120-22-69</a>
            <span className="text-xs text-gray-400">Поддержка</span>
          </div>
          <a href="#" className="flex items-center text-gray-800 hover:text-[#F97316]">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
            </div>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-[#F97316]">ecto</span><span className="text-gray-900">Control</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-8">
            {['Продукция', 'Монтаж', 'Партнерам', 'Обучение', 'Доставка', 'Контакты', 'Блог'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-[#F97316] font-medium transition-colors uppercase text-sm tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-700 hover:text-[#F97316]">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
