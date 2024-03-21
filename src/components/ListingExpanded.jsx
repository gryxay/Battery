import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import { IoIosSettings } from "react-icons/io";

const ListingExpanded = () => {
    const [listingData, setListingData] = useState(null);
    const [amount, setAmount] = useState(1);
    const { item } = useParams();


    const fetchListingData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/items/${item}`); // Change the ID as needed
            if (!response.ok) {
                throw new Error('Failed to fetch listing data');
            }
            const data = await response.json();
            setListingData(data);
        } catch (error) {
            console.error('Error fetching listing data:', error);
        }
    };

    useEffect(() => {
        fetchListingData();
    }, []);

    const translateToLithuanian = (key) => {
        const translations = {
            price: 'Kaina',
            code: 'Kodas',
            amount: 'Kiekis',
            manufacturer: 'Gamintojas',
            weight: 'Svoris',
            comment: 'Komentarai',
            measurements: 'Išmatavimai',
            packaging: 'Pakavimas'
        };
    
        return translations[key] || key; // Return the translation or the original key if translation not found
    };

    if (!listingData) {
        return <div id="loading"><h3>Kraunama...</h3></div>;
    }

    const renderSpecifications = () => {
        const excludedKeys = ['id', 'name', 'category', 'images'];
        return Object.keys(listingData.details).map((key) => {
            if (!excludedKeys.includes(key)) {
                return (
                    <tr key={key}>
                        <td>{translateToLithuanian(key)}</td>
                        <td>{listingData.details[key]}</td>
                    </tr>
                );
            }
            return null;
        });
    };

    return (
        <>
            <div id="expandedListingContainer">
                <div className="carousel" style={{ display: 'inline' }}>
                    <Carousel className='carouselInnerCustom' id="individualListingCarousel" slide={true} pause={'hover'} data-bs-theme="dark">
                    {listingData.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img src={`data:${listingData.images[index].type};base64,${listingData.images[index].data}`} alt={`prop ${index + 1}`} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div id="listingDetails">
                    <h2>{listingData.name}</h2>
                    <h6>Prekės kodas: {listingData.code}</h6>

                    <div id="cartContainer">
                        <div id="cart">
                            <div className='d-flex align-items-center justify-content-around'>
                                <Form.Control type="number" placeholder="1" min={1} style={{ display: 'block', width: '5rem', marginRight: '1rem'}}
                                    onChange={(e) => setAmount(e.target.value)} />
                                <h6>Iš viso: {(listingData.price * amount).toFixed(2)}€</h6>
                            </div>

                            <hr className='hr-primary' />

                            <Button variant="primary"  id="cartButton">
                                <RiShoppingCart2Fill size={40} style={{ marginRight: '1rem' }}/>
                                PRIDĖTI Į KREPŠELĮ
                            </Button>
                        </div>

                        <div id="delivery">
                            <div className='d-flex'>
                                <FaHome className='icon' />
                                <h6>Pristatymas į namus 1-2 d.d.</h6>
                            </div>
                            <div className='d-flex'>
                                <FiPackage className='icon' />
                                <h6>Pristatymas į paštomatą 1-2 d.d.</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='hr-primary' />

            <div id="specifications">
                <h4>Specifikacijos</h4>
                <div id="specifications-table">
                    <Table>
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                        <tbody>
                            {renderSpecifications()}
                        </tbody>
                    </Table>
                    <a href={`/crud/${item}`}>
                        <IoIosSettings size={50}/>
                    </a>
                </div>
            </div>
        </>
    );
};

export default ListingExpanded;