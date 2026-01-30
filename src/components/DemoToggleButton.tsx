import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoToggleButtonProps {
  showAnnotations: boolean;
  onToggleAnnotations: (value: boolean) => void;
}

export function DemoToggleButton({ showAnnotations, onToggleAnnotations }: DemoToggleButtonProps) {
  return (
    <motion.button
      onClick={() => onToggleAnnotations(!showAnnotations)}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 bg-slate-700 text-white rounded-full p-3 shadow-2xl z-[60] hover:bg-slate-600 transition-colors border-2 border-slate-500"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {showAnnotations ? (
        <Eye className="w-5 h-5" />
      ) : (
        <EyeOff className="w-5 h-5" />
      )}
      
      <AnimatePresence>
        {!showAnnotations && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-700 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg border border-slate-600"
          >
            Show Demo Notes
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}