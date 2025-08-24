import { Button } from "./ui/button";

interface CallToActionProps {
  onGetStarted?: () => void;
}

export function CallToAction({ onGetStarted }: CallToActionProps) {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-6">
          Ready to Transform Your Social Media?
        </h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Join thousands of small business owners who have already saved hours of work 
          and grown their engagement with ContentCrafter.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={onGetStarted}>
            Get Started Now
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={onGetStarted}>
            Watch Demo
          </Button>
        </div>
        
        <div className="text-sm opacity-75">
          No credit card required • 7-day free trial • Cancel anytime
        </div>
      </div>
    </section>
  );
}