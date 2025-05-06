
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import PopularCoursesSection from '@/components/home/PopularCoursesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import PricingSection from '@/components/home/PricingSection';

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeatureSection />
      <PopularCoursesSection />
      <TestimonialSection />
      <PricingSection />
    </Layout>
  );
};

export default Index;
