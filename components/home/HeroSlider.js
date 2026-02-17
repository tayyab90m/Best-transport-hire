'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getWhatsAppLink } from '@/lib/constants';

const slides = [
  {
    image: '/slider/slide1.jpeg',
    title: 'Great Equipment',
    subtitle: 'Greater Engineering',
  },
  {
    image: '/slider/slide2.jpeg',
    title: 'Quality that',
    subtitle: 'Outweighs Expectations',
  },
  {
    image: '/slider/slide3.jpeg',
    title: 'Accelerating',
    subtitle: 'Better Construction',
  },
  {
    image: '/slider/slide4.jpeg',
    title: 'Professional',
    subtitle: 'Equipment Solutions',
  },
  {
    image: '/slider/slide5.jpeg',
    title: 'Excellence in',
    subtitle: 'Heavy Equipment',
  },
  {
    image: '/slider/slide6.jpeg',
    title: 'Power &',
    subtitle: 'Performance',
  },
  {
    image: '/slider/slide7.jpeg',
    title: 'Your Trusted',
    subtitle: 'Rental Partner',
  },
  {
    image: '/slider/slide8.jpeg',
    title: 'Built for',
    subtitle: 'Success',
  },
  {
    image: '/slider/slide9.jpeg',
    title: 'Complete',
    subtitle: 'Fleet Solutions',
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 800);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images - full display, no crop, HD quality */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center w-full ${
            currentSlide === index ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none z-0'
          } transition-opacity duration-500`}
          style={{ transitionProperty: 'opacity' }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            width={1200}
            height={1000}
            className="w-full h-auto object-contain"
            sizes="100vw"
            quality={90}
            priority={index === 0}
            loading={index === 0 ? undefined : 'lazy'}
          />
        </div>
      ))}

      {/* Stats + CTA at bottom */}
      <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 sm:px-6 sm:py-3">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">500+</p>
              <p className="text-gray-100 text-xs sm:text-sm">Delivered Projects</p>
            </div>
            <div className="text-center bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 sm:px-6 sm:py-3">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">16<span className="text-lg sm:text-xl">yrs</span></p>
              <p className="text-gray-100 text-xs sm:text-sm">Experience</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-4 sm:mt-6">
            <Link
              href="/catalog"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-sm sm:text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              View Equipment
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-bold text-sm sm:text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Image src="/social_logo/whatsapp.png" alt="WhatsApp" width={24} height={24} style={{ backgroundColor: 'transparent' }} />
              Get Quote
            </a>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-secondary w-5 sm:w-8'
                : 'bg-white/50 hover:bg-white/80 w-2 sm:w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
