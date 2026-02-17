import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG, USP_ITEMS } from '@/lib/constants';

export const metadata = {
  title: 'About Us | Best Hire Transport - Equipment Rental UAE',
  description: 'Learn about Best Hire Transport - Your trusted equipment rental and general contracting partner in Abu Dhabi, UAE. 24 Hours Service.',
  keywords: 'about Best Hire Transport, equipment rental company, construction machinery UAE, Abu Dhabi',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Best Hire
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your trusted partner for quality equipment rental and transport services in Abu Dhabi, UAE.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
                Our Story
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-4">
                Best Hire Transport and General Contracting was founded with a simple mission: to provide the highest quality construction equipment and transport services to our customers at the most competitive rates in the UAE market.
              </p>
              <p className="text-lg text-[var(--text-secondary)] mb-4">
                Based in Abu Dhabi, we have grown to become one of the leading equipment rental companies in the region, serving clients across all Emirates with our 24 Hours Service commitment.
              </p>
              <p className="text-lg text-[var(--text-secondary)]">
                Our success is built on our commitment to quality, reliability, and exceptional customer service. We take pride in maintaining a fleet of well-serviced, modern machinery that meets the highest industry standards.
              </p>
            </div>
            <div className="relative">
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <Image
                  src={SITE_CONFIG.logo}
                  alt="Best Hire Transport"
                  width={400}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary">{SITE_CONFIG.stats.projects}</span>
              <p className="text-[var(--text-secondary)] mt-2">Projects Completed</p>
            </div>
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary">{SITE_CONFIG.stats.experience}+</span>
              <p className="text-[var(--text-secondary)] mt-2">Years Experience</p>
            </div>
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary">24/7</span>
              <p className="text-[var(--text-secondary)] mt-2">Hours Service</p>
            </div>
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary">100+</span>
              <p className="text-[var(--text-secondary)] mt-2">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Equipment Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Our Equipment Fleet
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              We maintain a diverse fleet of well-serviced, modern machinery to meet all your construction needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {/* Crane */}
            <Link href="/catalog?category=Crane" className="group">
              <div className="rounded-2xl p-4 border border-border hover:shadow-xl transition-all duration-300 hover:border-primary" style={{ backgroundColor: '#ffffff' }}>
                <div className="relative h-28 md:h-32 flex items-center justify-center mb-3" style={{ backgroundColor: '#ffffff' }}>
                  <Image
                    src="/logo/crane2.jpg"
                    alt="Crane"
                    width={120}
                    height={100}
                    className="object-contain max-h-24 md:max-h-28 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#ffffff' }}
                  />
                </div>
                <h3 className="font-bold text-center text-[var(--text-primary)] group-hover:text-primary transition-colors">
                  Cranes
                </h3>
              </div>
            </Link>

            {/* Forklift */}
            <Link href="/catalog?category=Forklift" className="group">
              <div className="rounded-2xl p-4 border border-border hover:shadow-xl transition-all duration-300 hover:border-primary" style={{ backgroundColor: '#ffffff' }}>
                <div className="relative h-28 md:h-32 flex items-center justify-center mb-3" style={{ backgroundColor: '#ffffff' }}>
                  <Image
                    src="/logo/forklift8.png"
                    alt="Forklift"
                    width={120}
                    height={100}
                    className="object-contain max-h-24 md:max-h-28 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#ffffff' }}
                  />
                </div>
                <h3 className="font-bold text-center text-[var(--text-primary)] group-hover:text-primary transition-colors">
                  Forklifts
                </h3>
              </div>
            </Link>

            {/* Backhoe Loader */}
            <Link href="/catalog?category=Backhoe%20Loader" className="group">
              <div className="rounded-2xl p-4 border border-border hover:shadow-xl transition-all duration-300 hover:border-primary" style={{ backgroundColor: '#ffffff' }}>
                <div className="relative h-28 md:h-32 flex items-center justify-center mb-3" style={{ backgroundColor: '#ffffff' }}>
                  <Image
                    src="/logo/Backhoe-loaders2.jpg"
                    alt="Backhoe Loader"
                    width={120}
                    height={100}
                    className="object-contain max-h-24 md:max-h-28 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#ffffff' }}
                  />
                </div>
                <h3 className="font-bold text-center text-[var(--text-primary)] group-hover:text-primary transition-colors">
                  Backhoe Loaders
                </h3>
              </div>
            </Link>

            {/* Boom Lift */}
            <Link href="/catalog?category=Boom%20Lift" className="group">
              <div className="rounded-2xl p-4 border border-border hover:shadow-xl transition-all duration-300 hover:border-primary" style={{ backgroundColor: '#ffffff' }}>
                <div className="relative h-28 md:h-32 flex items-center justify-center mb-3" style={{ backgroundColor: '#ffffff' }}>
                  <Image
                    src="/logo/boomlift3.jpg"
                    alt="Boom Lift"
                    width={120}
                    height={100}
                    className="object-contain max-h-24 md:max-h-28 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#ffffff' }}
                  />
                </div>
                <h3 className="font-bold text-center text-[var(--text-primary)] group-hover:text-primary transition-colors">
                  Boom Lifts
                </h3>
              </div>
            </Link>

            {/* High Up Truck */}
            <Link href="/catalog?category=High%20Up%20Truck" className="group">
              <div className="rounded-2xl p-4 border border-border hover:shadow-xl transition-all duration-300 hover:border-primary" style={{ backgroundColor: '#ffffff' }}>
                <div className="relative h-28 md:h-32 flex items-center justify-center mb-3" style={{ backgroundColor: '#ffffff' }}>
                  <Image
                    src="/logo/highuptruck2.png"
                    alt="High Up Truck"
                    width={120}
                    height={100}
                    className="object-contain max-h-24 md:max-h-28 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#ffffff' }}
                  />
                </div>
                <h3 className="font-bold text-center text-[var(--text-primary)] group-hover:text-primary transition-colors">
                  High Up Trucks
                </h3>
              </div>
            </Link>

            {/* Recovery */}
            <Link href="/catalog?category=Recovery" className="group">
              <div className="rounded-2xl p-4 border border-border hover:shadow-xl transition-all duration-300 hover:border-primary" style={{ backgroundColor: '#ffffff' }}>
                <div className="relative h-28 md:h-32 flex items-center justify-center mb-3" style={{ backgroundColor: '#ffffff' }}>
                  <Image
                    src="/recovery/recovery1.jpeg"
                    alt="Recovery"
                    width={120}
                    height={100}
                    className="object-contain max-h-24 md:max-h-28 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#ffffff' }}
                  />
                </div>
                <h3 className="font-bold text-center text-[var(--text-primary)] group-hover:text-primary transition-colors">
                  Recovery
                </h3>
              </div>
            </Link>
          </div>

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

      {/* Contact Our Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border shadow-lg">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
                Contact Our Team
              </h2>
              <p className="text-lg text-[var(--text-secondary)]">
                We're here to help with all your equipment rental needs
              </p>
            </div>
            
            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20bd5a] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <Image src="/social_logo/whatsapp.png" alt="WhatsApp" width={28} height={28} />
                  <div>
                    <p className="font-bold text-lg">Chat on WhatsApp</p>
                    <p className="text-white/80 text-sm">Quick response guaranteed</p>
                  </div>
                </div>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Phone */}
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center justify-between px-6 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Call Us</p>
                    <p className="text-white/80 text-sm">{SITE_CONFIG.contact.phoneDisplay}</p>
                  </div>
                </div>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center justify-between px-6 py-4 bg-background border-2 border-border text-[var(--text-primary)] rounded-xl font-medium hover:border-primary transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Email Us</p>
                    <p className="text-[var(--text-muted)] text-sm">{SITE_CONFIG.contact.email}</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Address */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <p className="text-primary font-semibold mt-2">24 Hours Service</p>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232380.69639498974!2d54.26760595!3d24.4538352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f723ef2b9%3A0xc7cc2e9341971108!2sAbu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1706644800000!5m2!1sen!2s"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Why Choose Best Hire?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {USP_ITEMS.map((usp, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-border"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl text-primary font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{usp.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us today and let's discuss your equipment needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-secondary text-[var(--primary-dark)] rounded-xl font-bold text-lg hover:bg-yellow-400 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/catalog"
              className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
            >
              View Equipment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
