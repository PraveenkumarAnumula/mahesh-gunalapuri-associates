import Seo from '../components/common/Seo';
import Hero from '../components/sections/Hero';
import { AboutIntro, Approach, CtaBand, FounderIntro, ServicesOverview, Testimonials, WhyChooseUs } from '../components/sections/HomeSections';

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <AboutIntro />
      <ServicesOverview />
      <WhyChooseUs />
      <FounderIntro />
      <Approach />
      <Testimonials />
      <CtaBand />
    </>
  );
}
