import { useState } from 'react';
import { GuestData, eventNameHindi, eventIcons } from '@/hooks/useGuestData';

interface InvitationEnvelopeProps {
  guestData: GuestData;
  onOpen: () => void;
}

const InvitationEnvelope = ({ guestData, onOpen }: InvitationEnvelopeProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const displayName = guestData.type === 'family' 
    ? `${guestData.name} एवं परिवार` 
    : guestData.name;

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${isOpening ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundColor: '#fefefe' }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30z' fill='none' stroke='%23722424' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      {/* Main Card */}
      <div 
        className={`relative max-w-lg w-full mx-6 transition-all duration-700 ${isOpening ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}
      >
        {/* Decorative corners */}
        <div className="absolute -top-3 -left-3 w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#722424] to-transparent" />
          <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-[#722424] to-transparent" />
        </div>
        <div className="absolute -top-3 -right-3 w-12 h-12">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#722424] to-transparent" />
          <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-[#722424] to-transparent" />
        </div>
        <div className="absolute -bottom-3 -left-3 w-12 h-12">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#722424] to-transparent" />
          <div className="absolute bottom-0 left-0 h-full w-0.5 bg-gradient-to-t from-[#722424] to-transparent" />
        </div>
        <div className="absolute -bottom-3 -right-3 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#722424] to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gradient-to-t from-[#722424] to-transparent" />
        </div>

        {/* Card Content */}
        <div className="bg-white rounded-sm shadow-[0_4px_40px_rgba(114,36,36,0.08)] p-10 md:p-14 text-center border border-[#722424]/10">
          {/* Top Ornament */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-[#722424]/40" />
            <span className="text-[#722424]/60 text-lg">✦</span>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-[#722424]/40" />
          </div>

          {/* Shubh Vivah */}
          <p className="font-display text-sm md:text-base text-[#722424]/80 tracking-[0.3em] mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            ॥ शुभ विवाह ॥
          </p>

          {/* Cordially Invite */}
          <p className="font-display text-xs md:text-sm text-[#722424]/70 tracking-[0.3em] uppercase mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            हम सादर आमंत्रित करते हैं
          </p>

          {/* Guest Name */}
          <h1 
            className="font-script text-4xl md:text-6xl text-[#722424] mb-6 animate-fade-in-up leading-tight"
            style={{ animationDelay: '0.4s' }}
          >
            {displayName}
          </h1>

          {/* To Our Wedding */}
          <p className="font-display text-sm md:text-base text-[#722424]/60 tracking-[0.2em] mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            अपने विवाह समारोह में
          </p>

          {/* Events invited to */}
          {guestData.events && guestData.events.length > 0 && (
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <p className="text-[#722424]/50 text-xs uppercase tracking-[0.2em] mb-3">
                आप निम्नलिखित कार्यक्रमों में आमंत्रित हैं
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {guestData.events.map((event) => (
                  <span 
                    key={event}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#722424]/5 border border-[#722424]/20 rounded-full text-[#722424]/80 text-sm font-display"
                  >
                    <span>{eventIcons[event] || '✨'}</span>
                    <span>{eventNameHindi[event] || event}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#722424]/30" />
            <span className="text-[#722424]/40 text-sm">❧</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#722424]/30" />
          </div>

          {/* Couple Names */}
          <p className="font-script text-2xl md:text-3xl text-[#722424]/70 mb-10 animate-fade-in" style={{ animationDelay: '1s' }}>
            विपिन & प्रिया
          </p>

          {/* Open Card Button */}
          <button
            onClick={handleOpen}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#722424] text-white font-display text-sm tracking-[0.15em] rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(114,36,36,0.3)] animate-fade-in"
            style={{ animationDelay: '1.2s' }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative">निमंत्रण पत्र खोलें</span>
            
            {/* Arrow icon */}
            <svg 
              className="relative w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Bottom Ornament */}
          <div className="flex items-center justify-center gap-3 mt-10 animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-[#722424]/40" />
            <span className="text-[#722424]/60 text-lg">✦</span>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-[#722424]/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationEnvelope;
