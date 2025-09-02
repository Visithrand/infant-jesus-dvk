import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrimaryEssay = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-background">
        <section className="flex-1 py-16 px-4">
          <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl p-8 md:p-12 prose prose-slate dark:prose-invert">
            <h1 className="!mb-4">Primary School (Standards 1 to 5)</h1>
            <p className="lead !mt-0">
              The primary years at our school build the bedrock of learning—literacy, numeracy,
              curiosity, character, and confidence. Children encounter ideas through stories,
              experiments, art, games, and guided exploration, developing habits that sustain a
              lifetime of joyful learning.
            </p>

            <h2>Strong Foundations in Reading, Writing, and Numeracy</h2>
            <p>
              Standards 1 to 5 focus on mastering essential skills with clarity and care. In
              language classes, students learn phonics, vocabulary, sentence formation, and
              expressive writing through read-alouds, shared reading, and age-appropriate readers.
              Speaking and listening are integrated through storytelling, role-play, show-and-tell,
              and class discussions so that learners gain voice and confidence. Mathematics builds
              number sense step-by-step—place value, the four operations, measurement, money,
              time, shapes, and early data handling—using concrete materials, visual models, and
              real-life problems. We emphasize understanding over rote procedures, helping learners
              explain their thinking and reason with numbers.
            </p>

            <h2>Conceptual Science and Environmental Awareness</h2>
            <p>
              Science in the primary years is discovery-driven. Children observe plants, animals,
              weather, and simple machines; sort materials; experiment with water, magnets, and
              light; and ask questions that lead to hands-on inquiry. Field walks, nature journals,
              and classroom experiments help them connect ideas with everyday experiences. We also
              cultivate respect for the environment—reducing waste, planting saplings, saving water,
              and caring for the school surroundings—so that stewardship becomes second nature.
            </p>

            <h2>Social Studies Through People, Places, and Stories</h2>
            <p>
              Learners come to understand their families, neighborhoods, local community helpers,
              festivals, maps, and the rich diversity of our country. Stories and simple projects
              make abstract ideas concrete: building a community map, creating a family tree,
              interviewing elders, or presenting a favorite local dish. This nurtures respect for
              culture, empathy for others, and pride in one’s identity.
            </p>

            <h2>Creativity, Movement, and Play</h2>
            <p>
              Art, craft, music, and movement are woven into every week. Children draw, paint,
              fold, and build with paper, clay, and recycled materials. Music sessions explore
              rhythm and melody through singing and simple instruments. Physical Education focuses
              on balance, coordination, teamwork, and agility through games and relay activities.
              Play-based learning fosters imagination, problem-solving, and collaboration—key skills
              for the future.
            </p>

            <h2>Values and Social-Emotional Learning</h2>
            <p>
              We believe education shapes character. Circle-time conversations, class agreements,
              and reflective activities guide children to practice kindness, honesty, patience, and
              responsibility. They learn to share, take turns, listen with respect, and resolve
              small conflicts with guidance. Teachers model empathy and fairness so classrooms feel
              safe and inclusive for every child.
            </p>

            <h2>Technology and Library Time</h2>
            <p>
              In carefully supervised sessions, students are introduced to age-appropriate
              technology: typing basics, safe browsing norms, and learning apps that reinforce
              phonics and math practice. Library periods build a love for reading through picture
              books, short chapter books, and author spotlights. Children learn how to choose books
              at the right level and talk about what they read.
            </p>

            <h2>Assessment That Supports Growth</h2>
            <p>
              Assessment is continuous and child-friendly—observations, portfolios, checklists,
              short quizzes, and performance tasks. Feedback highlights strengths and next steps,
              encouraging a growth mindset. Families receive regular updates so home and school work
              together.
            </p>

            <h2>Partnership with Families</h2>
            <p>
              Parent orientations, open days, and simple home activities keep families engaged in
              the learning journey. We share tips for reading aloud, practicing math facts through
              play, and building routines that support sleep, nutrition, and study habits. When home
              and school align, children flourish.
            </p>

            <div className="not-prose mt-8">
              <Link to="/">
                <Button 
                  variant="outline" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold px-6 py-3 rounded-lg"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrimaryEssay;


