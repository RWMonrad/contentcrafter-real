import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sparkles, 
  Loader2, 
  Copy,
  Instagram,
  Linkedin,
  Facebook,
  Twitter
} from 'lucide-react';
import { apiClient } from '../lib/api.jsx';

const TestDashboard = () => {
  const [formData, setFormData] = useState({
    topic: '',
    platform: 'instagram',
    content_type: 'educational',
    additional_context: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState('');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'text-gray-900' }
  ];

  const contentTypes = [
    { id: 'educational', name: 'Educational', description: 'Teach and provide value' },
    { id: 'inspirational', name: 'Inspirational', description: 'Motivate and inspire' },
    { id: 'conversational', name: 'Conversational', description: 'Engage and discuss' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateContent = async () => {
    if (!formData.topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedContent(null);

    try {
      // Try real API first, fallback to demo
      try {
        const response = await apiClient.generateContent(formData);
        setGeneratedContent(response.content);
      } catch (apiError) {
        // Demo mode - generate mock content
        console.log('API failed, using demo mode');
        
        const mockContent = {
          content: `🚀 ${formData.topic}

${formData.content_type === 'educational' ? 
  `Here's what you need to know about ${formData.topic.toLowerCase()}:

✅ Key insight #1: Understanding the fundamentals is crucial
✅ Key insight #2: Implementation requires strategic planning  
✅ Key insight #3: Consistent execution drives results

💡 Pro tip: Start small and scale gradually for best results!

What's your experience with ${formData.topic.toLowerCase()}? Share in the comments! 👇` :
formData.content_type === 'inspirational' ?
  `${formData.topic} is more than just a concept - it's a journey! 🌟

Every expert was once a beginner. Every success story started with a single step.

🔥 Remember:
• Progress over perfection
• Consistency beats intensity  
• Your future self will thank you

The best time to start was yesterday. The second best time is NOW! 

What's stopping you from taking that first step? 💪 #Motivation #Success` :
  `Let's talk about ${formData.topic.toLowerCase()}! 🤔

I've been thinking about this lately, and I'm curious about your perspective...

${formData.topic} can be challenging, but it's also incredibly rewarding when you get it right.

What's been your biggest lesson learned? I'd love to hear your thoughts and experiences!

Drop a comment below and let's start a conversation 👇✨`}`,
          hashtags: formData.platform === 'instagram' ? 
            `#${formData.topic.replace(/\s+/g, '')} #ContentCreator #SocialMedia #Marketing #Business #Entrepreneur #Success #Tips #Strategy #Growth #Inspiration #DigitalMarketing #OnlineMarketing #SocialMediaTips #ContentMarketing` :
            formData.platform === 'linkedin' ?
            `#${formData.topic.replace(/\s+/g, '')} #Professional #Business #Leadership #Strategy #Growth` :
            formData.platform === 'twitter' ?
            `#${formData.topic.replace(/\s+/g, '')} #Twitter #SocialMedia #Tips` :
            `#${formData.topic.replace(/\s+/g, '')} #Facebook #SocialMedia #Marketing`,
          engagement_score: Math.floor(Math.random() * 3) + 8, // 8-10
          approach_explanation: `This ${formData.content_type} post is optimized for ${formData.platform} with strategic hashtags and engaging format.`
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGeneratedContent(mockContent);
      }
    } catch (error) {
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">🎉 ContentCrafter Dashboard</h1>
          <p className="text-gray-600">AI-Powered Content Generator - Demo Mode</p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            ✨ Demo: Generates realistic content without backend
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Generate Content</span>
            </CardTitle>
            <CardDescription>
              Create AI-powered social media content (Demo mode with realistic examples)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="topic">Content Topic *</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Social media marketing tips"
                    value={formData.topic}
                    onChange={(e) => handleChange('topic', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={formData.platform} onValueChange={(value) => handleChange('platform', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => {
                        const Icon = platform.icon;
                        return (
                          <SelectItem key={platform.id} value={platform.id}>
                            <div className="flex items-center space-x-2">
                              <Icon className={`w-4 h-4 ${platform.color}`} />
                              <span>{platform.name}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="content_type">Content Type</Label>
                  <Select value={formData.content_type} onValueChange={(value) => handleChange('content_type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="additional_context">Additional Context</Label>
                <Textarea
                  id="additional_context"
                  placeholder="Any specific details or requirements..."
                  value={formData.additional_context}
                  onChange={(e) => handleChange('additional_context', e.target.value)}
                  rows={6}
                />
              </div>
            </div>

            <Button 
              onClick={generateContent}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Content */}
        {generatedContent && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-green-500" />
                <span>Generated Content</span>
                <div className="ml-auto flex items-center space-x-1 text-sm">
                  <span className="text-green-600 font-medium">
                    Engagement Score: {generatedContent.engagement_score}/10
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Content</Label>
                <div className="mt-1 p-4 bg-muted rounded-lg">
                  <p className="whitespace-pre-wrap">{generatedContent.content}</p>
                </div>
              </div>

              {generatedContent.hashtags && (
                <div>
                  <Label className="text-sm font-medium">Hashtags</Label>
                  <div className="mt-1 p-4 bg-muted rounded-lg">
                    <p className="text-blue-600">{generatedContent.hashtags}</p>
                  </div>
                </div>
              )}

              {generatedContent.approach_explanation && (
                <div>
                  <Label className="text-sm font-medium">AI Strategy</Label>
                  <div className="mt-1 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">{generatedContent.approach_explanation}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => copyToClipboard(generatedContent.content)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Content
                </Button>
                {generatedContent.hashtags && (
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(generatedContent.hashtags)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy Hashtags
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TestDashboard;

