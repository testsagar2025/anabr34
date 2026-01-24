import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Clock, Camera, ExternalLink, Utensils, Users } from 'lucide-react';

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
    timing: 'सायं ७:०० बजे',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  tilak: {
    timing: 'सायं ७:०० बजे',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  haldi: {
    timing: 'प्रातः १०:०० बजे',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  mehndi: {
    timing: 'सायं ५:०० बजे',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  shadi: {
    timing: 'शुभ मुहूर्त अनुसार',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
    additionalInfo: [
      { label: 'बारात आगमन समय', value: 'सायं ५:०० बजे', icon: 'users' },
      { label: 'भोजन समय', value: 'रात्रि ८:३० बजे', icon: 'utensils' },
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
      <DialogContent className="max-w-md mx-4 bg-gradient-to-br from-cream via-white to-cream-dark border-2 border-gold/30 rounded-2xl p-0 overflow-hidden">
        {/* Header with decorative background */}
        <div className="relative bg-gradient-to-br from-[#722424] to-[#5a1c1c] p-6 text-center">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L35 20L20 35L5 20z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }} />
          
          {/* Event Icon */}
          <div className="text-4xl mb-3 animate-float">{icon}</div>
          
          <DialogHeader>
            <DialogTitle className="font-script-hindi text-2xl md:text-3xl text-white mb-1">
              {event.title} समारोह
            </DialogTitle>
            <DialogDescription className="font-hindi text-gold/90 text-sm">
              {event.date} | {event.day}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Description */}
          <p className="font-hindi text-[#722424]/80 text-sm leading-relaxed text-center">
            {description}
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-gold text-sm">❧</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Timing */}
          {details?.timing && (
            <div className="flex items-center gap-3 p-3 bg-[#722424]/5 rounded-xl border border-[#722424]/10">
              <div className="w-10 h-10 rounded-full bg-[#722424]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#722424]" />
              </div>
              <div>
                <p className="font-hindi text-[#722424]/60 text-xs">समय</p>
                <p className="font-hindi text-[#722424] text-base font-medium">{details.timing}</p>
              </div>
            </div>
          )}

          {/* Location */}
          {details?.location && (
            <div className="flex items-center gap-3 p-3 bg-[#722424]/5 rounded-xl border border-[#722424]/10">
              <div className="w-10 h-10 rounded-full bg-[#722424]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#722424]" />
              </div>
              <div className="flex-1">
                <p className="font-hindi text-[#722424]/60 text-xs">स्थान</p>
                <p className="font-hindi text-[#722424] text-base font-medium">{details.location}</p>
              </div>
              {details.mapUrl && (
                <a 
                  href={details.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#722424] text-white rounded-lg text-xs font-hindi hover:bg-[#5a1c1c] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  नक्शा
                </a>
              )}
            </div>
          )}

          {/* Additional Info (for Shadi) */}
          {details?.additionalInfo && details.additionalInfo.length > 0 && (
            <div className="space-y-2">
              {details.additionalInfo.map((info, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gold/5 rounded-xl border border-gold/20">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    {getIcon(info.icon)}
                  </div>
                  <div>
                    <p className="font-hindi text-[#722424]/60 text-xs">{info.label}</p>
                    <p className="font-hindi text-[#722424] text-base font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Photo placeholder */}
          {details?.photo ? (
            <div className="relative rounded-xl overflow-hidden border border-gold/20">
              <img src={details.photo} alt={`${event.title} फोटो`} className="w-full h-40 object-cover" />
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 rounded-lg flex items-center gap-1">
                <Camera className="w-3 h-3 text-white" />
                <span className="font-hindi text-white text-xs">फोटो</span>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-dashed border-gold/30 bg-gold/5 h-32 flex flex-col items-center justify-center">
              <Camera className="w-8 h-8 text-gold/40 mb-2" />
              <p className="font-hindi text-gold/50 text-xs">फोटो जल्द ही उपलब्ध होगी</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDialog;
