import HeartsBackground from '../components/HeartsBackground';
import { usePersonalization } from '../personalization/PersonalizationContext';

export default function LoveLetterSection() {
  const { content } = usePersonalization();
  
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-pastel-pink/20 to-pastel-lavender/20 overflow-hidden">
      <HeartsBackground variant="sparse" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-romantic-red mb-12">
          {content.loveLetter.title}
        </h2>
        
        <div className="bg-white/95 rounded-3xl p-8 md:p-12 shadow-romantic">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-handwritten whitespace-pre-line">
            {content.loveLetter.message}
          </p>
        </div>
      </div>
    </section>
  );
}
