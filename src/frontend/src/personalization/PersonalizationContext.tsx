import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { valentineContent } from '../config/valentineContent';
import { PersonalizedContent, PersonalizationOverrides } from './types';
import { loadPersonalization, savePersonalization, clearPersonalization } from './storage';

interface PersonalizationContextType {
  content: PersonalizedContent;
  updateContent: (overrides: PersonalizationOverrides) => void;
  resetToDefaults: () => void;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

function mergeContent(overrides: PersonalizationOverrides | null): PersonalizedContent {
  const base = valentineContent;
  
  if (!overrides) return base as PersonalizedContent;
  
  return {
    hero: { ...base.hero, ...overrides.hero },
    ourStory: {
      ...base.ourStory,
      ...overrides.ourStory,
      timeline: overrides.ourStory?.timeline || base.ourStory.timeline,
    },
    reasons: { ...base.reasons, ...overrides.reasons },
    gallery: {
      ...base.gallery,
      ...overrides.gallery,
      items: overrides.gallery?.items || base.gallery.items,
    },
    loveLetter: { ...base.loveLetter, ...overrides.loveLetter },
    surprise: { ...base.surprise, ...overrides.surprise },
    footer: { ...base.footer, ...overrides.footer },
  };
}

export function PersonalizationProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<PersonalizationOverrides | null>(null);
  const [content, setContent] = useState<PersonalizedContent>(() => mergeContent(null));

  useEffect(() => {
    const loaded = loadPersonalization();
    if (loaded) {
      setOverrides(loaded);
      setContent(mergeContent(loaded));
    }
  }, []);

  const updateContent = (newOverrides: PersonalizationOverrides) => {
    const merged = { ...overrides, ...newOverrides };
    setOverrides(merged);
    setContent(mergeContent(merged));
    savePersonalization(merged);
  };

  const resetToDefaults = () => {
    setOverrides(null);
    setContent(mergeContent(null));
    clearPersonalization();
  };

  return (
    <PersonalizationContext.Provider value={{ content, updateContent, resetToDefaults }}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
}
