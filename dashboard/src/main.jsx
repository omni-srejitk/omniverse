import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterProvider } from './context/FilterContext/FilterContext';
export const queryClient = new QueryClient();
import { Provider } from 'react-redux';
import { store } from './redux/store';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <FilterProvider>
            <App />
          </FilterProvider>
        </Provider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
