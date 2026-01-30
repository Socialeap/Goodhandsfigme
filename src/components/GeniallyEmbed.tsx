import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

interface GeniallyEmbedProps {
  url: string;
  title?: string;
  onError?: () => void;
  showMemberOverlay?: boolean;
  onMemberClick?: () => void;
}

export function GeniallyEmbed({ 
  url, 
  title, 
  onError,
  showMemberOverlay = false,
  onMemberClick
}: GeniallyEmbedProps) {
  const [hasError, setHasError] = useState(false);

  const handleIframeError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#FBF8F3] flex flex-col items-center justify-center p-6"
      >
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-[0_8px_24px_rgba(0,0,0,0.12)] text-center">
          <div className="w-20 h-20 rounded-full bg-[#d4183d]/10 flex items-center justify-center mx-auto mb-6">
            <Home className="w-10 h-10 text-[#d4183d]" strokeWidth={2.5} />
          </div>
          <h2 className="text-[#2D2D2D] text-2xl mb-4">
            Unable to Load Content
          </h2>
          <p className="text-[#6B6B6B] text-base leading-relaxed mb-6">
            We're having trouble loading this page. Please try again or return home.
          </p>
          <button
            onClick={onError}
            className="w-full bg-gradient-to-br from-[#2563A8] to-[#1e4d87] text-white py-4 rounded-3xl shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Return to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <iframe
        src={url}
        title={title || 'Genially Content'}
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation"
        onError={handleIframeError}
      />
      
      {/* Invisible overlay for Member button on startup page */}
      {showMemberOverlay && onMemberClick && (
        <button
          onClick={onMemberClick}
          className="absolute bg-transparent border-0 cursor-pointer hover:bg-transparent"
          style={{
            width: '214px',
            height: '58px',
            left: '50%',
            top: '67%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
          aria-label="Go to Member Portal"
        />
      )}
    </div>
  );
}
