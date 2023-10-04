import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashLayout from './components/dash-layout.comp';

// comp
import Layout from './components/layout.comp';
import Login from './features/login.comp';
import Public from './components/public.comp';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="dash" element={<DashLayout />} />
      </Route>
    </Routes>
  );
}
