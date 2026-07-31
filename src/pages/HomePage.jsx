import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Hero from '../components/sections/Hero';
import AboutPreview from '../components/sections/AboutPreview';
import AIDomains from '../components/sections/AIDomains';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import FeaturedBlogs from '../components/sections/FeaturedBlogs';
import Achievements from '../components/sections/Achievements';
function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <AboutPreview />
      <AIDomains />
      <FeaturedProjects />
      <FeaturedBlogs />
      <Achievements />
    </PageLayout>
  );
}

export default HomePage;
