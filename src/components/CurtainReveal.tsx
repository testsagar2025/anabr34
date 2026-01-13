import { useState, useEffect, ReactNode } from 'react';

interface CurtainRevealProps {
  guestName: string;
  withFamily: boolean;
  children: ReactNode;
  onRevealComplete: () => void;
}

const CurtainReveal = ({ guestName, withFamily, children, onRevealComplete }: CurtainRevealProps) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Start reveal animation after showing the invitation text
    const timer = setTimeout(() => {
      setIsRevealing(true);
    }, 3000);

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onRevealComplete();
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onRevealComplete]);

  const displayName = withFamily ? `${guestName} & Family` : guestName;

  if (isComplete) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Background with invitation text */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-cream-dark flex items-center justify-center">
        <div className="text-center px-6 max-w-2xl">
          {/* Decorative top element */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-gold text-xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          {/* Cordially Invite Text */}
          <p className="font-display text-sm md:text-base text-gold/80 tracking-[0.3em] uppercase mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            We Cordially Invite
          </p>

          {/* Guest Name */}
          <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-royal-red mb-6 animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.6s' }}>
            {displayName}
          </h1>

          {/* To Our Wedding */}
          <p className="font-display text-lg md:text-xl text-foreground/80 tracking-widest uppercase animate-fade-in" style={{ animationDelay: '1s' }}>
            To Our Wedding
          </p>

          {/* Decorative bottom element */}
          <div className="flex items-center justify-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: '1.3s' }}>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-gold text-lg">❧</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          {/* Couple Names Preview */}
          <div className="mt-10 animate-fade-in" style={{ animationDelay: '1.6s' }}>
            <p className="font-script text-3xl md:text-4xl text-gold/70">
              Vipin & Priya
            </p>
          </div>
        </div>
      </div>

      {/* Curtains */}
      <div 
        className={`absolute top-0 left-0 w-1/2 h-full curtain-left transition-transform duration-1000 ease-in-out ${isRevealing ? '-translate-x-full' : 'translate-x-0'}`}
      >
        {/* Curtain Fabric Texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-royal-red via-royal-red to-royal-red/90" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
        
        {/* Curtain Folds */}
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/20 to-transparent" />
        <div className="absolute inset-y-0 left-1/4 w-4 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        <div className="absolute inset-y-0 left-1/2 w-4 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        <div className="absolute inset-y-0 left-3/4 w-4 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        
        {/* Gold Trim */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gold/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-gold/50 to-gold/20" />
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 0L40 20L20 40L0 20z\' fill=\'%23d4a853\' fill-opacity=\'0.3\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />
        </div>
      </div>

      <div 
        className={`absolute top-0 right-0 w-1/2 h-full curtain-right transition-transform duration-1000 ease-in-out ${isRevealing ? 'translate-x-full' : 'translate-x-0'}`}
      >
        {/* Curtain Fabric Texture */}
        <div className="absolute inset-0 bg-gradient-to-l from-royal-red via-royal-red to-royal-red/90" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
        
        {/* Curtain Folds */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute inset-y-0 right-1/4 w-4 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        <div className="absolute inset-y-0 right-1/2 w-4 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        <div className="absolute inset-y-0 right-3/4 w-4 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        
        {/* Gold Trim */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gold/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-gold/50 to-gold/20" />
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 0L40 20L20 40L0 20z\' fill=\'%23d4a853\' fill-opacity=\'0.3\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />
        </div>
      </div>
    </div>
  );
};

export default CurtainReveal;
