'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={SITE_CONFIG.logo}
              alt={SITE_CONFIG.name}
              width={50}
              height={50}
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="hidden sm:block">
              <span className="text-xl md:text-2xl font-bold text-primary">
                {SITE_CONFIG.name}
              </span>
              <p className="text-xs text-[var(--text-muted)] hidden md:block">
                {SITE_CONFIG.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:text-primary hover:bg-surface-hover rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
            >
              <Image
                src="/social_logo/whatsapp.png"
                alt="WhatsApp"
                width={20}
                height={20}
              />
              <span className="hidden xl:inline">WhatsApp</span>
            </Link>
            <Link
              href="/quote"
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-[var(--text-primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-[var(--text-primary)] hover:text-primary hover:bg-surface-hover rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-4 px-4">
                <Link
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg font-medium"
                >
                  <Image
                    src="/social_logo/whatsapp.png"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                  />
                  WhatsApp
                </Link>
                <Link
                  href="/quote"
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium text-center"
                >
                  Get Quote
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

