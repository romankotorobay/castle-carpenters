"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      setContainerWidth(containerRef.current?.offsetWidth || 0);
    };
    updateWidth();
    
    // Set up a resize observer for precision
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);
    
    window.addEventListener("resize", updateWidth);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-lg shadow-xl select-none cursor-ew-resize group border border-brand-secondary/20"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Background) */}
        <Image
          src="/images/after.jpg"
          alt="Luxury living room renovated"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
          priority
        />
        <div className="absolute right-6 top-6 bg-brand-dark/70 text-brand-bg text-[10px] tracking-[0.2em] uppercase px-4 py-2 backdrop-blur-md z-10 pointer-events-none rounded-sm border border-white/10 font-sans">
          After
        </div>

        {/* Before Image (Clipped container) */}
        <div
          className="absolute top-0 bottom-0 left-0 overflow-hidden z-10 border-r border-white/50"
          style={{ width: `${sliderPosition}%` }}
        >
          <div 
            className="absolute top-0 bottom-0 left-0 h-full relative"
            style={{ width: containerWidth }}
          >
            <Image
              src="/images/before.jpg"
              alt="Luxury living room before renovation"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div 
          className="absolute left-6 top-6 bg-brand-dark/70 text-brand-bg text-[10px] tracking-[0.2em] uppercase px-4 py-2 backdrop-blur-md z-15 pointer-events-none rounded-sm border border-white/10 font-sans transition-opacity duration-300"
          style={{ opacity: sliderPosition > 12 ? 1 : 0 }}
        >
          Before
        </div>

        {/* Slider Handle Line & Button */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 cursor-ew-resize z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-brand-bg text-brand-primary border border-brand-secondary/40 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover:scale-110 pointer-events-none">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
