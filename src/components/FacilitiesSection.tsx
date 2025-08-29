import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Building2, 
  Image as ImageIcon, 
  MapPin,
  ExternalLink
} from "lucide-react";
import { springApiFetch, getImageUrl } from "@/lib/api";

interface Facility {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    const revalidate = () => fetchFacilities();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'ij:lastUpdate') fetchFacilities();
    };
    window.addEventListener('focus', revalidate);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') fetchFacilities();
    });
    window.addEventListener('ij:data-updated' as any, revalidate);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('focus', revalidate);
      document.removeEventListener('visibilitychange', () => {});
      window.removeEventListener('ij:data-updated' as any, revalidate);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    // Filter facilities based on search term
    if (searchTerm.trim() === "") {
      setFilteredFacilities(facilities);
    } else {
      const filtered = facilities.filter(
        facility =>
          facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          facility.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFacilities(filtered);
    }
  }, [searchTerm, facilities]);

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const response = await springApiFetch('/facilities', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch facilities');
      }
      const data = await response.json();
      const sorted = [...data].sort((a: Facility, b: Facility) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFacilities(sorted);
      setFilteredFacilities(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleViewDetails = (facilityId: number) => {
    // In a real application, this would navigate to facility details
    console.log(`Viewing facility ${facilityId}`);
  };

  if (loading) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading facilities...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg max-w-md mx-auto">
              <p className="font-medium">Error loading facilities</p>
              <p className="text-sm mt-2">{error}</p>
              <Button 
                onClick={fetchFacilities} 
                variant="outline" 
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="facilities" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Facilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the world-class facilities and infrastructure that support 
              our students' learning and development at Infant Jesus School.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search facilities..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3"
              />
            </div>
          </div>

          {/* Facilities Grid */}
          {filteredFacilities.length === 0 ? (
            <div className="text-center">
              <div className="bg-muted/50 p-8 rounded-lg max-w-md mx-auto">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  {searchTerm ? 'No facilities found' : 'No facilities available'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm 
                    ? 'Try adjusting your search terms.'
                    : 'Check back later for facility information.'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFacilities.map((facility) => (
                <Card 
                  key={facility.id}
                  className="overflow-hidden hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card-gradient"
                >
                  {/* Facility Image */}
                  {facility.imageUrl ? (
                    <div className="relative h-48 overflow-hidden">
                                             <img
                         src={getImageUrl(facility.imageUrl)}
                         alt={facility.name}
                         className="w-full h-full object-cover"
                         loading="lazy"
                         decoding="async"
                       />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}

                  {/* Facility Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      School Facility
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {facility.name}
                    </h3>
                    
                    {facility.description && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {facility.description}
                      </p>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewDetails(facility.id)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Results Count */}
          {searchTerm && (
            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Found {filteredFacilities.length} facility{filteredFacilities.length !== 1 ? 'ies' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
