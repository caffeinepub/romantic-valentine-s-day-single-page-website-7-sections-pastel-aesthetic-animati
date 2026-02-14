export interface PersonalizedHero {
  name: string;
  heading: string;
  subheading: string;
  ctaText: string;
}

export interface PersonalizedTimeline {
  label: string;
  value: string;
}

export interface PersonalizedOurStory {
  title: string;
  story: string;
  timeline: PersonalizedTimeline[];
}

export interface PersonalizedReasons {
  title: string;
  list: string[];
}

export interface PersonalizedGalleryItem {
  image: string;
  caption: string;
  customImage?: string; // data URL for user-selected image
}

export interface PersonalizedGallery {
  title: string;
  items: PersonalizedGalleryItem[];
}

export interface PersonalizedLoveLetter {
  title: string;
  message: string;
}

export interface PersonalizedSurprise {
  title: string;
  buttonText: string;
  message: string;
  musicPath: string;
  musicPlaceholder: string;
  customMusic?: string; // data URL for user-selected audio
}

export interface PersonalizedFooter {
  name: string;
  text: string;
}

export interface PersonalizedContent {
  hero: PersonalizedHero;
  ourStory: PersonalizedOurStory;
  reasons: PersonalizedReasons;
  gallery: PersonalizedGallery;
  loveLetter: PersonalizedLoveLetter;
  surprise: PersonalizedSurprise;
  footer: PersonalizedFooter;
}

export interface PersonalizationOverrides {
  hero?: Partial<PersonalizedHero>;
  ourStory?: Partial<Omit<PersonalizedOurStory, 'timeline'>> & { timeline?: PersonalizedTimeline[] };
  reasons?: Partial<PersonalizedReasons>;
  gallery?: Partial<Omit<PersonalizedGallery, 'items'>> & { items?: PersonalizedGalleryItem[] };
  loveLetter?: Partial<PersonalizedLoveLetter>;
  surprise?: Partial<PersonalizedSurprise>;
  footer?: Partial<PersonalizedFooter>;
}
