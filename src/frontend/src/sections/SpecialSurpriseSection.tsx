import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Music } from 'lucide-react';
import { valentineContent } from '../config/valentineContent';

export default function SpecialSurpriseSection() {
  const [revealed, setRevealed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    if (audioRef.current && valentineContent.surprise.musicPath) {
      audioRef.current.play().catch(() => {
        // Music file not available or autoplay blocked
      });
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle error silently
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-romantic-red mb-12">
          {valentineContent.surprise.title}
        </h2>
        
        {!revealed ? (
          <Button
            onClick={handleReveal}
            size="lg"
            className="bg-romantic-red hover:bg-romantic-red-dark text-white px-12 py-8 text-xl rounded-full shadow-romantic hover:shadow-romantic-lg transition-all duration-300 hover:scale-110 animate-pulse-gentle"
          >
            <Gift className="w-8 h-8 mr-3" />
            {valentineContent.surprise.buttonText}
          </Button>
        ) : (
          <div className="animate-fade-in">
            <div className="bg-gradient-to-br from-romantic-pink/30 to-pastel-lavender/30 rounded-3xl p-12 shadow-romantic mb-8">
              <p className="text-3xl md:text-4xl text-romantic-red font-bold leading-relaxed">
                {valentineContent.surprise.message}
              </p>
            </div>
            
            {valentineContent.surprise.musicPath && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={toggleMusic}
                  variant="outline"
                  className="border-romantic-pink text-romantic-red hover:bg-romantic-pink/10"
                >
                  <Music className="w-5 h-5 mr-2" />
                  {isPlaying ? 'Pause Music' : 'Play Our Song'}
                </Button>
                <audio
                  ref={audioRef}
                  src={valentineContent.surprise.musicPath}
                  loop
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            )}
            
            {!valentineContent.surprise.musicPath && (
              <p className="text-gray-500 text-sm italic">
                {valentineContent.surprise.musicPlaceholder}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
