import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Containers from './pages/Containers';
import Movements from './pages/Movements';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Containers/>} />
      <Route path='/movements' element={<Movements/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
