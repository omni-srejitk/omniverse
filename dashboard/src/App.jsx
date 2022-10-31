import './App.css';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { RouterConfig } from './config/RouterConfig';

function App() {
  return (
    <div className='App flex'>
      <Sidebar />
      <Header />
      <RouterConfig />
    </div>
  );
}

export default App;
