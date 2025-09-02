import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* 404 Content */}
            <div className="text-center mb-12">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                  <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
                <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                  404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Page Not Found
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Oops! The page you're looking for seems to have wandered off to recess. 
                  Don't worry, let's get you back to learning!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Go to Homepage
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </Button>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Academic Programs</h3>
                  <p className="text-gray-600 mb-4">Explore our comprehensive curriculum</p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/#academics">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Admissions</h3>
                  <p className="text-gray-600 mb-4">Join our school community</p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/#admissions">Apply Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">C</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                  <p className="text-gray-600 mb-4">Get in touch with our team</p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/contact">Contact</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Error Details for Developers */}
            <div className="text-center">
              <details className="inline-block">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  Technical Details
                </summary>
                <div className="bg-gray-100 rounded-lg p-4 text-left text-sm font-mono">
                  <p><strong>Requested URL:</strong> {location.pathname}</p>
                  <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
                  <p><strong>User Agent:</strong> {navigator.userAgent}</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
