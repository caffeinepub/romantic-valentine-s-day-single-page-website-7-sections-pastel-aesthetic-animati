import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { valentineContent } from '../config/valentineContent';

export default function OurStorySection() {
  return (
    <section id="our-story" className="py-20 px-4 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-romantic-red mb-12">
          {valentineContent.ourStory.title}
        </h2>
        
        <div className="bg-pastel-pink/20 rounded-3xl p-8 md:p-12 mb-16 shadow-soft">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
            {valentineContent.ourStory.story}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valentineContent.ourStory.timeline.map((item, index) => (
            <Card
              key={index}
              className="border-2 border-romantic-pink/30 hover:border-romantic-pink hover:shadow-romantic transition-all duration-300 hover:-translate-y-1 bg-white/90"
            >
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-romantic-pink/20 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-romantic-red fill-romantic-red" />
                  </div>
                </div>
                <CardTitle className="text-center text-romantic-red text-xl">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-700">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
