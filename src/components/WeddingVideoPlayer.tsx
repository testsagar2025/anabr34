import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from "lucide-react";
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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        isPlaying && setShowControls(false);
        setShowVolumeSlider(false);
      }}
      className="relative rounded-xl overflow-hidden shadow-3d transform-3d hover:shadow-3d-hover transition-all duration-500"
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

          {/* Banner Overlay */}
          {showBanner && (
            <VideoBanner 
              onPlay={handleBannerPlay}
              coupleName="विपिन & प्रिया"
              tagline="विवाह निमंत्रण"
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

          {/* Click to Play/Pause Overlay */}
          {!showBanner && (
            <div 
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={togglePlay}
            />
          )}

          {/* Center Play Button (shown when paused) */}
          {!isPlaying && isLoaded && !isBuffering && !showBanner && (
            <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/90 flex items-center justify-center shadow-3d animate-scale-in backdrop-blur-sm">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-royal-red-dark ml-1" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        {/* Custom Controls */}
        {!showBanner && (
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
                <div className="absolute inset-y-0 left-0 bg-white/30 rounded-full" style={{ width: `${Math.min(progress + 10, 100)}%` }} />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-light rounded-full"
                  style={{ width: `${progress}%` }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gold rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all transform -translate-x-1/2 hover:scale-125"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-cream/60 font-display">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
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

                <span className="hidden md:block text-cream/80 font-display text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
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
        )}
      </div>
    </div>
  );
};

export default WeddingVideoPlayer;
