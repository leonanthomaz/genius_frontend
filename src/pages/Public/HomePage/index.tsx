// src/pages/Home/index.tsx

import React from 'react';
import Layout from '../../../components/Layout';
import HeroSection from '../../../components/HeroSection';
import ServicesComponent from '../../../components/ServicesComponent';
import TechnologiesComponent from '../../../components/TechnologiesComponent';
import HowItWorksPage from '../../../components/HowItWorksPage';
import PricingPage from '../../../components/PricingPage';
import FaqPage from '../../../components/FaqPage';
import QuickContactForm from '../../../components/QuickContactForm';
import Footer from '../../../components/Footer';

const Home: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesComponent />
      <TechnologiesComponent />
      <HowItWorksPage />
      <PricingPage />
      <FaqPage/>
      <QuickContactForm/>
      <Footer/>
    </Layout>
  );
};

export default Home;