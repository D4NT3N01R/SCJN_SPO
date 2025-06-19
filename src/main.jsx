import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { BrowserRouter } from 'react-router-dom';
ModuleRegistry.registerModules([AllCommunityModule]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
   
  </StrictMode>,
)
