import React from 'react';
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Benefits } from "./Benefits";
import { Pricing } from "./Pricing";
import { CallToAction } from "./CallToAction";
import { Footer } from "./Footer";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      <Header onGetStarted={onGetStarted} />
      <main>
        <Hero onGetStarted={onGetStarted} />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <CallToAction onGetStarted={onGetStarted} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

