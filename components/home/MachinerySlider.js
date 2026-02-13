'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MachinerySlider({ machinery }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 320;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors hidden md:flex"
        aria-label="Scroll left"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors hidden md:flex"
        aria-label="Scroll right"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {machinery.map((machine) => (
          <Link
            key={machine.id}
            href={`/machinery/${machine.slug}`}
            className="group w-72 md:w-80 flex-shrink-0 bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border snap-start"
          >
            <div className="relative h-48 bg-white flex items-center justify-center p-4 rounded-t-2xl">
              <Image
                src={machine.thumbImage}
                alt={machine.name}
                width={280}
                height={180}
                className="object-contain max-h-40 group-hover:scale-105 transition-transform duration-300 bg-white"
                style={{ backgroundColor: 'white' }}
              />
              {machine.available ? (
                <span className="absolute top-3 right-3 px-3 py-1 bg-success text-white text-xs font-medium rounded-full">
                  Available
                </span>
              ) : (
                <span className="absolute top-3 right-3 px-3 py-1 bg-error text-white text-xs font-medium rounded-full">
                  Unavailable
                </span>
              )}
            </div>
            <div className="p-5">
              <p className="text-sm text-secondary font-medium mb-1">{machine.category}</p>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-primary transition-colors">
                {machine.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                {machine.shortDescription}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold">Get Quote</span>
                <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {machinery.map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-border"></div>
        ))}
      </div>
    </div>
  );
}
