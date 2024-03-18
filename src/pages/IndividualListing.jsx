import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingExpanded from '../components/ListingExpanded';
import '../styles/ExpandedListing.css';
import { useState } from 'react';

const IndividualListing = () => {

    const [category, setCategory] = useState('')
    const { item } = useParams();

    return (
        <>
            <Header />
            <Navbar />
            <ListingExpanded />
            <Footer />
        </>
    )
}

export default IndividualListing;