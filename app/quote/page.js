'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import machineryData from '@/data/machinery.json';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/constants';

// Loading skeleton component
function QuotePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-12 w-64 bg-white/20 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-white/20 rounded mx-auto animate-pulse"></div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface rounded-2xl p-8 md:p-10 border border-border">
            <div className="space-y-6">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Form component that uses useSearchParams
function QuoteForm() {
  const searchParams = useSearchParams();
  const preselectedMachine = searchParams.get('machine') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    machinery: preselectedMachine,
    startDate: '',
    endDate: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus('success');
    setTimeout(() => setStatus(''), 5000);
  };

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Request a Quote
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get a free quote for your equipment rental needs. We'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface rounded-2xl p-8 md:p-10 border border-border">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Quote Request Sent!</h2>
                <p className="text-[var(--text-secondary)] mb-6">
                  Thank you for your interest. Our team will contact you within 24 hours with a detailed quote.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/catalog"
                    className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Browse More Equipment
                  </Link>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Fill in Your Details
                </h2>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="ABC Construction LLC"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                {/* Equipment Selection */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Select Equipment *
                  </label>
                  <select
                    required
                    value={formData.machinery}
                    onChange={(e) => setFormData({ ...formData, machinery: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="">Choose equipment</option>
                    {machineryData.machinery.map((machine) => (
                      <option key={machine.id} value={machine.slug}>
                        {machine.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={today}
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value, endDate: '' })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={formData.startDate || today}
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      disabled={!formData.startDate}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                    placeholder="Any specific requirements, delivery location, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full px-6 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending Request...' : 'Request Quote'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-[var(--text-secondary)] mb-4">
              Need immediate assistance? Contact us directly:
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {SITE_CONFIG.contact.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function QuotePage() {
  return (
    <Suspense fallback={<QuotePageSkeleton />}>
      <QuoteForm />
    </Suspense>
  );
}
