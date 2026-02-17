'use client';

import { useState } from 'react';
import Image from 'next/image';

// Gallery data organized by category - 5 images each
const galleryData = {
  'Crane': [
    { src: '/crane/crane1.jpeg', label: 'Crane 50 Ton' },
    { src: '/crane/crane2.jpg', label: 'Crane 70 Ton' },
    { src: '/crane/crane3.jpeg', label: 'Crane 100 Ton' },
    { src: '/crane/crane4.jpeg', label: 'Crane at Work' },
    { src: '/crane/crane5.jpeg', label: 'Mobile Crane' },
  ],
  'Forklift': [
    { src: '/forklift/forklift1.jpg', label: 'Forklift 3 Ton' },
    { src: '/forklift/forklift2.png', label: 'Forklift 5 Ton' },
    { src: '/forklift/forklift3.png', label: 'Forklift 8 Ton' },
    { src: '/forklift/forklift4.jpg', label: 'Forklift 10 Ton' },
    { src: '/forklift/forklift5.jpg', label: 'Forklift 15 Ton' },
  ],
  'Backhoe Loader': [
    { src: '/backhoeloader/backhoe1.png', label: 'Backhoe Loader Front' },
    { src: '/backhoeloader/backhoe2.png', label: 'Backhoe Loader Side' },
    { src: '/backhoeloader/backhoe3.jpg', label: 'Backhoe at Work' },
    { src: '/backhoeloader/backhoe4.jpg', label: 'Backhoe Detail' },
    { src: '/backhoeloader/backhoe5.jpg', label: 'Backhoe Overview' },
  ],
  'Boom Lift': [
    { src: '/boomlift/boomlift1.png', label: 'Boom Lift 14m' },
    { src: '/boomlift/boomlift2.png', label: 'Boom Lift 17m' },
    { src: '/boomlift/boomlift3.jpg', label: 'Boom Lift at Work' },
    { src: '/boomlift/boomlift4.jpg', label: 'Articulating Boom' },
    { src: '/boomlift/boomlift5.jpg', label: 'Boom Lift Detail' },
  ],
  'High Up Truck': [
    { src: '/highuptruck/highuptruck1.png', label: 'High Up Truck 7 Ton' },
    { src: '/highuptruck/highuptruck2.jpeg', label: 'High Up Truck 10 Ton' },
    { src: '/highuptruck/highuptruck3.jpeg', label: 'Truck Mounted Crane' },
    { src: '/highuptruck/highuptruck4.jpeg', label: 'High Up Working' },
    { src: '/highuptruck/highuptruck5.png', label: 'High Up Detail' },
  ],
  'Recovery': [
    { src: '/recovery/recovery1.jpeg', label: 'Recovery 5 Ton' },
    { src: '/recovery/recovery2.jpeg', label: 'Recovery 8 Ton' },
    { src: '/recovery/recovery3.jpeg', label: 'Tow Truck' },
    { src: '/recovery/recovery4.jpeg', label: 'Recovery Vehicle' },
    { src: '/recovery/recovery5.jpeg', label: 'Recovery Detail' },
  ],
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Object.keys(galleryData)];

  const getFilteredImages = () => {
    if (activeCategory === 'All') {
      return Object.entries(galleryData).flatMap(([category, images]) =>
        images.map(img => ({ ...img, category }))
      );
    }
    return galleryData[activeCategory]?.map(img => ({ ...img, category: activeCategory })) || [];
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Equipment Gallery
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore our fleet of premium construction equipment available for rent across UAE.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-surface hover:bg-surface-hover text-[var(--text-primary)] border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.category}-${index}`}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-border hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#ffffff' }}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={image.label}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: '#ffffff' }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-medium text-sm">{image.label}</p>
                  <p className="text-white/70 text-xs">{image.category}</p>
                </div>
              </div>
              {/* Category Badge */}
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary/90 text-white text-xs font-medium rounded">
                {image.category}
              </span>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--text-muted)]">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div
            className="relative max-w-4xl max-h-[80vh] w-full rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#ffffff' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.label}
                fill
                className="object-contain p-4"
                style={{ backgroundColor: '#ffffff' }}
              />
            </div>
            <div className="p-4 bg-surface border-t border-border">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{selectedImage.label}</h3>
              <p className="text-[var(--text-secondary)]">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
