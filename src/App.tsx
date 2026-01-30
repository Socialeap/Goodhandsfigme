import { useState, useEffect } from 'react';
import { Check, Mic, Home, Bell, Settings, Calendar, Gamepad2, FolderOpen, Radio, Heart, User, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResourcesHub } from './components/ResourcesHub';
import { ResourcesList } from './components/ResourcesList';
import { DailyCheckIn } from './components/DailyCheckIn';
import { DemoToggleButton } from './components/DemoToggleButton';

export default function App() {
  const [isPressing, setIsPressing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsInfo, setShowSettingsInfo] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'resources' | 'resourcesList' | 'dailyCheckIn'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showDemoAnnotations, setShowDemoAnnotations] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const tiles = [
    { 
      id: 1, 
      label: 'Daily Check-In', 
      icon: Check, 
      color: 'bg-[#E8A846]', // Brand Gold - high priority
      iconColor: 'text-[#2D2D2D]',
      description: "A quick tap to let us know you're doing okay today.",
      action: 'dailyCheckIn'
    },
    { 
      id: 2, 
      label: 'Games', 
      icon: Gamepad2, 
      color: 'bg-[#8BA888]', // Soft Sage - calm social activity
      iconColor: 'text-[#2D2D2D]',
      description: "Enjoy simple, fun games that keep your mind active and lift your spirits.",
      action: null
    },
    { 
      id: 3, 
      label: 'Live Activities', 
      icon: Radio, 
      color: 'bg-[#5B9BD5]', // Warm Blue - social activity
      iconColor: 'text-[#2D2D2D]',
      description: "Join real-time classes, events, and social sessions happening right now.",
      action: null
    },
    { 
      id: 4, 
      label: 'Media Gallery', 
      icon: FolderOpen, 
      color: 'bg-[#8BA888]', // Soft Sage - calm activity
      iconColor: 'text-[#2D2D2D]',
      description: "Browse photos and moments shared by your Good Hands community.",
      action: null
    },
    { 
      id: 5, 
      label: 'Calendar', 
      icon: Calendar, 
      color: 'bg-[#5B9BD5]', // Warm Blue - informational
      iconColor: 'text-[#2D2D2D]',
      description: "See all of your upcoming activities, classes, and special events.",
      action: null
    },
    { 
      id: 6, 
      label: 'Request Help', 
      icon: Heart, 
      color: 'bg-[#E8A846]', // Brand Gold - high priority/urgent
      iconColor: 'text-[#2D2D2D]',
      description: "Ask for assistance or support whenever you need it — we're here for you.",
      action: null
    },
    { 
      id: 7, 
      label: 'Resources', 
      icon: BookOpen, 
      color: 'bg-[#2563A8]', // Brand Blue - navigation/stability
      iconColor: 'text-white',
      description: "Find nearby pharmacies, food support, clinics, and community services.",
      action: 'resources'
    },
  ];

  const handleTileClick = (tile: typeof tiles[0]) => {
    if (tile.action === 'resources') {
      setCurrentView('resources');
      setFlippedCard(null);
    } else if (tile.action === 'dailyCheckIn') {
      setCurrentView('dailyCheckIn');
      setFlippedCard(null);
    } else {
      setFlippedCard(tile.id);
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('resourcesList');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory('');
  };

  const handleBackToResources = () => {
    setCurrentView('resources');
    setSelectedCategory('');
  };

  const handleMicClick = () => {
    setIsListening(true);
    setIsPressing(false);
  };

  const handleDone = () => {
    setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] flex flex-col safe-area-inset">
      <AnimatePresence mode="wait">
        {currentView === 'dailyCheckIn' ? (
          <DailyCheckIn
            key="daily-check-in"
            userName="Felix"
            onClose={handleBackToHome}
            onNavigateToResources={() => setCurrentView('resources')}
          />
        ) : currentView === 'resources' ? (
          <ResourcesHub
            key="resources-hub"
            onSelectCategory={handleSelectCategory}
            onBack={handleBackToHome}
            showDemoAnnotations={showDemoAnnotations}
          />
        ) : currentView === 'resourcesList' ? (
          <ResourcesList
            key="resources-list"
            category={selectedCategory}
            onBack={handleBackToResources}
            showDemoAnnotations={showDemoAnnotations}
          />
        ) : !isListening ? (
          <motion.div
            key="main-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-h-screen"
          >
            {/* Top Area */}
            <header className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
              <div className="flex items-start justify-between mb-2 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[#2D2D2D] text-sm sm:text-base">Good Morning, Felix</p>
                  <p className="text-[#2D2D2D] text-sm sm:text-base">You're in Good Hands</p>
                </div>
                
                {/* Alert Bell and Profile Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Alert Bell with Badge */}
                  <button
                    onClick={() => setShowAlertsModal(true)}
                    className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#E8A846] to-[#d99835] border-4 border-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#d4183d] text-white text-xs rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      3
                    </span>
                  </button>

                  {/* Profile Button */}
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#5B9BD5] to-[#2563A8] border-4 border-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[#2D2D2D] text-sm sm:text-base">{formatDate(currentTime)}</p>
                <p className="text-[#6B6B6B] text-sm sm:text-base">{formatTime(currentTime)}</p>
              </div>
            </header>

            {/* Middle Area - Tile Grid */}
            <main className="flex-1 px-4 py-3 sm:px-6 sm:py-6">
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto sm:gap-4">
                {tiles.map((tile) => {
                  const Icon = tile.icon;
                  const isFlipped = flippedCard === tile.id;
                  
                  return (
                    <div key={tile.id} className="perspective-1000 min-h-[110px] sm:min-h-[140px]">
                      <motion.div
                        className="relative w-full h-full"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Front of card */}
                        <button
                          onClick={() => handleTileClick(tile)}
                          className={`absolute inset-0 ${tile.color} rounded-3xl p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-3 min-h-[110px] sm:min-h-[140px]`}
                          style={{ 
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden"
                          }}
                        >
                          <Icon className={`w-10 h-10 sm:w-14 sm:h-14 ${tile.iconColor}`} strokeWidth={2.5} />
                          <span className={`text-center text-sm sm:text-base ${tile.iconColor === 'text-white' ? 'text-white' : 'text-[#2D2D2D]'}`}>{tile.label}</span>
                        </button>
                        
                        {/* Back of card */}
                        <button
                          onClick={() => setFlippedCard(null)}
                          className={`absolute inset-0 ${tile.color} rounded-3xl p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all active:scale-95 flex flex-col items-center justify-center min-h-[110px] sm:min-h-[140px]`}
                          style={{ 
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                          }}
                        >
                          <p className={`text-center text-xs sm:text-sm leading-relaxed ${tile.iconColor === 'text-white' ? 'text-white' : 'text-[#2D2D2D]'}`}>
                            {tile.description}
                          </p>
                        </button>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </main>

            {/* Bottom Area - Walkie-Talkie Voice Button */}
            <div className="px-4 pb-4 sm:px-6 sm:pb-6 flex flex-col items-center gap-3 sm:gap-6">
              <div className="flex flex-col items-center">
                <button
                  onMouseDown={() => setIsPressing(true)}
                  onMouseUp={() => setIsPressing(false)}
                  onMouseLeave={() => setIsPressing(false)}
                  onTouchStart={() => setIsPressing(true)}
                  onTouchEnd={() => setIsPressing(false)}
                  onClick={handleMicClick}
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 shadow-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                    isPressing ? 'scale-95 shadow-lg' : 'hover:scale-105'
                  }`}
                >
                  <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={3} />
                  <span className="text-white text-xs">Click to Speak</span>
                </button>
                <p className="text-slate-600 text-center text-xs mt-2 px-6 sm:mt-3 sm:px-8">
                  The app will listen and guide you.
                </p>
              </div>
            </div>

            {/* Alerts Modal */}
            <AnimatePresence>
              {showAlertsModal && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setShowAlertsModal(false)}
                  />
                  
                  {/* Modal */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-3xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
                  >
                    <div className="sticky top-0 bg-white border-b border-[#E8E6E0] px-6 py-4 rounded-t-3xl flex items-center justify-between">
                      <div>
                        <h2 className="text-[#2D2D2D] text-lg">Alerts</h2>
                        <p className="text-[#6B6B6B] text-xs">You have 3 new alerts</p>
                      </div>
                      <button
                        onClick={() => setShowAlertsModal(false)}
                        className="w-10 h-10 flex items-center justify-center text-[#6B6B6B] hover:bg-[#F5F5F0] rounded-full transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Alert 1 - Account */}
                      <div className="bg-[#FBF8F3] rounded-3xl p-5 border-l-4 border-[#2563A8]">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#2563A8] flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-[#2D2D2D] text-sm mb-1">Account Update</h3>
                            <p className="text-[#6B6B6B] text-xs leading-relaxed mb-2">
                              Your profile information has been successfully updated. Your preferences are now saved.
                            </p>
                            <span className="text-[#6B6B6B] text-xs">2 hours ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Alert 2 - Messages */}
                      <div className="bg-[#FBF8F3] rounded-3xl p-5 border-l-4 border-[#8BA888]">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#8BA888] flex items-center justify-center flex-shrink-0">
                            <Bell className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-[#2D2D2D] text-sm mb-1">New Message</h3>
                            <p className="text-[#6B6B6B] text-xs leading-relaxed mb-2">
                              You have a new message from your care coordinator. They've shared updates about your upcoming activities.
                            </p>
                            <span className="text-[#6B6B6B] text-xs">5 hours ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Alert 3 - Reminders */}
                      <div className="bg-[#FBF8F3] rounded-3xl p-5 border-l-4 border-[#E8A846]">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#E8A846] flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-[#2D2D2D] text-sm mb-1">Reminder: Upcoming Event</h3>
                            <p className="text-[#6B6B6B] text-xs leading-relaxed mb-2">
                              Don't forget! You have "Chair Yoga" scheduled for tomorrow at 10:00 AM. See you there!
                            </p>
                            <span className="text-[#6B6B6B] text-xs">Yesterday</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => setShowAlertsModal(false)}
                        className="w-full bg-gradient-to-br from-[#2563A8] to-[#1e4d87] text-white py-4 rounded-3xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Profile Modal */}
            <AnimatePresence>
              {showProfileModal && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setShowProfileModal(false)}
                  />
                  
                  {/* Modal */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-3xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
                  >
                    <div className="sticky top-0 bg-white border-b border-[#E8E6E0] px-6 py-4 rounded-t-3xl flex items-center justify-between">
                      <div>
                        <h2 className="text-[#2D2D2D] text-lg">Profile & Settings</h2>
                        <p className="text-[#6B6B6B] text-xs">Felix Thompson</p>
                      </div>
                      <button
                        onClick={() => setShowProfileModal(false)}
                        className="w-10 h-10 flex items-center justify-center text-[#6B6B6B] hover:bg-[#F5F5F0] rounded-full transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="p-6 space-y-3">
                      {/* Profile Info */}
                      <button className="w-full bg-[#FBF8F3] hover:bg-[#F5F5F0] rounded-3xl p-5 flex items-center gap-4 transition-all active:scale-95 shadow-md">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5B9BD5] to-[#2563A8] flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-[#2D2D2D] text-sm">My Profile</h3>
                          <p className="text-[#6B6B6B] text-xs">View and edit your personal information</p>
                        </div>
                      </button>

                      {/* Preferences */}
                      <button className="w-full bg-[#FBF8F3] hover:bg-[#F5F5F0] rounded-3xl p-5 flex items-center gap-4 transition-all active:scale-95 shadow-md">
                        <div className="w-12 h-12 rounded-full bg-[#8BA888] flex items-center justify-center flex-shrink-0">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-[#2D2D2D] text-sm">Preferences</h3>
                          <p className="text-[#6B6B6B] text-xs">Customize your app experience</p>
                        </div>
                      </button>

                      {/* Accessibility */}
                      <button className="w-full bg-[#FBF8F3] hover:bg-[#F5F5F0] rounded-3xl p-5 flex items-center gap-4 transition-all active:scale-95 shadow-md">
                        <div className="w-12 h-12 rounded-full bg-[#5B9BD5] flex items-center justify-center flex-shrink-0">
                          <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-[#2D2D2D] text-sm">Accessibility</h3>
                          <p className="text-[#6B6B6B] text-xs">Adjust text size, contrast, and more</p>
                        </div>
                      </button>

                      {/* App Settings */}
                      <button className="w-full bg-[#FBF8F3] hover:bg-[#F5F5F0] rounded-3xl p-5 flex items-center gap-4 transition-all active:scale-95 shadow-md">
                        <div className="w-12 h-12 rounded-full bg-[#E8A846] flex items-center justify-center flex-shrink-0">
                          <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-[#2D2D2D] text-sm">App Settings</h3>
                          <p className="text-[#6B6B6B] text-xs">Notifications, privacy, and security</p>
                        </div>
                      </button>

                      {/* Logout */}
                      <button className="w-full bg-[#FBF8F3] hover:bg-[#F5F5F0] rounded-3xl p-5 flex items-center gap-4 transition-all active:scale-95 shadow-md border-2 border-[#d4183d]/20">
                        <div className="w-12 h-12 rounded-full bg-[#d4183d] flex items-center justify-center flex-shrink-0">
                          <X className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-[#d4183d] text-sm">Log Out</h3>
                          <p className="text-[#6B6B6B] text-xs">Sign out of your account</p>
                        </div>
                      </button>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => setShowProfileModal(false)}
                        className="w-full bg-gradient-to-br from-[#2563A8] to-[#1e4d87] text-white py-4 rounded-3xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="listening-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col min-h-screen items-center justify-center px-6"
          >
            <div className="flex flex-col items-center gap-8 max-w-md w-full">
              <p className="text-slate-800 text-center">I'm listening...</p>
              
              {/* Friendly Avatar */}
              <div className="relative">
                <motion.div
                  className="w-64 h-64 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center shadow-2xl"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Face */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Eyes */}
                    <div className="absolute top-20 left-0 right-0 flex justify-center gap-12">
                      <motion.div
                        className="w-6 h-6 bg-slate-700 rounded-full"
                        animate={{
                          scaleY: [1, 0.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.1, 0.2]
                        }}
                      />
                      <motion.div
                        className="w-6 h-6 bg-slate-700 rounded-full"
                        animate={{
                          scaleY: [1, 0.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.1, 0.2]
                        }}
                      />
                    </div>
                    
                    {/* Smile */}
                    <motion.div
                      className="absolute bottom-16 left-1/2 -translate-x-1/2"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg width="80" height="40" viewBox="0 0 80 40">
                        <path
                          d="M 10 10 Q 40 30 70 10"
                          stroke="#475569"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Listening indicator */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              <p className="text-slate-600 text-center">
                Tell me what you'd like to do, and I'll help you get there.
              </p>

              {/* Done Button */}
              <button
                onClick={handleDone}
                className="mt-8 bg-gradient-to-br from-blue-400 to-blue-500 text-white px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <DemoToggleButton
        showAnnotations={showDemoAnnotations}
        onToggleAnnotations={setShowDemoAnnotations}
      />
    </div>
  );
}