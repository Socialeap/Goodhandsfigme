import { Home, Calendar, Gamepad2, Trophy, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationBarProps {
  onHomeClick: () => void;
  onCalendarClick: () => void;
  onGamesClick: () => void;
  onLeaderboardClick: () => void;
  onBellClick: () => void;
  onProfileClick: () => void;
  currentView?: string;
}

export function NavigationBar({
  onHomeClick,
  onCalendarClick,
  onGamesClick,
  onLeaderboardClick,
  onBellClick,
  onProfileClick,
  currentView
}: NavigationBarProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', onClick: onHomeClick, color: 'from-[#2563A8] to-[#1e4d87]' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', onClick: onCalendarClick, color: 'from-[#5B9BD5] to-[#4a8bc4]' },
    { id: 'games', icon: Gamepad2, label: 'Games', onClick: onGamesClick, color: 'from-[#8BA888] to-[#7a9979]' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', onClick: onLeaderboardClick, color: 'from-[#E8A846] to-[#d99835]' },
  ];

  const userItems = [
    { id: 'bell', icon: Bell, label: 'Alerts', onClick: onBellClick, color: 'from-[#E8A846] to-[#d99835]', badge: 3 },
    { id: 'profile', icon: User, label: 'Profile', onClick: onProfileClick, color: 'from-[#5B9BD5] to-[#2563A8]' },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-white border-b border-[#E8E6E0] shadow-sm"
    >
      <div className="flex items-center justify-between px-3 py-2 max-w-7xl mx-auto">
        {/* Primary Navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`
                  relative group flex items-center gap-1.5 sm:gap-2 
                  px-2 sm:px-3 py-2 rounded-xl
                  bg-gradient-to-br ${item.color}
                  shadow-sm hover:shadow-md
                  transition-all active:scale-95
                  min-w-[44px] sm:min-w-[48px]
                `}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" strokeWidth={2.5} />
                <span className="hidden md:inline text-white text-sm font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {userItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`
                  relative flex items-center justify-center
                  w-10 h-10 sm:w-11 sm:h-11 rounded-full
                  bg-gradient-to-br ${item.color}
                  border-2 border-white shadow-md
                  transition-all active:scale-95 hover:shadow-lg
                `}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4183d] text-white text-xs rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
