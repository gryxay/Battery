import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/Main';
import Navigation from '../components/Navbar';
import { useState } from 'react';

function Landing() {

  const [category, setCategory] = useState('')

  return (
    <>
      <Header />
      <Navigation />
      <Main />
      <Footer />
    </>
  );
}

export default Landing;
