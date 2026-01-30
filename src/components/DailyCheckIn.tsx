import { useState } from 'react';
import { Check, X, Phone, Heart, HelpCircle, ArrowLeft, Ambulance, Stethoscope, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DailyCheckInProps {
  userName: string;
  onClose: () => void;
  onNavigateToResources?: () => void;
}

type CheckInState = 'initial' | 'success' | 'support' | 'needCall' | 'medicalHelp';

interface EmergencyContact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
}

export function DailyCheckIn({ userName, onClose, onNavigateToResources }: DailyCheckInProps) {
  const [checkInState, setCheckInState] = useState<CheckInState>('initial');

  // Mock emergency contacts
  const emergencyContacts: EmergencyContact[] = [
    { id: 1, name: 'Doris Blakely', relationship: 'Daughter', phone: '(555) 123-4567' },
    { id: 2, name: 'Robert Thompson', relationship: 'Son', phone: '(555) 234-5678' },
    { id: 3, name: 'Margaret Chen', relationship: 'Care Coordinator', phone: '(555) 345-6789' },
    { id: 4, name: 'Dr. Sarah Mitchell', relationship: 'Primary Care', phone: '(555) 456-7890' },
    { id: 5, name: 'Pastor James Williams', relationship: 'Spiritual Advisor', phone: '(555) 567-8901' },
    { id: 6, name: 'Linda Martinez', relationship: 'Neighbor & Friend', phone: '(555) 678-9012' },
  ];

  const handleImOK = () => {
    setCheckInState('success');
  };

  const handleNeedHelp = () => {
    setCheckInState('support');
  };

  const handleNeedCall = () => {
    setCheckInState('needCall');
  };

  const handleMedicalHelp = () => {
    setCheckInState('medicalHelp');
  };

  const handleBackToSupport = () => {
    setCheckInState('support');
  };

  const handleOtherSupport = () => {
    if (onNavigateToResources) {
      onNavigateToResources();
    }
  };

  const handleClose = () => {
    setCheckInState('initial');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FBF8F3] flex flex-col"
    >
      {/* Header with Back Button */}
      <header className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-[#2D2D2D] hover:bg-[#F5F5F0] rounded-full px-4 py-2 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
            <span className="text-base">Back</span>
          </button>
          <h1 className="text-[#2D2D2D] text-lg">Daily Check-In</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {/* Initial State */}
            {checkInState === 'initial' && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="text-center mb-4">
                  <h2 className="text-[#2D2D2D] text-2xl mb-2">
                    Hello, {userName}!
                  </h2>
                  <p className="text-[#6B6B6B] text-lg leading-relaxed">
                    How are you feeling today?
                  </p>
                </div>

                {/* Primary Action - I'm OK */}
                <button
                  onClick={handleImOK}
                  className="w-full max-w-[280px] aspect-square rounded-full bg-gradient-to-br from-[#E8A846] to-[#d99835] shadow-[0_12px_32px_rgba(232,168,70,0.3)] hover:shadow-[0_16px_40px_rgba(232,168,70,0.4)] transition-all active:scale-95 flex flex-col items-center justify-center gap-3"
                  style={{ minHeight: '280px', minWidth: '280px' }}
                >
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-16 h-16 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-white text-2xl">I'm OK</span>
                </button>

                {/* Secondary Action - I Need Help */}
                <button
                  onClick={handleNeedHelp}
                  className="w-full bg-white border-4 border-[#E8A846] rounded-3xl py-6 px-8 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all active:scale-95 flex items-center justify-center gap-3"
                  style={{ minHeight: '72px' }}
                >
                  <HelpCircle className="w-8 h-8 text-[#E8A846]" strokeWidth={2.5} />
                  <span className="text-[#2D2D2D] text-xl">I Need Help</span>
                </button>
              </motion.div>
            )}

            {/* Success State */}
            {checkInState === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Success Icon Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-[#8BA888] to-[#7a9979] flex items-center justify-center shadow-[0_12px_32px_rgba(139,168,136,0.3)] mb-4"
                >
                  <Check className="w-20 h-20 text-white" strokeWidth={3} />
                </motion.div>

                {/* Success Card */}
                <div className="w-full bg-white rounded-3xl p-8 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <h2 className="text-[#2D2D2D] text-2xl text-center mb-4">
                    Great to hear from you, {userName}!
                  </h2>
                  <p className="text-[#6B6B6B] text-lg text-center leading-relaxed">
                    Your community is here for you.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="w-full bg-gradient-to-br from-[#2563A8] to-[#1e4d87] text-white py-5 rounded-3xl shadow-[0_8px_24px_rgba(37,99,168,0.3)] hover:shadow-[0_12px_32px_rgba(37,99,168,0.4)] transition-all active:scale-95 text-lg"
                  style={{ minHeight: '64px' }}
                >
                  Close
                </button>
              </motion.div>
            )}

            {/* Support State */}
            {checkInState === 'support' && (
              <motion.div
                key="support"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="text-center mb-2">
                  <h2 className="text-[#2D2D2D] text-2xl mb-3">
                    We're here to help
                  </h2>
                  <p className="text-[#6B6B6B] text-lg leading-relaxed">
                    What kind of support do you need?
                  </p>
                </div>

                {/* Support Options Grid */}
                <div className="w-full space-y-4">
                  {/* Need a Call */}
                  <button
                    onClick={handleNeedCall}
                    className="w-full bg-gradient-to-br from-[#2563A8] to-[#1e4d87] text-white rounded-3xl py-8 px-6 shadow-[0_8px_24px_rgba(37,99,168,0.3)] hover:shadow-[0_12px_32px_rgba(37,99,168,0.4)] transition-all active:scale-95 flex items-center justify-center gap-4"
                    style={{ minHeight: '88px' }}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xl">Need a Call</span>
                  </button>

                  {/* Medical Help */}
                  <button
                    onClick={handleMedicalHelp}
                    className="w-full bg-gradient-to-br from-[#8BA888] to-[#7a9979] text-white rounded-3xl py-8 px-6 shadow-[0_8px_24px_rgba(139,168,136,0.3)] hover:shadow-[0_12px_32px_rgba(139,168,136,0.4)] transition-all active:scale-95 flex items-center justify-center gap-4"
                    style={{ minHeight: '88px' }}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xl">Medical Help</span>
                  </button>

                  {/* Other Support */}
                  <button
                    onClick={handleOtherSupport}
                    className="w-full bg-gradient-to-br from-[#E8A846] to-[#d99835] text-white rounded-3xl py-8 px-6 shadow-[0_8px_24px_rgba(232,168,70,0.3)] hover:shadow-[0_12px_32px_rgba(232,168,70,0.4)] transition-all active:scale-95 flex items-center justify-center gap-4"
                    style={{ minHeight: '88px' }}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xl">Other Support</span>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="w-full bg-white border-4 border-[#2D2D2D] text-[#2D2D2D] py-5 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all active:scale-95 text-lg mt-2"
                  style={{ minHeight: '64px' }}
                >
                  Close
                </button>
              </motion.div>
            )}

            {/* Need a Call - Emergency Contacts List */}
            {checkInState === 'needCall' && (
              <motion.div
                key="needCall"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-4"
              >
                <div className="text-center mb-2">
                  <button
                    onClick={handleBackToSupport}
                    className="flex items-center gap-2 text-[#2563A8] hover:bg-[#F5F5F0] rounded-full px-4 py-2 transition-colors active:scale-95 mb-4 mx-auto"
                  >
                    <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
                    <span className="text-base">Back to Support</span>
                  </button>
                  <h2 className="text-[#2D2D2D] text-2xl mb-3">
                    Who would you like to call?
                  </h2>
                  <p className="text-[#6B6B6B] text-lg leading-relaxed">
                    Select a contact to reach out
                  </p>
                </div>

                {/* Emergency Contacts List */}
                <div className="w-full space-y-3 max-h-[60vh] overflow-y-auto">
                  {emergencyContacts.map((contact) => (
                    <button
                      key={contact.id}
                      className="w-full bg-white rounded-3xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all active:scale-95 flex items-center gap-4"
                      style={{ minHeight: '88px' }}
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2563A8] to-[#1e4d87] flex items-center justify-center flex-shrink-0">
                        <Phone className="w-7 h-7 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-[#2D2D2D] text-lg mb-1">{contact.name}</h3>
                        <p className="text-[#6B6B6B] text-base">{contact.relationship}</p>
                        <p className="text-[#2563A8] text-sm mt-1">{contact.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Medical Help - Urgency Levels */}
            {checkInState === 'medicalHelp' && (
              <motion.div
                key="medicalHelp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-4"
              >
                <div className="text-center mb-2">
                  <button
                    onClick={handleBackToSupport}
                    className="flex items-center gap-2 text-[#8BA888] hover:bg-[#F5F5F0] rounded-full px-4 py-2 transition-colors active:scale-95 mb-4 mx-auto"
                  >
                    <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
                    <span className="text-base">Back to Support</span>
                  </button>
                  <h2 className="text-[#2D2D2D] text-2xl mb-3">
                    Medical Support
                  </h2>
                  <p className="text-[#6B6B6B] text-lg leading-relaxed">
                    Select the level of care you need
                  </p>
                </div>

                {/* Medical Urgency Options */}
                <div className="w-full space-y-4">
                  {/* Health Emergency */}
                  <button
                    className="w-full bg-gradient-to-br from-[#d4183d] to-[#b01530] text-white rounded-3xl p-6 shadow-[0_8px_24px_rgba(212,24,61,0.3)] hover:shadow-[0_12px_32px_rgba(212,24,61,0.4)] transition-all active:scale-95 flex items-start gap-4 border-4 border-white"
                    style={{ minHeight: '110px' }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Ambulance className="w-9 h-9 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-white text-xl mb-2">Health Emergency</h3>
                      <p className="text-white/90 text-base leading-relaxed">Need Ambulance</p>
                    </div>
                  </button>

                  {/* Feeling Sick */}
                  <button
                    className="w-full bg-gradient-to-br from-[#E8A846] to-[#d99835] text-white rounded-3xl p-6 shadow-[0_8px_24px_rgba(232,168,70,0.3)] hover:shadow-[0_12px_32px_rgba(232,168,70,0.4)] transition-all active:scale-95 flex items-start gap-4"
                    style={{ minHeight: '110px' }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-9 h-9 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-white text-xl mb-2">Feeling Sick</h3>
                      <p className="text-white/90 text-base leading-relaxed">Call Provider</p>
                    </div>
                  </button>

                  {/* Ask AI Health Guide */}
                  <button
                    className="w-full bg-gradient-to-br from-[#8BA888] to-[#7a9979] text-white rounded-3xl p-6 shadow-[0_8px_24px_rgba(139,168,136,0.3)] hover:shadow-[0_12px_32px_rgba(139,168,136,0.4)] transition-all active:scale-95 flex items-start gap-4"
                    style={{ minHeight: '110px' }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircleQuestion className="w-9 h-9 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-white text-xl mb-2">Help Me Understand</h3>
                      <p className="text-white/90 text-base leading-relaxed">Ask AI Health Guide</p>
                    </div>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="w-full bg-white border-4 border-[#2D2D2D] text-[#2D2D2D] py-5 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all active:scale-95 text-lg mt-2"
                  style={{ minHeight: '64px' }}
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}
