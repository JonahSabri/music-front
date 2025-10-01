'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  coverImage?: string;
  duration?: number;
}

interface AudioPlayerProps {
  track?: Track;
  src?: string;
  title?: string;
  artist?: string;
  cover?: string;
  className?: string;
  showVisualizer?: boolean;
  visualizerType?: 'waveform' | 'equalizer';
  autoPlay?: boolean;
  variant?: 'default' | 'compact';
}

export function AudioPlayer({
  track,
  src,
  title = 'Track Title',
  artist = 'Artist Name',
  cover,
  className = '',
  showVisualizer = false,
  visualizerType = 'waveform',
  autoPlay = false,
  variant = 'default'
}: AudioPlayerProps) {
  // Use track data if provided, otherwise fall back to individual props
  const audioSrc = track?.audioUrl || src;
  const trackTitle = track?.title || title;
  const trackArtist = track?.artist || artist;
  const trackCover = track?.coverImage || cover;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    if (autoPlay) {
      audio.play().then(() => setIsPlaying(true));
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [autoPlay]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {/* Cover Art */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-nebula to-supernova flex items-center justify-center">
          {trackCover ? (
            <img src={trackCover} alt={trackTitle} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          )}
        </div>
        
        {/* Track Info */}
        <div className="flex-1">
          <h3 className="text-starlight font-bold text-lg">{trackTitle}</h3>
          <p className="text-muted text-sm">{trackArtist}</p>
        </div>
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="w-6 h-6 border-2 border-nebula border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>


      {/* Controls */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #7b2cbf 0%, #7b2cbf ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-muted">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-6">
          {/* Previous Button */}
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5 text-starlight" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full gradient-nebula flex items-center justify-center hover:scale-105 transition-transform glow-purple"
          >
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Next Button */}
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5 text-starlight" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-muted" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #7b2cbf 0%, #7b2cbf ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
          <span className="text-xs text-muted w-8">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #7b2cbf;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(123, 44, 191, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #7b2cbf;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(123, 44, 191, 0.5);
        }
      `}</style>
    </div>
  );
}
