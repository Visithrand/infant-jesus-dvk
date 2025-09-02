import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SeniorEssay = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-background">
        <section className="flex-1 py-16 px-4">
          <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl p-8 md:p-12 prose prose-slate dark:prose-invert">
            <h1 className="!mb-4">Middle to Higher Secondary (Standards 6 to 12)</h1>
            <p className="lead !mt-0">
              From early adolescence to young adulthood, learners deepen subject mastery,
              build study discipline, and develop a sense of purpose. Our program blends
              rigorous academics with co-curricular opportunities, life skills, and values,
              preparing students for board exams, competitive tests, and meaningful futures.
            </p>

            <h2>Academic Pathways and Subject Mastery</h2>
            <p>
              In Standards 6 to 8, students consolidate fundamentals across languages,
              mathematics, sciences, and social sciences while strengthening study habits and
              metacognition. In Standards 9 and 10, core subjects are pursued in depth with
              emphasis on problem-solving, lab work, writing, and exam strategies. At the
              higher secondary stage (Standards 11 and 12), learners may pursue Science,
              Commerce, or Computer Science pathways aligned with their interests and career
              aspirations. Continuous practice, targeted feedback, and mentoring help
              students achieve mastery and confidence.
            </p>

            <h2>Laboratories, Projects, and Research Mindset</h2>
            <p>
              Well-equipped laboratories enable experiments in physics, chemistry, biology,
              and computer science. Students design projects, analyze data, and present
              findings with clarity, cultivating a research mindset. Interdisciplinary
              projects—such as environmental studies, robotics, or community surveys—help
              learners connect theory with real-world applications.
            </p>

            <h2>Competitive Exam Readiness</h2>
            <p>
              For aspirants targeting national and state-level exams, we provide structured
              practice, concept clinics, and test-taking strategies. Bridge classes and
              doubt-clearing sessions ensure no learner is left behind. We focus on
              consistent routines, error analysis, and revision calendars to build exam
              temperament without stress.
            </p>

            <h2>Communication, Leadership, and Clubs</h2>
            <p>
              Debate, elocution, Model United Nations, science and literary clubs, and service
              initiatives offer platforms to lead and collaborate. Students learn to research,
              articulate ideas, listen actively, and work as teams. House systems, student
              councils, and mentoring responsibilities nurture accountability and initiative.
            </p>

            <h2>Sports, Fitness, and Wellbeing</h2>
            <p>
              A robust sports program encourages regular fitness and competitive spirit. Track
              and field, team games, yoga, and fitness routines build stamina and resilience.
              We address adolescent wellbeing through guidance sessions on nutrition, sleep,
              digital balance, relationships, and emotional health—promoting a balanced life.
            </p>

            <h2>Ethics, Citizenship, and Service</h2>
            <p>
              Education is character in action. Through value education, social outreach,
              environmental drives, and peer support programs, students practice empathy,
              integrity, and responsible citizenship. Reflection journals and assemblies
              reinforce ethical decision-making and a sense of service.
            </p>

            <h2>Career Guidance and Future Readiness</h2>
            <p>
              Aptitude exploration, counseling sessions, alumni talks, and internship exposure
              help students make informed choices about streams, courses, and careers.
              Portfolio building, interview practice, and digital literacy—coding, research,
              presentations—prepare learners for college and the workplace.
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

export default SeniorEssay;


