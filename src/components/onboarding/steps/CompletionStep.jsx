import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Sparkles, Loader2 } from 'lucide-react';

const CompletionStep = ({ data, onComplete, isLoading }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Setup Complete!</h2>
        <p className="text-muted-foreground">
          Your AI content generator is now personalized and ready to create amazing content
        </p>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 text-center">Your Content Profile</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Business</h4>
              <p className="font-medium">{data.business_name}</p>
              <p className="text-sm text-muted-foreground">{data.business_industry}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Description</h4>
              <p className="text-sm">{data.business_description}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Target Audience</h4>
              <p className="text-sm">{data.target_audience}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Brand Voice</h4>
              <div className="flex gap-2">
                {data.brand_voice.split(', ').map((voice, index) => (
                  <Badge key={index} variant="secondary">
                    {voice}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-3">🎉 What's Next?</h3>
        <ul className="text-sm text-green-800 space-y-2">
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            Generate content tailored to your brand voice
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            Get platform-optimized posts for Instagram, LinkedIn, Facebook & Twitter
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            Receive strategic hashtags and engagement predictions
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            Create multiple content variants for A/B testing
          </li>
        </ul>
      </div>

      <Button 
        onClick={onComplete} 
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Setting up your workspace...
          </>
        ) : (
          <>
            Start Creating Content
            <Sparkles className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};

export default CompletionStep;

