import { X, Phone, Navigation, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoCallout } from './DemoCallout';

interface Resource {
  id: string;
  name: string;
  phone: string;
  address: string;
  aiExplanation: string;
}

interface AIExplanationPanelProps {
  resource: Resource;
  onClose: () => void;
  showDemoAnnotations?: boolean;
}

export function AIExplanationPanel({ resource, onClose, showDemoAnnotations }: AIExplanationPanelProps) {
  const handleCall = () => {
    window.location.href = `tel:${resource.phone}`;
  };

  const handleDirections = () => {
    const encodedAddress = encodeURIComponent(resource.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-[#E8E6E0] px-4 py-4 sm:px-6 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-[#2D2D2D] text-base sm:text-lg">Here's what's helpful to know</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Sparkles className="w-4 h-4 text-[#E8A846]" />
              <span className="text-xs text-[#6B6B6B]">Simplified using AI</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-[#6B6B6B] hover:bg-[#F5F5F0] rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-6 sm:px-6 relative">
          {/* Resource Name */}
          <h3 className="text-[#2D2D2D] mb-4">{resource.name}</h3>

          {/* AI Explanation */}
          <div className="bg-[#FBF8F3] rounded-3xl p-4 sm:p-5 mb-6 border border-[#E8E6E0] relative">
            <p className="text-[#2D2D2D] text-sm sm:text-base leading-relaxed">
              {resource.aiExplanation}
            </p>
            
            {/* Demo Annotation for AI Explanation */}
            <AnimatePresence>
              {showDemoAnnotations && (
                <DemoCallout
                  text="AI is used only to simplify and explain information in plain language — not to search, rank, or make decisions."
                  position="top"
                  className="right-0 sm:right-4 hidden sm:block"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleCall}
              className="w-full bg-[#8BA888] hover:bg-[#7a9a77] text-[#2D2D2D] py-4 px-4 rounded-3xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Call this location</span>
            </button>

            <button
              onClick={handleDirections}
              className="w-full bg-[#2563A8] hover:bg-[#1e4d87] text-white py-4 px-4 rounded-3xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
            >
              <Navigation className="w-6 h-6" />
              <span>Get directions</span>
            </button>

            <button
              onClick={onClose}
              className="w-full bg-[#E8E6E0] hover:bg-[#d9d7d1] text-[#2D2D2D] py-4 px-4 rounded-3xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>

        {/* Bottom padding for safe area */}
        <div className="h-6" />
      </motion.div>
    </>
  );
}