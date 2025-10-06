import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import UsersPage from './pages/UsersPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsersPage />
  </StrictMode>
);
