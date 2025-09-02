import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MatricEssay = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-background">
        <section className="flex-1 py-16 px-4">
          <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl p-8 md:p-12 prose prose-slate dark:prose-invert">
            <h1 className="!mb-4">Matriculation at Infant Jesus School</h1>
            <p className="lead !mt-0">
              A comprehensive program that balances academic rigor with values, leadership,
              and co-curricular excellence—preparing students for future studies and life.
            </p>

            <h2>Strong Academic Foundation</h2>
            <p>
              Our curriculum emphasizes conceptual understanding in languages, mathematics,
              and sciences. Structured practice, projects, and assessments help learners
              build clarity, confidence, and a lifelong love for learning.
            </p>

            <h2>Co-Curricular & Sports Activities</h2>
            <p>
              Beyond classrooms, students engage in arts, clubs, cultural programs, and
              community activities that develop creativity, communication, and teamwork.
            </p>

            <h2>Chess, Kho-Kho, Football, and Athletics</h2>
            <p>
              A strong sports culture cultivates discipline and focus. With games like Chess,
              Kho-Kho, Football, and Athletics, learners build stamina, strategy, and a
              spirit of sportsmanship.
            </p>

            <h2>Holistic Development (Character, Values, Leadership)</h2>
            <p>
              Education is character-building. Mentoring, leadership roles, house systems,
              and service opportunities help students develop integrity, empathy, and a
              responsible outlook toward society.
            </p>

            <h2>Well-Trained Teachers and Mentors</h2>
            <p>
              Our faculty blend expertise with care. Through guidance, feedback, and
              individualized support, they help every learner reach their potential.
            </p>

            <h2>Smart Classrooms & Technology Integration</h2>
            <p>
              Interactive boards, digital content, and lab-based explorations make
              learning engaging and relevant. Technology supports inquiry, collaboration,
              and future-ready skills.
            </p>

            <div className="not-prose mt-8">
              <Link to="/matric">
                <Button variant="outline">Back to Matric</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MatricEssay;


