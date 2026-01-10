import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-3 animate-fade-in">
          <Sparkles className="w-4 h-4 text-gold animate-twinkle" />
          <p className="text-gold font-display text-xs md:text-sm tracking-[0.35em] uppercase">
            Counting Down To The Big Day
          </p>
          <Sparkles className="w-4 h-4 text-gold animate-twinkle" style={{ animationDelay: "0.5s" }} />
        </div>
        <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          April 28, 2026
        </h2>
      </div>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {timeBlocks.map((block, index) => (
          <div
            key={block.label}
            className="group relative animate-fade-in-up"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            {/* 3D Card Effect */}
            <div className="relative perspective-1000">
              <div className="transform-3d transition-all duration-500 group-hover:rotate-y-6">
                {/* Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-gold/30 via-gold-light/20 to-gold/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-90 transition-all duration-500" />
                
                {/* Card */}
                <div className="relative elegant-card rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 overflow-hidden">
                  {/* Decorative Corners */}
                  <div className="absolute top-0 left-0 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-gold/50 group-hover:border-gold/80 rounded-tl-xl transition-colors duration-500" />
                  <div className="absolute bottom-0 right-0 w-6 md:w-8 h-6 md:h-8 border-b-2 border-r-2 border-gold/50 group-hover:border-gold/80 rounded-br-xl transition-colors duration-500" />
                  
                  {/* Number */}
                  <div className="relative z-10 text-center">
                    <span className="block text-3xl md:text-5xl lg:text-7xl font-display font-bold text-gold tabular-nums drop-shadow-gold">
                      {String(block.value).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] md:text-xs font-display uppercase tracking-[0.12em] md:tracking-[0.2em] text-muted-foreground mt-2 md:mt-3">
                      {block.label}
                    </span>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/8 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Line */}
      <div className="flex items-center justify-center gap-4 mt-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold/50" />
        <span className="text-gold text-xl animate-gold-pulse">❧</span>
        <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    </div>
  );
};

export default CountdownTimer;
