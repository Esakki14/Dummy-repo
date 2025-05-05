// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './getUser/User';
import Add from './getUser/Add';
import Update from './getUser/Update';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
