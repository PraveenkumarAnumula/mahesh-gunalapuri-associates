import Seo from '../components/common/Seo';
import Hero from '../components/sections/Hero';
import TrustStrip from '../components/sections/TrustStrip';
import { AboutIntro, Approach, CtaBand, FounderIntro, ServicesOverview, Testimonials, WhyChooseUs } from '../components/sections/HomeSections';

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <TrustStrip />
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
