import { useState, useEffect } from 'react';
import { Check, Mic, Home, Bell, Settings, Calendar, Gamepad2, FolderOpen, Radio, Heart, User, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResourcesHub } from './components/ResourcesHub';
import { ResourcesList } from './components/ResourcesList';
import { DailyCheckIn } from './components/DailyCheckIn';
import { DemoToggleButton } from './components/DemoToggleButton';
import { GeniallyEmbed } from './components/GeniallyEmbed';
import { NavigationBar } from './components/NavigationBar';

type ViewType = 'startup' | 'provider' | 'home' | 'resources' | 'resourcesList' | 'dailyCheckIn' | 'embed';

const GENIALLY_BASE = 'https://view.genially.com/69499a7c6254c506cf6422ac';

export default function App() {
  const [isPressing, setIsPressing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsInfo, setShowSettingsInfo] = useState(false);
  // Always start at startup page - don't restore from localStorage
  // This ensures users always see the entry point (Member/Provider selection)
  const [currentView, setCurrentView] = useState<ViewType>('startup');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showDemoAnnotations, setShowDemoAnnotations] = useState(false);
  const [currentEmbedUrl, setCurrentEmbedUrl] = useState<string>('');

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
      action: 'dailyCheckIn',
      embedUrl: null
    },
    { 
      id: 2, 
      label: 'Games', 
      icon: Gamepad2, 
      color: 'bg-[#8BA888]', // Soft Sage - calm social activity
      iconColor: 'text-[#2D2D2D]',
      description: "Enjoy simple, fun games that keep your mind active and lift your spirits.",
      action: null,
      embedUrl: `${GENIALLY_BASE}?idSlide=c2638c0c-88b2-4441-809f-d2f2fc316a7d`
    },
    { 
      id: 3, 
      label: 'Live Activities', 
      icon: Radio, 
      color: 'bg-[#5B9BD5]', // Warm Blue - social activity
      iconColor: 'text-[#2D2D2D]',
      description: "Join real-time classes, events, and social sessions happening right now.",
      action: null,
      embedUrl: `${GENIALLY_BASE}?idSlide=3e6e8313-2e3f-465c-a09d-76aeea506121`
    },
    { 
      id: 4, 
      label: 'Media Gallery', 
      icon: FolderOpen, 
      color: 'bg-[#8BA888]', // Soft Sage - calm activity
      iconColor: 'text-[#2D2D2D]',
      description: "Browse photos and moments shared by your Good Hands community.",
      action: null,
      embedUrl: `${GENIALLY_BASE}?idSlide=8551be36-354a-43c1-9f32-f6f22270122e`
    },
    { 
      id: 5, 
      label: 'Calendar', 
      icon: Calendar, 
      color: 'bg-[#5B9BD5]', // Warm Blue - informational
      iconColor: 'text-[#2D2D2D]',
      description: "See all of your upcoming activities, classes, and special events.",
      action: null,
      embedUrl: `${GENIALLY_BASE}?idSlide=f9cd8a38-2b06-4ef7-a774-ed04a4f9042d`
    },
    { 
      id: 6, 
      label: 'Request Help', 
      icon: Heart, 
      color: 'bg-[#E8A846]', // Brand Gold - high priority/urgent
      iconColor: 'text-[#2D2D2D]',
      description: "Ask for assistance or support whenever you need it — we're here for you.",
      action: null,
      embedUrl: null
    },
    { 
      id: 7, 
      label: 'Resources', 
      icon: BookOpen, 
      color: 'bg-[#2563A8]', // Brand Blue - navigation/stability
      iconColor: 'text-white',
      description: "Find nearby pharmacies, food support, clinics, and community services.",
      action: 'resources',
      embedUrl: null
    },
  ];

  // Note: View persistence disabled - app always starts at startup page
  // If you want to restore last view on reload, uncomment below and modify initialization:
  // useEffect(() => {
  //   if (currentView !== 'startup' && currentView !== 'provider') {
  //     localStorage.setItem('goodhands_last_view', currentView);
  //   }
  // }, [currentView]);

  // Keyboard navigation: Escape key returns to home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentView !== 'startup' && currentView !== 'home') {
        navigateToView('home');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView]);

  const navigateToView = (view: ViewType, embedUrl?: string) => {
    setCurrentView(view);
    if (embedUrl) {
      setCurrentEmbedUrl(embedUrl);
    } else if (view === 'embed' && !embedUrl) {
      // Safety: If navigating to embed without URL, go home instead
      console.warn('Attempted to navigate to embed view without URL, redirecting to home');
      setCurrentView('home');
    }
    setFlippedCard(null);
  };

  const handleTileClick = (tile: typeof tiles[0]) => {
    if (tile.embedUrl) {
      navigateToView('embed', tile.embedUrl);
    } else if (tile.action === 'resources') {
      navigateToView('resources');
    } else if (tile.action === 'dailyCheckIn') {
      navigateToView('dailyCheckIn');
    } else {
      setFlippedCard(tile.id);
    }
  };

  const handleNavHome = () => {
    if (currentView !== 'home') {
      navigateToView('home');
    }
  };

  const handleNavCalendar = () => {
    const calendarUrl = `${GENIALLY_BASE}?idSlide=f9cd8a38-2b06-4ef7-a774-ed04a4f9042d`;
    if (currentView !== 'embed' || currentEmbedUrl !== calendarUrl) {
      navigateToView('embed', calendarUrl);
    }
  };

  const handleNavGames = () => {
    const gamesUrl = `${GENIALLY_BASE}?idSlide=c2638c0c-88b2-4441-809f-d2f2fc316a7d`;
    if (currentView !== 'embed' || currentEmbedUrl !== gamesUrl) {
      navigateToView('embed', gamesUrl);
    }
  };

  const handleNavLeaderboard = () => {
    const leaderboardUrl = `${GENIALLY_BASE}?idSlide=00ea8673-0fd5-4c37-ae16-c263fdf26021`;
    if (currentView !== 'embed' || currentEmbedUrl !== leaderboardUrl) {
      navigateToView('embed', leaderboardUrl);
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    navigateToView('resourcesList');
  };

  const handleBackToHome = () => {
    navigateToView('home');
    setSelectedCategory('');
  };

  const handleBackToResources = () => {
    navigateToView('resources');
    setSelectedCategory('');
  };

  const handleMicClick = () => {
    setIsListening(true);
    setIsPressing(false);
  };

  const handleDone = () => {
    setIsListening(false);
  };

  // Show navigation bar on all views except startup and provider
  const showNavBar = currentView !== 'startup' && currentView !== 'provider';

  return (
    <div className="h-full w-full bg-[#FBF8F3] flex flex-col overflow-hidden safe-area-inset">
      <AnimatePresence mode="wait">
        {/* Startup Page with Member Overlay */}
        {currentView === 'startup' ? (
          <motion.div
            key="startup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full"
          >
            <GeniallyEmbed
              url={`${GENIALLY_BASE}?idSlide=93c55ad7-5d50-4f72-9578-2e1bc7779e06`}
              title="Good Hands Startup"
              showMemberOverlay={true}
              onMemberClick={() => navigateToView('home')}
              onError={handleBackToHome}
            />
          </motion.div>
        ) : currentView === 'provider' ? (
          /* Provider Portal Page */
          <motion.div
            key="provider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full"
          >
            <GeniallyEmbed
              url={`${GENIALLY_BASE}?idSlide=99f1842f-c126-493e-992a-9a20e0d8c6d1`}
              title="Provider Portal"
              onError={() => navigateToView('startup')}
            />
          </motion.div>
        ) : currentView === 'embed' ? (
          /* Genially Embed View (Calendar, Games, Media, etc.) */
          <motion.div
            key="embed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full w-full"
          >
            <NavigationBar
              onHomeClick={handleNavHome}
              onCalendarClick={handleNavCalendar}
              onGamesClick={handleNavGames}
              onLeaderboardClick={handleNavLeaderboard}
              onBellClick={() => setShowAlertsModal(true)}
              onProfileClick={() => setShowProfileModal(true)}
              currentView={currentView}
            />
            <div className="flex-1 relative overflow-hidden">
              <GeniallyEmbed
                url={currentEmbedUrl}
                title="Genially Content"
                onError={handleBackToHome}
              />
            </div>
          </motion.div>
        ) : currentView === 'dailyCheckIn' ? (
          /* Daily Check-In Component */
          <motion.div
            key="daily-check-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full w-full"
          >
            <NavigationBar
              onHomeClick={handleNavHome}
              onCalendarClick={handleNavCalendar}
              onGamesClick={handleNavGames}
              onLeaderboardClick={handleNavLeaderboard}
              onBellClick={() => setShowAlertsModal(true)}
              onProfileClick={() => setShowProfileModal(true)}
              currentView={currentView}
            />
            <div className="flex-1 overflow-auto">
              <DailyCheckIn
                userName="Felix"
                onClose={handleBackToHome}
                onNavigateToResources={() => navigateToView('resources')}
              />
            </div>
          </motion.div>
        ) : currentView === 'resources' ? (
          /* Resources Hub Component */
          <motion.div
            key="resources-hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full w-full"
          >
            <NavigationBar
              onHomeClick={handleNavHome}
              onCalendarClick={handleNavCalendar}
              onGamesClick={handleNavGames}
              onLeaderboardClick={handleNavLeaderboard}
              onBellClick={() => setShowAlertsModal(true)}
              onProfileClick={() => setShowProfileModal(true)}
              currentView={currentView}
            />
            <div className="flex-1 overflow-auto">
              <ResourcesHub
                onSelectCategory={handleSelectCategory}
                onBack={handleBackToHome}
                showDemoAnnotations={showDemoAnnotations}
              />
            </div>
          </motion.div>
        ) : currentView === 'resourcesList' ? (
          /* Resources List Component */
          <motion.div
            key="resources-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full w-full"
          >
            <NavigationBar
              onHomeClick={handleNavHome}
              onCalendarClick={handleNavCalendar}
              onGamesClick={handleNavGames}
              onLeaderboardClick={handleNavLeaderboard}
              onBellClick={() => setShowAlertsModal(true)}
              onProfileClick={() => setShowProfileModal(true)}
              currentView={currentView}
            />
            <div className="flex-1 overflow-auto">
              <ResourcesList
                category={selectedCategory}
                onBack={handleBackToResources}
                showDemoAnnotations={showDemoAnnotations}
              />
            </div>
          </motion.div>
        ) : !isListening ? (
          /* Home View - Tile Menu */
          <motion.div
            key="main-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full w-full"
          >
            {/* Navigation Bar */}
            <NavigationBar
              onHomeClick={handleNavHome}
              onCalendarClick={handleNavCalendar}
              onGamesClick={handleNavGames}
              onLeaderboardClick={handleNavLeaderboard}
              onBellClick={() => setShowAlertsModal(true)}
              onProfileClick={() => setShowProfileModal(true)}
              currentView={currentView}
            />

            {/* Top Area */}
            <header className="px-4 pt-3 pb-2 sm:px-6 sm:pt-4 sm:pb-3">
              <div className="text-center">
                <p className="text-[#2D2D2D] text-base sm:text-lg mb-1">Good Morning, Felix</p>
                <p className="text-[#2D2D2D] text-sm sm:text-base mb-2">You're in Good Hands</p>
                <p className="text-[#2D2D2D] text-sm sm:text-base">{formatDate(currentTime)}</p>
                <p className="text-[#6B6B6B] text-sm sm:text-base">{formatTime(currentTime)}</p>
              </div>
            </header>

            {/* Middle Area - Tile Grid */}
            <main className="flex-1 px-4 py-2 sm:px-6 sm:py-4 overflow-auto">
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
            <div className="px-4 pb-3 sm:px-6 sm:pb-4 flex flex-col items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="flex flex-col items-center">
                <button
                  onMouseDown={() => setIsPressing(true)}
                  onMouseUp={() => setIsPressing(false)}
                  onMouseLeave={() => setIsPressing(false)}
                  onTouchStart={() => setIsPressing(true)}
                  onTouchEnd={() => setIsPressing(false)}
                  onClick={handleMicClick}
                  className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 shadow-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                    isPressing ? 'scale-95 shadow-lg' : 'hover:scale-105'
                  }`}
                >
                  <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={3} />
                  <span className="text-white text-xs">Click to Speak</span>
                </button>
                <p className="text-slate-600 text-center text-xs mt-2 px-6">
                  The app will listen and guide you.
                </p>
              </div>
            </div>

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

      {/* Global Modals - Available on all views */}
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

      <DemoToggleButton
        showAnnotations={showDemoAnnotations}
        onToggleAnnotations={setShowDemoAnnotations}
      />
    </div>
  );
}