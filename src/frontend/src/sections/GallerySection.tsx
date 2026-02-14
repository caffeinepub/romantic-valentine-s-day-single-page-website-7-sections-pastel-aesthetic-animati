import { useState } from 'react';
import { usePersonalization } from '../personalization/PersonalizationContext';

export default function GallerySection() {
  const { content } = usePersonalization();
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-romantic-red mb-12">
          {content.gallery.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.gallery.items.map((item, index) => {
            const imageSrc = !imageErrors[index] && item.customImage 
              ? item.customImage 
              : item.image;
            
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-romantic transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden bg-pastel-pink/10">
                  <img
                    src={imageSrc}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => handleImageError(index)}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-romantic-red/80 via-romantic-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white font-medium p-4 w-full text-center">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
