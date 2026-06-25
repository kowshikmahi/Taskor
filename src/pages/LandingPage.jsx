import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import AudienceStrip from "../components/landing/AudienceStrip";
import Features from "../components/landing/Features";
import WorkflowSection from "../components/landing/WorkflowSection";
import DashboardPreview from "../components/landing/DashboardPreview";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-taskor-ink overflow-x-hidden">
      <Navbar />
      <Hero />
      <AudienceStrip />
      <Features />
      <WorkflowSection />
      <DashboardPreview />
      <CTASection />
      <Footer />
    </div>
  );
}