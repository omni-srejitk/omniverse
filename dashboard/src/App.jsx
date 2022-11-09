import './App.css';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { RouterConfig } from './config/RouterConfig';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className='App'>
      <Sidebar />
      <Header />
      <RouterConfig />
      <Toaster />
    </div>
  );
}

export default App;
