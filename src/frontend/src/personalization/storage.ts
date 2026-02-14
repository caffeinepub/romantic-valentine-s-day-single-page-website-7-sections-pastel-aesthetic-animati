import { PersonalizationOverrides } from './types';

const STORAGE_KEY = 'valentine_personalization_v1';

export function loadPersonalization(): PersonalizationOverrides | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as PersonalizationOverrides;
  } catch (error) {
    console.warn('Failed to load personalization from localStorage:', error);
    return null;
  }
}

export function savePersonalization(overrides: PersonalizationOverrides): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (error) {
    console.error('Failed to save personalization to localStorage:', error);
  }
}

export function clearPersonalization(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear personalization from localStorage:', error);
  }
}
