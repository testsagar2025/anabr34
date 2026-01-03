import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";

const WeddingVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  // YouTube Video ID
  const videoId = "DIV_I5V2mS8";

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen marble-bg flex items-center justify-center p-4 md:p-8">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-gold opacity-20 text-6xl animate-float">✿</div>
        <div className="absolute top-20 right-20 text-gold opacity-20 text-4xl animate-float" style={{ animationDelay: "1s" }}>❀</div>
        <div className="absolute bottom-20 left-20 text-gold opacity-20 text-5xl animate-float" style={{ animationDelay: "2s" }}>✿</div>
        <div className="absolute bottom-10 right-10 text-gold opacity-20 text-6xl animate-float" style={{ animationDelay: "0.5s" }}>❀</div>
      </div>

      <div className="w-full max-w-5xl">
        {/* Title Section */}
        <div className="text-center mb-8 animate-fade-in">
          <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-2">
            Wedding Invitation
          </p>
          <h1 className="font-script text-5xl md:text-7xl text-royal-red mb-2">
            Pratibha & Saket
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-2xl">❧</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* Video Player Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="relative group rounded-lg overflow-hidden gold-border animate-gold-pulse"
        >
          {/* Corner Decorations */}
          <div className="absolute top-2 left-2 text-gold text-2xl z-20 pointer-events-none">✿</div>
          <div className="absolute top-2 right-2 text-gold text-2xl z-20 pointer-events-none">✿</div>
          <div className="absolute bottom-2 left-2 text-gold text-2xl z-20 pointer-events-none">✿</div>
          <div className="absolute bottom-2 right-2 text-gold text-2xl z-20 pointer-events-none">✿</div>

          {/* Video Embed */}
          <div className="relative aspect-video bg-royal-red-dark">
            <iframe
              ref={videoRef}
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoaded(true)}
            />

            {/* Loading State */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-royal-red-dark">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-cream font-display">Loading...</p>
                </div>
              </div>
            )}

            {/* Watermark Overlay */}
            <div
              className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="text-center">
                <p className="font-script text-4xl md:text-6xl text-cream/30 drop-shadow-lg">
                  Pratibha & Saket
                </p>
              </div>
            </div>
          </div>

          {/* Custom Controls Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-royal-red-dark/90 via-royal-red-dark/50 to-transparent p-4 transition-all duration-500 ${
              showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-4 group/progress cursor-pointer">
              <div className="h-1 bg-cream/20 rounded-full overflow-hidden group-hover/progress:h-2 transition-all">
                <div
                  className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause - Note: YouTube controls the actual playback */}
                <button
                  className="w-12 h-12 rounded-full bg-gold/20 hover:bg-gold/40 flex items-center justify-center transition-all hover:scale-110 border border-gold/50"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-cream" />
                  ) : (
                    <Play className="w-5 h-5 text-cream ml-1" />
                  )}
                </button>

                {/* Skip Buttons */}
                <button className="text-cream/70 hover:text-gold transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button className="text-cream/70 hover:text-gold transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>

                {/* Time Display */}
                <span className="text-cream/80 font-display text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Volume */}
                <button
                  className="text-cream/70 hover:text-gold transition-colors"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                {/* Fullscreen */}
                <button
                  className="text-cream/70 hover:text-gold transition-colors"
                  onClick={toggleFullscreen}
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <EventCard
            title="Haldi Ceremony"
            date="May 10, 2025"
            time="12:00 PM"
            icon="🌼"
          />
          <EventCard
            title="Mehndi Ceremony"
            date="May 11, 2025"
            time="12:00 PM"
            icon="✋"
          />
          <EventCard
            title="Panigrahan Sanskar"
            date="May 12, 2025"
            time="Evening"
            icon="🔥"
          />
        </div>

        {/* Venue */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-muted-foreground font-display text-sm tracking-wider uppercase mb-2">
            Venue
          </p>
          <p className="text-foreground font-display text-xl">
            Hotel Vighyan Mahal, Jabalpur
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gold/50" />
            <span className="font-script text-2xl text-gold">Sadar Aamantran</span>
            <div className="h-px w-12 bg-gold/50" />
          </div>
        </div>

        {/* Footer Credit */}
        <div className="mt-8 text-center opacity-60">
          <p className="text-muted-foreground text-xs font-display tracking-wider">
            Created by Amantran 3D Invitation Studio
          </p>
        </div>
      </div>
    </div>
  );
};

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  icon: string;
}

const EventCard = ({ title, date, time, icon }: EventCardProps) => (
  <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 text-center gold-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="font-display text-lg text-foreground mb-2">{title}</h3>
    <p className="text-gold font-display text-sm">{date}</p>
    <p className="text-muted-foreground text-sm">{time}</p>
  </div>
);

export default WeddingVideoPlayer;
