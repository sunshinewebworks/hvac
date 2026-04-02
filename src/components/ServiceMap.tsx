import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, Navigation } from 'lucide-react';
import { cn } from '../lib/utils';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ServiceArea {
  id: string;
  name: string;
  region: string;
  coords: [number, number];
  description: string;
}

const SERVICE_AREAS: ServiceArea[] = [
  { id: '1', name: 'Downtown Metro', region: 'Central', coords: [34.0522, -118.2437], description: 'Core service area with 24/7 emergency response.' },
  { id: '2', name: 'Pasadena', region: 'North', coords: [34.1478, -118.1445], description: 'Full residential and commercial HVAC support.' },
  { id: '3', name: 'Santa Monica', region: 'West', coords: [34.0195, -118.4912], description: 'Coastal climate specialists for AC maintenance.' },
  { id: '4', name: 'Long Beach', region: 'South', coords: [33.7701, -118.1937], description: 'Extensive coverage for southern coastal homes.' },
  { id: '5', name: 'Glendale', region: 'North', coords: [34.1425, -118.2551], description: 'Rapid dispatch for valley heating and cooling.' },
  { id: '6', name: 'Beverly Hills', region: 'West', coords: [34.0736, -118.4004], description: 'Premium system maintenance and smart home setup.' },
  { id: '7', name: 'Torrance', region: 'South', coords: [33.8358, -118.3406], description: 'Reliable repair services for South Bay residents.' },
  { id: '8', name: 'Pomona', region: 'East', coords: [34.0551, -117.7500], description: 'Inland empire climate control experts.' },
];

const center: [number, number] = [34.0522, -118.2437];

// Component to handle map centering when an area is selected
function RecenterMap({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (coords) {
      map.setView(coords, 12, { animate: true });
    }
  }, [coords, map]);
  return null;
}

export default function ServiceMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredAreaId, setHoveredAreaId] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);

  const filteredAreas = useMemo(() => {
    return SERVICE_AREAS.filter(area => 
      area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      {/* Map Container */}
      <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
        <MapContainer 
          center={center} 
          zoom={10} 
          scrollWheelZoom={false} 
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredAreas.map((area) => (
            <React.Fragment key={area.id}>
              <Marker 
                position={area.coords}
                eventHandlers={{
                  mouseover: () => setHoveredAreaId(area.id),
                  mouseout: () => setHoveredAreaId(null),
                  click: () => setSelectedArea(area)
                }}
              >
                <Popup>
                  <div className="text-slate-900 p-1">
                    <strong className="block text-base">{area.name}</strong>
                    <p className="text-xs text-slate-500 mt-1">{area.description}</p>
                  </div>
                </Popup>
              </Marker>
              
              {(hoveredAreaId === area.id || selectedArea?.id === area.id) && (
                <Circle 
                  center={area.coords} 
                  radius={3000}
                  pathOptions={{ 
                    fillColor: '#2563eb', 
                    fillOpacity: 0.3, 
                    color: '#2563eb', 
                    weight: 2,
                    dashArray: '5, 5'
                  }} 
                />
              )}
            </React.Fragment>
          ))}

          {/* Main Service Radius */}
          <Circle 
            center={center} 
            radius={35000} 
            pathOptions={{ 
              fillColor: '#2563eb', 
              fillOpacity: 0.05, 
              color: '#2563eb', 
              weight: 1,
              dashArray: '10, 10'
            }} 
          />
          
          <RecenterMap coords={selectedArea?.coords || null} />
        </MapContainer>

        {/* Floating Reset Button */}
        {selectedArea && (
          <button 
            onClick={() => setSelectedArea(null)}
            className="absolute top-4 right-4 z-[1000] bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg border border-slate-200 flex items-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <Navigation size={14} className="rotate-45" />
            Reset View
          </button>
        )}
      </div>

      {/* Filterable List Section */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <MapPin size={20} className="text-blue-500" />
            Detailed Service Areas
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Search by city or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full md:w-64 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAreas.map((area) => (
            <div 
              key={area.id}
              onMouseEnter={() => setHoveredAreaId(area.id)}
              onMouseLeave={() => setHoveredAreaId(null)}
              onClick={() => setSelectedArea(area)}
              className={cn(
                "p-4 rounded-xl border transition-all cursor-pointer group",
                hoveredAreaId === area.id || selectedArea?.id === area.id
                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                  : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                  hoveredAreaId === area.id || selectedArea?.id === area.id
                    ? "bg-white/20 text-white"
                    : "bg-blue-500/10 text-blue-400"
                )}>
                  {area.region}
                </span>
              </div>
              <h4 className={cn(
                "font-bold mb-1",
                hoveredAreaId === area.id || selectedArea?.id === area.id ? "text-white" : "text-slate-200"
              )}>
                {area.name}
              </h4>
              <p className="text-xs leading-relaxed opacity-70">
                {area.description}
              </p>
            </div>
          ))}
        </div>

        {filteredAreas.length === 0 && (
          <div className="text-center py-12 text-slate-500 italic">
            No service areas found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

