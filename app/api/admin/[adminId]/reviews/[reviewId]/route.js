import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { ADMIN_CONFIG } from '@/lib/constants';

const dataPath = path.join(process.cwd(), 'data', 'reviews.json');

// PATCH - Update review approval status
export async function PATCH(request, { params }) {
  try {
    const { adminId, reviewId } = await params;

    // Verify admin access
    if (adminId !== ADMIN_CONFIG.adminId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { approved } = body;

    if (typeof approved !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Invalid approval status' },
        { status: 400 }
      );
    }

    // Read reviews
    const data = await fs.readFile(dataPath, 'utf8');
    const reviewsData = JSON.parse(data);

    // Find and update review
    const reviewIndex = reviewsData.reviews.findIndex((r) => r.id === reviewId);

    if (reviewIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    reviewsData.reviews[reviewIndex].approved = approved;

    // Write back
    await fs.writeFile(dataPath, JSON.stringify(reviewsData, null, 2));

    return NextResponse.json({
      success: true,
      review: reviewsData.reviews[reviewIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

