import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart, Plus } from 'lucide-react';
import { valentineContent } from '../config/valentineContent';

export default function ReasonsILoveYouSection() {
  const [reasons, setReasons] = useState<string[]>(valentineContent.reasons.list);
  const [newReason, setNewReason] = useState('');

  const handleAddReason = () => {
    if (newReason.trim()) {
      setReasons([...reasons, newReason.trim()]);
      setNewReason('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddReason();
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pastel-lavender/30 to-white/80">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-romantic-red mb-12">
          {valentineContent.reasons.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="border-2 border-romantic-pink/30 hover:border-romantic-pink hover:shadow-romantic transition-all duration-300 hover:scale-105 bg-white/90"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-romantic-red fill-romantic-red flex-shrink-0 mt-1" />
                  <p className="text-gray-700 leading-relaxed">{reason}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-romantic-red mb-4 text-center">
            Add More Reasons 💕
          </h3>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Type a reason..."
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-romantic-pink/30 focus:border-romantic-pink"
            />
            <Button
              onClick={handleAddReason}
              className="bg-romantic-red hover:bg-romantic-red-dark text-white"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
