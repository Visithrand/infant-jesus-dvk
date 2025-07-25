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
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIVFRUXFRcVFRUXGBUYFRUWFhcXFxUXGBUYHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGBAQGy0dHR0tLS0tLS0tLS0uLS0rLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0rLSstLS0tLTc3Lf/AABEIANwA5QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAGAQIDBAUHAP/EAEYQAAEDAQUEBwUEBwgBBQAAAAEAAhEDBAUSITEGQVFhEyJxgZGhsTJSwdHwBxQjQhUzYnKSsuEkQ1NzgqLC8dIWRFRjg//EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACYRAAICAgICAgICAwAAAAAAAAABAhEDIRIxBBMiQTJRcYEUIzP/2gADhAAChEQA/ABRwUTlM5McFBRGVFUUxaq9oMBACsK3WoZFob7w8VstvOiAJqM0G8IA0F5Zrr8s4/vW+ZSfp2idC49jHH4IGaSeFmi9AdKVZ3ZTcn/pB/wD8av8AwQgKNBeVOlaKztLLU7y1vqpWttJ/9vHbUamBNCUKP7raj/d0x2u+SlbYLQf8MfxFIBQq14D8N3Z8VM67bUTk+kPH5JtouS0FjprtiJgM4Z6phRhU9F2SxOmmw8WNPkFxa7JewGeK7HdJ/Apf5bP5QhCZbSJZSFAhpSFKkKAGlNKcU0oAaU0hOTSgBjgo3BSlRuQMjIXkpXkgObuCYWqZyYUhkWFU7zp/hu7FeIVe3NljuwoGbF2XDZnUqbjRYSWNJJkySASdVcpXFZ2mRQpz2T6p2z+dmo/5bR4ZfBaKYENOzsboxo7g0fBSheleQA9eATU4IAdCUNSQntCAPJQEuFeTAQBSBuR7E1S0wkBzm5Ww2ODiPNdZuf8AUUv3G+i5bd7IdUHCo8ea6hcLps9L934oQpF8L0pJSSmSKkK8kKAEKYUpKaUAeKaSvFNKAEKYUpKakMaV5NJXkAc6cVXtdrbTbieYHqeAUj3Ib2rcZpjdDj3yEJBZL/6mbP6s4eMifBaVG1sq0yWntG8HmsS7bmbUbiNSMlNd1jNF8YpDgQfUHy80rXRXGSVsOtl3zZafIEHDitXEh/ZSp/ZwOD3jzn4raDkwJpXgmApQUASApwUYTwUCJApAq9Os0uwAy6JgSSBxMaLRo3dVdpSef9JTAganK9+hLR/guHbA9SvG5629oHa+mP/AkgKjCkarJuqpvdTH/wCjPgU37q4auYewz6BFCs54wRXrD/7Heq6Ns26bPT7D/MVzu+qb6FoqOe04HnE1w0Mk9WTHW+pR/sqf7KzKNcu8ooGzXXk0lICgQpKSV4ppQB4lIUiQoA8UwpSmlADSmEpxKY4pANK8mkpUDOaVHKjb6LXtIIExkd4OardZZNsvOm2WnM7wM0VYJ0xbHZppZOwxHevPw42nFmBET3ZrMst5tAwuBInyWtclag+tie7CxrZBj80iBlmd/gpUXZu5xot2G1V6TS1gGHEXSWk6xvlXrNbLQ8EmqGxuaxpPnKs2i+7IBHSE/wCh7h4FQWe/rLiya5xOgwsb8VRjpkFS3P32msBvIptgdsMU5a46Wmq8bnBxaD3CFHeW0heDQpUCHOES4yADr1eMJ1OmWiGgRw08ExHvuQ3vqntq1f8AyTmXfSO4kg5y5x9T9eq9c5AYRxkE9wVqzUwBA3JoQW/Zfc9J9S0UyA2Gse0tAxZkgyT7QG5dCbsw0H2zHd8ly/Yi8egtrs8nWcj+F4PxXVLBfzXwNVaRLZbpXJRAzbi7U51zUD/dNV1j5SkqRmJadmaLtAW95WbUuCy0z+I8k+6J81tXjeeAGEJ1b4BeSQCSVVSJTQHfbhSptNk6MANwOIA4E6nmjCm5hp0iwCDSZMcYXOvtbvDpX0DwBHmjHZy047PTPBoHgApaKNMryjr1msGJxAA1JyA70OjbuwY8H3gTMYsL8H8cRHNSMJE0lc9u0+0ho6lkAduNV4OH/S3V3aUA2naW1PcXG0VZPBxaPBsBOhHfiUi4rdO3lppNwvcajdxd7QG8TvXTdlNoG2uliEBwMObvHBKgNwphUdqtLKYxPe1g4uIA8SqNmvyzVHYadopOd7oe0nuE5oGX3KJyc5yrWqoQxxGoaSO4FAAttDt1Ts9U0mUzVLcnkGA0+7MZleXPqdIfnEuPWPa7NKpsvgaN/wBrLKeWrjAPDiULUznnmtC+7bOknD2hGgw5zHUVw/nI7DkqgqPcGuaQWuBBHEEEHzV6iOxhd6xY6m12dOq0kS5pBkcDv9Vq3ZW5xVaHNBgOEjcQoF2A2aabg4cQR4Iks93O0aLdnVpw5iZ5HKM1E0Wiy0d+H6z5A40iQyq5vWpZ5oD8z3K8V260Fz+0+R/WjL2mZf4hR/aF/4tEfsjP5lJ+2f8AjUW/sjP5lZ40W7/AIZ2y0Fj2uaZaRBHeELX7J13G106TQXU6YdixFpJMmYA0z0Rxt9QvtrK9wYwOaQeLjjO93Ld3pC4dKxYXOjL2joM446lWq3Msk7N+47wY6Dqj2Gz5zE9iLrvvM0mk+p+Uw7eJ0AQvs5t/u8Wj0+nJp55x3YjBnxWptlbtO1WemYpUv7Nq9Zz3Yc5AG/tC0/yJz0N4m30E2Ha5rtQCMiI0IIOhHao7Q6HjC5o02RMEGAYjKIzHBCu2uy2h/4jV5XF/nULy/aFrtwHAE4yQJ+q3Y8kk9HFnjwV3Q9o2YVagkExwMjlKFW0lZt2/rOp9k/JCGK9aZkzLw0kGkpxSAoBNSmkICaUAJSmlICSlAQE0oAKnK9lC/d3/v/AO16L/S6sD2mN7l6d3A9o/i/2v//Z",
  },
  {
    title: "Natural Environment",
    description: "Lush green campus with eco-friendly initiatives and plenty of open space.",
    image: "https://infantjesusdvk.org/wp-content/uploads/2022/12/banner.jpg",
  },
  {
    title: "Well Experienced Teachers",
    description: "Highly qualified and passionate educators dedicated to student success.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Sports Equipment & Grounds",
    description: "Extensive sports facilities including playgrounds, courts, and modern equipment.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Gym Facilities",
    description: "Well-equipped gymnasium for physical fitness and well-being.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Library & Reading Room",
    description: "A vast collection of books, journals, and digital resources in a quiet environment.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Science & Computer Labs",
    description: "State-of-the-art laboratories for hands-on learning in science and technology.",
    image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=400&q=80",
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