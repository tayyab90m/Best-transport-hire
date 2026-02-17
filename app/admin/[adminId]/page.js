'use client';

import { useState, useEffect } from 'react';
import { useParams, redirect } from 'next/navigation';
import Image from 'next/image';
import { ADMIN_CONFIG, REVIEW_CATEGORIES } from '@/lib/constants';

export default function AdminPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('machinery');
  const [reviews, setReviews] = useState([]);
  const [machinery, setMachinery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Check admin access
  useEffect(() => {
    if (params.adminId !== ADMIN_CONFIG.adminId) {
      redirect('/');
    }
  }, [params.adminId]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch machinery
        const machineryRes = await fetch('/api/machinery');
        const machineryData = await machineryRes.json();

        // Fetch ALL reviews (including pending) for admin
        const reviewsRes = await fetch('/api/reviews?all=true');
        const reviewsData = await reviewsRes.json();

        setMachinery(machineryData.machinery || []);
        setCategories(machineryData.categories || []);
        setReviews(reviewsData.reviews || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleReviewApproval = async (reviewId, currentStatus) => {
    setUpdating(reviewId);
    try {
      const response = await fetch(`/api/admin/${params.adminId}/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !currentStatus }),
      });

      if (response.ok) {
        setReviews(reviews.map(r => 
          r.id === reviewId ? { ...r, approved: !currentStatus } : r
        ));
      }
    } catch (error) {
      console.error('Failed to toggle review:', error);
    } finally {
      setUpdating(null);
    }
  };

  const toggleMachineryAvailability = async (machineId, currentStatus) => {
    setUpdating(machineId);
    try {
      const response = await fetch('/api/machinery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: machineId, available: !currentStatus }),
      });

      if (response.ok) {
        setMachinery(machinery.map(m => 
          m.id === machineId ? { ...m, available: !currentStatus } : m
        ));
      }
    } catch (error) {
      console.error('Failed to toggle availability:', error);
    } finally {
      setUpdating(null);
    }
  };

  const getCategoryBadge = (category) => {
    const colors = {
      bad: 'bg-error/20 text-error',
      good: 'bg-warning/20 text-warning',
      very_good: 'bg-primary/20 text-primary',
      excellent: 'bg-success/20 text-success',
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  // Filter machinery by category
  const filteredMachinery = selectedCategory === 'All' 
    ? machinery 
    : machinery.filter(m => m.category === selectedCategory);

  // Calculate stats
  const stats = {
    totalMachinery: machinery.length,
    availableMachinery: machinery.filter(m => m.available).length,
    totalCategories: categories.length,
    totalReviews: reviews.length,
    pendingReviews: reviews.filter(r => !r.approved).length,
    approvedReviews: reviews.filter(r => r.approved).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-muted)]">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Admin Panel</h1>
          <p className="text-[var(--text-muted)]">Manage machinery and reviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-surface rounded-xl p-4 border border-border">
            <p className="text-[var(--text-muted)] text-sm">Total Equipment</p>
            <p className="text-2xl font-bold text-primary">{stats.totalMachinery}</p>
          </div>
          <div className="bg-surface rounded-xl p-4 border border-border">
            <p className="text-[var(--text-muted)] text-sm">Available</p>
            <p className="text-2xl font-bold text-success">{stats.availableMachinery}</p>
          </div>
          <div className="bg-surface rounded-xl p-4 border border-border">
            <p className="text-[var(--text-muted)] text-sm">Categories</p>
            <p className="text-2xl font-bold text-secondary">{stats.totalCategories}</p>
          </div>
          <div className="bg-surface rounded-xl p-4 border border-border">
            <p className="text-[var(--text-muted)] text-sm">Total Reviews</p>
            <p className="text-2xl font-bold text-primary">{stats.totalReviews}</p>
          </div>
          <div className="bg-surface rounded-xl p-4 border border-border">
            <p className="text-[var(--text-muted)] text-sm">Approved</p>
            <p className="text-2xl font-bold text-success">{stats.approvedReviews}</p>
          </div>
          <div className="bg-surface rounded-xl p-4 border border-border">
            <p className="text-[var(--text-muted)] text-sm">Pending</p>
            <p className="text-2xl font-bold text-warning">{stats.pendingReviews}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
          {['machinery', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm capitalize transition-colors border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab}
              {tab === 'reviews' && stats.pendingReviews > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-warning text-white text-xs rounded-full">
                  {stats.pendingReviews}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Machinery Tab */}
        {activeTab === 'machinery' && (
          <div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-border text-[var(--text-secondary)] hover:bg-surface-hover'
                }`}
              >
                All ({machinery.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-surface border border-border text-[var(--text-secondary)] hover:bg-surface-hover'
                  }`}
                >
                  {cat} ({machinery.filter(m => m.category === cat).length})
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredMachinery.length === 0 ? (
                <div className="text-center py-12 bg-surface rounded-xl border border-border">
                  <p className="text-[var(--text-muted)]">No machinery found in this category</p>
                </div>
              ) : (
                filteredMachinery.map((machine) => (
                  <div key={machine.id} className="bg-surface rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg flex items-center justify-center p-2 flex-shrink-0 border border-border" style={{ backgroundColor: '#ffffff' }}>
                        <Image
                          src={machine.thumbImage}
                          alt={machine.name}
                          width={60}
                          height={60}
                          className="object-contain"
                          style={{ backgroundColor: '#ffffff' }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--text-primary)] truncate">{machine.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-secondary/20 text-secondary text-xs font-medium rounded">
                            {machine.category}
                          </span>
                          {machine.variant && (
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded">
                              {machine.variant}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">{machine.shortDescription}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          machine.available ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                        }`}>
                          {machine.available ? 'Available' : 'Unavailable'}
                        </span>
                        <button
                          onClick={() => toggleMachineryAvailability(machine.id, machine.available)}
                          disabled={updating === machine.id}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 whitespace-nowrap ${
                            machine.available
                              ? 'bg-error/10 text-error hover:bg-error/20'
                              : 'bg-success/10 text-success hover:bg-success/20'
                          }`}
                        >
                          {updating === machine.id ? (
                            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                          ) : machine.available ? 'Mark Unavailable' : 'Mark Available'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4">
              <span className="px-4 py-2 bg-warning/10 text-warning rounded-lg text-sm font-medium">
                {stats.pendingReviews} Pending
              </span>
              <span className="px-4 py-2 bg-success/10 text-success rounded-lg text-sm font-medium">
                {stats.approvedReviews} Approved
              </span>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-surface rounded-xl border border-border">
                <p className="text-[var(--text-muted)]">No reviews yet</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className={`bg-surface rounded-xl p-6 border-2 ${
                  review.approved ? 'border-border' : 'border-warning/50'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-semibold text-[var(--text-primary)]">{review.userName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getCategoryBadge(review.category)}`}>
                          {review.category?.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          review.approved ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                        }`}>
                          {review.approved ? 'Approved' : 'Pending Approval'}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] mb-2">{review.description}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleReviewApproval(review.id, review.approved)}
                      disabled={updating === review.id}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 whitespace-nowrap ${
                        review.approved
                          ? 'bg-error/10 text-error hover:bg-error/20'
                          : 'bg-success/10 text-success hover:bg-success/20'
                      }`}
                    >
                      {updating === review.id ? (
                        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      ) : review.approved ? 'Reject' : 'Approve'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
