import { Route, Routes } from 'react-router-dom';
import { Analytics } from '../routes/Analytics/Analytics';
import { Dashboard } from '../routes/Dashboard/Dashboard';
import { Marketing } from '../routes/Marketing/Marketing';
import { Stores } from '../routes/Stores/Stores';

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/stores' element={<Stores />} />
      <Route path='/analytics' element={<Analytics />} />
      <Route path='/marketing' element={<Marketing />} />
    </Routes>
  );
};
