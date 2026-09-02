import { NativeModules } from 'react-native';

import { clampClicks, incrementClicks, type TileClickMap } from './tileFrequency';

const STORAGE_KEY = '@forbes/tile-clicks/v1';

let memoryClicks: TileClickMap = {};

function isAsyncStorageAvailable(): boolean {
  return NativeModules.RNCAsyncStorage != null;
}

async function getAsyncStorage() {
  if (!isAsyncStorageAvailable()) {
    return null;
  }

  const module = await import('@react-native-async-storage/async-storage');
  return module.default;
}

function sanitizeClickMap(value: unknown): TileClickMap {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const next: TileClickMap = {};

  for (const [id, clicks] of Object.entries(value as Record<string, unknown>)) {
    if (typeof clicks === 'number') {
      next[id] = clampClicks(clicks);
    }
  }

  return next;
}

export async function loadTileClicks(): Promise<TileClickMap> {
  try {
    const AsyncStorage = await getAsyncStorage();
    if (!AsyncStorage) {
      return { ...memoryClicks };
    }

    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      memoryClicks = {};
      return {};
    }

    memoryClicks = sanitizeClickMap(JSON.parse(raw));
    return { ...memoryClicks };
  } catch {
    return { ...memoryClicks };
  }
}

export async function incrementTileClick(tileId: string): Promise<TileClickMap> {
  const current = await loadTileClicks();
  const next: TileClickMap = {
    ...current,
    [tileId]: incrementClicks(current[tileId] ?? 0),
  };
  memoryClicks = next;

  try {
    const AsyncStorage = await getAsyncStorage();
    if (AsyncStorage) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    // Fall back to in-memory counts when native storage is unavailable.
  }

  return { ...next };
}

export async function clearTileClicks(): Promise<void> {
  memoryClicks = {};

  try {
    const AsyncStorage = await getAsyncStorage();
    if (!AsyncStorage) {
      return;
    }

    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore when native persistence is unavailable.
  }
}
