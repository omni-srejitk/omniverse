import { Route, Routes } from 'react-router-dom';
import { Analytics } from '../routes/Analytics/Analytics';
import { Dashboard } from '../routes/Dashboard/Dashboard';
import { Login } from '../routes/Login/Login';
import { Marketing } from '../routes/Marketing/Marketing';
import RequireAuth from '../utils/RequireAuth';
import { Stores } from '../routes/Stores/Stores';
import { Inventory } from '../routes/Inventory/Inventory';

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/stores' element={<Stores />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/marketing' element={<Marketing />} />
      </Route>
    </Routes>
  );
};
