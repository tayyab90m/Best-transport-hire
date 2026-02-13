'use client';

import Image from 'next/image';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/constants';

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/social_logo/whatsapp.png"
        alt="WhatsApp"
        width={32}
        height={32}
        className="w-7 h-7"
      />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-[var(--surface)] text-[var(--text-primary)] text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us!
      </span>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>
    </a>
  );
}

