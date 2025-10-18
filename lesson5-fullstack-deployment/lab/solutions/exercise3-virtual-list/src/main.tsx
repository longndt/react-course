import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import PerformanceDemo from './pages/PerformanceDemo';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PerformanceDemo />
  </StrictMode>
);
