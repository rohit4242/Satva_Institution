import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login} from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import './App.css';

import { UserAuthContextProvider } from './contexts/AuthContext';
import AdminProtectedRouter from './Router/AdminProtectedRouter';
import ProtectedRouter from './Router/ProtectedRouter';
import Unauthorized from './pages/Unauthorized';
import NotFound from './components/NotFound';

import Admin from './components/Admin';
const App = () => {
 

  return (
      <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/Dashboard" element={<AdminProtectedRouter><Admin /></AdminProtectedRouter>} >
              <Route path="/Dashboard" element={<Navigate to="Home" />} />
              <Route path="Home" element={(<Ecommerce />)} />

              {/* pages  */}
              <Route path="orders" element={<ProtectedRouter role="rWcAaeoPKANSzrinaZkH6QWCz313"><Orders /></ProtectedRouter>} />
              <Route path="employees" element={<Employees />} />
              <Route path="customers" element={<Customers />} />

              {/* apps  */}
              <Route path="kanban" element={<Kanban />} />
              <Route path="editor" element={<Editor />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="color-picker" element={<ColorPicker />} />

              {/* charts  */}
              <Route path="line" element={<Line />} />
              <Route path="area" element={<Area />} />
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="financial" element={<Financial />} />
              <Route path="color-mapping" element={<ColorMapping />} />
              <Route path="pyramid" element={<Pyramid />} />
              <Route path="stacked" element={<Stacked />} />
              <Route path="unauthorized" element={<Unauthorized />} />

            </Route>
            <Route path="/" element={(<Login />)} />
            <Route path="*" element={(<NotFound />)} />

          </Routes>
        </BrowserRouter>
      </UserAuthContextProvider>
  );
};

export default App;
