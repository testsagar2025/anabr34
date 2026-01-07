import { Play } from "lucide-react";

interface VideoBannerProps {
  onPlay: () => void;
  coupleName: string;
  tagline?: string;
}

const VideoBanner = ({ onPlay, coupleName, tagline = "विवाह निमंत्रण" }: VideoBannerProps) => {
  return (
    <div className="absolute inset-0 z-20 bg-gradient-to-br from-royal-red-dark via-background to-royal-red-dark flex items-center justify-center cursor-pointer group"
      onClick={onPlay}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-8 left-8 text-gold/30 text-4xl animate-float">✿</div>
      <div className="absolute top-12 right-12 text-gold/25 text-3xl animate-float" style={{ animationDelay: "0.5s" }}>❀</div>
      <div className="absolute bottom-12 left-12 text-gold/25 text-3xl animate-float" style={{ animationDelay: "1s" }}>✿</div>
      <div className="absolute bottom-8 right-8 text-gold/30 text-4xl animate-float" style={{ animationDelay: "1.5s" }}>❀</div>

      {/* Ambient Light */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-royal-red/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Decorative Frame */}
        <div className="relative inline-block">
          {/* Corner Decorations */}
          <div className="absolute -top-6 -left-6 text-gold text-2xl">❧</div>
          <div className="absolute -top-6 -right-6 text-gold text-2xl transform scale-x-[-1]">❧</div>
          <div className="absolute -bottom-6 -left-6 text-gold text-2xl transform scale-y-[-1]">❧</div>
          <div className="absolute -bottom-6 -right-6 text-gold text-2xl transform scale-[-1]">❧</div>

          <div className="py-8 px-12">
            {/* Tagline */}
            <p className="text-gold/80 font-display text-xs tracking-[0.4em] uppercase mb-4 animate-fade-in">
              {tagline}
            </p>

            {/* Couple Name */}
            <h2 className="font-script text-4xl md:text-6xl lg:text-7xl text-cream mb-4 animate-fade-in drop-shadow-lg" style={{ animationDelay: "0.2s" }}>
              {coupleName}
            </h2>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-sm">✦</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>

            {/* Play Button */}
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <button
                className="group/btn relative inline-flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay();
                }}
              >
                {/* Button Glow */}
                <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 bg-gold/30 rounded-full blur-xl group-hover/btn:bg-gold/50 transition-all animate-pulse" />
                
                {/* Button */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-3d group-hover/btn:scale-110 transition-all duration-300">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-royal-red-dark ml-1" fill="currentColor" />
                </div>

                {/* Ripple Effect */}
                <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 border-2 border-gold/50 rounded-full animate-ping opacity-50" />
              </button>
              
              <p className="text-cream/60 font-display text-xs tracking-wider mt-4">
                वीडियो देखें
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
