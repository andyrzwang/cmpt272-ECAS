import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import Placeholder from './components/Placeholder';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className='app'>
      <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/placeholder" element={<Placeholder />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App
