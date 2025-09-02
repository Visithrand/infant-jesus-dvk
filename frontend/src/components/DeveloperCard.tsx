import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Instagram, Globe, Code, MessageSquare } from "lucide-react";

const DeveloperCard = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Website Development
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">Professional Software Engineering Services</p>
        </div>
        
        <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Code className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">VISITHRAN D</CardTitle>
            <Badge variant="secondary" className="text-xs sm:text-sm px-3 sm:px-4 py-1 mt-2">
              Software Engineer
            </Badge>
          </CardHeader>
          
          <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Contact Information</h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base">visithrand@gmail.com</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base">+91 8220092495</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Instagram className="h-5 w-5 text-pink-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base">@whimsical.vizi</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Globe className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Website Creation & Development</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Services Offered</h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Website Development</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Mobile App Development</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Software Solutions</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Custom Software Development</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6 sm:pt-8">
              <div className="text-center space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                  For any queries and software development needs, contact us!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => window.location.href = 'mailto:visithrand@gmail.com'}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300"
                    onClick={() => window.location.href = 'tel:+918220092495'}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300"
                    onClick={() => window.open('https://instagram.com/whimsical.vizi', '_blank')}
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Follow on Instagram
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeveloperCard;
