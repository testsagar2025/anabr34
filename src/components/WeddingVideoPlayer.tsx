import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Sparkles } from "lucide-react";
import VideoBanner from "./VideoBanner";

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
  const [showBanner, setShowBanner] = useState(true);
  const [playerInitialized, setPlayerInitialized] = useState(false);
  
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout>();
  const progressInterval = useRef<NodeJS.Timeout>();

  const videoId = "DIV_I5V2mS8";

  const initializePlayer = useCallback(() => {
    if (playerInitialized || !playerContainerRef.current) return;
    
    if (window.YT && window.YT.Player) {
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
      setPlayerInitialized(true);
    }
  }, [playerInitialized]);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      if (!showBanner) {
        initializePlayer();
      }
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showBanner && !playerInitialized) {
      initializePlayer();
    }
  }, [showBanner, playerInitialized, initializePlayer]);

  const handlePlayerReady = (event: { target: YTPlayer }) => {
    setIsLoaded(true);
    setDuration(event.target.getDuration());
    setVolume(event.target.getVolume());
    event.target.playVideo();
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleBannerPlay = () => {
    setShowBanner(false);
  };

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

  const toggleFullscreen = async () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        // Unlock screen orientation when exiting fullscreen
        try {
          const orientation = screen.orientation as any;
          if (orientation?.unlock) orientation.unlock();
        } catch (e) { /* ignore */ }
      } else {
        await containerRef.current.requestFullscreen();
        // Lock to landscape on mobile for better video viewing
        try {
          const orientation = screen.orientation as any;
          if (orientation?.lock) await orientation.lock('landscape');
        } catch (e) { /* Orientation lock not supported */ }
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
      onMouseLeave={() => {
        isPlaying && setShowControls(false);
        setShowVolumeSlider(false);
      }}
      className={`relative rounded-xl md:rounded-2xl overflow-hidden shadow-3d transform-3d hover:shadow-3d-hover transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[9999] rounded-none bg-black' : ''}`}
    >
      {/* 3D Frame Effect - hidden in fullscreen */}
      {!isFullscreen && (
        <>
          <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-xl md:rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-br from-royal-red-dark via-background to-royal-red-dark rounded-xl md:rounded-2xl" />
        </>
      )}
      
      {/* Inner Container */}
      <div className={`relative z-10 overflow-hidden ${isFullscreen ? 'w-full h-full' : 'rounded-xl md:rounded-2xl border-2 border-gold/60'}`}>
        {/* Corner 3D Decorations - hidden in fullscreen */}
        {!isFullscreen && (
          <>
            <div className="absolute top-2 left-2 md:top-3 md:left-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle">✿</div>
            <div className="absolute top-2 right-2 md:top-3 md:right-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "0.5s" }}>✿</div>
            <div className="absolute bottom-14 left-2 md:bottom-16 md:left-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1s" }}>✿</div>
            <div className="absolute bottom-14 right-2 md:bottom-16 md:right-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1.5s" }}>✿</div>
          </>
        )}

        {/* Video Player */}
        <div className={`relative bg-gradient-to-br from-royal-red-dark to-background ${isFullscreen ? 'w-full h-full' : 'aspect-video'}`}>
          <div ref={playerContainerRef} className="absolute inset-0 w-full h-full" />

          {/* Banner Overlay */}
          {showBanner && (
            <VideoBanner 
              onPlay={handleBannerPlay}
              coupleName="Vipin & Priya"
              tagline="Wedding Invitation"
            />
          )}

          {/* Loading State */}
          {!isLoaded && !showBanner && (
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
          {isBuffering && isLoaded && !showBanner && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 pointer-events-none">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Click to Play/Pause, Double-click for Fullscreen */}
          {!showBanner && (
            <div 
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={togglePlay}
              onDoubleClick={toggleFullscreen}
            />
          )}

          {/* Netflix-style Pause Overlay */}
          {!isPlaying && isLoaded && !isBuffering && !showBanner && (
            <div className="absolute inset-0 z-15 flex items-center justify-center overflow-hidden">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-red-dark/95 via-royal-red-dark/60 to-royal-red-dark/80 animate-fade-in" />
              
              {/* Cinematic Vignette */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at center, transparent 20%, hsl(345 65% 12% / 0.8) 100%)'
              }} />

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.5'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm40 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              {/* Floating Floral Elements */}
              <div className="absolute top-6 left-6 text-gold text-4xl animate-float opacity-60" style={{ animationDuration: '4s' }}>✿</div>
              <div className="absolute top-10 right-10 text-gold text-3xl animate-float-slow opacity-50" style={{ animationDelay: '0.5s' }}>❀</div>
              <div className="absolute bottom-24 left-10 text-gold text-3xl animate-float opacity-50" style={{ animationDelay: '1s' }}>✿</div>
              <div className="absolute bottom-28 right-6 text-gold text-4xl animate-float-slow opacity-60" style={{ animationDelay: '1.5s' }}>❀</div>
              <div className="absolute top-1/4 left-1/4 text-gold text-2xl animate-twinkle opacity-40" style={{ animationDelay: '0.8s' }}>✦</div>
              <div className="absolute bottom-1/3 right-1/4 text-gold text-2xl animate-twinkle opacity-40" style={{ animationDelay: '1.2s' }}>✦</div>

              {/* Shimmer Lines */}
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent animate-shimmer" />
              <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent animate-shimmer" style={{ animationDelay: '1s' }} />

              {/* Content Container */}
              <div className="relative text-center px-8 py-6">
                {/* Ornate Frame */}
                <div className="absolute -inset-6 border border-gold/30 rounded-lg" />
                <div className="absolute -inset-8 border border-gold/15 rounded-xl" />
                
                {/* Corner Ornaments */}
                <div className="absolute -top-10 -left-10 text-gold text-2xl animate-twinkle" style={{ animationDelay: '0s' }}>❧</div>
                <div className="absolute -top-10 -right-10 text-gold text-2xl transform scale-x-[-1] animate-twinkle" style={{ animationDelay: '0.3s' }}>❧</div>
                <div className="absolute -bottom-10 -left-10 text-gold text-2xl transform scale-y-[-1] animate-twinkle" style={{ animationDelay: '0.6s' }}>❧</div>
                <div className="absolute -bottom-10 -right-10 text-gold text-2xl transform scale-[-1] animate-twinkle" style={{ animationDelay: '0.9s' }}>❧</div>

                {/* Paused Badge */}
                <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in-down">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/40 rounded-full backdrop-blur-sm">
                    <Pause className="w-3 h-3 text-gold animate-pulse-soft" fill="currentColor" />
                    <p className="text-gold font-display text-xs tracking-[0.4em] uppercase font-medium">
                      Paused
                    </p>
                    <Pause className="w-3 h-3 text-gold animate-pulse-soft" fill="currentColor" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
                </div>

                {/* Wedding Invitation Text */}
                <p className="text-gold/80 font-display text-xs md:text-sm tracking-[0.3em] uppercase mb-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Wedding Invitation
                </p>

                {/* Couple Name - Maroon with Gold Glow */}
                <h2 className="font-script text-5xl md:text-6xl lg:text-7xl mb-2 animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
                  <span className="text-gradient-gold drop-shadow-[0_4px_20px_hsla(45,85%,50%,0.5)]">
                    Vipin & Priya
                  </span>
                </h2>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-gold" />
                  <span className="text-gold text-lg animate-pulse-soft">✦</span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold/60 to-gold" />
                </div>

                {/* Play Button with Enhanced Animation */}
                <div className="pointer-events-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <button
                    className="group/btn relative inline-flex items-center justify-center focus:outline-none"
                    onClick={togglePlay}
                  >
                    {/* Multi-layer Glow */}
                    <div className="absolute w-24 h-24 md:w-28 md:h-28 bg-gold/20 rounded-full blur-2xl group-hover/btn:bg-gold/40 transition-all duration-700 animate-glow" />
                    <div className="absolute w-20 h-20 md:w-24 md:h-24 bg-gold/30 rounded-full blur-xl group-hover/btn:bg-gold/50 transition-all duration-500 animate-glow" style={{ animationDelay: '0.5s' }} />
                    
                    {/* Outer Ring Pulse */}
                    <div className="absolute w-24 h-24 md:w-28 md:h-28 border-2 border-gold/40 rounded-full animate-ping opacity-30" />
                    <div className="absolute w-20 h-20 md:w-24 md:h-24 border border-gold/60 rounded-full animate-pulse-soft" />
                    
                    {/* Button Base */}
                    <div className="relative w-18 h-18 md:w-22 md:h-22 bg-gradient-to-br from-gold via-gold-light to-gold-dark rounded-full flex items-center justify-center shadow-[0_8px_32px_-4px_hsla(45,85%,50%,0.6)] group-hover/btn:shadow-[0_12px_40px_-4px_hsla(45,85%,50%,0.8)] group-hover/btn:scale-110 transition-all duration-300 ease-out">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold-light via-gold to-gold-dark rounded-full flex items-center justify-center border-2 border-gold-light/50">
                        <Play className="w-7 h-7 md:w-9 md:h-9 text-royal-red-dark ml-1 drop-shadow-sm" fill="currentColor" />
                      </div>
                    </div>
                  </button>
                  
                  {/* Resume Text */}
                  <p className="text-gold/90 font-display text-xs tracking-[0.2em] uppercase mt-5 animate-bounce-gentle">
                    Tap to Resume
                  </p>
                </div>

                {/* Bottom Decorative Element */}
                <div className="flex items-center justify-center gap-2 mt-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <Sparkles className="w-3 h-3 text-gold/60 animate-twinkle" />
                  <span className="text-gold/50 font-display text-[10px] tracking-widest uppercase">Wedding Celebration</span>
                  <Sparkles className="w-3 h-3 text-gold/60 animate-twinkle" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Custom Controls */}
        {!showBanner && (
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 pt-14 transition-all duration-500 z-20 ${
              showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            {/* Progress Bar */}
            <div 
              className="mb-4 group/progress cursor-pointer"
              onClick={handleProgressClick}
            >
              <div className="relative h-1.5 bg-white/20 rounded-full overflow-visible group-hover/progress:h-2 transition-all">
                <div className="absolute inset-y-0 left-0 bg-white/20 rounded-full" style={{ width: `${Math.min(progress + 10, 100)}%` }} />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-light rounded-full shadow-gold-glow"
                  style={{ width: `${progress}%` }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gold rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all transform -translate-x-1/2 hover:scale-125"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-cream/70 font-display tracking-wide">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                {/* Play/Pause Button with Animation */}
                <button
                  className="group/play relative w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark hover:from-gold-light hover:to-gold flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_4px_20px_-2px_hsla(45,85%,50%,0.6)] active:scale-95"
                  onClick={togglePlay}
                >
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 rounded-full bg-gold-light/0 group-hover/play:bg-gold-light/30 transition-all duration-300" />
                  
                  {/* Icon with smooth transition */}
                  <div className="relative flex items-center justify-center w-full h-full">
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-royal-red-dark transition-transform duration-200 group-hover/play:scale-110" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 text-royal-red-dark ml-0.5 transition-transform duration-200 group-hover/play:scale-110" fill="currentColor" />
                    )}
                  </div>
                  
                  {/* Ripple effect indicator */}
                  <div className="absolute inset-0 rounded-full border-2 border-gold/0 group-hover/play:border-gold/40 transition-all duration-300 group-active/play:scale-125 group-active/play:opacity-0" />
                </button>

                <button 
                  className="p-2 text-cream/80 hover:text-gold transition-all hover:scale-110"
                  onClick={() => skip(-10)}
                  title="Rewind 10 seconds"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 text-cream/80 hover:text-gold transition-all hover:scale-110"
                  onClick={() => skip(10)}
                  title="Forward 10 seconds"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <div 
                  className="relative flex items-center"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <button
                    className="p-2 text-cream/80 hover:text-gold transition-all"
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
                      className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-lg"
                    />
                  </div>
                </div>

                <span className="hidden md:block text-cream/80 font-display text-sm tracking-wide">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                <button
                  className="p-2 text-cream/80 hover:text-gold transition-all hover:scale-110"
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
        )}
      </div>
    </div>
  );
};

export default WeddingVideoPlayer;
