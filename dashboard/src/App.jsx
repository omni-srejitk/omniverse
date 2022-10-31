import './App.css';
import { Header } from './components/Header/Header';
import { RouterConfig } from './config/RouterConfig';

function App() {
  return (
    <div className='App'>
      <Header />
      <RouterConfig />
    </div>
  );
}

export default App;
