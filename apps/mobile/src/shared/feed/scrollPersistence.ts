import { NativeModules } from 'react-native';

const STORAGE_KEY = '@forbes/feed-scroll-indices/v2';

export type FeedScrollId = 'trends' | 'home' | 'financial-recovery';

type FeedScrollIndexMap = Partial<Record<FeedScrollId, number>>;

let memoryStore: FeedScrollIndexMap = {};

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

export async function loadFeedScrollIndex(feedId: FeedScrollId): Promise<number> {
  try {
    const AsyncStorage = await getAsyncStorage();
    if (!AsyncStorage) {
      return memoryStore[feedId] ?? 0;
    }

    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return memoryStore[feedId] ?? 0;
    }

    const parsed = JSON.parse(raw) as FeedScrollIndexMap;
    memoryStore = parsed ?? {};
    return memoryStore[feedId] ?? 0;
  } catch {
    return memoryStore[feedId] ?? 0;
  }
}

export async function saveFeedScrollIndex(feedId: FeedScrollId, index: number): Promise<void> {
  const safeIndex = Math.max(0, Math.floor(index));
  memoryStore = { ...memoryStore, [feedId]: safeIndex };

  try {
    const AsyncStorage = await getAsyncStorage();
    if (!AsyncStorage) {
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
  } catch {
    // Keep in-memory state when native persistence is unavailable (e.g. Expo Go).
  }
}

export async function clearFeedScrollIndices(): Promise<void> {
  memoryStore = {};

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
