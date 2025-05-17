import { Card, CardContent } from "@/components/ui/card";
import { Users, HandHeart, Info } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Moataz Salah",
      role: "Team Member",
      image: "/images/team/moataz.jpg",
    },
    {
      name: "Mohamed Helmy",
      role: "Team Member",
      image: "/images/team/helmy.jpg",
    },
    {
      name: "Kareem Hossam",
      role: "Team Member",
      image: "/images/team/kareem.jpg",
    },
    {
      name: "Mohamed Atef",
      role: "Team Member",
      image: "/images/team/mox.jpg",
    },
    {
      name: "Kareem Diaa",
      role: "Team Member",
      image: "/images/team//kdiaa.jpg",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3 py-1 text-sm rounded-full bg-maroof-green/10 text-maroof-green border border-maroof-green/20 inline-block mb-4">
          Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Ma'roof</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Ma'roof was born from a simple observation: while some have excess food and clothes, 
          others struggle to meet basic needs. We're bridging this gap through technology 
          and community engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <Card className="bg-gradient-to-br from-card to-maroof-green/5">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-maroof-green/10 p-3 rounded-full">
              <HandHeart className="h-8 w-8 text-maroof-green" />
            </div>
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-muted-foreground">
              To reduce waste and hunger by creating efficient ways for excess resources 
              to reach those in need, while rewarding sustainable actions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-maroof-green/5">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-maroof-green/10 p-3 rounded-full">
              <Info className="h-8 w-8 text-maroof-green" />
            </div>
            <h3 className="text-xl font-semibold">Our Values</h3>
            <p className="text-muted-foreground">
              Sustainability, compassion, community, innovation, and accessibility 
              guide every decision we make and action we take.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-maroof-green/5">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-maroof-green/10 p-3 rounded-full">
              <Users className="h-8 w-8 text-maroof-green" />
            </div>
            <h3 className="text-xl font-semibold">Our Impact</h3>
            <p className="text-muted-foreground">
            We're working towards rescuing over 2.5 tons of food, providing 12,000+ meals, and building a community of 5,000+ active users.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="text-muted-foreground mt-2">
            The passionate individuals behind Ma'roof
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-maroof-green font-medium mb-3">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* <div className="bg-maroof-green/10 rounded-2xl p-8 md:p-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground mb-4">
              What began as a small food recovery initiative in one neighborhood has grown into
              a comprehensive platform addressing both food and clothing waste across multiple
              communities. We've built partnerships with local businesses, shelters, and
              community organizations to create efficient donation pathways.
            </p>
            <p className="text-muted-foreground">
              With every donation, we learn and improve. Our technology constantly evolves to
              better serve both donors and recipients, making the process seamless and rewarding
              for everyone involved.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-md">
            <h3 className="font-semibold mb-4 text-lg">Ma'roof Timeline</h3>
            
            <div className="space-y-4">
              <div className="border-l-2 border-maroof-green pl-4 py-2">
                <p className="font-medium">2022</p>
                <p className="text-sm text-muted-foreground">Founded with focus on food waste</p>
              </div>
              
              <div className="border-l-2 border-maroof-green pl-4 py-2">
                <p className="font-medium">2023</p>
                <p className="text-sm text-muted-foreground">Expanded to clothing donations</p>
              </div>
              
              <div className="border-l-2 border-maroof-green pl-4 py-2">
                <p className="font-medium">2024</p>
                <p className="text-sm text-muted-foreground">Launched mobile app & gamification</p>
              </div>
              
              <div className="border-l-2 border-maroof-green pl-4 py-2">
                <p className="font-medium">2025</p>
                <p className="text-sm text-muted-foreground">Expanding to new regions</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default About;
