import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Music, Play, Pause } from 'lucide-react';
import { usePersonalization } from '../personalization/PersonalizationContext';

export default function SpecialSurpriseSection() {
  const { content } = usePersonalization();
  const [revealed, setRevealed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicAvailable, setMusicAvailable] = useState(false);

  const musicSource = content.surprise.customMusic || content.surprise.musicPath;

  useEffect(() => {
    // Check if music is available
    if (content.surprise.customMusic) {
      setMusicAvailable(true);
    } else if (content.surprise.musicPath) {
      // Try to check if the default path exists
      fetch(content.surprise.musicPath, { method: 'HEAD' })
        .then(() => setMusicAvailable(true))
        .catch(() => setMusicAvailable(false));
    }
  }, [content.surprise.customMusic, content.surprise.musicPath]);

  const handleReveal = () => {
    setRevealed(true);
    // Don't auto-play, let user click play button
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error('Failed to play audio:', error);
            setMusicAvailable(false);
          });
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-romantic-red mb-12">
          {content.surprise.title}
        </h2>
        
        {!revealed ? (
          <Button
            onClick={handleReveal}
            size="lg"
            className="bg-romantic-red hover:bg-romantic-red-dark text-white px-12 py-8 text-xl rounded-full shadow-romantic hover:shadow-romantic-lg transition-all duration-300 hover:scale-110 animate-pulse-gentle"
          >
            <Gift className="w-8 h-8 mr-3" />
            {content.surprise.buttonText}
          </Button>
        ) : (
          <div className="animate-fade-in">
            <div className="bg-gradient-to-br from-romantic-pink/30 to-pastel-lavender/30 rounded-3xl p-12 shadow-romantic mb-8">
              <p className="text-3xl md:text-4xl text-romantic-red font-bold leading-relaxed">
                {content.surprise.message}
              </p>
            </div>
            
            {musicAvailable ? (
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={toggleMusic}
                  variant="outline"
                  size="lg"
                  className="border-romantic-pink text-romantic-red hover:bg-romantic-pink/10"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause Music
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Play Our Song
                    </>
                  )}
                </Button>
                <audio
                  ref={audioRef}
                  src={musicSource}
                  loop
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                />
              </div>
            ) : (
              <div className="bg-pastel-pink/20 rounded-2xl p-6 max-w-md mx-auto">
                <Music className="w-12 h-12 text-romantic-pink mx-auto mb-3" />
                <p className="text-gray-600 text-sm">
                  No music available yet. Use the Customize panel to upload your special song!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
