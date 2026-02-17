'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getWhatsAppLink } from '@/lib/constants';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      {/* Get Quote Button - Links to Contact Page */}
      <Link
        href="/contact"
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
        aria-label="Get Quote"
      >
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-2 bg-[var(--surface)] text-[var(--text-primary)] text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
          Get Quote
        </span>
      </Link>

      {/* WhatsApp Button - Bigger Size */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <Image
          src="/social_logo/whatsapp.png"
          alt="WhatsApp"
          width={40}
          height={40}
          className="w-9 h-9"
        />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-2 bg-[var(--surface)] text-[var(--text-primary)] text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
          Chat on WhatsApp
        </span>
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>
      </a>
    </div>
  );
}
