import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { springApiFetch, getImageUrl } from "@/lib/api";

type EventItem = {
  id: number;
  title: string;
  imageUrl: string | null;
};

const candidatePublicImages = [
  "/slides2.png",
  "/slides4.png",
  "/slides5.png",
  "/slides6.png",
  "/alumini.png",
  "/lab-che.png",
  "/principal.png",
  "/viceprincipal.png",
];

const localFallbacks = [
  "/src/assets/school-logo.png",
  "/src/assets/hero-campus.png",
];

const AboutSlideshow = () => {
  const [images, setImages] = useState<string[]>([]);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      setHasError(false);
      let collected: string[] = [];
      
      // First, try to load images from events API
      try {
        const res = await springApiFetch('/events', { cache: 'no-store' });
        if (res.ok) {
          const data: EventItem[] = await res.json();
          const eventUrls = data
            .filter((e) => !!e.imageUrl)
            .map((e) => getImageUrl(e.imageUrl));
          collected = collected.concat(eventUrls);
        }
      } catch (error) {
        console.log('Could not fetch events for slideshow:', error);
      }

      // Then, probe public images to include any that actually exist
      const existingPublic: string[] = await new Promise((resolve) => {
        let results: string[] = [];
        let remaining = candidatePublicImages.length;
        if (remaining === 0) return resolve([]);
        
        candidatePublicImages.forEach((path) => {
          const img = new Image();
          img.onload = () => {
            results.push(path);
            if (--remaining === 0) resolve(results);
          };
          img.onerror = () => {
            console.log(`Image not found: ${path}`);
            if (--remaining === 0) resolve(results);
          };
          img.src = path + `?v=${Date.now()}`;
        });
      });

      // Combine and deduplicate images
      const combined = Array.from(new Set([...collected, ...existingPublic]));
      
      if (combined.length > 0) {
        console.log(`Slideshow loaded ${combined.length} images:`, combined);
        setImages(combined.slice(0, 12));
        setHasError(false);
      } else {
        console.log('No images found, using fallbacks');
        setImages(localFallbacks);
        setHasError(true);
      }
      
      setIsLoading(false);
    };
    
    loadImages();
    
    // Set up event listeners for revalidation
    const revalidate = () => loadImages();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'ij:lastUpdate') loadImages();
    };
    
    window.addEventListener('focus', revalidate);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') loadImages();
    });
    window.addEventListener('ij:data-updated' as any, revalidate);
    window.addEventListener('storage', onStorage);
    
    return () => {
      window.removeEventListener('focus', revalidate);
      document.removeEventListener('visibilitychange', () => {});
      window.removeEventListener('ij:data-updated' as any, revalidate);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Auto-play the carousel
  useEffect(() => {
    if (!api) return;
    let timer: number | undefined;
    const start = () => {
      stop();
      timer = window.setInterval(() => {
        try { api.scrollNext(); } catch {}
      }, 4000);
    };
    const stop = () => { if (timer) window.clearInterval(timer); };
    start();
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') stop();
      else start();
    };
    window.addEventListener('blur', stop);
    window.addEventListener('focus', start);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      window.removeEventListener('blur', stop);
      window.removeEventListener('focus', start);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [api, images.length]);

  if (images.length === 0) {
    if (isLoading) {
      return (
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Card className="p-4 bg-card-gradient">
                <div className="h-64 md:h-96 w-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading slideshow...</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      );
    }
    
    if (hasError) {
      return (
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Card className="p-4 bg-card-gradient">
                <div className="h-64 md:h-96 w-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">No images available for slideshow</p>
                    <p className="text-sm text-muted-foreground">Please add some images to events or upload them to the public folder</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      );
    }
    
    return null;
  }

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="p-4 bg-card-gradient">
            <Carousel className="relative" opts={{ loop: true }} setApi={setApi}>
              <CarouselContent>
                {images.map((src, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/1 lg:basis-1/1">
                    <div className="h-64 md:h-96 w-full overflow-hidden rounded-lg">
                      <img 
                        src={src} 
                        alt={`Slide ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log(`Failed to load image: ${src}`);
                          // Replace with a placeholder or hide the image
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log(`Successfully loaded image: ${src}`);
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSlideshow;


