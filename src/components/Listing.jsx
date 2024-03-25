import '../styles/Listing.css';
import Form from 'react-bootstrap/Form';
import { RiShoppingCart2Fill } from "react-icons/ri";

const Listing = ({ cart=true, id, category, name, price, code, image, alt}) => {
    return (
        <a href={`/${category}/${id}`} className='listing-a'>
            <div id="listing">
                <img src={image} alt={alt} />
                <div id="listingContainer">
                    <h3>{name}</h3>
                    <h6>{code}</h6>
                </div>
                
                { cart &&
                    <div id="listingCart">
                        <h4>{price}€</h4>
                        <div>
                            <Form.Control type="number" placeholder="1" min={1} style={{ display: 'inline-block', width: '30%', marginRight: '1rem'}} />
                            <RiShoppingCart2Fill size={40} style={{ cursor: 'pointer' }} onClick={() => {}}/>
                        </div>
                    </div>
                }
            </div>
        </a>
    )
}

export default Listing;