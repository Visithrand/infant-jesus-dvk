import React from "react";

const facilities = [
  {
    title: "Smart Classrooms",
    description: "Interactive digital boards and multimedia-enabled learning spaces for modern education.",
    image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202506/smart-classes-155308498-16x9_0.jpeg?VersionId=1XJzfn.wwuE_cADBCMybLqy6K5PhxUt_&size=690:388",
  },
  {
    title: "RO Drinking Water",
    description: "Safe, purified RO water available throughout the campus for students and staff.",
    image: "https://smartwonderschool.com/wp-content/uploads/2020/02/ro-500x480.jpg",
  },
  {
    title: "Natural Environment",
    description: "Lush green campus with eco-friendly initiatives and plenty of open space.",
    image: "https://infantjesusdvk.org/wp-content/uploads/2022/12/banner.jpg",
  },
  {
    title: "Well Experienced Teachers",
    description: "Highly qualified and passionate educators dedicated to student success.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjY8xlLb2ALpyjSN9odKN3uzjucEyh4ECh7w&s",
  },
  {
    title: "Sports Equipment & Grounds",
    description: "Extensive sports facilities including playgrounds, courts, and modern equipment.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDPGdrB3whnYak9nuvjLOaj2TUS1zZkD7m75Yd-p8WpnZEYrr0vqdSzvC65FvottSd38M&usqp=CAU",
  },
  {
    title: "Gym Facilities",
    description: "Well-equipped gymnasium for physical fitness and well-being.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5vHn9aZpwjZUFfn7LaT4zE35ZeI-BfCfPdQ&s",
  },
  {
    title: "Library & Reading Room",
    description: "A vast collection of books, journals, and digital resources in a quiet environment.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX9amkBXp86UPAAQJvpp3LipfzCCDfn16zEg&s",
  },
  {
    title: "Science & Computer Labs",
    description: "State-of-the-art laboratories for hands-on learning in science and technology.",
    image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=400&q=80",
  },
    {
    title: "Chess Section",
    description: "Dedicated area for chess enthusiasts to practice and compete.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVV7qK4LI4u2Di7tQCFdOWi1kmd91NjmDqdw&s",
  },
];

const Facilities = () => (
  <section id="facilities" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12">
        Our Facilities
      </h2>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, idx) => (
          <div
            key={facility.title}
            className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={facility.image}
              alt={facility.title}
              className="w-full h-48 object-cover mb-6 rounded-md"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold mb-2 text-foreground">{facility.title}</h3>
            <p className="text-muted-foreground mb-2">{facility.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Facilities; 