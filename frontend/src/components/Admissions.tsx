import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Download, 
  Phone, 
  Mail, 
  MapPin,
  GraduationCap,
  Award,
  Clock
} from "lucide-react";

const Admissions = () => {
  const [selectedGrade, setSelectedGrade] = useState("all");

  const grades = [
    { id: "all", name: "All Grades", icon: GraduationCap },
    { id: "kg", name: "Kindergarten", icon: BookOpen },
    { id: "primary", name: "Primary (1-5)", icon: Users },
    { id: "middle", name: "Middle (6-8)", icon: Calendar },
    { id: "secondary", name: "Secondary (9-10)", icon: Award },
    { id: "higher", name: "Higher Secondary (11-12)", icon: GraduationCap },
  ];

  const gradeLevels = [
    {
      title: "Kindergarten",
      description: "Early childhood education focusing on foundational skills and social development.",
      age: "3-5 years",
      fees: "₹18,000/year",
      duration: "2 years",
      requirements: ["Birth Certificate", "Immunization Record", "Parent Interview"],
      features: ["Play-based Learning", "Social Skills Development", "Basic Literacy", "Creative Arts"]
    },
    {
      title: "Primary School",
      description: "Comprehensive primary education with strong academic foundations.",
      age: "6-10 years",
      fees: "₹22,000/year",
      duration: "5 years",
      requirements: ["Transfer Certificate", "Previous School Records", "Age Proof", "Address Proof"],
      features: ["Core Subjects", "Computer Skills", "Physical Education", "Extra-curricular Activities"]
    },
    {
      title: "Matriculation",
      description: "Advanced secondary education preparing students for higher studies.",
      age: "11-15 years",
      fees: "₹30,000/year",
      duration: "4 years",
      requirements: ["Primary School Completion", "Transfer Certificate", "Academic Records", "Character Certificate"],
      features: ["Advanced Mathematics", "Science Labs", "Language Skills", "Career Guidance"]
    },
    {
      title: "Higher Secondary",
      description: "Specialized education with focus on career preparation and specialization.",
      age: "16-17 years",
      fees: "₹32,000/year",
      duration: "2 years",
      requirements: ["Matriculation Completion", "Transfer Certificate", "Academic Excellence", "Interview"],
      features: ["Subject Specialization", "College Preparation", "Leadership Skills", "Industry Exposure"]
    },
    {
      title: "Senior Secondary",
      description: "Final stage of school education with advanced academic and life skills.",
      age: "17-18 years",
      fees: "₹35,000/year",
      duration: "1 year",
      requirements: ["Higher Secondary Completion", "Academic Records", "Character Certificate", "Parent Meeting"],
      features: ["University Preparation", "Career Counseling", "Advanced Studies", "Life Skills Training"]
    }
  ];

  const filteredInfo = selectedGrade === "all" 
    ? gradeLevels 
    : gradeLevels.filter(info => info.title.toLowerCase().includes(selectedGrade.toLowerCase()));

  const handleDownloadForm = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/admission-form.html';
    link.download = 'Infant-Jesus-School-Admission-Form.html';
    link.target = '_blank';
    
    // Add a message about Chrome download
    const message = "✅ Admission form downloaded successfully!\n\n📁 Check your Chrome downloads folder for: 'Infant-Jesus-School-Admission-Form.html'\n\n📝 Open the HTML file in your browser, fill it out, and print it to complete your application.\n\n💡 Tip: You can also save as PDF from the browser's print menu.\n\n📞 Contact us if you need any assistance!";
    
    // Show download message
    alert(message);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="admissions" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Admissions Open
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our prestigious institution and give your child the gift of quality education. 
              We welcome students from all backgrounds to become part of our growing family.
            </p>
          </div>

          {/* Grade Selection */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {grades.map((grade) => (
                <Button
                  key={grade.id}
                  variant={selectedGrade === grade.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGrade(grade.id)}
                  className="flex items-center gap-2"
                >
                  <grade.icon className="h-4 w-4" />
                  {grade.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Admission Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {filteredInfo.map((info) => (
              <Card key={info.title} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <CardTitle className="text-xl text-gray-900">
                      {info.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-sm">
                      {info.duration}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{info.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Age: {info.age}</span>
                    <span className="text-green-600 font-semibold">{info.fees}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                    <div className="space-y-2">
                      {info.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-gray-700">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                    <div className="space-y-2">
                      {info.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mb-16">
            <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Ready to Join Our School?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Download our admission form and start your child's educational journey with us. 
                  Our team is here to guide you through every step of the process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={handleDownloadForm}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Application Form
                  </Button>
                  <Button variant="outline" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Admissions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Academic Year
              </h3>
              <p className="text-muted-foreground text-sm">
                June to April (with summer break in May)
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Class Size
              </h3>
              <p className="text-muted-foreground text-sm">
                Maximum 30 students per class for personalized attention
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Scholarships
              </h3>
              <p className="text-muted-foreground text-sm">
                Merit-based scholarships available for deserving students
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;