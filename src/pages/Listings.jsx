import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import MultipleListings from '../components/MultipleListings';
import '../components/MultipleListings.css';

const Listings = () => {
    // Access the parameters from the URL
    const { category } = useParams();

    return (
        <>
            <Header />
            <Navbar />
            <div id='listingsContainer'>
                <Filter price={true}/>
                <MultipleListings />
            </div>
            <Footer />
        </>
    );
};

export default Listings;
