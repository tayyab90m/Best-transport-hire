import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: 'Rental Terms & Conditions | Best Hire Transport',
  description: 'Read our equipment rental terms and conditions. Understand rental policies, payment terms, and insurance requirements for Best Hire Transport.',
  keywords: 'rental terms, equipment rental conditions, rental policy UAE, Abu Dhabi',
};

export default function RentalTermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Rental Terms & Conditions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Please read our terms carefully before renting equipment.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. Rental Agreement</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              By renting equipment from Best Hire Transport, you agree to these terms and conditions. The rental agreement becomes effective upon delivery of the equipment and remains in force until the equipment is returned and inspected.
            </p>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. Rental Periods</h2>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-6 space-y-2">
              <li><strong>Daily Rate:</strong> 24-hour period from time of delivery</li>
              <li><strong>Weekly Rate:</strong> 7 consecutive days</li>
              <li><strong>Monthly Rate:</strong> 28-30 consecutive days</li>
              <li>Minimum rental period is one day</li>
              <li>Extensions must be requested 24 hours in advance</li>
            </ul>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. Payment Terms</h2>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-6 space-y-2">
              <li>Payment is required before equipment delivery</li>
              <li>Security deposit may be required for certain equipment</li>
              <li>Accepted payment methods: Bank transfer, credit card, cash</li>
              <li>All prices are in AED and subject to 5% VAT</li>
              <li>Late payments incur a 2% monthly fee</li>
            </ul>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">4. Equipment Use</h2>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-6 space-y-2">
              <li>Equipment must be operated by qualified personnel only</li>
              <li>Renter is responsible for proper use and care of equipment</li>
              <li>Sub-letting of equipment is strictly prohibited</li>
              <li>Equipment must remain within UAE unless otherwise agreed</li>
              <li>Any modifications to equipment are prohibited</li>
            </ul>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">5. Maintenance & Repairs</h2>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-6 space-y-2">
              <li>Best Hire provides equipment in good working condition</li>
              <li>Daily maintenance (checking oil, fuel, etc.) is renter's responsibility</li>
              <li>Report any mechanical issues immediately</li>
              <li>Unauthorized repairs will void warranty coverage</li>
              <li>Best Hire provides 24/7 breakdown support</li>
            </ul>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">6. Damage & Liability</h2>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-6 space-y-2">
              <li>Renter is liable for all damage during rental period</li>
              <li>Normal wear and tear is excluded</li>
              <li>Theft or loss must be reported to police within 24 hours</li>
              <li>Insurance coverage is recommended</li>
              <li>Security deposit covers minor damages</li>
            </ul>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">7. Insurance Requirements</h2>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-6 space-y-2">
              <li>Third-party liability insurance is mandatory</li>
              <li>Equipment insurance is recommended</li>
              <li>Best Hire can arrange insurance at additional cost</li>
              <li>Proof of insurance required before delivery</li>
            </ul>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">8. Delivery & Return</h2>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-6 space-y-2">
              <li>Delivery and pickup charges apply based on location</li>
              <li>Site must be accessible for delivery</li>
              <li>Equipment must be returned clean and in good condition</li>
              <li>Late returns charged at daily rate</li>
              <li>Inspection conducted upon return</li>
            </ul>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">9. Cancellation Policy</h2>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-6 space-y-2">
              <li>Cancellation 48+ hours before: Full refund</li>
              <li>Cancellation 24-48 hours before: 50% refund</li>
              <li>Cancellation less than 24 hours: No refund</li>
              <li>Early return does not qualify for refund</li>
            </ul>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">10. Force Majeure</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Best Hire Transport shall not be liable for any failure to perform due to circumstances beyond reasonable control, including but not limited to natural disasters, war, government actions, or pandemic-related restrictions.
            </p>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-[var(--text-secondary)] mb-4">
                For any questions about these terms, please contact us:
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Email: {SITE_CONFIG.contact.email}<br />
                Phone: {SITE_CONFIG.contact.phone}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Contact Us for Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

