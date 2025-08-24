import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      title: "Save 3+ Hours Daily",
      description: "Transform content creation from a 3-hour struggle to a 5-minute task. Spend more time growing your business.",
      icon: "⏰",
      stats: "90% time reduction"
    },
    {
      title: "Boost Engagement 300%", 
      description: "AI-optimized content with emotional intelligence and strategic hashtags that actually get results.",
      icon: "📈",
      stats: "300% higher engagement"
    },
    {
      title: "Platform-Perfect Content",
      description: "Content optimized for Instagram, LinkedIn, Facebook, and Twitter with platform-specific best practices.", 
      icon: "📱",
      stats: "4 platforms optimized"
    },
    {
      title: "Emotional Intelligence",
      description: "Our AI understands human psychology to create content that resonates with your audience's emotions.",
      icon: "🧠",
      stats: "3 content variants"
    },
    {
      title: "Consistent Brand Voice",
      description: "Every post matches your business personality perfectly with personalized AI training.",
      icon: "🎯",
      stats: "100% brand consistency"
    },
    {
      title: "Never Run Out of Ideas",
      description: "End creative blocks forever. Generate unlimited content variations on any topic, anytime.",
      icon: "💡",
      stats: "Unlimited generation"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      quote: "ContentCrafter transformed our social media strategy. We went from posting twice a week to daily, and our engagement increased by 400%.",
      avatar: "👩‍💼"
    },
    {
      name: "Mike Chen",
      role: "Small Business Owner", 
      company: "Local Fitness Studio",
      quote: "I was spending hours creating content. Now it takes 5 minutes and performs better than anything I created manually.",
      avatar: "👨‍💻"
    },
    {
      name: "Lisa Rodriguez",
      role: "Content Creator",
      company: "Freelance",
      quote: "The AI understands my brand voice perfectly. My clients think I have a whole team working on content creation.",
      avatar: "👩‍🎨"
    }
  ];

  return (
    <section id="benefits" className="py-5 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Benefits Header */}
        <div className="text-center mb-8 mt-4">
          <Badge variant="secondary" className="mb-4">
            Benefits
          </Badge>
          <h2 className="text-3xl md:text-4xl mb-4 font-playfair">
            Why ContentCrafter is a Game-Changer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of businesses who've transformed their content strategy and seen real results.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{benefit.icon}</div>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">{benefit.title}</CardTitle>
                <Badge variant="outline" className="text-xs w-fit">
                  {benefit.stats}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}