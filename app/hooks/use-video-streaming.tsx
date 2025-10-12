import Hls from "hls.js";
import { useCallback, useEffect, useRef, useState } from "react";

function useVideoStreaming({ url }: { url: string | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hlsRef = useRef<Hls | null | undefined>(null);

  const initializeHls = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported() && url) {
      setError(null);
      const hls = new Hls({
        enableWorker: false, // Can help with some performance issues
      });

      hlsRef.current = hls;

      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error:", data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              // Cannot recover
              hls.destroy();
              break;
          }
        }
      });

      return hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl") && url) {
      // Native HLS support (Safari)
      video.src = url;
      video.addEventListener("loadeddata", () => {
        setIsLoading(false);
      });
    } else {
      return null;
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      initializeHls();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [initializeHls, url]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  const handleRetry = () => {
    setError(null);
    if (url) {
      setIsLoading(true);
      // Reinitialize the player
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      initializeHls();
    }
  };

  return {
    videoRef,
    isPlaying,
    isLoading,
    error,
    handlePlayPause,
    handleVideoClick,
    handleRetry,
  };
}

export default useVideoStreaming;
