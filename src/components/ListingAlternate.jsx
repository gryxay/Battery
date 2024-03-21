import { useEffect } from 'react';
import '../styles/ListingAlternate.css';

const Listing = ({ id, category, name, price, code, image, alt}) => {

    return (
        <a href={`/${category}/${id}`}>
            <div id="listingAlternate">
                <img src={image} alt={alt} />
                <div id="listingContainerAlt">
                    <h3>{name}</h3>
                    <h6>{code}</h6>
                </div>
                <hr/>
                <h4>{price}€</h4>
            </div>
        </a>
    )
}

export default Listing;