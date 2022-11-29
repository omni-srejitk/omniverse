import './App.css';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { RouterConfig } from './config/RouterConfig';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();
  const PAGETITLE =
    pathname.slice(1).slice(0, 1).toUpperCase() + pathname.slice(1).slice(1);

  useEffect(() => {
    document.title = PAGETITLE + ' | Omniverse';
  }, [pathname]);

  return (
    <div className='App'>
      {pathname == '/' ? null : <Sidebar />}
      {pathname == '/' ? null : <Header />}
      <RouterConfig />
      <Toaster />
    </div>
  );
}

export default App;
