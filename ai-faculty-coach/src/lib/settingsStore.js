import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'settings-db.json');

async function ensureDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify([], null, 2), 'utf8');
  }
}

export async function readSettingsDb() {
  await ensureDataFile();
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch {
    return [];
  }
}

export async function writeSettingsDb(items) {
  await ensureDataFile();
  await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), 'utf8');
  return items;
}

export async function getSettingsByUserId(userId) {
  if (!userId) return null;
  const items = await readSettingsDb();
  return items.find((item) => item.userId === userId) || null;
}

export async function upsertSettings(userId, nextSettings) {
  if (!userId) throw new Error('Missing userId');
  const items = await readSettingsDb();
  const now = new Date().toISOString();
  const existingIndex = items.findIndex((item) => item.userId === userId);
  const payload = {
    userId,
    theme: nextSettings.theme || 'system',
    language: nextSettings.language || 'english',
    notifications: {
      email: nextSettings.notifications?.email ?? true,
      digest: nextSettings.notifications?.digest ?? true,
    },
    updatedAt: now,
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...payload };
  } else {
    items.push(payload);
  }

  await writeSettingsDb(items);
  return payload;
}
