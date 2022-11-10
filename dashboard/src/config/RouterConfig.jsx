import { Route, Routes } from 'react-router-dom';
import { Analytics } from '../routes/Analytics/Analytics';
import { Dashboard } from '../routes/Dashboard/Dashboard';
import { Login } from '../routes/Login/Login';
import { Marketing } from '../routes/Marketing/Marketing';
import RequireAuth from '../routes/RequireAuth';
import { Stores } from '../routes/Stores/Stores';

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route element={<RequireAuth />}>
        <Route path='/stores' element={<Stores />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/marketing' element={<Marketing />} />
      </Route>
    </Routes>
  );
};
