import { useState, useEffect } from 'react';
import { Check, Mic, Home, Bell, Settings, Calendar, Gamepad2, FolderOpen, Radio, Heart, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isPressing, setIsPressing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showAlertsInfo, setShowAlertsInfo] = useState(false);
  const [showSettingsInfo, setShowSettingsInfo] = useState(false);

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
      color: 'bg-emerald-100',
      description: "A quick tap to let us know you're doing okay today."
    },
    { 
      id: 2, 
      label: 'Games', 
      icon: Gamepad2, 
      color: 'bg-purple-100',
      description: "Enjoy simple, fun games that keep your mind active and lift your spirits."
    },
    { 
      id: 3, 
      label: 'Live Activities', 
      icon: Radio, 
      color: 'bg-blue-100',
      description: "Join real-time classes, events, and social sessions happening right now."
    },
    { 
      id: 4, 
      label: 'Media Gallery', 
      icon: FolderOpen, 
      color: 'bg-amber-100',
      description: "Browse photos and moments shared by your Good Hands community."
    },
    { 
      id: 5, 
      label: 'Calendar', 
      icon: Calendar, 
      color: 'bg-cyan-100',
      description: "See all of your upcoming activities, classes, and special events."
    },
    { 
      id: 6, 
      label: 'Request Help', 
      icon: Heart, 
      color: 'bg-rose-100',
      description: "Ask for assistance or support whenever you need it — we're here for you."
    },
  ];

  const handleMicClick = () => {
    setIsListening(true);
    setIsPressing(false);
  };

  const handleDone = () => {
    setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col safe-area-inset">
      <AnimatePresence mode="wait">
        {!isListening ? (
          <motion.div
            key="main-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-h-screen"
          >
            {/* Top Area */}
            <header className="px-4 pt-4 pb-3 sm:px-6 sm:pt-8 sm:pb-4">
              <div className="flex items-start justify-between mb-2 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm sm:text-base">Good Morning, Felix</p>
                  <p className="text-slate-800 text-sm sm:text-base">You're in Good Hands</p>
                </div>
                <div className="perspective-1000 w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ rotateY: showProfileInfo ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front - Profile Icon */}
                    <button
                      onClick={() => setShowProfileInfo(true)}
                      className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 border-4 border-white shadow-md flex items-center justify-center"
                      style={{ 
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                      }}
                    >
                      <User className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700" strokeWidth={2.5} />
                    </button>
                    
                    {/* Back - Info Tooltip - Mobile optimized positioning */}
                    <div
                      className="absolute right-0 top-16 w-64 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl p-4 border-2 border-blue-200 z-50"
                      style={{ 
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      }}
                    >
                      <button
                        onClick={() => setShowProfileInfo(false)}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center"
                      >
                        <X className="w-5 h-5 text-slate-500" />
                      </button>
                      <p className="text-slate-800 text-sm leading-relaxed pt-4">
                        Your profile. View your info, preferences, and account settings.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-slate-800 text-sm sm:text-base">{formatDate(currentTime)}</p>
                <p className="text-slate-700 text-sm sm:text-base">{formatTime(currentTime)}</p>
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
                          onClick={() => setFlippedCard(tile.id)}
                          className={`absolute inset-0 ${tile.color} rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-3 min-h-[110px] sm:min-h-[140px]`}
                          style={{ 
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden"
                          }}
                        >
                          <Icon className="w-10 h-10 sm:w-14 sm:h-14 text-slate-700" strokeWidth={2.5} />
                          <span className="text-slate-800 text-center text-sm sm:text-base">{tile.label}</span>
                        </button>
                        
                        {/* Back of card */}
                        <button
                          onClick={() => setFlippedCard(null)}
                          className={`absolute inset-0 ${tile.color} rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow active:scale-95 flex flex-col items-center justify-center min-h-[110px] sm:min-h-[140px]`}
                          style={{ 
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                          }}
                        >
                          <p className="text-slate-800 text-center text-xs sm:text-sm leading-relaxed">
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

              {/* Bottom Navigation */}
              <nav className="w-full bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg py-3 px-4 sm:py-4 sm:px-8 flex justify-around items-center max-w-md mx-auto relative">
                <button className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] -m-1 p-1">
                  <Home className="w-7 h-7 sm:w-8 sm:h-8 text-slate-700" strokeWidth={2.5} />
                  <span className="text-xs text-slate-700">Home</span>
                </button>
                
                {/* Alerts Button with Tooltip */}
                <div className="relative flex flex-col items-center">
                  <AnimatePresence>
                    {showAlertsInfo && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full mb-2 w-56 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-xl p-4 border-2 border-amber-200 z-10"
                      >
                        <button
                          onClick={() => setShowAlertsInfo(false)}
                          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center"
                        >
                          <X className="w-5 h-5 text-slate-500" />
                        </button>
                        <p className="text-slate-800 text-sm leading-relaxed pt-2">
                          View important messages, reminders, and notifications from Good Hands.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => setShowAlertsInfo(!showAlertsInfo)}
                    className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] -m-1 p-1"
                  >
                    <Bell className="w-7 h-7 sm:w-8 sm:h-8 text-slate-500" strokeWidth={2} />
                    <span className="text-xs text-slate-500">Alerts</span>
                  </button>
                </div>
                
                {/* Settings Button with Tooltip */}
                <div className="relative flex flex-col items-center">
                  <AnimatePresence>
                    {showSettingsInfo && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full mb-2 w-56 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-xl p-4 border-2 border-purple-200 z-10"
                      >
                        <button
                          onClick={() => setShowSettingsInfo(false)}
                          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center"
                        >
                          <X className="w-5 h-5 text-slate-500" />
                        </button>
                        <p className="text-slate-800 text-sm leading-relaxed pt-2">
                          Adjust your app preferences, accessibility options, and personal settings.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => setShowSettingsInfo(!showSettingsInfo)}
                    className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] -m-1 p-1"
                  >
                    <Settings className="w-7 h-7 sm:w-8 sm:h-8 text-slate-500" strokeWidth={2} />
                    <span className="text-xs text-slate-500">Settings</span>
                  </button>
                </div>
              </nav>
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
    </div>
  );
}