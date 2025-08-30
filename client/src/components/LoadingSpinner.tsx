import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-white">
      <div className="text-center">
        {/* Spinner con colori italiani */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-neutral-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#009246] rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-r-[#ce2b37] rounded-full animate-spin" style={{ animationDelay: '0.3s' }}></div>
        </div>
        
        {/* Testo caricamento */}
        <div className="mt-4">
          <div className="h-1 w-32 italian-gradient mx-auto mb-2"></div>
          <p className="text-neutral-600 text-sm font-medium">Caricamento...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;