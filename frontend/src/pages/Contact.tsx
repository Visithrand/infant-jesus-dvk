import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const suggestedQuestions = [
  "What are the admission requirements?",
  "How can I schedule a school visit?",
  "What extracurricular activities are offered?",
  "How do I access the parent portal?",
  "What is the fee structure?",
  "How can I contact the principal or teachers?",
  "What are the school timings?",
  "How do I apply for scholarships?",
];

const Contact = () => {
  const [query, setQuery] = useState("");

  const handleSubmitQuery = () => {
    if (query.trim()) {
      // Sending the query to the backend for email
      fetch('http://localhost:3001/api/send-query-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.success) {
          toast({
            title: "Query Submitted",
            description: "Your query has been submitted successfully.",
            duration: 3000,
          });
          setQuery("");
        } else {
          toast({
            title: "Submission Failed",
            description: data.message || "There was an error submitting your query. Please try again later.",
            duration: 3000,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your query. Please try again later.",
          duration: 3000,
          variant: "destructive",
        });
      });
    } else {
       toast({
        title: "Empty Query",
        description: "Please enter your question before submitting.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We're here to help! Reach out for any queries or information about our school.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {/* Address Card */}
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Our Location</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-2 font-medium">DEVAKOTTAI, SIVAGANGAI</p>
                  <p className="text-gray-500">Tamil Nadu - 630302</p>
                  <p className="text-gray-500">India</p>
                </CardContent>
              </Card>

              {/* Phone Numbers Card */}
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Phone Numbers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">Matric Section</p>
                    <p className="text-gray-600">04561-290388</p>
                    <p className="text-gray-600">8903209105</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">Primary Section</p>
                    <p className="text-gray-600">8015329105</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">KG Block</p>
                    <p className="text-gray-600">04561-273878</p>
                    <p className="text-gray-600">9043809105</p>
                  </div>
                </CardContent>
              </Card>

              {/* Email & Hours Card */}
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Email & Hours</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600 text-sm break-words">
                      infantjesusmatricschooldvk@yahoo.com
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">School Hours</p>
                    <p className="text-gray-600">8:00 AM - 3:30 PM</p>
                    <p className="text-gray-600">Monday - Friday</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Query Submission Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Form */}
              <Card className="p-6 md:p-8">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl md:text-3xl flex items-center">
                    <MessageSquare className="h-6 w-6 text-blue-600 mr-3" />
                    Ask Your Question
                  </CardTitle>
                  <p className="text-gray-600">
                    Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Your Question/Query
                    </label>
                    <Textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Type your question here... (e.g., What are the admission requirements? How can I schedule a school visit?)"
                      className="min-h-32 resize-none"
                    />
                  </div>
                  <Button 
                    onClick={handleSubmitQuery} 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                  >
                    Submit Query
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="p-6 md:p-8">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl md:text-3xl">Frequently Asked Questions</CardTitle>
                  <p className="text-gray-600">
                    Find quick answers to common questions about our school.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suggestedQuestions.map((question, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <p className="text-gray-800 font-medium">{question}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Section */}
            <div className="mt-16">
              <Card className="p-6 md:p-8">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl md:text-3xl text-center">Visit Our Campus</CardTitle>
                  <p className="text-gray-600 text-center">
                    Experience the excellence of Infant Jesus School firsthand
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 rounded-lg h-64 md:h-96 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Globe className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">Interactive Map Coming Soon</p>
                      <p className="text-sm">We're working on adding an interactive map to help you find us easily!</p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" size="lg">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact; 