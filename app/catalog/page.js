import Link from 'next/link';
import Image from 'next/image';
import machineryData from '@/data/machinery.json';
import { getWhatsAppLink } from '@/lib/constants';

export const metadata = {
  title: 'Equipment Catalog | Best Hire Transport',
  description: 'Browse our complete range of construction equipment for rent. Excavators, dozers, motor graders, wheel loaders, forklifts and more available in UAE.',
  keywords: 'equipment catalog, machinery rental, excavators, dozers, graders, loaders, forklifts, construction equipment UAE',
};

export default function CatalogPage() {
  const { categories, machinery } = machineryData;

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

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button className="px-5 py-2 bg-primary text-white rounded-full font-medium text-sm">
            All Equipment
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-5 py-2 bg-surface hover:bg-surface-hover text-[var(--text-primary)] rounded-full font-medium text-sm border border-border transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Machinery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {machinery.map((machine) => (
            <Link
              key={machine.id}
              href={`/machinery/${machine.slug}`}
              className="group bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="relative h-48 bg-white flex items-center justify-center p-4 rounded-t-2xl">
                <Image
                  src={machine.thumbImage}
                  alt={machine.name}
                  width={280}
                  height={180}
                  className="object-contain max-h-40 group-hover:scale-105 transition-transform duration-300"
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
                  <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

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
              <Image src="/social_logo/whatsapp.png" alt="WhatsApp" width={20} height={20} />
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
