import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PageLoader from './components/common/PageLoader';
import Home from './pages/Home';

// Home loads eagerly for the fastest first paint; other pages are split into their own chunks.
const About = lazy(() => import('./pages/About'));
const CAProfile = lazy(() => import('./pages/CAProfile'));
const Services = lazy(() => import('./pages/Services'));
const Expertise = lazy(() => import('./pages/Expertise'));
const Insights = lazy(() => import('./pages/Insights'));
const Article = lazy(() => import('./pages/Article'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Lazy><About /></Lazy>} />
        <Route path="ca-profile" element={<Lazy><CAProfile /></Lazy>} />
        <Route path="services" element={<Lazy><Services /></Lazy>} />
        <Route path="expertise" element={<Lazy><Expertise /></Lazy>} />
        <Route path="insights" element={<Lazy><Insights /></Lazy>} />
        <Route path="insights/:slug" element={<Lazy><Article /></Lazy>} />
        <Route path="contact" element={<Lazy><Contact /></Lazy>} />
        <Route path="privacy-policy" element={<Lazy><PrivacyPolicy /></Lazy>} />
        <Route path="terms" element={<Lazy><Terms /></Lazy>} />
        <Route path="*" element={<Lazy><NotFound /></Lazy>} />
      </Route>
    </Routes>
  );
}

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}
