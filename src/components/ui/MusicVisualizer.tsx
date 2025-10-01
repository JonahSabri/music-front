'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MusicVisualizerProps {
  type?: 'waveform' | 'equalizer' | 'sound-waves' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  animated?: boolean;
  className?: string;
}

export function MusicVisualizer({ 
  type = 'waveform', 
  size = 'md', 
  color = 'nebula',
  animated = true,
  className = ''
}: MusicVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  const sizes = {
    sm: { width: 200, height: 60 },
    md: { width: 300, height: 80 },
    lg: { width: 400, height: 120 }
  };

  const colors = {
    nebula: '#7b2cbf',
    supernova: '#ffd60a',
    starlight: '#e0e1dd',
    green: '#10b981',
    blue: '#3b82f6',
    red: '#ef4444'
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = sizes[size];
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let isAnimating = false;

    const drawWaveform = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerY = height / 2;
      const amplitude = height * 0.4;
      const frequency = 0.03;
      
      // Create gradient for waveform
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.3, colors[color as keyof typeof colors] || color);
      gradient.addColorStop(0.7, colors[color as keyof typeof colors] || color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Draw main waveform
      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        const wave1 = Math.sin(x * frequency + time * 0.02) * amplitude * 0.6;
        const wave2 = Math.sin(x * frequency * 2.3 + time * 0.03) * amplitude * 0.3;
        const wave3 = Math.sin(x * frequency * 0.7 + time * 0.015) * amplitude * 0.2;
        const y = centerY + wave1 + wave2 + wave3;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      // Add glow effect
      ctx.shadowColor = colors[color as keyof typeof colors] || color;
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Draw secondary waveform (mirror)
      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      
      for (let x = 0; x < width; x += 2) {
        const wave1 = Math.sin(x * frequency + time * 0.02 + Math.PI) * amplitude * 0.4;
        const wave2 = Math.sin(x * frequency * 1.8 + time * 0.025) * amplitude * 0.2;
        const y = centerY + wave1 + wave2;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawEqualizer = () => {
      ctx.clearRect(0, 0, width, height);
      
      const barCount = 24;
      const barWidth = width / barCount;
      const maxHeight = height * 0.9;
      const spacing = 2;
      
      for (let i = 0; i < barCount; i++) {
        // Create more realistic frequency response
        const baseFreq = i / barCount;
        const wave1 = Math.sin(time * 0.02 + i * 0.3) * 0.4;
        const wave2 = Math.sin(time * 0.03 + i * 0.7) * 0.3;
        const wave3 = Math.sin(time * 0.015 + i * 1.2) * 0.2;
        const wave4 = Math.sin(time * 0.025 + i * 0.5) * 0.1;
        
        // Frequency response curve (higher frequencies are typically lower)
        const freqResponse = Math.pow(1 - baseFreq, 0.8);
        const barHeight = (wave1 + wave2 + wave3 + wave4 + 0.2) * maxHeight * freqResponse;
        
        const x = i * barWidth + spacing;
        const y = height - barHeight;
        const actualBarWidth = barWidth - spacing * 2;
        
        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(0, y, 0, height);
        const baseColor = colors[color as keyof typeof colors] || color;
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.5, baseColor + 'CC');
        gradient.addColorStop(1, baseColor + '66');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, actualBarWidth, barHeight);
        
        // Add glow effect to top of bars
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = 8;
        ctx.fillRect(x, y, actualBarWidth, Math.min(barHeight, 4));
        ctx.shadowBlur = 0;
      }
    };

    const drawSoundWaves = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) / 2;
      
      for (let i = 0; i < 5; i++) {
        const radius = (maxRadius * (i + 1) / 5) + Math.sin(time * 0.01 + i) * 10;
        const alpha = 1 - (i / 5);
        
        ctx.strokeStyle = `${colors[color as keyof typeof colors] || color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const drawCircular = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 3;
      
      // Draw rotating bars
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.01;
        const barLength = 20 + Math.sin(time * 0.02 + i) * 15;
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barLength);
        const y2 = centerY + Math.sin(angle) * (radius + barLength);
        
        ctx.strokeStyle = colors[color as keyof typeof colors] || color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!isAnimating) return;
      
      time += 1;
      
      switch (type) {
        case 'waveform':
          drawWaveform();
          break;
        case 'equalizer':
          drawEqualizer();
          break;
        case 'sound-waves':
          drawSoundWaves();
          break;
        case 'circular':
          drawCircular();
          break;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    // Start/stop animation based on animated prop and visibility
    if (animated && isVisible) {
      isAnimating = true;
      animate();
    } else {
      isAnimating = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      isAnimating = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
    };
  }, [type, size, color, animated, isVisible]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      
      {/* Overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${color}/10 to-transparent opacity-50`}></div>
      </div>
    </div>
  );
}

// Preset components for common use cases
export function WaveformVisualizer({ className = '', ...props }: Omit<MusicVisualizerProps, 'type'>) {
  return <MusicVisualizer type="waveform" className={className} {...props} />;
}

export function EqualizerVisualizer({ className = '', ...props }: Omit<MusicVisualizerProps, 'type'>) {
  return <MusicVisualizer type="equalizer" className={className} {...props} />;
}

export function SoundWavesVisualizer({ className = '', ...props }: Omit<MusicVisualizerProps, 'type'>) {
  return <MusicVisualizer type="sound-waves" className={className} {...props} />;
}

export function CircularVisualizer({ className = '', ...props }: Omit<MusicVisualizerProps, 'type'>) {
  return <MusicVisualizer type="circular" className={className} {...props} />;
}
