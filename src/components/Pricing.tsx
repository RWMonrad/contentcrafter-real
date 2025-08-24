import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for exploring ContentCrafter's core features",
      credits: "10 credits per month",
      features: [
        "10 AI content generations per month",
        "Connect 1 social profile",
        "Define 1 unique brand voice",
        "Access to standard AI tools",
        "All 3 content variants per generation",
        "4 platform optimization"
      ],
      popular: false,
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const
    },
    {
      name: "Starter",
      price: "$12",
      period: "/month",
      yearlyPrice: "$9",
      description: "For individuals, students, and those just starting out",
      credits: "50 credits per month",
      features: [
        "50 AI content generations per month",
        "Connect 3 social profiles",
        "Define 1 unique brand voice",
        "Access to all AI tools",
        "All 3 content variants per generation",
        "4 platform optimization",
        "Standard customer support"
      ],
      popular: false,
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      yearlyPrice: "$22",
      description: "For small businesses, marketers, and professional content creators",
      credits: "200 credits per month",
      features: [
        "200 AI content generations per month",
        "Connect up to 10 social profiles",
        "Define up to 5 unique brand voices",
        "All 3 content variants per generation",
        "4 platform optimization",
        "Priority customer support",
        "Option to purchase extra credit packs"
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const
    },
    {
      name: "Agency",
      price: "$79",
      period: "/month",
      yearlyPrice: "$59",
      description: "For agencies and teams that need scalability and collaboration",
      credits: "500 credits per month",
      features: [
        "500 AI content generations per month",
        "Unlimited social profiles",
        "Unlimited brand voices",
        "Team functionality (3 users included)",
        "All 3 content variants per generation",
        "4 platform optimization",
        "Collaboration tools",
        "Dedicated support and onboarding"
      ],
      popular: false,
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Pricing Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl mb-4 font-playfair">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include a 7-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 hover:shadow-lg transition-all duration-300 flex flex-col h-full ${
                plan.popular ? 'border-primary shadow-lg scale-105' : 'hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4 flex-shrink-0">
                <CardTitle className="text-lg mb-3">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                  {plan.yearlyPrice && (
                    <div className="text-xs text-primary mt-1">
                      ${plan.yearlyPrice}/month billed yearly (save 25%)
                    </div>
                  )}
                  {!plan.yearlyPrice && (
                    <div className="text-xs text-transparent mt-1">
                      Placeholder for alignment
                    </div>
                  )}
                </div>
                <div className="h-16 flex items-center justify-center mb-3">
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    {plan.description}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs mb-2">
                  {plan.credits}
                </Badge>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="min-h-[200px] flex flex-col">
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="w-full text-sm mt-auto" 
                  variant={plan.buttonVariant}
                  size="sm"
                  asChild
                >
                  <a href="https://5001-irw79cj7wt3d17krkhq2s-07928a8a.manusvm.computer" target="_blank" rel="noopener noreferrer">
                    {plan.buttonText}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">What is a "Credit"?</h4>
                <p className="text-muted-foreground">
                  1 Credit = 1 complete content generation. This means you get content for all selected platforms (Instagram, LinkedIn, Facebook, Twitter) with all 3 content types (Educational, Inspirational, Conversational) for each platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Is the Free plan really free?</h4>
                <p className="text-muted-foreground">
                  Yes! The Free plan gives you 10 credits per month with no time limit. Perfect for exploring ContentCrafter's core features and seeing the quality of AI-generated content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Can I save money with annual billing?</h4>
                <p className="text-muted-foreground">
                  Yes! All paid plans offer 25% savings when billed annually. For example, the Pro plan costs $22/month instead of $29/month when paid yearly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">What platforms are supported?</h4>
                <p className="text-muted-foreground">
                  We currently support Instagram, LinkedIn, Facebook, and Twitter. Each platform gets optimized content with appropriate formatting and hashtags.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="px-8 py-3" asChild>
            <a href="https://5001-irw79cj7wt3d17krkhq2s-07928a8a.manusvm.computer" target="_blank" rel="noopener noreferrer">
              Start Your Free Trial Today
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

