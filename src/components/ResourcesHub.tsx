import { MapPin, Pill, Utensils, Stethoscope, Home, ArrowLeft, Car, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoCallout } from './DemoCallout';

interface ResourcesHubProps {
  onSelectCategory: (category: string) => void;
  onBack: () => void;
  showDemoAnnotations?: boolean;
}

export function ResourcesHub({ onSelectCategory, onBack, showDemoAnnotations = false }: ResourcesHubProps) {
  const categories = [
    {
      id: 'food',
      label: 'Food & Nutrition',
      icon: Utensils,
      color: 'bg-[#8BA888]', // Soft Sage
      description: 'A direct link to request help with meal delivery or grocery shopping, which is a key part of the "Resources" vision.',
    },
    {
      id: 'transportation',
      label: 'Transportation',
      icon: Car,
      color: 'bg-[#5B9BD5]', // Warm Blue
      description: 'A simple way to request a ride for appointments or social visits, supporting the goal of overcoming "mobility" barriers.',
    },
    {
      id: 'household',
      label: 'Household Help',
      icon: Wrench,
      color: 'bg-[#E8A846]', // Brand Gold
      description: 'An option for minor home maintenance or chores to ensure the senior\'s "digital home" translates to safety in their physical home.',
    },
    {
      id: 'pharmacies',
      label: 'Pharmacies Near Me',
      icon: Pill,
      color: 'bg-[#5B9BD5]', // Warm Blue
      description: 'A curated list of the closest pharmacies based on your location. Each card shows current open hours and basic insurance details so you can plan your visit without stress.',
    },
    {
      id: 'clinics',
      label: 'Clinics & Health Centers',
      icon: Stethoscope,
      color: 'bg-[#E8A846]', // Brand Gold
      description: 'A simplified directory of nearby healthcare facilities and walk-in centers. It uses plain-language summaries to help you quickly find where to go for check-ups or basic medical needs.',
    },
    {
      id: 'housing',
      label: 'Housing & Community Support',
      icon: Home,
      color: 'bg-[#2563A8]', // Brand Blue
      description: 'A central hub for local assistance, including rent relief, senior living guidance, and community centers. This section translates complex requirements into easy-to-read steps for finding a safe place to live.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen bg-[#FBF8F3]"
    >
      {/* Header */}
      <header className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-[#2D2D2D] active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </button>
        <h1 className="text-[#2D2D2D] text-lg sm:text-xl mb-1">Hybrid Resource Finder</h1>
        <p className="text-[#6B6B6B] text-sm">(Demo)</p>
      </header>

      {/* Category Buttons */}
      <main className="flex-1 px-4 py-4 sm:px-6">
        <div className="grid grid-cols-1 gap-3 max-w-md mx-auto sm:gap-4 relative">
          {/* Demo Annotation */}
          <AnimatePresence>
            {showDemoAnnotations && (
              <DemoCallout
                text="Resources shown here come from curated public datasets rather than live business search, improving accuracy and keeping costs low."
                position="bottom"
                className="left-0 sm:left-4"
              />
            )}
          </AnimatePresence>

          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`${category.color} rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all active:scale-95 flex items-center gap-4`}
              >
                <Icon className={`w-12 h-12 sm:w-14 sm:h-14 ${category.id === 'housing' ? 'text-white' : 'text-[#2D2D2D]'} flex-shrink-0`} strokeWidth={2.5} />
                <span className={`text-left text-base sm:text-lg ${category.id === 'housing' ? 'text-white' : 'text-[#2D2D2D]'}`}>{category.label}</span>
              </button>
            );
          })}
        </div>
      </main>
    </motion.div>
  );
}