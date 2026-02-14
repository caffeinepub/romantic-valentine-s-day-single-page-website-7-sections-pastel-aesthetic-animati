import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Image, Music, Type, RotateCcw } from 'lucide-react';
import { usePersonalization } from './PersonalizationContext';
import { validateImageFile, fileToDataURL as imageToDataURL } from './imageUtils';
import { validateAudioFile, fileToDataURL as audioToDataURL } from './audioUtils';
import { toast } from 'sonner';

export default function CustomizePanel() {
  const { content, updateContent, resetToDefaults } = usePersonalization();
  const [open, setOpen] = useState(false);
  
  // Text content state
  const [heroName, setHeroName] = useState(content.hero.name);
  const [heroHeading, setHeroHeading] = useState(content.hero.heading);
  const [heroSubheading, setHeroSubheading] = useState(content.hero.subheading);
  const [heroCta, setHeroCta] = useState(content.hero.ctaText);
  
  const [storyTitle, setStoryTitle] = useState(content.ourStory.title);
  const [storyText, setStoryText] = useState(content.ourStory.story);
  const [timeline0Label, setTimeline0Label] = useState(content.ourStory.timeline[0]?.label || '');
  const [timeline0Value, setTimeline0Value] = useState(content.ourStory.timeline[0]?.value || '');
  const [timeline1Label, setTimeline1Label] = useState(content.ourStory.timeline[1]?.label || '');
  const [timeline1Value, setTimeline1Value] = useState(content.ourStory.timeline[1]?.value || '');
  const [timeline2Label, setTimeline2Label] = useState(content.ourStory.timeline[2]?.label || '');
  const [timeline2Value, setTimeline2Value] = useState(content.ourStory.timeline[2]?.value || '');
  
  const [reasonsTitle, setReasonsTitle] = useState(content.reasons.title);
  const [reason0, setReason0] = useState(content.reasons.list[0] || '');
  const [reason1, setReason1] = useState(content.reasons.list[1] || '');
  const [reason2, setReason2] = useState(content.reasons.list[2] || '');
  
  const [loveLetterTitle, setLoveLetterTitle] = useState(content.loveLetter.title);
  const [loveLetterMessage, setLoveLetterMessage] = useState(content.loveLetter.message);
  
  const [surpriseTitle, setSurpriseTitle] = useState(content.surprise.title);
  const [surpriseButton, setSurpriseButton] = useState(content.surprise.buttonText);
  const [surpriseMessage, setSurpriseMessage] = useState(content.surprise.message);
  
  const [footerName, setFooterName] = useState(content.footer.name);
  const [footerText, setFooterText] = useState(content.footer.text);
  
  // Gallery images state
  const [galleryImages, setGalleryImages] = useState<(string | undefined)[]>(
    content.gallery.items.map(item => item.customImage)
  );
  const galleryInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Music state
  const [customMusic, setCustomMusic] = useState<string | undefined>(content.surprise.customMusic);
  const [musicFileName, setMusicFileName] = useState<string>('');
  const musicInputRef = useRef<HTMLInputElement>(null);

  const handleApply = () => {
    const newTimeline = [
      { label: timeline0Label, value: timeline0Value },
      { label: timeline1Label, value: timeline1Value },
      { label: timeline2Label, value: timeline2Value },
    ];
    
    const newReasons = [reason0, reason1, reason2].filter(r => r.trim());
    
    const newGalleryItems = content.gallery.items.map((item, index) => ({
      ...item,
      customImage: galleryImages[index],
    }));
    
    updateContent({
      hero: {
        name: heroName,
        heading: heroHeading,
        subheading: heroSubheading,
        ctaText: heroCta,
      },
      ourStory: {
        title: storyTitle,
        story: storyText,
        timeline: newTimeline,
      },
      reasons: {
        title: reasonsTitle,
        list: newReasons,
      },
      gallery: {
        items: newGalleryItems,
      },
      loveLetter: {
        title: loveLetterTitle,
        message: loveLetterMessage,
      },
      surprise: {
        title: surpriseTitle,
        buttonText: surpriseButton,
        message: surpriseMessage,
        customMusic,
      },
      footer: {
        name: footerName,
        text: footerText,
      },
    });
    
    toast.success('Changes applied successfully!');
    setOpen(false);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all customizations to defaults?')) {
      resetToDefaults();
      
      // Reset all form fields to defaults
      setHeroName(content.hero.name);
      setHeroHeading(content.hero.heading);
      setHeroSubheading(content.hero.subheading);
      setHeroCta(content.hero.ctaText);
      setStoryTitle(content.ourStory.title);
      setStoryText(content.ourStory.story);
      setTimeline0Label(content.ourStory.timeline[0]?.label || '');
      setTimeline0Value(content.ourStory.timeline[0]?.value || '');
      setTimeline1Label(content.ourStory.timeline[1]?.label || '');
      setTimeline1Value(content.ourStory.timeline[1]?.value || '');
      setTimeline2Label(content.ourStory.timeline[2]?.label || '');
      setTimeline2Value(content.ourStory.timeline[2]?.value || '');
      setReasonsTitle(content.reasons.title);
      setReason0(content.reasons.list[0] || '');
      setReason1(content.reasons.list[1] || '');
      setReason2(content.reasons.list[2] || '');
      setLoveLetterTitle(content.loveLetter.title);
      setLoveLetterMessage(content.loveLetter.message);
      setSurpriseTitle(content.surprise.title);
      setSurpriseButton(content.surprise.buttonText);
      setSurpriseMessage(content.surprise.message);
      setFooterName(content.footer.name);
      setFooterText(content.footer.text);
      setGalleryImages(content.gallery.items.map(() => undefined));
      setCustomMusic(undefined);
      setMusicFileName('');
      
      toast.success('Reset to defaults!');
      setOpen(false);
    }
  };

  const handleImageSelect = async (index: number, file: File | null) => {
    if (!file) return;
    
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid image file');
      return;
    }
    
    try {
      const dataURL = await imageToDataURL(file);
      const newImages = [...galleryImages];
      newImages[index] = dataURL;
      setGalleryImages(newImages);
      toast.success('Image selected!');
    } catch (error) {
      toast.error('Failed to load image');
    }
  };

  const handleMusicSelect = async (file: File | null) => {
    if (!file) return;
    
    const validation = validateAudioFile(file);
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid audio file');
      return;
    }
    
    try {
      const dataURL = await audioToDataURL(file);
      setCustomMusic(dataURL);
      setMusicFileName(file.name);
      toast.success('Music selected!');
    } catch (error) {
      toast.error('Failed to load audio file');
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-romantic hover:shadow-romantic-lg bg-romantic-red hover:bg-romantic-red-dark text-white"
        >
          <Settings className="w-5 h-5 mr-2" />
          Customize
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="text-2xl text-romantic-red">Personalize Your Valentine's Page</SheetTitle>
          <SheetDescription>
            Customize the text, images, and music to make this page uniquely yours.
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">
                <Type className="w-4 h-4 mr-2" />
                Text
              </TabsTrigger>
              <TabsTrigger value="images">
                <Image className="w-4 h-4 mr-2" />
                Images
              </TabsTrigger>
              <TabsTrigger value="music">
                <Music className="w-4 h-4 mr-2" />
                Music
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-6 mt-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-romantic-red">Hero Section</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="hero-name">Name</Label>
                    <Input
                      id="hero-name"
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder="Your loved one's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-heading">Heading</Label>
                    <Input
                      id="hero-heading"
                      value={heroHeading}
                      onChange={(e) => setHeroHeading(e.target.value)}
                      placeholder="Main heading"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subheading">Subheading</Label>
                    <Input
                      id="hero-subheading"
                      value={heroSubheading}
                      onChange={(e) => setHeroSubheading(e.target.value)}
                      placeholder="Romantic subheading"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-cta">Button Text</Label>
                    <Input
                      id="hero-cta"
                      value={heroCta}
                      onChange={(e) => setHeroCta(e.target.value)}
                      placeholder="Call to action"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Our Story Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-romantic-red">Our Story</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="story-title">Title</Label>
                    <Input
                      id="story-title"
                      value={storyTitle}
                      onChange={(e) => setStoryTitle(e.target.value)}
                      placeholder="Section title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-text">Story</Label>
                    <Textarea
                      id="story-text"
                      value={storyText}
                      onChange={(e) => setStoryText(e.target.value)}
                      placeholder="Your love story..."
                      rows={8}
                      className="resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Timeline</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={timeline0Label}
                        onChange={(e) => setTimeline0Label(e.target.value)}
                        placeholder="First milestone label"
                      />
                      <Input
                        value={timeline0Value}
                        onChange={(e) => setTimeline0Value(e.target.value)}
                        placeholder="Date/value"
                      />
                      <Input
                        value={timeline1Label}
                        onChange={(e) => setTimeline1Label(e.target.value)}
                        placeholder="Second milestone label"
                      />
                      <Input
                        value={timeline1Value}
                        onChange={(e) => setTimeline1Value(e.target.value)}
                        placeholder="Date/value"
                      />
                      <Input
                        value={timeline2Label}
                        onChange={(e) => setTimeline2Label(e.target.value)}
                        placeholder="Third milestone label"
                      />
                      <Input
                        value={timeline2Value}
                        onChange={(e) => setTimeline2Value(e.target.value)}
                        placeholder="Date/value"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Reasons Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-romantic-red">Reasons I Love You</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="reasons-title">Title</Label>
                    <Input
                      id="reasons-title"
                      value={reasonsTitle}
                      onChange={(e) => setReasonsTitle(e.target.value)}
                      placeholder="Section title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason-0">Reason 1</Label>
                    <Input
                      id="reason-0"
                      value={reason0}
                      onChange={(e) => setReason0(e.target.value)}
                      placeholder="First reason"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason-1">Reason 2</Label>
                    <Input
                      id="reason-1"
                      value={reason1}
                      onChange={(e) => setReason1(e.target.value)}
                      placeholder="Second reason"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason-2">Reason 3</Label>
                    <Input
                      id="reason-2"
                      value={reason2}
                      onChange={(e) => setReason2(e.target.value)}
                      placeholder="Third reason"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Love Letter Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-romantic-red">Love Letter</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="letter-title">Title</Label>
                    <Input
                      id="letter-title"
                      value={loveLetterTitle}
                      onChange={(e) => setLoveLetterTitle(e.target.value)}
                      placeholder="Section title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="letter-message">Message</Label>
                    <Textarea
                      id="letter-message"
                      value={loveLetterMessage}
                      onChange={(e) => setLoveLetterMessage(e.target.value)}
                      placeholder="Your love letter..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Surprise Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-romantic-red">Special Surprise</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="surprise-title">Title</Label>
                    <Input
                      id="surprise-title"
                      value={surpriseTitle}
                      onChange={(e) => setSurpriseTitle(e.target.value)}
                      placeholder="Section title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="surprise-button">Button Text</Label>
                    <Input
                      id="surprise-button"
                      value={surpriseButton}
                      onChange={(e) => setSurpriseButton(e.target.value)}
                      placeholder="Reveal button text"
                    />
                  </div>
                  <div>
                    <Label htmlFor="surprise-message">Surprise Message</Label>
                    <Input
                      id="surprise-message"
                      value={surpriseMessage}
                      onChange={(e) => setSurpriseMessage(e.target.value)}
                      placeholder="Hidden message"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Footer Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-romantic-red">Footer</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="footer-name">Your Name</Label>
                    <Input
                      id="footer-name"
                      value={footerName}
                      onChange={(e) => setFooterName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="footer-text">Footer Text</Label>
                    <Input
                      id="footer-text"
                      value={footerText}
                      onChange={(e) => setFooterText(e.target.value)}
                      placeholder="Closing message"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-romantic-red">Gallery Images</h3>
                <p className="text-sm text-gray-600">
                  Upload your own photos to replace the placeholder images in the gallery.
                </p>
                
                <div className="grid grid-cols-1 gap-4">
                  {content.gallery.items.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`gallery-${index}`}>Image {index + 1}</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id={`gallery-${index}`}
                          type="file"
                          accept="image/*"
                          ref={(el) => {
                            galleryInputRefs.current[index] = el;
                          }}
                          onChange={(e) => handleImageSelect(index, e.target.files?.[0] || null)}
                          className="flex-1"
                        />
                        {galleryImages[index] && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-romantic-pink">
                            <img
                              src={galleryImages[index]}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="music" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-romantic-red">Background Music</h3>
                <p className="text-sm text-gray-600">
                  Upload a special song that will play when the surprise is revealed.
                </p>
                
                <div className="space-y-3">
                  <Label htmlFor="music-file">Select Audio File</Label>
                  <Input
                    id="music-file"
                    type="file"
                    accept="audio/*"
                    ref={musicInputRef}
                    onChange={(e) => handleMusicSelect(e.target.files?.[0] || null)}
                  />
                  {musicFileName && (
                    <p className="text-sm text-romantic-red">
                      Selected: {musicFileName}
                    </p>
                  )}
                  {!customMusic && !musicFileName && (
                    <p className="text-sm text-gray-500 italic">
                      No music selected. The default music path will be used if available.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
        
        <SheetFooter className="mt-6 flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 border-romantic-pink text-romantic-red hover:bg-romantic-pink/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-romantic-red hover:bg-romantic-red-dark text-white"
          >
            Apply Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
