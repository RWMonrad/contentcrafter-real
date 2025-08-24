import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, ArrowRight } from 'lucide-react';

const BusinessInfoStep = ({ data, updateData, onNext }) => {
  const [formData, setFormData] = useState({
    business_name: data.business_name || '',
    business_industry: data.business_industry || '',
    business_description: data.business_description || '',
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Food & Beverage',
    'Real Estate',
    'Fitness & Wellness',
    'Beauty & Fashion',
    'Travel & Tourism',
    'Consulting',
    'Marketing & Advertising',
    'Non-profit',
    'Entertainment',
    'Other'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateData(formData);
    onNext();
  };

  const isValid = formData.business_name.trim() && 
                  formData.business_industry && 
                  formData.business_description.trim();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Tell us about your business</h2>
        <p className="text-muted-foreground">
          This helps our AI understand your context and create relevant content
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="business_name">Business Name *</Label>
          <Input
            id="business_name"
            placeholder="e.g., Acme Marketing Agency"
            value={formData.business_name}
            onChange={(e) => handleChange('business_name', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            What should we call your business in the content?
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="business_industry">Industry *</Label>
          <Select value={formData.business_industry} onValueChange={(value) => handleChange('business_industry', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            This helps us use industry-specific hashtags and terminology
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="business_description">Business Description *</Label>
          <Textarea
            id="business_description"
            placeholder="Describe what your business does, your main products/services, and what makes you unique..."
            value={formData.business_description}
            onChange={(e) => handleChange('business_description', e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            The more specific you are, the better our AI can represent your brand
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">💡 Pro Tip:</h4>
        <p className="text-sm text-yellow-800">
          Include your unique value proposition and key differentiators. This helps the AI create 
          content that stands out from competitors.
        </p>
      </div>

      <Button 
        onClick={handleNext} 
        disabled={!isValid}
        className="w-full"
      >
        Continue to Audience
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default BusinessInfoStep;

