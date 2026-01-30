import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface DemoCalloutProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function DemoCallout({ text, position = 'bottom', className = '' }: DemoCalloutProps) {
  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`absolute ${positionClasses[position]} ${className} z-50`}
    >
      <div className="bg-slate-700 text-white rounded-xl shadow-xl p-3 max-w-[280px] border border-slate-600">
        <div className="flex items-start gap-2 mb-1">
          <Info className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
          <span className="text-xs font-medium text-blue-200">Demo Note</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-100">
          {text}
        </p>
      </div>
      {/* Arrow pointing to the element */}
      <div 
        className={`absolute w-0 h-0 border-solid ${
          position === 'bottom' 
            ? 'top-0 left-4 -translate-y-full border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-slate-700'
            : position === 'top'
            ? 'bottom-0 left-4 translate-y-full border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-700'
            : position === 'right'
            ? 'top-4 left-0 -translate-x-full border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-slate-700'
            : 'top-4 right-0 translate-x-full border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-slate-700'
        }`}
      />
    </motion.div>
  );
}
