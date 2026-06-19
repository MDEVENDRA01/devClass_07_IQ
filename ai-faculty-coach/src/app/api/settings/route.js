'use server';
import { NextResponse } from 'next/server';
import { getSettingsByUserId, upsertSettings } from '@/lib/settingsStore';

export async function GET(request) {
  const userId = request.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  const settings = await getSettingsByUserId(userId);
  return NextResponse.json({ data: settings || {
    userId,
    theme: 'system',
    language: 'english',
    notifications: { email: true, digest: true },
    updatedAt: new Date().toISOString(),
  }});
}

export async function PUT(request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const validated = {
    theme: ['light', 'dark', 'system'].includes(payload.theme) ? payload.theme : 'system',
    language: ['english', 'telugu', 'hindi'].includes(payload.language) ? payload.language : 'english',
    notifications: {
      email: Boolean(payload.notifications?.email),
      digest: Boolean(payload.notifications?.digest),
    },
  };

  const saved = await upsertSettings(userId, validated);
  return NextResponse.json({ data: saved });
}
