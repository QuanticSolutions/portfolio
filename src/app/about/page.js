import React from 'react';
import { HeroScroll } from '@/components/about/AboutHero';
import SlidingTextSection from '@/components/about/Mission';
import FAQSection from '@/components/about/FAQs';
import { Float3DElements } from '../page';
import OurStory from '@/components/about/OurStory';

const About = () => {
  return (
    <section className="w-full overflow-hidden bg-gradient-to-br from-black via-teal-900 to-black">
      <HeroScroll />
      <Float3DElements />
      <OurStory />
      <SlidingTextSection />
      <FAQSection />
    </section>
  );
};

export default About;