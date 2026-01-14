import { Suspense, lazy, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CountdownTimer from "@/components/CountdownTimer";
import WeddingVideoPlayer from "@/components/WeddingVideoPlayer";
import Parallax3DWrapper from "@/components/Parallax3DWrapper";
import InvitationEnvelope from "@/components/InvitationEnvelope";
import { Calendar, Heart, Sparkles, Loader2 } from "lucide-react";
import ganeshaImage from "@/assets/ganesha.png";
import shlokImage from "@/assets/shlok.png";
import { useGuestData, eventNameHindi, eventIcons, eventDescriptions } from "@/hooks/useGuestData";

// Lazy load the 3D scene for better performance
const Scene3D = lazy(() => import("@/components/Scene3D"));

const Index = () => {
  const [searchParams] = useSearchParams();
  const [showEnvelope, setShowEnvelope] = useState(true);
  
  // Get guest ID from URL parameters
  const guestId = searchParams.get('id') || '';
  
  // Fetch guest data from API
  const { guestData, loading, error } = useGuestData(guestId || null);

  const handleOpenInvitation = useCallback(() => {
    setShowEnvelope(false);
  }, []);
  
  // Wedding date: April 28, 2026
  const weddingDate = new Date("2026-04-28T18:00:00");

  // Loading state
  if (guestId && loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#722424] animate-spin mx-auto mb-4" />
          <p className="font-display text-[#722424]/70 tracking-wider">
            निमंत्रण पत्र लोड हो रहा है...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (guestId && error) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-6">
          <p className="font-display text-[#722424] text-xl mb-2">
            क्षमा करें
          </p>
          <p className="text-[#722424]/60">
            {error}
          </p>
        </div>
      </div>
    );
  }

  const mainContent = (
    <main className="min-h-screen bg-background relative overflow-hidden">
        {/* 3D Background Scene */}
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>

        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-cream-dark opacity-80" />
          
          {/* Floating Floral Elements */}
          <div className="absolute top-[8%] left-[6%] text-gold/25 text-5xl animate-float">✿</div>
          <div className="absolute top-[15%] right-[10%] text-gold/20 text-4xl animate-float-slow" style={{ animationDelay: "1s" }}>❀</div>
          <div className="absolute bottom-[25%] left-[10%] text-gold/20 text-4xl animate-float" style={{ animationDelay: "2s" }}>✿</div>
          <div className="absolute bottom-[10%] right-[8%] text-gold/25 text-5xl animate-float-slow" style={{ animationDelay: "0.5s" }}>❀</div>
          <div className="absolute top-[45%] left-[4%] text-gold/15 text-3xl animate-float" style={{ animationDelay: "1.5s" }}>❧</div>
          <div className="absolute top-[35%] right-[5%] text-gold/15 text-3xl animate-float-slow" style={{ animationDelay: "2.5s" }}>❧</div>
          
          {/* Ambient Light Effects */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-gold/8 to-transparent rounded-full blur-3xl animate-glow" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-royal-red/5 to-transparent rounded-full blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-gold/5 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative" style={{ zIndex: 10 }}>
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="w-full max-w-5xl">
              {/* Ganesha & Shlok Section */}
              <Parallax3DWrapper intensity={8} className="mb-10">
                <div className="ganesha-section text-center">
                  {/* Outer Decorative Frame */}
                  <div className="relative inline-block p-6 md:p-10">
                    {/* Elegant Border Frame */}
                    <div className="absolute inset-0 border border-gold/30 rounded-2xl" />
                    <div className="absolute inset-2 border border-gold/20 rounded-xl" />
                    
                    {/* Corner Ornaments */}
                    <div className="absolute -top-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent" />
                      <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-gold to-transparent" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                      <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-gold to-transparent" />
                      <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-gold to-transparent" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent" />
                      <div className="absolute bottom-0 left-0 h-full w-0.5 bg-gradient-to-t from-gold to-transparent" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                      <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-gold to-transparent" />
                      <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gradient-to-t from-gold to-transparent" />
                    </div>

                    {/* Ganesha Container */}
                    <div className="relative mb-5 animate-divine-entrance">
                      {/* Soft Glow Effect */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-36 h-36 md:w-44 md:h-44 bg-gradient-radial from-gold/25 via-gold/10 to-transparent rounded-full blur-2xl animate-pulse-glow" />
                      </div>
                      
                      {/* Subtle Ring */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 border border-gold/15 rounded-full" />
                      </div>
                      
                      {/* Ganesha Image */}
                      <div className="relative z-10 py-2">
                        <img 
                          src={ganeshaImage} 
                          alt="श्री गणेश" 
                          className="relative w-24 h-24 md:w-32 md:h-32 object-contain mx-auto ganesha-image animate-float"
                        />
                      </div>
                    </div>

                    {/* Shlok Container */}
                    <div className="relative max-w-xs md:max-w-sm mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
                      <img 
                        src={shlokImage} 
                        alt="वक्रतुण्ड महाकाय श्लोक" 
                        className="w-full h-auto object-contain shlok-image mx-auto"
                        style={{ maxHeight: '60px' }}
                      />
                    </div>

                    {/* Simple Divider */}
                    <div className="flex items-center justify-center gap-3 mt-5 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                      <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold/50" />
                      <span className="text-gold text-sm">✦</span>
                      <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold/50" />
                    </div>
                  </div>
                </div>
              </Parallax3DWrapper>

              {/* Title Section with 3D effect */}
              <Parallax3DWrapper intensity={8} className="mb-12">
                <div className="text-center">
                  <div className="inline-block mb-4 animate-fade-in-down">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-gold animate-twinkle" />
                      <p className="text-gold font-display text-xs md:text-sm tracking-[0.3em]">
                        ॥ शुभ विवाह ॥
                      </p>
                      <Sparkles className="w-4 h-4 text-gold animate-twinkle" style={{ animationDelay: "0.5s" }} />
                    </div>
                    <p className="text-gold/80 font-display text-xs tracking-[0.2em]">
                      आप सादर आमंत्रित हैं
                    </p>
                  </div>
                  
                  <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-royal-red mb-6 drop-shadow-lg animate-fade-in-up text-shadow-elegant title-3d" style={{ animationDelay: "0.2s" }}>
                    विपिन & प्रिया
                  </h1>
                  
                  <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <div className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent via-gold to-gold" />
                    <Heart className="w-6 h-6 text-gold animate-pulse-soft" fill="currentColor" />
                    <div className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent via-gold to-gold" />
                  </div>
                  
                  <p className="font-display text-lg md:text-xl text-muted-foreground tracking-wider animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    विवाह समारोह
                  </p>
                </div>
              </Parallax3DWrapper>

              {/* Video Player with 3D pop-out effect */}
              <div className="mb-16 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <Parallax3DWrapper intensity={12} perspective={1500} popOut className="video-3d-container">
                  <div className="video-3d-wrapper">
                    {/* 3D Shadow layers */}
                    <div className="video-shadow-layer video-shadow-1" />
                    <div className="video-shadow-layer video-shadow-2" />
                    <div className="video-shadow-layer video-shadow-3" />
                    
                    {/* Main video */}
                    <div className="video-main-layer">
                      <WeddingVideoPlayer />
                    </div>
                    
                    {/* 3D Frame overlay */}
                    <div className="video-frame-3d" />
                  </div>
                </Parallax3DWrapper>
              </div>
            </div>
          </section>

          {/* Countdown Section */}
          <section className="py-20 md:py-28 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/60 to-transparent" />
            <div className="relative z-10">
              <Parallax3DWrapper intensity={5}>
                <CountdownTimer targetDate={weddingDate} />
              </Parallax3DWrapper>
            </div>
          </section>

          {/* Events Section */}
          <section className="py-20 md:py-28 px-4">
            <div className="max-w-4xl mx-auto">
              <Parallax3DWrapper intensity={6}>
                <div className="text-center mb-14">
                  <p className="text-gold font-display text-xs md:text-sm tracking-[0.35em] uppercase mb-3 animate-fade-in">
                    शुभ कार्यक्रम
                  </p>
                  <h2 className="font-script text-5xl md:text-6xl lg:text-7xl text-foreground animate-fade-in-up title-3d" style={{ animationDelay: "0.1s" }}>
                    {guestData ? 'आपके लिए आमंत्रण' : 'विवाह समारोह'}
                  </h2>
                  <div className="flex items-center justify-center gap-3 mt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
                    <span className="text-gold text-lg">✦</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
                  </div>
                </div>
              </Parallax3DWrapper>

              {/* Dynamic Events from API or Default */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {guestData && guestData.events && guestData.events.length > 0 ? (
                  // Show events from API
                  guestData.events.map((event, index) => (
                    <Parallax3DWrapper key={event} intensity={10} popOut>
                      <EventCard
                        title={eventNameHindi[event] || event}
                        date="28 अप्रैल 2026"
                        day="मंगलवार"
                        time="शुभ मुहूर्त"
                        icon={eventIcons[event] || '✨'}
                        description={eventDescriptions[event] || 'आपकी उपस्थिति हमारे लिए सौभाग्य की बात होगी'}
                        delay={0.3 + index * 0.1}
                      />
                    </Parallax3DWrapper>
                  ))
                ) : (
                  // Default event when no guest data
                  <div className="md:col-span-2 flex justify-center">
                    <Parallax3DWrapper intensity={10} popOut>
                      <EventCard
                        title="शादी समारोह"
                        date="28 अप्रैल 2026"
                        day="मंगलवार"
                        time="शुभ मुहूर्त"
                        icon="💒"
                        description="पवित्र विवाह समारोह में आपकी उपस्थिति हमारे लिए सौभाग्य की बात होगी"
                        delay={0.3}
                      />
                    </Parallax3DWrapper>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 px-4 border-t border-gold/20 bg-gradient-to-t from-card/50 to-transparent">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
                <span className="text-gold text-base animate-twinkle">✦</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
              </div>
              
              <p className="text-muted-foreground text-sm font-display tracking-wider mb-2">
                अमंत्रण 3D इनविटेशन स्टूडियो द्वारा निर्मित
              </p>
              
              <p className="text-muted-foreground/60 text-xs font-display tracking-wider">
                © 2026 विपिन & प्रिया विवाह
              </p>
            </div>
          </footer>
        </div>
      </main>
  );

  return (
    <>
      <head>
        <title>{guestData ? `${guestData.name}${guestData.type === 'family' ? ' एवं परिवार' : ''} - ` : ''}विपिन & प्रिया विवाह निमंत्रण | अप्रैल 2026</title>
        <meta name="description" content={`${guestData ? `प्रिय ${guestData.name}${guestData.type === 'family' ? ' एवं परिवार' : ''}, आप` : 'आप'} विपिन और प्रिया के विवाह समारोह में सादर आमंत्रित हैं। 28 अप्रैल 2026`} />
      </head>
      
      {/* Personalized Invitation Envelope */}
      {guestData && showEnvelope && (
        <InvitationEnvelope 
          guestData={guestData}
          onOpen={handleOpenInvitation}
        />
      )}
      
      {/* Main Content - show when envelope is opened or no guest data */}
      {(!guestData || !showEnvelope) && mainContent}
    </>
  );
};

interface EventCardProps {
  title: string;
  date: string;
  day: string;
  time: string;
  icon: string;
  description: string;
  delay: number;
}

const EventCard = ({ title, date, day, time, icon, description, delay }: EventCardProps) => (
  <div 
    className="group relative animate-fade-in-up w-full"
    style={{ animationDelay: `${delay}s` }}
  >
    {/* Background Glow */}
    <div className="absolute -inset-2 bg-gradient-to-br from-gold/25 via-gold-light/15 to-gold/25 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
    
    {/* Card */}
    <div className="relative elegant-card rounded-2xl p-6 md:p-8 text-center group-hover:shadow-3d-hover transition-all duration-500 group-hover:-translate-y-2 overflow-hidden card-3d">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 group-hover:border-gold/70 rounded-tl-2xl transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 group-hover:border-gold/70 rounded-tr-2xl transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 group-hover:border-gold/70 rounded-bl-2xl transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 group-hover:border-gold/70 rounded-br-2xl transition-colors duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        
        <h3 className="font-display text-lg md:text-xl text-foreground mb-3 tracking-wide">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-gold" />
          <p className="text-gold font-display text-sm font-semibold tracking-wide">
            {date}
          </p>
        </div>
        
        <p className="text-muted-foreground text-xs uppercase tracking-[0.15em]">
          {day} • {time}
        </p>
      </div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/8 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
    </div>
  </div>
);

export default Index;
