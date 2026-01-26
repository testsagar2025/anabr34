import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Clock, Camera, ExternalLink, Utensils, Users, Sparkles, Navigation } from 'lucide-react';

export interface EventDetail {
  eventKey: string;
  title: string;
  date: string;
  day: string;
  timing?: string;
  location?: string;
  mapUrl?: string;
  photo?: string;
  additionalInfo?: {
    label: string;
    value: string;
    icon?: 'clock' | 'utensils' | 'users';
  }[];
}

// Event details configuration
export const eventDetails: Record<string, Omit<EventDetail, 'eventKey' | 'title' | 'date' | 'day'>> = {
  rasum: {
    timing: 'रात्रि ८:०० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  tilak: {
    timing: 'रात्रि ८:०० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  haldi: {
    timing: 'प्रातः १०:३० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  mehndi: {
    timing: 'सायं ७:०० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  shadi: {
    timing: 'शुभ मुहूर्त अनुसार',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
    additionalInfo: [
      { label: 'बारात प्रस्थान', value: 'सायं ५:३० बजे', icon: 'users' },
      { label: 'पाणिग्रहण संस्कार', value: 'मध्यरात्रि १२:०० बजे (२९ अप्रैल)', icon: 'clock' },
    ],
  },
};

interface EventDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetail | null;
  icon: string;
  description: string;
}

const EventDetailDialog = ({ isOpen, onClose, event, icon, description }: EventDetailDialogProps) => {
  if (!event) return null;

  const details = eventDetails[event.eventKey];

  const getIcon = (iconType?: 'clock' | 'utensils' | 'users') => {
    switch (iconType) {
      case 'utensils': return <Utensils className="w-4 h-4" />;
      case 'users': return <Users className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 bg-gradient-to-br from-cream via-white to-cream-dark border-0 rounded-3xl p-0 overflow-hidden shadow-2xl animate-scale-in">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-2xl animate-pulse-soft" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-radial from-royal-red/10 to-transparent rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>

        {/* Header with enhanced decorative background */}
        <div className="relative bg-gradient-to-br from-[#722424] via-[#8a2c2c] to-[#5a1c1c] p-6 md:p-8 text-center overflow-hidden">
          {/* Animated Decorative Pattern */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='%23d4af37' stroke-width='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'shimmer 3s ease-in-out infinite'
          }} />
          
          {/* Sparkle Effects */}
          <div className="absolute top-4 left-6 text-gold/40 animate-twinkle">✦</div>
          <div className="absolute top-8 right-8 text-gold/30 animate-twinkle" style={{ animationDelay: '0.5s' }}>✧</div>
          <div className="absolute bottom-4 left-10 text-gold/25 animate-twinkle" style={{ animationDelay: '1s' }}>✦</div>
          <div className="absolute bottom-6 right-6 text-gold/35 animate-twinkle" style={{ animationDelay: '1.5s' }}>✧</div>
          
          {/* Event Icon with Glow */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse-soft scale-150" />
            <div className="relative text-5xl md:text-6xl animate-float filter drop-shadow-lg">{icon}</div>
          </div>
          
          <DialogHeader>
            <DialogTitle className="font-script-hindi text-2xl md:text-3xl lg:text-4xl text-white mb-2 drop-shadow-lg">
              {event.title} समारोह
            </DialogTitle>
            <DialogDescription className="font-hindi text-gold text-sm md:text-base font-medium tracking-wide">
              {event.date} • {event.day}
            </DialogDescription>
          </DialogHeader>

          {/* Bottom Decorative Wave */}
          <div className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-cream/20" />
        </div>

        {/* Content with enhanced styling */}
        <div className="relative p-5 md:p-6 space-y-4">
          {/* Description with elegant styling */}
          <div className="relative p-4 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl border border-gold/10">
            <Sparkles className="absolute top-3 right-3 w-4 h-4 text-gold/30" />
            <p className="font-hindi text-[#722424]/80 text-sm md:text-base leading-relaxed text-center italic">
              "{description}"
            </p>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-gold/30" />
            <span className="text-gold text-lg animate-pulse-soft">❧</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold/50 to-gold/30" />
          </div>

          {/* Timing Card */}
          {details?.timing && (
            <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#722424]/8 via-[#722424]/5 to-transparent rounded-2xl border border-[#722424]/15 hover:border-[#722424]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722424] to-[#8a2c2c] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-hindi text-[#722424]/50 text-xs uppercase tracking-wider mb-0.5">समय</p>
                <p className="font-hindi text-[#722424] text-lg font-semibold">{details.timing}</p>
              </div>
            </div>
          )}

          {/* Location Card */}
          {details?.location && (
            <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#722424]/8 via-[#722424]/5 to-transparent rounded-2xl border border-[#722424]/15 hover:border-[#722424]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722424] to-[#8a2c2c] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-hindi text-[#722424]/50 text-xs uppercase tracking-wider mb-0.5">स्थान</p>
                <p className="font-hindi text-[#722424] text-lg font-semibold">{details.location}</p>
              </div>
              {details.mapUrl && (
                <a 
                  href={details.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#722424] to-[#8a2c2c] text-white rounded-xl text-sm font-hindi hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                >
                  <Navigation className="w-4 h-4 group-hover:animate-pulse" />
                  नक्शा देखें
                </a>
              )}
            </div>
          )}

          {/* Additional Info Cards (for Shadi) */}
          {details?.additionalInfo && details.additionalInfo.length > 0 && (
            <div className="space-y-3 pt-2">
              <p className="font-hindi text-gold text-xs uppercase tracking-wider text-center">विशेष जानकारी</p>
              {details.additionalInfo.map((info, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg text-royal-red-dark group-hover:scale-110 transition-transform duration-300">
                    {getIcon(info.icon)}
                  </div>
                  <div>
                    <p className="font-hindi text-[#722424]/50 text-xs uppercase tracking-wider mb-0.5">{info.label}</p>
                    <p className="font-hindi text-[#722424] text-lg font-semibold">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Photo Section */}
          {details?.photo ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold/20 shadow-xl group">
              <img src={details.photo} alt={`${event.title} फोटो`} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-white" />
                <span className="font-hindi text-white text-xs">फोटो</span>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-gold/25 bg-gradient-to-br from-gold/5 to-gold/10 h-36 flex flex-col items-center justify-center group hover:border-gold/40 transition-colors duration-300">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%200v20M0%2010h20%22%20stroke%3D%22%23d4af37%22%20stroke-width%3D%220.1%22%20opacity%3D%220.3%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
              <Camera className="w-10 h-10 text-gold/40 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-hindi text-gold/60 text-sm">फोटो जल्द ही उपलब्ध होगी</p>
              <p className="font-hindi text-gold/40 text-xs mt-1">📷 कृपया प्रतीक्षा करें</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDialog;
