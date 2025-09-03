import { useEffect, useState } from "react";
import { API_CONFIG, ApiService } from "@/config/api";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

type EventItem = {
  id: number;
  title: string;
  imageUrl: string | null;
};

const candidatePublicImages = [
  "/slides1.png",
  "/slides2.png",
  "/slides3.png",
  "/slides4.png",
  "/slides5.png",
  "/slides6.png",
  "/slide-1.png",
  "/slide-2.png",
  "/image1.png",
  "/alumini.png",
  "/lab-che.png",
];

const localFallbacks = [
  "/src/assets/slide-1.png",
  "/src/assets/slide-2.png",
  "/src/image1.png",
];

const AboutSlideshow = () => {
  const [images, setImages] = useState<string[]>([]);
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      let collected: string[] = [];
      try {
        const data: EventItem[] = await ApiService.get(`/events`, { 'Cache-Control': 'no-store' } as any);
        if (Array.isArray(data)) {
          const eventUrls = data
            .filter((e) => !!e.imageUrl)
            .map((e) => `${API_CONFIG.BASE_URL}${e.imageUrl}`);
          collected = collected.concat(eventUrls);
        }
      } catch (error) {
        console.error('Error loading event images:', error);
        // Continue with fallback images
      }

      // Probe public images to include any that actually exist
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
            if (--remaining === 0) resolve(results);
          };
          img.src = path + `?v=${Date.now()}`;
        });
      });

      const combined = Array.from(new Set([...collected, ...existingPublic]));
      if (combined.length > 0) {
        setImages(combined.slice(0, 12));
      } else {
        setImages(localFallbacks);
      }
    };
    loadImages();
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

  if (images.length === 0) return null;

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
                      <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
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


