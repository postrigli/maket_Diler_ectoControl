import React, { useEffect, useRef, useState } from 'react';
import { dealers, installers } from '../data/mockData';
import { Dealer, DealerType } from '../types';
import { Search, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

interface DealerLocatorProps {
  activeMode: DealerType;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

export const DealerLocator: React.FC<DealerLocatorProps> = ({ activeMode }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const objectManagerRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [filteredDealers, setFilteredDealers] = useState<Dealer[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  const filteredDealersRef = useRef(filteredDealers);
  const activeModeRef = useRef(activeMode);

  // Update refs
  useEffect(() => {
    filteredDealersRef.current = filteredDealers;
    activeModeRef.current = activeMode;
  }, [filteredDealers, activeMode]);

  // Filter dealers based on mode and search query
  useEffect(() => {
    const data = activeMode === 'dealer' ? dealers : installers;
    const filtered = data.filter(
      (d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDealers(filtered);
    
    // Reset selection when mode changes
    setSelectedDealer(null);
  }, [activeMode, searchQuery]);

  // Check for Yandex Maps API availability
  useEffect(() => {
    const checkYmaps = () => {
      if (window.ymaps) {
        setIsMapReady(true);
      } else {
        setTimeout(checkYmaps, 500);
      }
    };
    checkYmaps();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!isMapReady || !mapContainerRef.current || mapInstanceRef.current) return;

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapContainerRef.current, {
        center: [55.751244, 37.618423], // Moscow
        zoom: 10,
        controls: ['zoomControl', 'fullscreenControl'],
      });

      mapInstanceRef.current = map;

      const objectManager = new window.ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: false,
      });

      objectManagerRef.current = objectManager;
      map.geoObjects.add(objectManager);

      // Handle marker click
      objectManager.objects.events.add('click', (e: any) => {
        const objectId = e.get('objectId');
        // Use ref to get current filtered list
        const currentFiltered = filteredDealersRef.current;
        const dealer = currentFiltered.find((d) => d.id === objectId);
        
        if (dealer) {
          setSelectedDealer(dealer);
        } else {
             // Fallback to full list check if needed
             const fullList = activeModeRef.current === 'dealer' ? dealers : installers;
             const found = fullList.find(d => d.id === objectId);
             if (found) setSelectedDealer(found);
        }
      });
    });
  }, [isMapReady]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !objectManagerRef.current) return;

    const objectManager = objectManagerRef.current;
    objectManager.removeAll();

    const features = filteredDealers.map((dealer) => ({
      type: 'Feature',
      id: dealer.id,
      geometry: {
        type: 'Point',
        coordinates: dealer.coordinates,
      },
      properties: {
        balloonContentHeader: dealer.name,
        balloonContentBody: dealer.address,
        balloonContentFooter: dealer.phone,
        clusterCaption: dealer.name,
        hintContent: dealer.name,
      },
      options: {
        preset: activeMode === 'dealer' ? 'islands#orangeDotIcon' : 'islands#blueDotIcon',
      },
    }));

    objectManager.add(features);

    // Fit bounds if there are markers
    if (features.length > 0) {
        // Use a timeout to ensure map is ready for bounds change
        setTimeout(() => {
             if (mapInstanceRef.current && mapInstanceRef.current.geoObjects) {
                 const bounds = mapInstanceRef.current.geoObjects.getBounds();
                 if (bounds) {
                     mapInstanceRef.current.setBounds(bounds, {
                        checkZoomRange: true,
                        zoomMargin: 50,
                     });
                 }
             }
        }, 100);
    }
  }, [filteredDealers, activeMode, isMapReady]);

  // Pan to selected dealer
  useEffect(() => {
    if (selectedDealer && mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(selectedDealer.coordinates, 14, {
        duration: 300,
      });
    }
  }, [selectedDealer]);

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col lg:flex-row h-[600px] lg:h-[700px]">
        {/* Left Column: List & Search */}
        <div className="w-full lg:w-1/3 flex flex-col border-r border-gray-200 h-full">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Введите город..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredDealers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Ничего не найдено по вашему запросу.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredDealers.map((dealer) => (
                  <div
                    key={dealer.id}
                    onClick={() => setSelectedDealer(dealer)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-orange-50 ${
                      selectedDealer?.id === dealer.id ? 'bg-orange-50 border-l-4 border-[#F97316]' : 'border-l-4 border-transparent'
                    }`}
                  >
                    <h4 className="font-bold text-gray-800 mb-1">{dealer.name}</h4>
                    <div className="flex items-start text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                      <span>{dealer.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <a href={`tel:${dealer.phone}`} className="hover:text-[#F97316] transition-colors">
                        {dealer.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <a href={`mailto:${dealer.email}`} className="hover:text-[#F97316] transition-colors">
                        {dealer.email}
                      </a>
                    </div>
                    <a
                      href={dealer.messenger}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-[#F97316] hover:underline mt-1"
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Написать в мессенджер
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="w-full lg:w-2/3 relative bg-gray-100 h-full min-h-[400px]">
          <div ref={mapContainerRef} className="w-full h-full" />
          {/* Map Loading State / Fallback */}
          {!isMapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 z-10">
              Загрузка карты...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
