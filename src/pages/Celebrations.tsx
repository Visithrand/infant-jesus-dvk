import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const celebrations = [
  {
    title: "Annual Day Celebration",
    description: "A grand event with cultural performances, awards, and chief guest speeches, celebrating the achievements of our students and staff.",
    image: "https://infantjesusmhss.weebly.com/uploads/8/8/5/4/88544608/1471764-355526294634721-92578901790872951-n_orig.jpg",
  },
  {
    title: "Talent Ease",
    description: "A platform for students to showcase their unique talents in music, dance, drama, and more, fostering confidence and creativity.",
    image: "https://via.placeholder.com/400x250?text=Talent+Ease", // Placeholder
  },
  {
    title: "Art & Craft Events",
    description: "Workshops and competitions that encourage artistic expression and hands-on creativity among students of all ages.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSaLinH6_KZtSPmNRCAhZr5j4zd5-A-fqIGg&s", // Placeholder
  },
  {
    title: "Sports Day & Games",
    description: "A day filled with athletic events, team games, and friendly competition, promoting physical fitness and sportsmanship.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo_GPPGijA2eg3zXLYZFt1NAm7lwOjq2n4ew&s", // Placeholder
  },
  {
    title: "Festival Celebrations",
    description: "Vibrant celebrations of Diwali, Christmas, Pongal, and other festivals, teaching students about cultural diversity and traditions.",
    image: "https://i.ytimg.com/vi/LW47cFVAjcY/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgSyg_MA8=&rs=AOn4CLC_CvRFrrUe9pflXgRIy22UThpLcw",
  },
  {
    title: "Science & Math Fairs",
    description: "Interactive exhibitions where students present innovative projects and experiments, sparking curiosity and scientific thinking.",
    image: "https://via.placeholder.com/400x250?text=Science+%26+Math", // Placeholder
  },
  {
    title: "Literary Fests",
    description: "Debates, elocution, poetry recitation, and quiz competitions to nurture language skills and intellectual growth.",
    image: "https://news.kiit.ac.in/wp-content/uploads/2023/11/Kiitis-Literary-Fest1.jpg", // Placeholder
  },
  {
    title: "Dance & Music Shows",
    description: "Energetic performances by students in classical, folk, and contemporary styles, celebrating the joy of movement and melody.",
    image: "https://i.ytimg.com/vi/gB5ErDmpzvw/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgRyhCMA8=&rs=AOn4CLBwwS2-O551nHs45LITLp5ZFxDJcg", // Placeholder
  },
  {
    title: "Social Awareness Drives",
    description: "Events focused on environmental protection, health, and community service, instilling values of responsibility and empathy.",
    image: "https://via.placeholder.com/400x250?text=Social+Awareness", // Placeholder
  },
  {
    title: "Communication English Competitions",
    description: "Competitions designed to enhance students' spoken and written English skills through debates, extempore speeches, and creative writing.",
    image: "https://via.placeholder.com/400x250?text=English+Comp.", // Placeholder
  },
  {
    title: "Chess Tournaments",
    description: "Competitive chess events that challenge students' strategic thinking and problem-solving abilities.",
    image: "https://via.placeholder.com/400x250?text=Chess+Tournaments", // Placeholder
  },
  {
    title: "Inter-School Competitions",
    description: "Opportunities for students to participate in various academic, cultural, and sports competitions with other schools.",
    image: "https://via.placeholder.com/400x250?text=Inter-School+Comp.", // Placeholder
  },
  {
    title: "Parent-Teacher Meetings",
    description: "Regular meetings to discuss student progress, address concerns, and foster a strong home-school connection.",
    image: "https://via.placeholder.com/400x250?text=PTM", // Placeholder
  },
  {
    title: "Educational Field Trips",
    description: "Organized visits to museums, historical sites, and other places of interest to provide practical learning experiences.",
    image: "https://via.placeholder.com/400x250?text=Field+Trips", // Placeholder
  },
    {
    title: "Teachers' Day Celebration",
    description: "A day dedicated to honoring and appreciating the valuable contributions of our teachers.",
    image: "https://i.ytimg.com/vi/tnF5NrrmiEM/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGCwgWihyMA8=&rs=AOn4CLByF8bLJbl_WXilZNDsWHMWPmvx_w",
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
            {celebrations.map((item, idx) => (
              <div key={idx} className="bg-background border border-accent rounded-lg overflow-hidden shadow-sm flex flex-col items-center text-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h2 className="text-2xl font-semibold mb-2 text-primary">{item.title}</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
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