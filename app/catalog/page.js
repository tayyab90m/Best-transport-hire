'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import machineryData from '@/data/machinery.json';
import { getWhatsAppLink, getMachineryWhatsAppLink } from '@/lib/constants';

export default function CatalogPage() {
  const { categories, machinery } = machineryData;
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMachinery = activeCategory === 'All' 
    ? machinery 
    : machinery.filter(m => m.category === activeCategory);

  // Group machinery by category for display
  const groupedMachinery = categories.reduce((acc, category) => {
    acc[category] = machinery.filter(m => m.category === category);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Equipment Catalog
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Browse our complete range of premium construction equipment available for rent across UAE.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              activeCategory === 'All'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-surface hover:bg-surface-hover text-[var(--text-primary)] border border-border'
            }`}
          >
            All Equipment
          </button>
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

        {/* Display by Category or Filtered */}
        {activeCategory === 'All' ? (
          // Show grouped by category
          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category} className="scroll-mt-20" id={category.toLowerCase().replace(/\s+/g, '-')}>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                    {category}
                  </h2>
                  <span className="text-sm text-[var(--text-muted)] bg-surface px-3 py-1 rounded-full">
                    {groupedMachinery[category].length} {groupedMachinery[category].length === 1 ? 'variant' : 'variants'}
                  </span>
                </div>

                {/* Category Machinery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedMachinery[category].map((machine) => (
                    <div
                      key={machine.id}
                      className="group bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
                    >
                      <Link href={`/machinery/${machine.slug}`}>
                        <div className="relative h-48 flex items-center justify-center p-4 rounded-t-2xl" style={{ backgroundColor: '#ffffff' }}>
                          <Image
                            src={machine.thumbImage}
                            alt={machine.name}
                            width={280}
                            height={180}
                            className="object-contain max-h-40 group-hover:scale-105 transition-transform duration-300"
                            style={{ backgroundColor: '#ffffff' }}
                          />
                          {/* Variant Badge */}
                          <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                            {machine.variant}
                          </span>
                          {/* Availability Badge */}
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
                      </Link>
                      <div className="p-5">
                        <Link href={`/machinery/${machine.slug}`}>
                          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-primary transition-colors">
                            {machine.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                          {machine.shortDescription}
                        </p>
                        <div className="flex items-center gap-2">
                          <a
                            href={getMachineryWhatsAppLink(machine.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-[#25D366] text-white rounded-lg font-medium text-sm hover:bg-[#20bd5a] transition-colors text-center flex items-center justify-center gap-2"
                          >
                            <Image src="/social_logo/whatsapp.png" alt="WhatsApp" width={16} height={16} />
                            Get Quote
                          </a>
                          <Link
                            href={`/machinery/${machine.slug}`}
                            className="px-4 py-2 border border-primary text-primary rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-colors"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show filtered results
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMachinery.map((machine) => (
              <div
                key={machine.id}
                className="group bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
              >
                <Link href={`/machinery/${machine.slug}`}>
                  <div className="relative h-48 flex items-center justify-center p-4 rounded-t-2xl" style={{ backgroundColor: '#ffffff' }}>
                    <Image
                      src={machine.thumbImage}
                      alt={machine.name}
                      width={280}
                      height={180}
                      className="object-contain max-h-40 group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    {/* Variant Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                      {machine.variant}
                    </span>
                    {/* Availability Badge */}
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
                </Link>
                <div className="p-5">
                  <p className="text-sm text-secondary font-medium mb-1">{machine.category}</p>
                  <Link href={`/machinery/${machine.slug}`}>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-primary transition-colors">
                      {machine.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                    {machine.shortDescription}
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href={getMachineryWhatsAppLink(machine.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-[#25D366] text-white rounded-lg font-medium text-sm hover:bg-[#20bd5a] transition-colors text-center flex items-center justify-center gap-2"
                    >
                      <Image src="/social_logo/whatsapp.png" alt="WhatsApp" width={16} height={16} />
                      Get Quote
                    </a>
                    <Link
                      href={`/machinery/${machine.slug}`}
                      className="px-4 py-2 border border-primary text-primary rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-surface rounded-2xl p-8 md:p-12 border border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
            Need Help Choosing Equipment?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            Contact us with your specific requirements and we'll help you find the right equipment for your project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={getWhatsAppLink("Hi There, I need help choosing equipment for my project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-2"
            >
              <Image src="/social_logo/whatsapp.png" alt="WhatsApp" width={24} height={24} />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
