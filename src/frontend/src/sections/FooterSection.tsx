import { Heart } from 'lucide-react';
import { usePersonalization } from '../personalization/PersonalizationContext';

export default function FooterSection() {
  const { content } = usePersonalization();
  
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
  );

  return (
    <footer className="relative py-12 px-4 bg-gradient-to-b from-pastel-pink/20 to-romantic-pink/30 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Heart className="w-64 h-64 text-romantic-red fill-romantic-red animate-pulse-gentle" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-2xl md:text-3xl text-romantic-red font-bold mb-6 flex items-center justify-center gap-3">
          {content.footer.text}
          <Heart className="w-8 h-8 text-romantic-red fill-romantic-red animate-heartbeat" />
        </p>
        
        <div className="text-sm text-gray-600 mt-8">
          <p>
            Built with <Heart className="w-4 h-4 inline text-romantic-red fill-romantic-red" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-romantic-red hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
