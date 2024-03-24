import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import MultipleListings from '../components/MultipleListings';
import '../styles/MultipleListings.css';
import { IoFilterSharp } from "react-icons/io5";
import useWindowDimensions from '../hooks/useWindowDimensions';
import Filter from '../components/Filter';

const Listings = ({ showFilter, handleFilterClick, handleCloseFilter }) => {
    const { category } = useParams();
    const { width } = useWindowDimensions();

    return (
        <>
            <Header />
            <Navbar />
            <div id='listingsContainer'>
                { width <= 850 &&
                    <IoFilterSharp size={1000} id='filter-icon' onClick={handleFilterClick} />
                }
                { width > 850 &&
                    <Filter show={showFilter} handleCloseFilter={handleCloseFilter} />
                }

                <MultipleListings itemsPerPage={5} />
            </div>
            <Footer />
            { width <= 850 &&
                <Filter show={showFilter} handleCloseFilter={handleCloseFilter} />
            }
        </>
    );
};

export default Listings;
