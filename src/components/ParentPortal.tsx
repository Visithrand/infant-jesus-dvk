import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Search, Send, Eye, Calendar, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ParentPortal = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const majorUpdates = [
    {
      id: 1,
      title: "Annual Day Celebration 2024",
      date: "15th December 2024",
      status: "Upcoming",
      description: "Annual day celebration with cultural programs and prize distribution ceremony.",
      responses: 45
    },
    {
      id: 2,
      title: "Mid-term Examination Schedule",
      date: "20th November 2024",
      status: "Active",
      description: "Mid-term examinations for all classes from 25th November to 5th December 2024.",
      responses: 78
    },
    {
      id: 3,
      title: "New Academic Session 2024-25",
      date: "1st June 2024",
      status: "Completed",
      description: "Admission process for new academic session with updated curriculum and facilities.",
      responses: 156
    },
    {
      id: 4,
      title: "Parent-Teacher Meeting",
      date: "10th November 2024",
      status: "Completed",
      description: "Monthly parent-teacher interaction to discuss student progress and development.",
      responses: 92
    }
  ];

  const recentQueries = [
    {
      query: "When will the annual day celebration be held?",
      askedBy: "Mrs. Priya Kumar",
      date: "2 hours ago",
      responses: 3
    },
    {
      query: "What are the timings for mid-term examinations?",
      askedBy: "Mr. Raj Patel",
      date: "5 hours ago",
      responses: 7
    },
    {
      query: "Is there any change in school bus timing?",
      askedBy: "Mrs. Sunitha Nair",
      date: "1 day ago",
      responses: 12
    }
  ];

  const handleSubmitQuery = () => {
    if (query.trim()) {
      toast({
        title: "Query Submitted",
        description: "Your query has been submitted successfully. You will receive a response soon.",
        duration: 3000,
      });
      setQuery("");
    }
  };

  const filteredUpdates = majorUpdates.filter(update =>
    update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="portal" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Parent Portal
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay connected with school updates, ask questions, and access important information 
              through our interactive parent portal system.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Query Submission */}
            <Card className="p-6 bg-card-gradient">
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
                    placeholder="Type your question here... (e.g., What are the admission requirements? When is the next parent meeting?)"
                    className="min-h-32"
                  />
                </div>
                
                <Button 
                  onClick={handleSubmitQuery}
                  variant="hero" 
                  className="w-full"
                  disabled={!query.trim()}
                >
                  Submit Query
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Recent Queries */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-foreground mb-4">Recent Parent Queries</h4>
                <div className="space-y-3">
                  {recentQueries.map((item, index) => (
                    <Card key={index} className="p-3 bg-secondary/50 hover:bg-secondary/70 transition-colors">
                      <p className="text-sm font-medium text-foreground mb-2">{item.query}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <User className="h-3 w-3" />
                          <span>{item.askedBy}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>{item.date}</span>
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{item.responses}</span>
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>

            {/* Major Updates */}
            <Card className="p-6 bg-card-gradient">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground flex items-center">
                  <Calendar className="h-6 w-6 text-accent mr-3" />
                  Major Updates
                </h3>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search updates..."
                    className="pl-10 w-48"
                  />
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredUpdates.map((update) => (
                  <Card key={update.id} className="p-4 border-l-4 border-l-accent hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{update.title}</h4>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          update.status === "Active" ? "bg-green-100 text-green-700" :
                          update.status === "Upcoming" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {update.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{update.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{update.date}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{update.responses} views</span>
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredUpdates.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No updates found matching your search.</p>
                </div>
              )}
            </Card>
          </div>

          {/* Portal Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center bg-card-gradient hover:shadow-medium transition-all">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Interactive Queries
              </h3>
              <p className="text-muted-foreground">
                Ask questions and get responses from faculty and administration
              </p>
            </Card>

            <Card className="p-6 text-center bg-card-gradient hover:shadow-medium transition-all">
              <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Real-time Updates
              </h3>
              <p className="text-muted-foreground">
                Get instant notifications about important school events and announcements
              </p>
            </Card>

            <Card className="p-6 text-center bg-card-gradient hover:shadow-medium transition-all">
              <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Transparent Communication
              </h3>
              <p className="text-muted-foreground">
                View all enquiries and responses for complete transparency
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentPortal;