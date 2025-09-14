import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Eye, 
  Heart, 
  Share2, 
  BookOpen,
  GraduationCap,
  Trophy,
  Users
} from "lucide-react";
import { useState } from "react";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  image: string;
  readTime: string;
  views: number;
  likes: number;
  featured: boolean;
  tags: string[];
}

const NewsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedArticles, setLikedArticles] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'all', name: 'All News', icon: BookOpen },
    { id: 'academic', name: 'Academic', icon: GraduationCap },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'community', name: 'Community', icon: Users }
  ];

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Infant Jesus School Celebrates 25 Years of Educational Excellence",
      excerpt: "Our school marks a significant milestone as we celebrate 25 years of providing quality education and shaping young minds.",
      content: "Full article content here...",
      author: "Principal Dr. Sarah Johnson",
      publishDate: "2024-01-15",
      category: "academic",
      image: "/api/placeholder/400/250",
      readTime: "5 min read",
      views: 1250,
      likes: 89,
      featured: true,
      tags: ["Anniversary", "Milestone", "Education"]
    },
    {
      id: 2,
      title: "Students Win State-Level Science Competition",
      excerpt: "Our talented students secured first place in the state science fair with their innovative renewable energy project.",
      content: "Full article content here...",
      author: "Science Department",
      publishDate: "2024-01-12",
      category: "achievements",
      image: "/api/placeholder/400/250",
      readTime: "3 min read",
      views: 890,
      likes: 67,
      featured: false,
      tags: ["Science", "Competition", "Achievement"]
    },
    {
      id: 3,
      title: "Annual Sports Day 2024: A Grand Success",
      excerpt: "The school's annual sports day witnessed enthusiastic participation from students across all grades with exciting competitions.",
      content: "Full article content here...",
      author: "Sports Department",
      publishDate: "2024-01-10",
      category: "events",
      image: "/api/placeholder/400/250",
      readTime: "4 min read",
      views: 1100,
      likes: 92,
      featured: false,
      tags: ["Sports", "Events", "Students"]
    },
    {
      id: 4,
      title: "New Digital Library Opens for Students",
      excerpt: "A state-of-the-art digital library with 10,000+ e-books and online resources is now available for all students.",
      content: "Full article content here...",
      author: "Library Department",
      publishDate: "2024-01-08",
      category: "academic",
      image: "/api/placeholder/400/250",
      readTime: "6 min read",
      views: 750,
      likes: 45,
      featured: false,
      tags: ["Library", "Digital", "Resources"]
    },
    {
      id: 5,
      title: "Community Service Initiative: Clean City Campaign",
      excerpt: "Students and teachers joined hands for a city-wide cleanliness drive, promoting environmental awareness.",
      content: "Full article content here...",
      author: "Community Service Club",
      publishDate: "2024-01-05",
      category: "community",
      image: "/api/placeholder/400/250",
      readTime: "4 min read",
      views: 650,
      likes: 78,
      featured: false,
      tags: ["Community", "Environment", "Service"]
    },
    {
      id: 6,
      title: "Alumni Reunion 2024: Celebrating Success Stories",
      excerpt: "Successful alumni from various fields gathered to share their experiences and inspire current students.",
      content: "Full article content here...",
      author: "Alumni Association",
      publishDate: "2024-01-03",
      category: "events",
      image: "/api/placeholder/400/250",
      readTime: "5 min read",
      views: 980,
      likes: 56,
      featured: false,
      tags: ["Alumni", "Reunion", "Success"]
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const handleLike = (articleId: number) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 scroll-reveal">
              Latest <span className="gradient-text">News & Updates</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto scroll-reveal">
              Stay informed about our school's latest achievements, events, and important announcements
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2 transition-all duration-300"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Featured Article */}
          {featuredArticle && selectedCategory === 'all' && (
            <Card className="card-professional mb-12 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">Featured</Badge>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredArticle.publishDate)}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {featuredArticle.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      {featuredArticle.views}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLike(featuredArticle.id)}
                        className={`flex items-center gap-2 ${
                          likedArticles.has(featuredArticle.id) ? 'text-red-500' : 'text-muted-foreground'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${
                          likedArticles.has(featuredArticle.id) ? 'fill-current' : ''
                        }`} />
                        {featuredArticle.likes + (likedArticles.has(featuredArticle.id) ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                    <Button className="btn-primary-enhanced">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Regular Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <Card key={article.id} className="card-professional overflow-hidden group">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="capitalize">
                      {article.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90">
                      {article.readTime}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.views}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLike(article.id)}
                        className={`p-1 h-auto ${
                          likedArticles.has(article.id) ? 'text-red-500' : 'text-muted-foreground'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${
                          likedArticles.has(article.id) ? 'fill-current' : ''
                        }`} />
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {article.likes + (likedArticles.has(article.id) ? 1 : 0)}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              Load More Articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
