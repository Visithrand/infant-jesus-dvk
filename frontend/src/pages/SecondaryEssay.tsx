import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SecondaryEssay = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-background">
        <section className="flex-1 py-16 px-4">
          <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl p-8 md:p-12 prose prose-slate">
            <h1 className="!mb-4">Secondary Education (Standards 9 to 10)</h1>
            <p className="lead !mt-0">
              The secondary stage is where curiosity meets discipline. Students convert strong
              fundamentals into deeper understanding, sharpening analysis, expression, and exam
              readiness while exploring co-curricular interests and personal identity.
            </p>

            <h2>Academic Rigor with Conceptual Clarity</h2>
            <p>
              We emphasize mastery across languages, mathematics, science, and social science.
              Lessons move from concrete to abstract, ensuring learners understand “why” before
              “how.” In mathematics, algebra, geometry, and statistics are developed through
              worked examples, problem sets, and real-life contexts. In science, lab-based
              practicals and demonstrations connect theory to everyday phenomena. Social science
              blends history, civics, geography, and economics to build civic sense and global
              awareness. Language classes strengthen grammar, comprehension, and composition while
              encouraging wide reading.
            </p>

            <h2>Systematic Exam Preparation</h2>
            <p>
              We design study planners, revision cycles, and unit tests that build stamina and
              confidence without cramming. Learners practice answer presentation, time management,
              and previous-year papers. Doubt clinics and remedial support ensure that challenges
              are addressed early. Feedback is specific, actionable, and growth oriented.
            </p>

            <h2>Communication and Digital Literacy</h2>
            <p>
              Debate, speech, and writing tasks help students argue with evidence and clarity.
              Digital sessions cover research skills, presentations, spreadsheets, and safe online
              conduct. Learners create projects—reports, infographics, and slide decks—that
              synthesize information and communicate impactfully.
            </p>

            <h2>Clubs, Sports, and Arts</h2>
            <p>
              Science, literature, and eco-clubs, along with music, theatre, and visual arts,
              provide platforms for creativity and collaboration. Sports build resilience,
              teamwork, and health through regular practice and inter-house events.
            </p>

            <h2>Guidance, Values, and Wellbeing</h2>
            <p>
              Adolescence is a time of change. Through mentorship, values education, and guidance
              sessions, students learn self-management, empathy, and responsible decision-making.
              We promote sleep hygiene, nutrition, and balanced device use, recognizing that
              wellbeing fuels achievement.
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

export default SecondaryEssay;


