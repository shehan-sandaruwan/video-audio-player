"use client";

import React from "react";
import useVideoStreaming from "@/app/hooks/use-video-streaming";

const MediaPlayer = ({
  title,
  url,
  description,
}: {
  title: string;
  url: string | null;
  description: string;
}) => {
  const {
    videoRef,
    isPlaying,
    isLoading,
    error,
    handlePlayPause,
    handleRetry,
    handleVideoClick,
  } = useVideoStreaming({ url });

  // Error state
  const renderError = () => {
    if (error) {
      return (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white">
          <div className="video-error">
            <div className="error-content">
              <h3>Failed to Load Video</h3>
              <p>{error.message}</p>
              <button
                onClick={handleRetry}
                className="retry-button bg-[#4b6f53] p-2 rounded-md"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  if (!url) {
    return (
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-900">
        <div className="py-4">
          <h1 className="absolute inset-0 text-white flex items-center justify-center">
            No video selected
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-900">
      <video
        className="w-full h-full"
        ref={videoRef}
        onClick={handleVideoClick}
        controls={isPlaying} // Show native controls only when playing
      />
      <div className="py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>

      {/* Custom play button overlay - only show when video is not playing */}
      {!isPlaying && !error && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="flex items-center justify-center size-20 bg-primary/80 hover:bg-primary rounded-full text-white transition-transform transform hover:scale-110"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full size-8 border-b-2 border-white"></div>
            ) : (
              <span className="material-symbols-outlined !text-5xl">
                play_arrow
              </span>
            )}
          </button>
        </div>
      )}

      {error && renderError()}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full size-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default MediaPlayer;
