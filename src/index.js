import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Assuming Tailwind or custom CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: If you want performance monitoring later, re-add below
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();