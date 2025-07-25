import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
 import Footer from "@/components/Footer";

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

const Contact = () => (
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
      <Footer />
    </main>
  </>
);

export default Contact; 