'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import machineryData from '@/data/machinery.json';
import { getMachineryWhatsAppLink, getWhatsAppLink } from '@/lib/constants';

export default function MachineryDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const machine = machineryData.machinery.find((m) => m.slug === params?.slug);

  if (!machine) {
    notFound();
  }

  // Get related machinery from same category (other variants)
  const relatedMachinery = machineryData.machinery
    .filter((m) => m.category === machine.category && m.id !== machine.id)
    .slice(0, 4);

  // Get other categories machinery
  const otherMachinery = machineryData.machinery
    .filter((m) => m.category !== machine.category)
    .slice(0, 3);

  // Use gallery images
  const galleryImages = machine.gallery && machine.gallery.length > 0 
    ? machine.gallery 
    : [{ image: machine.coverImage, label: machine.variant || 'Main' }];

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 flex-wrap">
          <Link href="/" className="text-[var(--text-muted)] hover:text-primary">Home</Link>
          <span className="text-[var(--text-muted)]">/</span>
          <Link href="/catalog" className="text-[var(--text-muted)] hover:text-primary">Catalog</Link>
          <span className="text-[var(--text-muted)]">/</span>
          <Link 
            href={`/catalog?category=${encodeURIComponent(machine.category)}`} 
            className="text-[var(--text-muted)] hover:text-primary"
          >
            {machine.category}
          </Link>
          <span className="text-[var(--text-muted)]">/</span>
          <span className="text-primary">{machine.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section with Gallery */}
          <div>
            {/* Main Image */}
            <div className="rounded-2xl p-8 border border-border mb-4 relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
              <Image
                src={galleryImages[selectedImage].image}
                alt={`${machine.name} - ${galleryImages[selectedImage].label}`}
                width={600}
                height={400}
                className="w-full h-auto object-contain max-h-[400px]"
                style={{ backgroundColor: '#ffffff' }}
                priority
              />
              {/* Variant Badge on Image */}
              <span className="absolute top-4 left-4 px-4 py-2 bg-primary text-white font-bold rounded-lg shadow-lg">
                {machine.variant}
              </span>
            </div>
            
            {/* Selected Variant Label */}
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full">
                {galleryImages[selectedImage].label}
              </span>
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {galleryImages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-xl p-2 border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-primary shadow-lg' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <Image
                      src={item.image}
                      alt={`${machine.name} - ${item.label}`}
                      width={100}
                      height={80}
                      className="w-full h-16 object-contain"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    <span className="block text-xs text-center mt-1 text-[var(--text-secondary)] font-medium truncate">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary font-medium text-sm rounded-full">
                {machine.category}
              </span>
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary font-medium text-sm rounded-full">
                {machine.variant}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {machine.name}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              {machine.description}
            </p>

            {/* Availability Badge */}
            <div className={`flex items-center gap-2 mb-6 ${
              machine.available ? 'text-success' : 'text-error'
            }`}>
              <span className={`w-3 h-3 rounded-full ${machine.available ? 'bg-success' : 'bg-error'}`}></span>
              <span className="font-medium">
                {machine.available ? 'Available for Rent' : 'Currently Unavailable'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              {/* WhatsApp CTA - Primary Button */}
              <a
                href={getMachineryWhatsAppLink(machine.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] transition-colors text-lg"
              >
                <Image src="/social_logo/whatsapp.png" alt="WhatsApp" width={28} height={28} />
                Get Quote on WhatsApp
              </a>

              {/* Email/Contact Button */}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Request Quote via Email
              </Link>
            </div>

            {/* Contact Info */}
            <p className="text-center text-[var(--text-muted)] text-sm">
              Click above to get an instant quote from our team
            </p>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Specifications</h2>
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(machine.specifications).map(([key, value], index) => (
                  <tr key={key} className={index % 2 === 0 ? 'bg-background' : ''}>
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)] w-1/3">{key}</td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Machinery (Same Category - Other Variants) */}
        {relatedMachinery.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Other {machine.category} Variants
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedMachinery.map((related) => (
                <Link
                  key={related.id}
                  href={`/machinery/${related.slug}`}
                  className="group bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
                >
                  <div className="relative h-32 md:h-40 flex items-center justify-center p-4 rounded-t-2xl" style={{ backgroundColor: '#ffffff' }}>
                    <Image
                      src={related.thumbImage}
                      alt={related.name}
                      width={160}
                      height={120}
                      className="object-contain max-h-28 md:max-h-32 group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded">
                      {related.variant}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[var(--text-primary)] group-hover:text-primary transition-colors text-sm md:text-base">
                      {related.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Other Equipment */}
        {otherMachinery.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Other Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherMachinery.map((related) => (
                <Link
                  key={related.id}
                  href={`/machinery/${related.slug}`}
                  className="group bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
                >
                  <div className="relative h-40 flex items-center justify-center p-4 rounded-t-2xl" style={{ backgroundColor: '#ffffff' }}>
                    <Image
                      src={related.thumbImage}
                      alt={related.name}
                      width={200}
                      height={140}
                      className="object-contain max-h-32 group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-secondary text-white text-xs font-bold rounded">
                      {related.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-secondary font-medium mb-1">{related.variant}</p>
                    <h3 className="font-bold text-[var(--text-primary)] group-hover:text-primary transition-colors">
                      {related.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
