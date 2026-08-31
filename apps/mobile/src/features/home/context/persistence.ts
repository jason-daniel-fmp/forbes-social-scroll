import { NativeModules } from 'react-native';

import type { HomePreference } from '@forbes/types';

const STORAGE_KEY = '@forbes/home-preference/v1';

let memoryPreference: HomePreference | null = null;

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

export async function loadHomePreference(): Promise<HomePreference | null> {
  try {
    const AsyncStorage = await getAsyncStorage();
    if (!AsyncStorage) {
      return memoryPreference;
    }

    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    memoryPreference = JSON.parse(raw) as HomePreference;
    return memoryPreference;
  } catch {
    return memoryPreference;
  }
}

export async function saveHomePreference(preference: HomePreference): Promise<void> {
  memoryPreference = preference;

  try {
    const AsyncStorage = await getAsyncStorage();
    if (!AsyncStorage) {
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
  } catch {
    // Fall back to in-memory preference when native storage is unavailable.
  }
}

export async function clearHomePreference(): Promise<void> {
  memoryPreference = null;

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
