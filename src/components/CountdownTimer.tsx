import { useState, useEffect } from "react";

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
    { value: timeLeft.days, label: "दिन" },
    { value: timeLeft.hours, label: "घंटे" },
    { value: timeLeft.minutes, label: "मिनट" },
    { value: timeLeft.seconds, label: "सेकंड" },
  ];

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-6">
        <p className="text-gold font-display text-xs md:text-sm tracking-[0.3em] uppercase mb-2">
          शुभ दिन की उल्टी गिनती
        </p>
        <h2 className="font-script text-3xl md:text-5xl text-foreground">
          28 अप्रैल 2026
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-6">
        {timeBlocks.map((block, index) => (
          <div
            key={block.label}
            className="group relative animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* 3D Card Effect */}
            <div className="relative perspective-500">
              <div className="transform-3d transition-all duration-500 group-hover:rotate-y-6">
                {/* Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-gold/40 to-gold-dark/40 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-card via-card to-card/90 rounded-xl md:rounded-2xl p-3 md:p-6 border border-gold/30 overflow-hidden">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/50 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/50 rounded-br-xl" />
                  
                  {/* Number */}
                  <div className="relative z-10">
                    <span className="block text-3xl md:text-6xl lg:text-7xl font-display font-bold text-gold tabular-nums">
                      {String(block.value).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] md:text-xs font-display uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground mt-1 md:mt-2">
                      {block.label}
                    </span>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Line */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
        <span className="text-gold text-lg animate-gold-pulse">❧</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    </div>
  );
};

export default CountdownTimer;
