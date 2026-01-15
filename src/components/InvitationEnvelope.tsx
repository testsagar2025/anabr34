import { useState } from 'react';
import { GuestData, eventNameHindi, eventIcons, eventDates } from '@/hooks/useGuestData';

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
        <div className="bg-white rounded-sm shadow-[0_4px_40px_rgba(114,36,36,0.08)] p-6 sm:p-8 md:p-12 text-center border border-[#722424]/10">
          {/* Top Ornament */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6 animate-fade-in">
            <span className="text-[#722424]/60 text-sm md:text-base">✦</span>
            <p className="font-script-hindi text-lg sm:text-xl md:text-2xl text-[#722424]/80">
              ॥ शुभ विवाह ॥
            </p>
            <span className="text-[#722424]/60 text-sm md:text-base">✦</span>
          </div>

          {/* Invitation Text */}
          <div className="mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <p className="font-hindi text-base md:text-lg text-[#722424]/80 mb-2">
              आमंत्रण
            </p>
            <p className="font-hindi text-xs sm:text-sm md:text-base text-[#722424]/60 max-w-sm mx-auto leading-relaxed">
              हम सादर आमंत्रित करते हैं आपको एवं आपके परिवार को विवाह संस्कार में
            </p>
          </div>

          {/* Guest Name */}
          <h1 
            className="font-script-hindi text-2xl sm:text-3xl md:text-5xl text-[#722424] mb-4 md:mb-6 animate-fade-in-up leading-tight"
            style={{ animationDelay: '0.3s' }}
          >
            श्री {displayName}
          </h1>

          {/* Couple Names */}
          <div className="mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="font-script-hindi text-xl sm:text-2xl md:text-3xl text-[#722424]/80 mb-2">
              विपिन & प्रिया
            </p>
            <p className="font-hindi text-xs sm:text-sm text-[#722424]/50">
              के पवित्र विवाह समारोह में शामिल होने के लिए
            </p>
          </div>

          {/* Events invited to */}
          {guestData.events && guestData.events.length > 0 && (
            <div className="mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="font-hindi text-[#722424]/50 text-xs mb-3">
                आप निम्नलिखित कार्यक्रमों में आमंत्रित हैं
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {[...guestData.events]
                  .sort((a, b) => {
                    const order = ['rasum', 'tilak', 'haldi', 'mehndi', 'shadi'];
                    return order.indexOf(a) - order.indexOf(b);
                  })
                  .map((event) => (
                    <span 
                      key={event}
                      className="inline-flex flex-col items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-[#722424]/5 border border-[#722424]/15 rounded-lg"
                    >
                      <span className="text-base sm:text-lg mb-0.5">{eventIcons[event] || '✨'}</span>
                      <span className="font-hindi text-[#722424]/80 text-[10px] sm:text-xs font-medium">{eventNameHindi[event] || event}</span>
                      <span className="font-hindi text-[#722424]/50 text-[9px] sm:text-[10px]">{eventDates[event]?.date || ''}</span>
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="h-px w-6 md:w-8 bg-gradient-to-r from-transparent to-[#722424]/30" />
            <span className="text-[#722424]/40 text-xs md:text-sm">❧</span>
            <div className="h-px w-6 md:w-8 bg-gradient-to-l from-transparent to-[#722424]/30" />
          </div>

          {/* Blessing Text */}
          <p className="font-hindi text-xs sm:text-sm text-[#722424]/50 mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            आपका प्रेम, आशीर्वाद एवं समर्थन हमारे परिवार के लिए अत्यंत महत्वपूर्ण है।
          </p>

          {/* Open Card Button */}
          <button
            onClick={handleOpen}
            className="group relative inline-flex items-center gap-2 md:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#722424] text-white font-hindi text-xs sm:text-sm rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(114,36,36,0.3)] animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative">निमंत्रण पत्र खोलें</span>
            
            {/* Arrow icon */}
            <svg 
              className="relative w-3.5 h-3.5 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Bottom Ornament */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mt-6 md:mt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-[#722424]/40" />
            <span className="text-[#722424]/60 text-sm md:text-base">✦</span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-[#722424]/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationEnvelope;
