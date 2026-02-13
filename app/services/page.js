import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: 'Our Services | Best Hire Transport',
  description: 'Best Hire Transport offers comprehensive equipment rental services including machinery hire, operator services, maintenance support, and delivery across UAE.',
  keywords: 'equipment rental services, operator hire, machinery maintenance, equipment delivery UAE',
};

const services = [
  {
    title: 'Equipment Rental',
    description: 'Wide range of construction machinery available for daily, weekly, or monthly rental. From excavators to generators, we have what you need.',
    features: [
      'Flexible rental periods',
      'Competitive rates',
      'Well-maintained equipment',
      'Latest machinery models',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Operator Services',
    description: 'Experienced and certified operators available to operate machinery at your site. All operators are trained and hold valid certifications.',
    features: [
      'Certified operators',
      'Safety trained',
      'Experienced professionals',
      'Flexible scheduling',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: 'Maintenance Support',
    description: 'Regular maintenance and emergency breakdown support to keep your project running smoothly. Our technicians are available around the clock.',
    features: [
      '24/7 breakdown support',
      'Preventive maintenance',
      'Genuine spare parts',
      'Quick response time',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Delivery & Logistics',
    description: 'Hassle-free delivery and pickup of equipment to your project site anywhere in the UAE. We handle all logistics so you can focus on your work.',
    features: [
      'UAE-wide delivery',
      'Timely pickup & return',
      'Safe transportation',
      'GPS tracking available',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive equipment rental solutions to support your construction projects across UAE.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-surface rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  {service.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--text-secondary)]">
                      <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Equipment Categories
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              We offer a wide range of construction equipment for all your project needs.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Excavators', 'Dozers', 'Motor Graders', 'Wheel Loaders', 'Cranes', 'Generators', 'Compactors', 'Boom Lifts'].map((category) => (
              <Link
                key={category}
                href="/catalog"
                className="bg-background rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-border group"
              >
                <h4 className="font-semibold text-[var(--text-primary)] group-hover:text-primary transition-colors">
                  {category}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Equipment for Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get in touch with us today for a free consultation and quote.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/quote"
              className="px-8 py-4 bg-secondary text-[var(--primary-dark)] rounded-xl font-bold text-lg hover:bg-yellow-400 transition-colors"
            >
              Request Quote
            </Link>
            <Link
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
            >
              Call Us Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

