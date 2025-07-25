import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const celebrations = [
  {
    title: "Annual Day Celebration",
    description: "A grand event with cultural performances, awards, and chief guest speeches, celebrating the achievements of our students and staff.",
  },
  {
    title: "Talent Ease",
    description: "A platform for students to showcase their unique talents in music, dance, drama, and more, fostering confidence and creativity.",
  },
  {
    title: "Art & Craft Events",
    description: "Workshops and competitions that encourage artistic expression and hands-on creativity among students of all ages.",
  },
  {
    title: "Sports Day & Games",
    description: "A day filled with athletic events, team games, and friendly competition, promoting physical fitness and sportsmanship.",
  },
  {
    title: "Festival Celebrations",
    description: "Vibrant celebrations of Diwali, Christmas, Pongal, and other festivals, teaching students about cultural diversity and traditions.",
  },
  {
    title: "Science & Math Fairs",
    description: "Interactive exhibitions where students present innovative projects and experiments, sparking curiosity and scientific thinking.",
  },
  {
    title: "Literary Fests",
    description: "Debates, elocution, poetry recitation, and quiz competitions to nurture language skills and intellectual growth.",
  },
  {
    title: "Dance & Music Shows",
    description: "Energetic performances by students in classical, folk, and contemporary styles, celebrating the joy of movement and melody.",
  },
  {
    title: "Social Awareness Drives",
    description: "Events focused on environmental protection, health, and community service, instilling values of responsibility and empathy.",
  },
];

const Celebrations = () => (
  <>
    <Header />
    <main className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-3xl w-full bg-card shadow-lg rounded-lg p-8 flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center text-foreground">School Celebrations & Events</h1>
          <p className="mb-8 text-center text-muted-foreground text-lg">
            At Infant Jesus Matric Higher Secondary School, we believe in holistic development. Our vibrant celebrations and events foster creativity, teamwork, and lifelong memories for every student.
          </p>
          <div className="grid gap-8 md:grid-cols-2 w-full">
            {celebrations.map((item, idx) => (
              <div key={idx} className="bg-background border border-accent rounded-lg p-5 shadow-sm flex flex-col items-center text-center">
                <h2 className="text-2xl font-semibold mb-2 text-primary">{item.title}</h2>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  </>
);

export default Celebrations; 