import './App.css';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { RouterConfig } from './config/RouterConfig';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();

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
