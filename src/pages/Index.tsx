import CountdownTimer from "@/components/CountdownTimer";
import WeddingVideoPlayer from "@/components/WeddingVideoPlayer";
import { Calendar, Heart } from "lucide-react";

const Index = () => {
  // Wedding date: April 28, 2026
  const weddingDate = new Date("2026-04-28T18:00:00");

  return (
    <>
      <head>
        <title>विपिन & प्रिया विवाह निमंत्रण | अप्रैल 2026</title>
        <meta name="description" content="आप सादर आमंत्रित हैं - विपिन और प्रिया के विवाह समारोह में। 28 अप्रैल 2026" />
      </head>
      
      <main className="min-h-screen bg-gradient-to-br from-background via-marble to-background relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute top-[10%] left-[5%] text-gold/20 text-6xl animate-float">✿</div>
          <div className="absolute top-[20%] right-[8%] text-gold/15 text-4xl animate-float" style={{ animationDelay: "1s" }}>❀</div>
          <div className="absolute bottom-[30%] left-[8%] text-gold/15 text-5xl animate-float" style={{ animationDelay: "2s" }}>✿</div>
          <div className="absolute bottom-[15%] right-[5%] text-gold/20 text-6xl animate-float" style={{ animationDelay: "0.5s" }}>❀</div>
          <div className="absolute top-[50%] left-[3%] text-gold/10 text-3xl animate-float" style={{ animationDelay: "1.5s" }}>❧</div>
          <div className="absolute top-[40%] right-[3%] text-gold/10 text-3xl animate-float" style={{ animationDelay: "2.5s" }}>❧</div>
          
          {/* Ambient Light Effects */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-royal-red/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="w-full max-w-5xl">
              {/* Title Section */}
            <div className="text-center mb-12 animate-fade-in">
                <div className="inline-block mb-4">
                  <p className="text-gold font-display text-xs md:text-sm tracking-[0.4em] uppercase mb-2">
                    आप सादर आमंत्रित हैं
                  </p>
                </div>
                
                <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-royal-red mb-4 drop-shadow-lg">
                  विपिन & प्रिया
                </h1>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold" />
                  <Heart className="w-6 h-6 text-gold animate-pulse" fill="currentColor" />
                  <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold" />
                </div>
                
                <p className="font-display text-lg md:text-xl text-muted-foreground tracking-wider">
                  शुभ विवाह
                </p>
              </div>

              {/* Video Player */}
              <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <WeddingVideoPlayer />
              </div>
            </div>
          </section>

          {/* Countdown Section */}
          <section className="py-16 md:py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
            <div className="relative z-10">
              <CountdownTimer targetDate={weddingDate} />
            </div>
          </section>

          {/* Events Section */}
          <section className="py-16 md:py-24 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-gold font-display text-xs md:text-sm tracking-[0.3em] uppercase mb-2">
                  कार्यक्रम
                </p>
                <h2 className="font-script text-4xl md:text-6xl text-foreground">
                  शुभ विवाह
                </h2>
              </div>

              <div className="flex justify-center">
                <EventCard
                  title="पाणिग्रहण संस्कार"
                  titleEn="Wedding Ceremony"
                  date="28 अप्रैल 2026"
                  day="मंगलवार"
                  time="शुभ मुहूर्त"
                  icon="🔥"
                  description="पवित्र विवाह समारोह में आपकी उपस्थिति प्रार्थनीय है"
                  delay={0}
                />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 px-4 border-t border-border/50">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-gold/30" />
                <span className="text-gold text-sm">✦</span>
                <div className="h-px w-8 bg-gold/30" />
              </div>
              
              <p className="text-muted-foreground text-xs font-display tracking-wider">
                अमंत्रण 3D इन्विटेशन स्टूडियो
              </p>
              
              <p className="text-muted-foreground/60 text-xs font-display tracking-wider mt-2">
                © 2026 विपिन & प्रिया विवाह
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
};

interface EventCardProps {
  title: string;
  titleEn?: string;
  date: string;
  day: string;
  time: string;
  icon: string;
  description: string;
  delay: number;
}

const EventCard = ({ title, titleEn, date, day, time, icon, description, delay }: EventCardProps) => (
  <div 
    className="group relative animate-fade-in"
    style={{ animationDelay: `${delay}s` }}
  >
    {/* 3D Glow Effect */}
    <div className="absolute -inset-1 bg-gradient-to-br from-gold/30 via-gold-light/20 to-gold/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Card */}
    <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-gold/20 group-hover:border-gold/50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-3d overflow-hidden">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/30 group-hover:border-gold/60 rounded-tl-2xl transition-colors" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/30 group-hover:border-gold/60 rounded-br-2xl transition-colors" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="font-display text-xl md:text-2xl text-foreground mb-1">
          {title}
        </h3>
        
        {titleEn && (
          <p className="text-gold/70 text-sm font-display mb-3">
            {titleEn}
          </p>
        )}
        
        <p className="text-muted-foreground/80 text-sm mb-4">
          {description}
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-gold" />
          <p className="text-gold font-display text-sm font-semibold">
            {date}
          </p>
        </div>
        
        <p className="text-muted-foreground text-xs uppercase tracking-wider">
          {day} • {time}
        </p>
      </div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
    </div>
  </div>
);

export default Index;
