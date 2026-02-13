import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'reviews.json');

// GET - Fetch reviews (approved only by default, all if ?all=true)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fetchAll = searchParams.get('all') === 'true';
    
    const data = await fs.readFile(dataPath, 'utf8');
    const { reviews } = JSON.parse(data);
    
    // Return all reviews if requested, otherwise only approved
    const filteredReviews = fetchAll ? reviews : reviews.filter((r) => r.approved);
    
    return NextResponse.json({ success: true, reviews: filteredReviews });
  } catch (error) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST - Submit new review
export async function POST(request) {
  try {
    const body = await request.json();
    const { userName, category, description } = body;

    // Validate required fields
    if (!userName || !category || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read existing reviews
    const data = await fs.readFile(dataPath, 'utf8');
    const reviewsData = JSON.parse(data);

    // Create new review
    const newReview = {
      id: `rev-${Date.now()}`,
      userName,
      category,
      description,
      createdAt: new Date().toISOString(),
      approved: false, // Reviews need admin approval
    };

    // Add to reviews array
    reviewsData.reviews.push(newReview);

    // Write back to file
    await fs.writeFile(dataPath, JSON.stringify(reviewsData, null, 2));

    return NextResponse.json({ success: true, review: newReview });
  } catch (error) {
    console.error('Submit review error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}
