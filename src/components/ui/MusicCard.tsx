'use client';

import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { AudioPlayer } from './AudioPlayer';

interface MusicCardProps {
  track: {
    id: number;
    title: string;
    artist_name?: string;
    cover_image?: string;
    audio_file?: string;
    status?: string;
    created_at?: string;
    streams?: number;
    duration?: number;
  };
  variant?: 'default' | 'compact' | 'featured' | 'playlist';
  showPlayer?: boolean;
  showVisualizer?: boolean;
  visualizerType?: 'waveform' | 'equalizer';
  className?: string;
  onPlay?: (track: any) => void;
  onPause?: (track: any) => void;
}

export function MusicCard({
  track,
  variant = 'default',
  showPlayer = false,
  showVisualizer = true,
  visualizerType = 'waveform',
  className = '',
  onPlay,
  onPause
}: MusicCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.(track);
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPause?.(track);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'rejected':
        return 'text-red-400';
      default:
        return 'text-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'منتشر شده';
      case 'pending':
        return 'در انتظار';
      case 'rejected':
        return 'رد شده';
      default:
        return 'نامشخص';
    }
  };

  if (variant === 'compact') {
    return (
      <div
        className={`glass rounded-xl p-4 hover:glass-strong transition-all duration-300 group cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
          {/* Cover */}
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-nebula to-supernova flex items-center justify-center relative">
            {track.cover_image ? (
              <img src={track.cover_image} alt={track.title} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            )}
            
            {/* Play Overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-starlight font-bold text-sm truncate">{track.title}</h4>
            <p className="text-muted text-xs truncate">{track.artist_name || 'هنرمند ناشناس'}</p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className={`text-xs ${getStatusColor(track.status || '')}`}>
              {getStatusText(track.status || '')}
            </span>
            {track.streams && (
              <span className="text-xs text-muted">
                {track.streams.toLocaleString()}
              </span>
            )}
          </div>
        </div>

      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <GlassCard
        variant="hover-glow"
        className={`p-6 group relative overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-12 h-12 border border-nebula/30 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-supernova/20 rounded-full"></div>
        </div>

        <div className="relative z-10">
          {/* Cover */}
          <div className="w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-nebula to-supernova flex items-center justify-center relative mb-4 group-hover:scale-105 transition-transform duration-300">
            {track.cover_image ? (
              <img src={track.cover_image} alt={track.title} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            )}
            
            {/* Play Overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
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
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h3 className="text-starlight font-bold text-lg group-hover:text-supernova transition-colors">
              {track.title}
            </h3>
            <p className="text-muted text-sm">{track.artist_name || 'هنرمند ناشناس'}</p>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-muted">
              <span className={getStatusColor(track.status || '')}>
                {getStatusText(track.status || '')}
              </span>
              {track.streams && (
                <span>{track.streams.toLocaleString()} پخش</span>
              )}
            </div>
          </div>

        </div>
      </GlassCard>
    );
  }

  // Default variant
  return (
    <GlassCard
      variant="hover-glow"
      className={`p-4 group relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-2 w-6 h-6 border border-nebula/30 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 bg-supernova/20 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Cover */}
        <div className="w-full h-32 rounded-lg overflow-hidden bg-gradient-to-br from-nebula to-supernova flex items-center justify-center relative mb-3 group-hover:scale-105 transition-transform duration-300">
          {track.cover_image ? (
            <img src={track.cover_image} alt={track.title} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          )}
          
          {/* Play Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h4 className="text-starlight font-bold text-sm group-hover:text-supernova transition-colors truncate">
            {track.title}
          </h4>
          <p className="text-muted text-xs truncate">{track.artist_name || 'هنرمند ناشناس'}</p>
          
          {/* Status */}
          <div className="flex items-center justify-between text-xs">
            <span className={getStatusColor(track.status || '')}>
              {getStatusText(track.status || '')}
            </span>
            {track.streams && (
              <span className="text-muted">{track.streams.toLocaleString()}</span>
            )}
          </div>
        </div>

      </div>

      {/* Audio Player */}
      {showPlayer && track.audio_file && (
        <div className="mt-4">
          <AudioPlayer
            track={{
              id: track.id,
              title: track.title,
              artist: track.artist_name || 'نامشخص',
              audioUrl: track.audio_file || '',
              coverImage: track.cover_image,
              duration: track.duration
            }}
            variant="compact"
            className="text-sm"
          />
        </div>
      )}
    </GlassCard>
  );
}
