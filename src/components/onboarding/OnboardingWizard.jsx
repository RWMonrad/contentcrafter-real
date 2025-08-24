import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import WelcomeStep from './steps/WelcomeStep';
import BusinessInfoStep from './steps/BusinessInfoStep';
import AudienceStep from './steps/AudienceStep';
import BrandVoiceStep from './steps/BrandVoiceStep';
import CompletionStep from './steps/CompletionStep';
import { apiClient } from '../../lib/api.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';

const OnboardingWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState({
    business_name: '',
    business_industry: '',
    business_description: '',
    target_audience: '',
    brand_voice: '',
  });

  const { updateUser } = useAuth();

  const steps = [
    { id: 'welcome', title: 'Welcome', component: WelcomeStep },
    { id: 'business', title: 'Business Info', component: BusinessInfoStep },
    { id: 'audience', title: 'Target Audience', component: AudienceStep },
    { id: 'voice', title: 'Brand Voice', component: BrandVoiceStep },
    { id: 'completion', title: 'Complete', component: CompletionStep },
  ];

  const updateData = (stepData) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    setIsLoading(true);
    try {
      console.log('Saving onboarding data:', onboardingData);
      const response = await apiClient.saveOnboarding(onboardingData);
      console.log('Onboarding response:', response);
      updateUser(response.user);
      onComplete();
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
      // Even if API fails, complete onboarding to allow user to continue
      onComplete();
    } finally {
      setIsLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-2 ${
                        index < currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="w-full mb-4" />
            <CardTitle className="text-2xl">
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              data={onboardingData}
              updateData={updateData}
              onNext={nextStep}
              onComplete={completeOnboarding}
              isLoading={isLoading}
            />

            {/* Navigation buttons */}
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingWizard;

