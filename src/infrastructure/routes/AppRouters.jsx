import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as C from '../screens';

const AppRouters = () => {
  return (
    <Router>
      <C.MenuListNav />
      <Routes>
        <Route exact path='/' element={<C.Home />} />
        <Route path='PlateSearch' element={<C.PlateSearch />} />
        <Route path='*' element={<C.Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouters;
