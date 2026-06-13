import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "./styles/variables.css";
import "./styles/forms.css";
import "./styles/buttons.css";
import "./styles/cards.css";
import "./styles/layout.css";

import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
