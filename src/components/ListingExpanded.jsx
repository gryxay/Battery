import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

const ListingExpanded = () => {

    const data = {
        name: 'VARTA akumuliatorius x smth x smth 5.2V',
        code: 'ABCD1234',
        price: 19.99,
        weight: '0.25kg',
        producer: 'VARTA',
        voltage: '5.4V',
        amount: '6',
        barcode: 'ANBFJ4424CFD553',
        code: 'ABCD1234',
    }

    const [amount, setAmount] = useState(1);
        
    return (
        <>
            <div id="expandedListingContainer">
                <div className="carousel" style={{ display: 'inline' }}>
                    <Carousel className='carouselInnerCustom' id="individualListingCarousel" slide={true} pause={'hover'} data-bs-theme="dark">
                        <Carousel.Item>
                            <img src={require('../assets/prop1.jpg')} alt='prop 1'  />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={require('../assets/prop2.jpg')} alt='prop 2' />
                        </Carousel.Item>
                    </Carousel>
                </div>

                <div id="listingDetails">
                    <h2>{data.name}</h2>
                    <h6>Prekės kodas: {data.code}</h6>

                    <div id="cartContainer">
                        <div id="cart">
                            <div className='d-flex align-items-center justify-content-around'>
                                <Form.Control type="number" placeholder="1" min={1} style={{ display: 'block', width: '5rem', marginRight: '1rem'}}
                                    onChange={(e) => setAmount(e.target.value)} />
                                <h6>Iš viso: {(data.price * amount).toFixed(2)}€</h6>
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
                <Table>
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Gamintojas</td>
                        <td>{data.producer}</td>
                    </tr>
                    <tr>
                        <td>Svoris</td>
                        <td>{data.weight}</td>
                    </tr>
                    <tr>
                        <td>Kiekis</td>
                        <td>{data.amount}</td>
                    </tr>
                    <tr>
                        <td>Įtampa</td>
                        <td>{data.voltage}</td>
                    </tr>
                    <tr>
                        <td>Barkodas</td>
                        <td>{data.barcode}</td>
                    </tr>
                    <tr>
                        <td>Kodas</td>
                        <td>{data.code}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ListingExpanded;