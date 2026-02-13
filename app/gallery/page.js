import Image from 'next/image';
import machineryData from '@/data/machinery.json';

export const metadata = {
  title: 'Gallery | Best Hire Transport',
  description: 'View our gallery of construction equipment and machinery. Excavators, dozers, graders, and more available for rent in UAE.',
  keywords: 'equipment gallery, machinery photos, construction equipment UAE',
};

export default function GalleryPage() {
  const { machinery } = machineryData;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Gallery
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Explore our fleet of premium construction equipment available for rent.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machinery.map((machine) => (
              <div
                key={machine.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={machine.detailImage}
                    alt={machine.name}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-secondary font-medium text-sm mb-1">{machine.category}</p>
                    <h3 className="text-white font-bold text-xl">{machine.name}</h3>
                    <p className="text-white/80 text-sm mt-2">{machine.shortDescription}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Project Images Placeholder */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
              Project Gallery
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Our equipment in action across various construction projects in UAE.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-surface rounded-xl border border-border flex items-center justify-center"
                >
                  <div className="text-center text-[var(--text-muted)]">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Project {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

