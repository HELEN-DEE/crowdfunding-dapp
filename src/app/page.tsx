import React from "react";
import Hero from "../components/Hero";
import FeaturedCampaigns from "../components/FeaturedCampaigns";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import WhyChoose from "../components/WhyChoose";
import FinalCTA from "../components/FinalCTA";


export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCampaigns />
      <HowItWorks />
      <Stats />
      <WhyChoose />
      <FinalCTA />
    </div>
  );
}
