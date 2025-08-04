import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const celebrations = [
  {
    title: "Annual Day Celebration",
    description:
      "A grand event with cultural performances, awards, and speeches from distinguished guests, marking the pinnacle of academic and co-curricular achievements.",
    image:
      "https://infantjesusmhss.weebly.com/uploads/8/8/5/4/88544608/1471764-355526294634721-92578901790872951-n_orig.jpg",
  },
  {
    title: "Talent Ease",
    description:
      "Students showcase their unique talents in music, dance, drama, and more—building confidence and self-expression in a vibrant atmosphere.",
    image: "https://www.cirschool.org/zoom/images/update/ssvm.jpg",
  },
  {
    title: "Sports Day & Games",
    description:
      "A day of exciting athletic events and team spirit where students engage in physical activities promoting fitness and healthy competition.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo_GPPGijA2eg3zXLYZFt1NAm7lwOjq2n4ew&s",
  },
  {
    title: "Festival Celebrations",
    description:
      "From Pongal to Christmas, students participate in colorful cultural programs that teach the values of tradition, diversity, and harmony.",
    image:
      "https://i.ytimg.com/vi/LW47cFVAjcY/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgSyg_MA8=&rs=AOn4CLC_CvRFrrUe9pflXgRIy22UThpLcw",
  },
  {
    title: "Dance & Music Shows",
    description:
      "Graceful classical dances, vibrant folk performances, and melodious vocal recitals bring out students’ artistic excellence.",
    image:
      "https://i.ytimg.com/vi/gB5ErDmpzvw/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgRyhCMA8=&rs=AOn4CLBwwS2-O551nHs45LITLp5ZFxDJcg",
  },
  {
    title: "Inter-School Competitions",
    description:
      "Students participate in academic and cultural contests across schools, building confidence, teamwork, and school spirit.",
    image: "https://cgrinternationalschool.edu.in/images/gallery/Meridian-School-Interschool-Competition-2023(3).webp",
  },
  {
    title: "Teachers' Day Celebration",
    description:
      "Students pay tribute to their mentors through speeches, performances, and gifts, acknowledging their invaluable guidance.",
    image:
      "https://i.ytimg.com/vi/tnF5NrrmiEM/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGCwgWihyMA8=&rs=AOn4CLByF8bLJbl_WXilZNDsWHMWPmvx_w",
  },
  
];

const Celebrations = () => (
  <>
    <Header />
    <main className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-6xl w-full bg-card shadow-lg rounded-2xl p-10 flex flex-col items-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-foreground">
            School Celebrations & Events
          </h1>
          <p className="mb-10 text-center text-muted-foreground text-xl leading-relaxed">
            Our school’s vibrant celebrations are more than just events—they are moments that shape character, build community, and leave lasting memories. From academic victories to artistic expressions, each celebration is crafted to enrich our students' holistic development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            {celebrations.map((item, idx) => (
              <div
                key={idx}
                className="bg-background border border-accent rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] flex flex-col text-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h2 className="text-3xl font-semibold mb-3 text-primary">{item.title}</h2>
                  <p className="text-lg text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="max-w-6xl w-full bg-card shadow-lg rounded-2xl p-10 flex flex-col items-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-center text-foreground">
            Watch Our School Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-6 text-center max-w-3xl">
            Experience the vibrancy and joy of our school environment through these highlights. They capture the essence of community, celebration, and student life at its best.
          </p>
          <div className="w-full rounded-lg overflow-hidden" style={{ height: '70vh', position: 'relative' }}>
            <iframe
              src="https://www.youtube.com/embed/IsdkJ5Z0PeY"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          
          </div>
        </div>

         <div className="max-w-6xl w-full bg-card shadow-lg rounded-2xl p-10 flex flex-col items-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-center text-foreground">
            Highlight Moments
          </h2>
          <p className="text-lg text-muted-foreground mb-6 text-center max-w-3xl">
            Take a glimpse into the energy and spirit of our students and teachers as they participate in events that inspire pride, passion, and performance.
          </p>
          <div className="w-full rounded-lg overflow-hidden" style={{ height: '70vh', position: 'relative' }}>
            <iframe
              src="https://www.youtube.com/embed/SoQZHwxhVlc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>

             <iframe
              src="https://www.youtube.com/embed/qbdeiDhJbO4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  </>
);

export default Celebrations;
