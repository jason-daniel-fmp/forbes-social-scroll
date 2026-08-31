import { NativeModules } from 'react-native';

import type { JourneyId, UserJourneyState } from '@forbes/types';

const STORAGE_KEY = '@forbes/journey-states/v1';

export type JourneyStateMap = Partial<Record<JourneyId, UserJourneyState>>;

let memoryStore: JourneyStateMap = {};

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

export async function loadJourneyStates(): Promise<JourneyStateMap> {
  try {
    const AsyncStorage = await getAsyncStorage();
    if (!AsyncStorage) {
      return { ...memoryStore };
    }

    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as JourneyStateMap;
    memoryStore = parsed ?? {};
    return memoryStore;
  } catch {
    return { ...memoryStore };
  }
}

export async function saveJourneyStates(states: JourneyStateMap): Promise<void> {
  memoryStore = { ...states };

  try {
    const AsyncStorage = await getAsyncStorage();
    if (!AsyncStorage) {
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(states));
  } catch {
    // Keep in-memory state when native persistence is unavailable (e.g. Expo Go).
  }
}

export async function clearJourneyStates(): Promise<void> {
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
