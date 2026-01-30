import { Phone, Navigation, HelpCircle, MapPin, Clock } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  distance: string;
  hours: string;
  description: string;
  phone: string;
  address: string;
}

interface ResourceCardProps {
  resource: Resource;
  onShowExplanation: () => void;
  showDemoAnnotations?: boolean;
}

export function ResourceCard({ resource, onShowExplanation, showDemoAnnotations }: ResourceCardProps) {
  const handleCall = () => {
    window.location.href = `tel:${resource.phone}`;
  };

  const handleDirections = () => {
    const encodedAddress = encodeURIComponent(resource.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-5 sm:p-6">
      {/* Resource Info */}
      <div className="mb-4">
        <h3 className="text-[#2D2D2D] mb-2">{resource.name}</h3>
        
        <div className="flex items-start gap-2 mb-2">
          <MapPin className="w-5 h-5 text-[#2563A8] flex-shrink-0 mt-0.5" />
          <span className="text-[#6B6B6B] text-sm">{resource.distance}</span>
        </div>
        
        <div className="flex items-start gap-2 mb-3">
          <Clock className="w-5 h-5 text-[#8BA888] flex-shrink-0 mt-0.5" />
          <span className="text-[#6B6B6B] text-sm">{resource.hours}</span>
        </div>
        
        <p className="text-[#6B6B6B] text-sm">{resource.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-2 sm:gap-3">
        <button
          onClick={handleCall}
          className="bg-[#8BA888] hover:bg-[#7a9a77] text-[#2D2D2D] py-3 sm:py-4 px-4 rounded-3xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-sm sm:text-base">Call</span>
        </button>

        <button
          onClick={handleDirections}
          className="bg-[#5B9BD5] hover:bg-[#4a8bc4] text-[#2D2D2D] py-3 sm:py-4 px-4 rounded-3xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
        >
          <Navigation className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-sm sm:text-base">Get Directions</span>
        </button>

        <button
          onClick={onShowExplanation}
          className="bg-[#E8A846] hover:bg-[#d99835] text-[#2D2D2D] py-3 sm:py-4 px-4 rounded-3xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
        >
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-sm sm:text-base">What do I need to know?</span>
        </button>
      </div>
    </div>
  );
}