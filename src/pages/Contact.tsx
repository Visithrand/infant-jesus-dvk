import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
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
      // In a real application, you would send the query to a backend endpoint here
      // The backend would then send the email to infantjesusmatricschooldvk.yahoo.com
      console.log("Query submitted from Contact page:", query);

      // Example of how you might send data to a backend using fetch:
      /*
      fetch('/api/send-contact-query-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        toast({
          title: "Query Submitted",
          description: "Your query has been submitted successfully. You will receive a response soon.",
          duration: 3000,
        });
        setQuery("");
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
      */

      // For now, we'll just show a toast notification as a placeholder
      toast({
        title: "Query Submitted",
        description: "Your query has been submitted successfully. (Email functionality needs backend implementation)",
        duration: 3000,
      });

      setQuery("");
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
      <main className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
          <div className="max-w-xl w-full bg-card shadow-lg rounded-lg p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2 text-center text-foreground">Contact Us</h1>
            <p className="mb-6 text-center text-muted-foreground">We’re here to help! Reach out for any queries or information.</p>
            <div className="space-y-6 w-full">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-accent mt-1" />
                <div>
                  <div className="font-semibold text-lg text-foreground">Address</div>
                  <div className="text-muted-foreground">
                    DEVAKOTTAI, sivagangai<br />630302
                  </div>
                </div>
              </div>
              <hr className="my-4 border-accent/30" />
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <div className="font-semibold text-lg text-foreground">Matric</div>
                    <div className="text-muted-foreground">04561-290388, 8903209105</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <div className="font-semibold text-lg text-foreground">Primary</div>
                    <div className="text-muted-foreground">8015329105</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <div className="font-semibold text-lg text-foreground">KG Block</div>
                    <div className="text-muted-foreground">04561-273878, 9043809105</div>
                  </div>
                </div>
              </div>
              <hr className="my-4 border-accent/30" />
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-accent" />
                <div>
                  <div className="font-semibold text-lg text-foreground">Email</div>
                  <div className="text-muted-foreground">infantjesusmatricschooldvk@yahoo.com</div>
                </div>
              </div>
            </div>

            {/* Query Submission */}
            <Card className="p-6 bg-card-gradient mt-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <MessageSquare className="h-6 w-6 text-primary mr-3" />
                Ask Your Question
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Question/Query
                  </label>
                  <Textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your question here..."
                    className="min-h-32"
                  />
                </div>

                <Button onClick={handleSubmitQuery} className="w-full">
                  Submit Query
                </Button>
              </div>
            </Card>

            <div className="mt-10 w-full">
              <h2 className="text-xl font-semibold mb-3 text-foreground text-center">Frequently Asked Enquiries</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {suggestedQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact; 