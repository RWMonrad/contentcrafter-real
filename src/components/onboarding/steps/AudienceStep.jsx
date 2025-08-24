import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, ArrowRight } from 'lucide-react';

const AudienceStep = ({ data, updateData, onNext }) => {
  const [targetAudience, setTargetAudience] = useState(data.target_audience || '');

  const handleNext = () => {
    updateData({ target_audience: targetAudience });
    onNext();
  };

  const audienceExamples = [
    {
      title: "Small Business Owners",
      description: "Entrepreneurs aged 25-45 who need marketing help but have limited budgets"
    },
    {
      title: "Fitness Enthusiasts", 
      description: "Health-conscious individuals aged 20-40 interested in workout routines and nutrition"
    },
    {
      title: "Tech Professionals",
      description: "Software developers and IT professionals looking to advance their careers"
    }
  ];

  const isValid = targetAudience.trim().length > 20;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Users className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Who is your target audience?</h2>
        <p className="text-muted-foreground">
          Help us understand who you're creating content for
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="target_audience">Target Audience Description *</Label>
          <Textarea
            id="target_audience"
            placeholder="Describe your ideal customers: their age, interests, pain points, goals, and what motivates them..."
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            rows={5}
          />
          <p className="text-xs text-muted-foreground">
            Include demographics, psychographics, and what problems you solve for them
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3">💡 Include these details:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Age range and demographics</li>
            <li>• Professional background or interests</li>
            <li>• Main challenges or pain points</li>
            <li>• Goals and aspirations</li>
            <li>• Where they spend time online</li>
            <li>• What motivates their purchasing decisions</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Examples:</h4>
          {audienceExamples.map((example, index) => (
            <div key={index} className="p-3 border rounded-lg bg-muted/30">
              <h5 className="font-medium text-sm">{example.title}</h5>
              <p className="text-xs text-muted-foreground mt-1">{example.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Button 
        onClick={handleNext} 
        disabled={!isValid}
        className="w-full"
      >
        Continue to Brand Voice
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default AudienceStep;

