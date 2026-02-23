import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4"><span className="text-[#F97316]">ecto</span>Control</h3>
            <p className="text-gray-400 text-sm">
              Современные системы умного дома и мониторинга для вашего комфорта и безопасности.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Продукция</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Готовые решения</a></li>
              <li><a href="#" className="hover:text-white">Управление отоплением</a></li>
              <li><a href="#" className="hover:text-white">Система охраны</a></li>
              <li><a href="#" className="hover:text-white">Датчики</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">О нас</a></li>
              <li><a href="#" className="hover:text-white">Партнерам</a></li>
              <li><a href="#" className="hover:text-white">Контакты</a></li>
              <li><a href="#" className="hover:text-white">Блог</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>8 800 555-22-69</li>
              <li>+7 495 120-22-69</li>
              <li>info@ectocontrol.ru</li>
              <li>г. Москва, ул. Ленинская Слобода, 19</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ectoControl. Все права защищены.
        </div>
      </div>
    </footer>
  );
};
