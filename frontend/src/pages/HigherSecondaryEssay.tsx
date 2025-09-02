import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const HigherSecondaryEssay = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-background">
        <section className="flex-1 py-16 px-4">
          <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl p-8 md:p-12 prose prose-slate dark:prose-invert">
            <h1 className="!mb-4">Higher Secondary (Standards 11 to 12)</h1>
            <p className="lead !mt-0">
              The plus-two years are a launchpad. With focused pathways and mentoring,
              students prepare for board exams, competitive tests, and the transition to
              college. We combine depth, discipline, and discernment with care.
            </p>

            <h2>Streams and Advanced Coursework</h2>
            <p>
              Learners may pursue Science, Commerce, or Computer Science, selecting electives
              that align with interests and career goals. Subject teaching emphasizes
              conceptual depth, numerical accuracy, laboratory skills, and structured writing.
              Regular benchmarks, peer learning, and teacher feedback drive steady progress.
            </p>

            <h2>Competitive Exam Ecosystem</h2>
            <p>
              For aspirants of national and state entrance tests, we provide practice cycles,
              mock tests, and doubt-resolution workflows. Emphasis on analysis—why an answer is
              right or wrong—builds insight. Planners balance board requirements with entrance
              preparation to minimize stress.
            </p>

            <h2>Research, Internships, and Portfolio</h2>
            <p>
              Subject projects, research write-ups, and internships expose learners to
              real-world contexts. Students document achievements, reflections, and
              competencies in a portfolio that supports college applications and interviews.
            </p>

            <h2>Mentoring, Ethics, and Life Skills</h2>
            <p>
              Weekly mentoring conversations track goals, habits, and wellbeing. Value
              education and community engagement nurture integrity, respect, and responsibility.
              Practical life skills—financial literacy, communication, collaboration—prepare
              learners for adulthood.
            </p>

            <h2>Career and College Guidance</h2>
            <p>
              Career talks, alumni interactions, counseling, and application support help
              students make informed choices. We guide learners through entrance timelines,
              scholarships, and documentation, ensuring a confident transition to higher
              education.
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

export default HigherSecondaryEssay;


