import { Card } from "@/components/ui/card";
import schoolLogo from "@/assets/school-logo.png";

const LeadershipSection = () => {
  const people = [
    { role: "Principal", name: "Rev. Sr. Stella Mary", src: "/principal.png", colorClass: "text-primary" },
    { role: "Vice Principal", name: "Rev. Sr. Irudaya Mary", src: "/viceprincipal.png", colorClass: "text-accent" },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Leadership
          </h2>
          <p className="text-lg text-muted-foreground">
            Guiding with vision, compassion, and a commitment to excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {people.map((p) => (
            <Card key={p.role} className="p-6 bg-card-gradient text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden bg-muted">
                <img
                  src={p.src}
                  alt={p.role}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = schoolLogo;
                  }}
                />
              </div>
              <h3 className={`text-xl font-bold ${p.colorClass}`}>{p.role}</h3>
              <p className="mt-1 text-foreground font-semibold">{p.name}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-14">
          <Card className="p-8 bg-card-gradient">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              Seva Missionary Sisters of Mary
            </h3>
            <p className="text-center text-muted-foreground mb-6">
              Founder: Rev. Msgr. John Kottaram, Diocesan Priest of Madras–Mylapore
            </p>
            <div className="space-y-4 text-muted-foreground leading-8 text-justify">
              <p>
                Rev. Msgr. John Kottaram, diocesan priest of Madras–Mylapore and a great visionary, on realizing the need of making Christ known in the villages of Ponneri Taluk, began his missionary work in the year 1968 together with some Legion of Mary members. With three of them, namely Ms. Mary Sebastian, Ms. Arokiamary and Ms. Victoria Peter, he formed a community at Minjur in 1970. Such was the humble inception of the ‘Seva Missionary Institute’, founded in 1974 with the charism “Evangelization in villages” and the motto “Go and Teach Ye All Nations.”
              </p>
              <p>
                This ‘pious union’ was later raised to a Religious Congregation of Diocesan Rite. “The Congregation of the Seva Missionary Sisters of Mary”, with its Constitutions, Rules and Regulations, was approved by the Most Rev. Dr. Arul Das James, Archbishop of Madras–Mylapore, on 8th December 1996 with the sanction of the Holy Father. It sprouted from a tiny seed of three members and spread its branches. At present it has 35 convents with 185 professed Sisters working in the dioceses of Madras–Mylapore, Chingleput, Sivagangai, Madurai, Vellore, Eranakulam, Warangal (AP), Meerut (UP), and in the three Italian dioceses of Alessandria, Florence and Trino.
              </p>
              <p>
                The Congregation’s charism of evangelization is carried out through a variety of ministries such as Social Work, Schools, Medical Centers, Old Age Homes, Orphanages, Hostels for Girls and Working Women, Vocational Training Centers and Evening Coaching Centers, while at the same time focusing on family visits, family counseling and parish activities—commitments lived by every member.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;


