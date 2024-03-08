import './ListingAlternate.css';

const Listing = ({ name, price, code, image, alt}) => {
    return (
        <div id="listingAlternate">
            <img src={image} alt={alt} />
            <div id="listingContainerAlt">
                <h3>{name}</h3>
                <h6>{code}</h6>
            </div>
            <hr/>
            <h4>{price}€</h4>
        </div>
    )
}

export default Listing;