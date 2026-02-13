'use client';

import { useState } from 'react';
import reviewsData from '@/data/reviews.json';
import { REVIEW_CATEGORIES } from '@/lib/constants';

export default function ReviewsPage() {
  const approvedReviews = reviewsData.reviews.filter((r) => r.approved);
  
  const [formData, setFormData] = useState({
    userName: '',
    category: '',
    description: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ userName: '', category: '', description: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus(''), 5000);
  };

  const getCategoryColor = (category) => {
    const cat = REVIEW_CATEGORIES.find((c) => c.value === category);
    if (!cat) return 'bg-gray-100 text-gray-800';
    switch (cat.color) {
      case 'green': return 'bg-success/10 text-success';
      case 'blue': return 'bg-primary/10 text-primary';
      case 'yellow': return 'bg-warning/10 text-warning';
      case 'red': return 'bg-error/10 text-error';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Customer Reviews
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            See what our clients say about their experience with Best Hire Transport.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                All Reviews ({approvedReviews.length})
              </h2>
              {approvedReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-surface rounded-2xl p-6 border border-border"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{review.userName}</p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getCategoryColor(review.category)}`}>
                      {review.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          review.category === 'excellent' || review.category === 'very_good'
                            ? 'text-secondary'
                            : review.category === 'good'
                            ? i < 4 ? 'text-secondary' : 'text-gray-300'
                            : i < 3 ? 'text-secondary' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    "{review.description}"
                  </p>
                </div>
              ))}
            </div>

            {/* Submit Review Form */}
            <div className="lg:col-span-1">
              <div className="bg-surface rounded-2xl p-6 border border-border sticky top-24">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                  Share Your Experience
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Rating *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select rating</option>
                      {REVIEW_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.emoji} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Your Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your experience..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Submitting...' : 'Submit Review'}
                  </button>
                  {status === 'success' && (
                    <p className="text-success text-center text-sm">
                      Thank you! Your review will be visible after approval.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-error text-center text-sm">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

