import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'machinery.json');

// GET - Fetch all machinery
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const available = searchParams.get('available');

    const data = await fs.readFile(dataPath, 'utf8');
    let { machinery, categories } = JSON.parse(data);

    // Filter by category
    if (category) {
      machinery = machinery.filter((m) => m.category === category);
    }

    // Filter by availability
    if (available !== null) {
      const isAvailable = available === 'true';
      machinery = machinery.filter((m) => m.available === isAvailable);
    }

    return NextResponse.json({ success: true, machinery, categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch machinery' },
      { status: 500 }
    );
  }
}

// PATCH - Update machinery availability
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, available } = body;

    if (!id || typeof available !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Missing id or available status' },
        { status: 400 }
      );
    }

    const data = await fs.readFile(dataPath, 'utf8');
    const machineryData = JSON.parse(data);

    const machineIndex = machineryData.machinery.findIndex((m) => m.id === id);

    if (machineIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Machinery not found' },
        { status: 404 }
      );
    }

    machineryData.machinery[machineIndex].available = available;

    await fs.writeFile(dataPath, JSON.stringify(machineryData, null, 2));

    return NextResponse.json({
      success: true,
      machinery: machineryData.machinery[machineIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update machinery' },
      { status: 500 }
    );
  }
}

