import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const KindergartenEssay = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-background">
        <section className="flex-1 py-16 px-4">
          <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl p-8 md:p-12 prose prose-slate dark:prose-invert">
            <h1 className="!mb-4">Kindergarten at Infant Jesus School</h1>
            <p className="lead !mt-0">
              A joyful beginning to education where children learn through play, imagination,
              rhythm, movement, and meaningful interactions. Our Kindergarten nurtures the whole
              child—mind, body, and heart—in a safe, caring environment.
            </p>

            <h2>Early Learning & Play-based Education</h2>
            <p>
              We believe children learn best when they play. Through songs, stories, building
              blocks, role-play, and discovery corners, learners naturally develop early literacy,
              numeracy, and problem-solving skills. Every activity is thoughtfully structured to
              spark curiosity and confidence.
            </p>

            <h2>Creative Activities & Arts & Crafts</h2>
            <p>
              Art is a language of expression. Children explore color, texture, and form with
              crayons, clay, paper craft, and nature-based materials. These experiences refine fine
              motor skills and encourage creativity, imagination, and joy in making.
            </p>

            <h2>Physical Development & Outdoor Games</h2>
            <p>
              Daily movement—stretching, balancing, running, and simple team games—supports motor
              development and spatial awareness. Our safe outdoor spaces invite children to explore,
              play, and build healthy habits that energize learning.
            </p>

            <h2>Social Skills & Emotional Growth</h2>
            <p>
              In caring classrooms, children learn to share, listen, take turns, and express
              feelings respectfully. Circle time, stories, and guided play help them build empathy,
              resilience, and friendships that make school a happy place.
            </p>

            <h2>Caring & Well-Trained Teachers</h2>
            <p>
              Our teachers are gentle facilitators who understand early childhood needs. They
              observe closely, support individually, and design experiences that meet each child
              where they are—ensuring every learner feels seen, safe, and encouraged.
            </p>

            <h2>Safe and Nurturing Environment</h2>
            <p>
              Safety and wellbeing are at the heart of our program. Bright classrooms, child-sized
              furniture, age-appropriate materials, hygiene routines, and vigilant supervision
              create a warm, secure space where young learners thrive.
            </p>

            <div className="not-prose mt-8">
              <Link to="/kindergarten">
                <Button variant="outline">Back to Kindergarten</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default KindergartenEssay;


