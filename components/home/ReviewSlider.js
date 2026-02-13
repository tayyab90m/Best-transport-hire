'use client';

import { useRef } from 'react';

export default function ReviewSlider({ reviews }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 380;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getStars = (category) => {
    switch (category) {
      case 'excellent': return 5;
      case 'very_good': return 5;
      case 'good': return 4;
      default: return 3;
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
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-80 md:w-96 flex-shrink-0 bg-surface rounded-2xl p-6 border border-border snap-start"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < getStars(review.category) ? 'text-secondary' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            {/* Quote */}
            <p className="text-[var(--text-secondary)] mb-6 line-clamp-4 leading-relaxed">
              "{review.description}"
            </p>
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {review.userName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{review.userName}</p>
                <p className="text-sm text-[var(--text-muted)] capitalize">
                  {review.category.replace('_', ' ')} Experience
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {reviews.map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-border"></div>
        ))}
      </div>
    </div>
  );
}

