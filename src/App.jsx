import { useState } from 'react'
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className='app'>
      <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App
