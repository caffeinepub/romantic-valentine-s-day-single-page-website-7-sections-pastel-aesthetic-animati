import { Button } from '@/components/ui/button';
import HeartsBackground from '../components/HeartsBackground';
import { usePersonalization } from '../personalization/PersonalizationContext';

export default function HeroSection() {
  const { content } = usePersonalization();
  
  const scrollToStory = () => {
    const storySection = document.getElementById('our-story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeartsBackground variant="dense" />
      
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-romantic-red mb-6 animate-fade-in">
          {content.hero.heading}, {content.hero.name} ❤️
        </h1>
        
        <p className="text-2xl md:text-3xl text-romantic-pink mb-12 font-light animate-fade-in-delay">
          {content.hero.subheading}
        </p>
        
        <Button
          onClick={scrollToStory}
          size="lg"
          className="bg-romantic-red hover:bg-romantic-red-dark text-white px-8 py-6 text-lg rounded-full shadow-romantic hover:shadow-romantic-lg transition-all duration-300 hover:scale-105 animate-fade-in-delay-2"
        >
          {content.hero.ctaText}
        </Button>
      </div>
    </section>
  );
}
