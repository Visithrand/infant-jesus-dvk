import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";

const ParentPortal = () => {
  const majorUpdates = [
    {
      title: "Annual Sports Day",
      status: "Upcoming",
      description: "Get ready for our annual sports day! Dates and events will be announced soon.",
      responses: 0
    },
    {
      title: "Parent-Teacher Meeting",
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

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUpdates = majorUpdates.filter(update =>
    update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12">
            Parent Portal
          </h2>

          {/* Major Updates */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Major Updates</h3>
            <input
              type="text"
              placeholder="Search updates..."
              className="w-full px-4 py-2 mb-6 border border-border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {filteredUpdates.map((update, index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-semibold text-foreground mb-2">{update.title}</h4>
                  <p className="text-muted-foreground text-sm mb-2">{update.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center"><span className="mr-1">Status:</span> {update.status}</span>
                    <span className="flex items-center"><MessageSquare className="h-3 w-3 mr-1" /> {update.responses}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Recent Queries */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Recent Queries</h3>
              <div className="space-y-4">
                {recentQueries.map((item, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <p className="font-semibold text-foreground">{item.query}</p>
                    <p className="text-muted-foreground text-sm">Asked by {item.askedBy} - {item.date}</p>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                       <MessageSquare className="h-3 w-3 mr-1" /> {item.responses} Responses
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentPortal; 