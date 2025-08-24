import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, ArrowRight, Check } from 'lucide-react';

const BrandVoiceStep = ({ data, updateData, onNext }) => {
  const [selectedVoices, setSelectedVoices] = useState(
    data.brand_voice ? data.brand_voice.split(', ') : []
  );

  const voiceOptions = [
    {
      id: 'professional',
      title: 'Professional',
      description: 'Formal, authoritative, and business-focused',
      example: '"Our latest research shows significant improvements in ROI..."'
    },
    {
      id: 'friendly',
      title: 'Friendly',
      description: 'Warm, approachable, and conversational',
      example: '"Hey there! We\'re excited to share something amazing with you..."'
    },
    {
      id: 'inspirational',
      title: 'Inspirational',
      description: 'Motivating, uplifting, and empowering',
      example: '"Every challenge is an opportunity to grow stronger..."'
    },
    {
      id: 'educational',
      title: 'Educational',
      description: 'Informative, helpful, and teaching-focused',
      example: '"Here\'s what you need to know about..."'
    },
    {
      id: 'playful',
      title: 'Playful',
      description: 'Fun, creative, and lighthearted',
      example: '"Plot twist: your content strategy just got a major upgrade! 🎉"'
    },
    {
      id: 'authentic',
      title: 'Authentic',
      description: 'Genuine, transparent, and relatable',
      example: '"Let\'s be real for a moment - we\'ve all been there..."'
    },
    {
      id: 'confident',
      title: 'Confident',
      description: 'Bold, assertive, and self-assured',
      example: '"We know exactly what it takes to succeed..."'
    },
    {
      id: 'empathetic',
      title: 'Empathetic',
      description: 'Understanding, caring, and supportive',
      example: '"We understand how challenging this can be..."'
    }
  ];

  const toggleVoice = (voiceId) => {
    setSelectedVoices(prev => {
      if (prev.includes(voiceId)) {
        return prev.filter(id => id !== voiceId);
      } else if (prev.length < 2) {
        return [...prev, voiceId];
      } else {
        // Replace the first selected voice if already at limit
        return [prev[1], voiceId];
      }
    });
  };

  const handleNext = () => {
    updateData({ brand_voice: selectedVoices.join(', ') });
    onNext();
  };

  const isValid = selectedVoices.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Mic className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Choose your brand voice</h2>
        <p className="text-muted-foreground">
          Select 1-2 voice characteristics that best represent your brand
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip:</h4>
        <p className="text-sm text-blue-800">
          You can combine two voices for a unique blend. For example: "Professional + Friendly" 
          creates content that's authoritative yet approachable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {voiceOptions.map((voice) => {
          const isSelected = selectedVoices.includes(voice.id);
          return (
            <Card 
              key={voice.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => toggleVoice(voice.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{voice.title}</h3>
                  {isSelected && (
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {voice.description}
                </p>
                <div className="bg-muted/50 rounded p-2">
                  <p className="text-xs italic">
                    {voice.example}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedVoices.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Selected voice:</p>
          <div className="flex justify-center gap-2">
            {selectedVoices.map((voiceId) => {
              const voice = voiceOptions.find(v => v.id === voiceId);
              return (
                <Badge key={voiceId} variant="default" className="px-3 py-1">
                  {voice?.title}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      <Button 
        onClick={handleNext} 
        disabled={!isValid}
        className="w-full"
      >
        Complete Setup
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default BrandVoiceStep;

