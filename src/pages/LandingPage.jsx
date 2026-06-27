import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import AudienceStrip from "../components/landing/AudienceStrip";
import Features from "../components/landing/Features";
import WorkflowSection from "../components/landing/WorkflowSection";
import FounderSection from "../components/landing/FounderSection";
import FAQSection from "../components/landing/FAQSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="landing-page app-shell">
      <Navbar />
      <Hero />
      <AudienceStrip />
      <Features />
      <WorkflowSection />
      <FounderSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
