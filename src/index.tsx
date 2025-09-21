import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './Home';
import { ThemeStateProvider } from './hooks/useThemeState';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeStateProvider>
      <BrowserRouter>
        <Routes>
          {/* todo update paths */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeStateProvider>
  </StrictMode>,
);
