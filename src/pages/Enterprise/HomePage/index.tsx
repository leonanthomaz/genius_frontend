// src/pages/Enterprise/HomePage/index.tsx

import React from 'react';
import HeroSection from '../../../components/Enterprise/HeroSection';
import ServicesComponent from '../../../components/Enterprise/ServicesComponent';
import TechnologiesComponent from '../../../components/Enterprise/TechnologiesComponent';
import HowItWorksPage from '../../../components/Enterprise/HowItWorksComponent';
import PricingPage from '../../../components/Enterprise/PricingComponent';
import FaqPage from '../../../components/Enterprise/FaqComponent';
import QuickContactForm from '../../../components/Enterprise/QuickContactForm';
import Footer from '../../../components/Enterprise/Footer';
import Layout from '../../../components/Layout';
import Navbar from '../../../components/Enterprise/Navbar';

const Home: React.FC = () => {
  return (
    <Layout withWhatsApp={true}>
      <Navbar/>
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