import React, { useState, useEffect, Suspense } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AuthPage from './components/auth/AuthPage';
import OnboardingWizard from './components/onboarding/OnboardingWizard';
import Dashboard from './components/dashboard/Dashboard';
import LandingPage from './components/LandingPage';
import TestDashboard from './components/TestDashboard';
import { Loader2 } from 'lucide-react';
import './App.css';

function AppContent() {
  const { user, loading, isAuthenticated } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    if (user && !user.onboarding_completed) {
      setShowOnboarding(true);
      setShowLanding(false);
    } else if (user) {
      setShowOnboarding(false);
      setShowLanding(false);
    }
  }, [user]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading ContentCrafter...</p>
        </div>
      </div>
    );
  }

  // Show landing page first for non-authenticated users
  if (!isAuthenticated && showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (showOnboarding) {
    return (
      <OnboardingWizard 
        onComplete={handleOnboardingComplete} 
      />
    );
  }

  return <Dashboard />;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading translations...</p>
          </div>
        </div>
      }>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Suspense>
    </I18nextProvider>
  );
}

export default App;

