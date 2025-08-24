import { Button } from "./ui/button";
import logoImage from "../assets/logo.png";

interface HeaderProps {
  onGetStarted?: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/'}>
          <img 
            src={logoImage} 
            alt="ContentCrafter Logo" 
            className="w-10 h-10 object-contain"
          />
          <div className="flex items-baseline">
            <span className="text-2xl font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Content
            </span>
            <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Crafter
            </span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
            Benefits
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onGetStarted}>
            Sign In
          </Button>
          <Button onClick={onGetStarted}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}