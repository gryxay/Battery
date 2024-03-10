import './App.css';
import './components/Colors.css';
import Landing from './pages/Landing';
import Listings from './pages/Listings'; // Assuming you have a Listings component
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:category" element={<Listings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
