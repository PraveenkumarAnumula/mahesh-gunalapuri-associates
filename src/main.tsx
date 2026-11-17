import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ROUTER_BASENAME } from './utils/site';
import './styles/index.css';

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={ROUTER_BASENAME} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

const root = document.getElementById('root')!;
// Built pages already contain their HTML; attach to it. The dev server starts empty, so render from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
