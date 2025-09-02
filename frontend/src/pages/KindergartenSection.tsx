import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Baby, BookOpen, Palette, Footprints } from "lucide-react";

const KindergartenSection = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-background">
        <section className="flex-1 py-16 px-4">
          <div className="max-w-5xl mx-auto bg-card shadow-lg rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Baby className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Kindergarten</h1>
            </div>
            <p className="text-muted-foreground text-lg leading-8 mb-8">
              Our Kindergarten program lays a joyful foundation for lifelong learning. Through
              play-based activities, stories, rhythm, and exploration, children build curiosity,
              confidence, and early literacy and numeracy skills in a warm, safe environment.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-xl bg-secondary/30 hover:shadow-medium transition">
                <BookOpen className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-xl mb-2">Early Literacy</h3>
                <p className="text-muted-foreground">Sounds, letters, and story time spark a love for reading.</p>
              </div>
              <div className="p-6 rounded-xl bg-secondary/30 hover:shadow-medium transition">
                <Palette className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-semibold text-xl mb-2">Arts & Crafts</h3>
                <p className="text-muted-foreground">Color, craft, and creativity to develop fine motor skills.</p>
              </div>
              <div className="p-6 rounded-xl bg-secondary/30 hover:shadow-medium transition">
                <Footprints className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-xl mb-2">Play & Movement</h3>
                <p className="text-muted-foreground">Indoor and outdoor play that builds balance and coordination.</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Link to="/kindergarten-essay">
                <Button size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default KindergartenSection;


