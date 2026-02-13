'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import machineryData from '@/data/machinery.json';
import { getMachineryWhatsAppLink } from '@/lib/constants';

export default function MachineryDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const machine = machineryData.machinery.find((m) => m.slug === params?.slug);

  if (!machine) {
    notFound();
  }

  const relatedMachinery = machineryData.machinery
    .filter((m) => m.id !== machine.id)
    .slice(0, 3);

  // Use gallery images, fallback to cover image
  const galleryImages = machine.gallery && machine.gallery.length > 0 
    ? machine.gallery 
    : [{ image: machine.coverImage, label: 'Main' }];

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-[var(--text-muted)] hover:text-primary">Home</Link>
          <span className="text-[var(--text-muted)]">/</span>
          <Link href="/catalog" className="text-[var(--text-muted)] hover:text-primary">Catalog</Link>
          <span className="text-[var(--text-muted)]">/</span>
          <span className="text-primary">{machine.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section with Gallery */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl p-8 border border-border mb-4">
              <Image
                src={galleryImages[selectedImage].image}
                alt={`${machine.name} - ${galleryImages[selectedImage].label}`}
                width={600}
                height={400}
                className="w-full h-auto object-contain max-h-[400px] bg-white"
                style={{ backgroundColor: 'white' }}
                priority
              />
            </div>
            
            {/* Selected Variant Label */}
            {galleryImages.length > 1 && (
              <div className="text-center mb-4">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full">
                  {galleryImages[selectedImage].label}
                </span>
              </div>
            )}

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative bg-white rounded-xl p-2 border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-primary shadow-lg' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={`${machine.name} - ${item.label}`}
                      width={100}
                      height={80}
                      className="w-full h-16 object-contain bg-white"
                      style={{ backgroundColor: 'white' }}
                    />
                    <span className="block text-xs text-center mt-1 text-[var(--text-secondary)] font-medium">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary font-medium text-sm rounded-full mb-4">
              {machine.category}
            </span>
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

            {/* WhatsApp CTA - Primary Button */}
            <a
              href={getMachineryWhatsAppLink(machine.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] transition-colors text-lg mb-4"
            >
              <Image src="/social_logo/whatsapp.png" alt="WhatsApp" width={28} height={28} />
              Get Quote on WhatsApp
            </a>

            {/* Contact Info */}
            <p className="text-center text-[var(--text-muted)] text-sm">
              Click above to chat directly with our team
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
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{key}</td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Machinery */}
        {relatedMachinery.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Other Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedMachinery.map((related) => (
                <Link
                  key={related.id}
                  href={`/machinery/${related.slug}`}
                  className="group bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
                >
                  <div className="relative h-40 bg-white flex items-center justify-center p-4 rounded-t-2xl">
                    <Image
                      src={related.thumbImage}
                      alt={related.name}
                      width={200}
                      height={140}
                      className="object-contain max-h-32 group-hover:scale-105 transition-transform duration-300 bg-white"
                      style={{ backgroundColor: 'white' }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-secondary font-medium mb-1">{related.category}</p>
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
