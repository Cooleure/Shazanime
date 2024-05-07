import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Processing from './Processing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/processing" element={<Processing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
