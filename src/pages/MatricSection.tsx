import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Activity, Users } from "lucide-react";

const MatricSection = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-background">
        <section className="flex-1 py-16 px-4">
          <div className="max-w-5xl mx-auto bg-card shadow-lg rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Matric</h1>
            </div>
            <p className="text-muted-foreground text-lg leading-8 mb-8">
              The Matriculation stream at our school offers a well-rounded education with a strong
              academic core, vibrant co-curricular activities, and values-driven development. We
              prepare learners with the knowledge, skills, and character to succeed.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-xl bg-secondary/30 hover:shadow-medium transition">
                <GraduationCap className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-xl mb-2">Academic Excellence</h3>
                <p className="text-muted-foreground">Strong foundation across languages, math, and sciences.</p>
              </div>
              <div className="p-6 rounded-xl bg-secondary/30 hover:shadow-medium transition">
                <Activity className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-semibold text-xl mb-2">Sports & Wellness</h3>
                <p className="text-muted-foreground">Chess, Kho-Kho, Football, and Athletics for fitness and focus.</p>
              </div>
              <div className="p-6 rounded-xl bg-secondary/30 hover:shadow-medium transition">
                <Users className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-xl mb-2">Leadership & Values</h3>
                <p className="text-muted-foreground">Holistic growth through clubs, mentoring, and community service.</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Link to="/matric-essay">
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

export default MatricSection;


