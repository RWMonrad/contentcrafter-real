import { Button } from '@/components/ui/button';
import { Sparkles, Clock, Target, Zap } from 'lucide-react';

const WelcomeStep = ({ onNext }) => {
  const benefits = [
    {
      icon: Clock,
      title: 'Save 3+ Hours Daily',
      description: 'Transform content creation from a 3-hour struggle into a 5-minute task'
    },
    {
      icon: Target,
      title: 'Platform-Optimized',
      description: 'Content tailored specifically for Instagram, LinkedIn, Facebook, and Twitter'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Intelligence',
      description: 'Emotional intelligence and strategic hashtag generation for maximum engagement'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Generate 3 content variants with A/B testing ready formats'
    }
  ];

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Welcome to <span className="text-primary">ContentCrafter</span>!
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Let's set up your personalized AI content generator. This quick setup will help us understand 
          your business and create content that truly represents your brand voice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
              <div className="flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">What to expect:</h3>
        <ul className="text-sm text-blue-800 space-y-1 text-left max-w-md mx-auto">
          <li>• Tell us about your business (2 minutes)</li>
          <li>• Describe your target audience (1 minute)</li>
          <li>• Choose your brand voice (1 minute)</li>
          <li>• Start generating amazing content!</li>
        </ul>
      </div>

      <Button onClick={onNext} size="lg" className="px-8">
        Let's Get Started
        <Sparkles className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default WelcomeStep;

