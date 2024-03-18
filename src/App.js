import './App.css';
import './styles/Colors.css';
import IndividualListing from './pages/IndividualListing';
import Landing from './pages/Landing';
import Listings from './pages/Listings';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from './pages/Account';
import Cart from './pages/Cart';
import React, { useState } from 'react';

function App() {
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterClick = () => {
      setShowFilter(true);
  };

  const handleCloseFilter = () => {
    console.log('rah')
      setShowFilter(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:category" element={<Listings showFilter={showFilter} handleFilterClick={handleFilterClick} handleCloseFilter={handleCloseFilter} />} />
          <Route path="/:category/:item" element={<IndividualListing />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
