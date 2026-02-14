import HeroSection from '../sections/HeroSection';
import OurStorySection from '../sections/OurStorySection';
import ReasonsILoveYouSection from '../sections/ReasonsILoveYouSection';
import GallerySection from '../sections/GallerySection';
import LoveLetterSection from '../sections/LoveLetterSection';
import SpecialSurpriseSection from '../sections/SpecialSurpriseSection';
import FooterSection from '../sections/FooterSection';

export default function ValentineSinglePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-pink via-white to-pastel-lavender">
      <HeroSection />
      <OurStorySection />
      <ReasonsILoveYouSection />
      <GallerySection />
      <LoveLetterSection />
      <SpecialSurpriseSection />
      <FooterSection />
    </div>
  );
}
