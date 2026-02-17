import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, USP_ITEMS } from '@/lib/constants';
import machineryData from '@/data/machinery.json';
import reviewsData from '@/data/reviews.json';
import HeroSlider from '@/components/home/HeroSlider';
import MachinerySlider from '@/components/home/MachinerySlider';
import ReviewSlider from '@/components/home/ReviewSlider';

export default function Home() {
  const featuredMachinery = machineryData.machinery.filter(m => m.featured);
  const approvedReviews = reviewsData.reviews.filter(r => r.approved);

  // Get unique categories for display
  const categories = machineryData.categories;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <HeroSlider />

      {/* Featured Machinery Section with Slider */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Our Equipment Range
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              We provide most reliable and top quality branded equipment based on your industry specific needs.
            </p>
          </div>

          {/* Machinery Slider Component */}
          <MachinerySlider machinery={featuredMachinery} />

          <div className="text-center mt-10">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              View All Equipment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Equipment Categories
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Browse our wide range of construction and industrial equipment
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => {
              const categoryMachine = machineryData.machinery.find(m => m.category === category);
              return (
                <Link
                  key={category}
                  href={`/catalog?category=${encodeURIComponent(category)}`}
                  className="group bg-background rounded-2xl p-4 text-center hover:shadow-xl transition-all duration-300 border border-border hover:border-primary"
                >
                  <div className="relative h-24 md:h-32 mb-3 rounded-xl overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                    {categoryMachine && (
                      <Image
                        src={categoryMachine.thumbImage}
                        alt={category}
                        width={120}
                        height={100}
                        className="object-contain max-h-24 md:max-h-28 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: '#ffffff' }}
                      />
                    )}
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-sm md:text-base group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Why Choose Best Hire?
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Your trusted partner for quality equipment rental in UAE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {USP_ITEMS.map((usp, index) => (
              <div
                key={index}
                className="bg-surface rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-border"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  {usp.icon === 'equipment' && (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )}
                  {usp.icon === 'certificate' && (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )}
                  {usp.icon === 'cost' && (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {usp.icon === 'support' && (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{usp.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section with Slider */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Trusted by leading construction companies across UAE
            </p>
          </div>

          {/* Reviews Slider Component */}
          <ReviewSlider reviews={approvedReviews} />

          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
            >
              View All Reviews
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get a free quote for your equipment rental needs today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi There, I need a quote for equipment rental.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-3"
            >
              <Image src="/social_logo/whatsapp.png" alt="WhatsApp" width={28} height={28} />
              Get Quote on WhatsApp
            </a>
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
            >
              Call {SITE_CONFIG.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
