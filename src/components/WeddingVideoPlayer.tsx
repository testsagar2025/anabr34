import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Settings } from "lucide-react";

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
        BUFFERING: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
  destroy: () => void;
}

const WeddingVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout>();
  const progressInterval = useRef<NodeJS.Timeout>();

  const videoId = "DIV_I5V2mS8";

  // Load YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      if (playerContainerRef.current) {
        playerRef.current = new window.YT.Player(playerContainerRef.current, {
          videoId: videoId,
          playerVars: {
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: handlePlayerReady,
            onStateChange: handleStateChange,
            onError: handleError,
          },
        });
      }
    };

    // If API already loaded
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const handlePlayerReady = (event: { target: YTPlayer }) => {
    setIsLoaded(true);
    setDuration(event.target.getDuration());
    setVolume(event.target.getVolume());
  };

  const handleStateChange = (event: { data: number; target: YTPlayer }) => {
    const state = event.data;
    
    if (state === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      setIsBuffering(false);
      startProgressTracking();
    } else if (state === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
      stopProgressTracking();
    } else if (state === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      setProgress(100);
      stopProgressTracking();
    } else if (state === window.YT.PlayerState.BUFFERING) {
      setIsBuffering(true);
    }
  };

  const handleError = (event: { data: number }) => {
    console.error("YouTube Player Error:", event.data);
    setIsLoaded(true);
  };

  const startProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    progressInterval.current = setInterval(() => {
      if (playerRef.current) {
        const current = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();
        setCurrentTime(current);
        setProgress((current / total) * 100);
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

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

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      if (newVolume === 0) {
        playerRef.current.mute();
        setIsMuted(true);
      } else if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
      setProgress(percentage * 100);
    }
  };

  const skip = (seconds: number) => {
    if (playerRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      playerRef.current.seekTo(newTime, true);
    }
  };

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
    <div className="min-h-screen marble-bg flex items-center justify-center p-4 md:p-8 perspective-1000">
      {/* 3D Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-gold opacity-30 text-6xl animate-float transform-3d rotate-y-12">✿</div>
        <div className="absolute top-20 right-20 text-gold opacity-25 text-4xl animate-float transform-3d -rotate-y-12" style={{ animationDelay: "1s" }}>❀</div>
        <div className="absolute bottom-20 left-20 text-gold opacity-25 text-5xl animate-float transform-3d rotate-x-12" style={{ animationDelay: "2s" }}>✿</div>
        <div className="absolute bottom-10 right-10 text-gold opacity-30 text-6xl animate-float transform-3d -rotate-x-12" style={{ animationDelay: "0.5s" }}>❀</div>
        
        {/* Ambient Light Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-royal-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="w-full max-w-5xl transform-gpu">
        {/* Title Section with 3D Effect */}
        <div className="text-center mb-8 animate-fade-in transform-3d">
          <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-2 drop-shadow-gold">
            Wedding Invitation
          </p>
          <h1 className="font-script text-5xl md:text-7xl text-royal-red mb-2 drop-shadow-lg transform hover:scale-105 transition-transform duration-500">
            Pratibha & Saket
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-2xl animate-gold-pulse">❧</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* 3D Video Player Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            isPlaying && setShowControls(false);
            setShowVolumeSlider(false);
          }}
          className="relative group rounded-xl overflow-hidden shadow-3d transform-3d hover:shadow-3d-hover transition-all duration-500"
        >
          {/* 3D Frame Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-br from-royal-red-dark via-background to-royal-red-dark rounded-xl" />
          
          {/* Inner Container */}
          <div className="relative z-10 rounded-xl overflow-hidden border-2 border-gold/50">
            {/* Corner 3D Decorations */}
            <div className="absolute top-3 left-3 text-gold text-2xl z-30 pointer-events-none drop-shadow-gold animate-gold-pulse">✿</div>
            <div className="absolute top-3 right-3 text-gold text-2xl z-30 pointer-events-none drop-shadow-gold animate-gold-pulse" style={{ animationDelay: "0.5s" }}>✿</div>
            <div className="absolute bottom-16 left-3 text-gold text-2xl z-30 pointer-events-none drop-shadow-gold animate-gold-pulse" style={{ animationDelay: "1s" }}>✿</div>
            <div className="absolute bottom-16 right-3 text-gold text-2xl z-30 pointer-events-none drop-shadow-gold animate-gold-pulse" style={{ animationDelay: "1.5s" }}>✿</div>

            {/* Video Player */}
            <div className="relative aspect-video bg-gradient-to-br from-royal-red-dark to-background">
              <div ref={playerContainerRef} className="absolute inset-0 w-full h-full" />

              {/* Loading State */}
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-royal-red-dark to-background z-20">
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className="absolute inset-0 border-4 border-gold/30 rounded-full" />
                      <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                      <div className="absolute inset-2 border-4 border-gold-light/50 border-b-transparent rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                    </div>
                    <p className="text-cream font-display text-lg tracking-wider">Loading...</p>
                  </div>
                </div>
              )}

              {/* Buffering Indicator */}
              {isBuffering && isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 pointer-events-none">
                  <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Click to Play/Pause Overlay */}
              <div 
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={togglePlay}
              />

              {/* Center Play Button (shown when paused) */}
              {!isPlaying && isLoaded && !isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/90 flex items-center justify-center shadow-3d animate-scale-in backdrop-blur-sm">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-royal-red-dark ml-1" fill="currentColor" />
                  </div>
                </div>
              )}

              {/* Watermark Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none flex items-end justify-center pb-20 transition-opacity duration-500 z-5 ${
                  showControls && !isPlaying ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="font-script text-3xl md:text-5xl text-cream/20 drop-shadow-lg">
                  Pratibha & Saket
                </p>
              </div>
            </div>

            {/* Custom Controls */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-12 transition-all duration-500 z-20 ${
                showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              {/* Progress Bar */}
              <div 
                className="mb-4 group/progress cursor-pointer"
                onClick={handleProgressClick}
              >
                <div className="relative h-1 bg-white/20 rounded-full overflow-visible group-hover/progress:h-1.5 transition-all">
                  {/* Buffered Progress */}
                  <div className="absolute inset-y-0 left-0 bg-white/30 rounded-full" style={{ width: `${Math.min(progress + 10, 100)}%` }} />
                  
                  {/* Played Progress */}
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-light rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                  
                  {/* Scrubber Handle */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gold rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all transform -translate-x-1/2 hover:scale-125"
                    style={{ left: `${progress}%` }}
                  />
                </div>
                
                {/* Time Tooltip on Hover */}
                <div className="flex justify-between mt-1 text-xs text-cream/60 font-display">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                  {/* Play/Pause */}
                  <button
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold hover:bg-gold-light flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-royal-red-dark" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 text-royal-red-dark ml-0.5" fill="currentColor" />
                    )}
                  </button>

                  {/* Skip Buttons */}
                  <button 
                    className="p-2 text-cream/70 hover:text-gold transition-colors hover:scale-110"
                    onClick={() => skip(-10)}
                    title="Rewind 10 seconds"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-2 text-cream/70 hover:text-gold transition-colors hover:scale-110"
                    onClick={() => skip(10)}
                    title="Forward 10 seconds"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  {/* Volume Control */}
                  <div 
                    className="relative flex items-center"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <button
                      className="p-2 text-cream/70 hover:text-gold transition-colors"
                      onClick={toggleMute}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${showVolumeSlider ? "w-20 md:w-24 opacity-100 ml-2" : "w-0 opacity-0"}`}>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
                      />
                    </div>
                  </div>

                  {/* Time Display */}
                  <span className="hidden md:block text-cream/80 font-display text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  {/* Fullscreen */}
                  <button
                    className="p-2 text-cream/70 hover:text-gold transition-colors hover:scale-110"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details with 3D Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in perspective-1000" style={{ animationDelay: "0.3s" }}>
          <EventCard
            title="Haldi Ceremony"
            date="May 10, 2025"
            day="Thursday"
            time="12:00 PM"
            icon="🌼"
            delay={0}
          />
          <EventCard
            title="Mehndi Ceremony"
            date="May 11, 2025"
            day="Friday"
            time="12:00 PM"
            icon="✋"
            delay={0.1}
          />
          <EventCard
            title="Panigrahan Sanskar"
            date="May 12, 2025"
            day="Saturday"
            time="Evening"
            icon="🔥"
            delay={0.2}
          />
        </div>

        {/* Venue */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-muted-foreground font-display text-sm tracking-wider uppercase mb-2">
            Venue
          </p>
          <p className="text-foreground font-display text-xl md:text-2xl">
            Hotel Vighyan Mahal, Jabalpur
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gold/50" />
            <span className="font-script text-2xl text-gold animate-gold-pulse">Sadar Aamantran</span>
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
  day: string;
  time: string;
  icon: string;
  delay: number;
}

const EventCard = ({ title, date, day, time, icon, delay }: EventCardProps) => (
  <div 
    className="group relative bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-3d cursor-pointer animate-fade-in transform-3d"
    style={{ animationDelay: `${delay}s` }}
  >
    {/* 3D Border Effect */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-gold via-gold-light to-gold rounded-xl opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
    <div className="absolute inset-0 bg-card rounded-xl" />
    
    {/* Content */}
    <div className="relative z-10">
      <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="font-display text-lg text-foreground mb-2">{title}</h3>
      <p className="text-gold font-display text-sm font-semibold">{date}</p>
      <p className="text-muted-foreground text-xs uppercase tracking-wider">{day}</p>
      <p className="text-muted-foreground text-sm mt-1">{time}</p>
    </div>
  </div>
);

export default WeddingVideoPlayer;
