// Frontend code
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ListingAlternate from './ListingAlternate';
import Listing from './Listing';
import '../styles/Pagination.css';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useParams } from 'react-router-dom';

const MultipleListings = ({ itemsPerPage }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [items, setItems] = useState([]);
    const { height, width } = useWindowDimensions();
    const { category } = useParams();

    useEffect(() => {
        // Fetch items from the backend when the component mounts
        fetchItems();
    }, []);
    
    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/getitems/${category}`);
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItems(data); // Update the items state with the fetched data
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div id="multiple-listings-main">
                { width > 1000 &&
                    <div id="multipleListingContainer">
                        {currentItems.map((item) => (
                            <ListingAlternate
                                key={item.id} // Assuming each item has a unique ID
                                id={item.id}
                                category={category}
                                cart={false}
                                name={item.name}
                                image={`data:${item.images[0].type};base64,${item.images[0].data}`} // Use base64 data as image source
                                price={item.price}
                                code={item.code}
                                alt={item.name}
                            />
                        ))}
                    </div>
                }
                { width <= 1000 &&
                    <div id="multipleListingContainer">
                        {currentItems.map((item) => (
                            <Listing
                                key={item.id} // Assuming each item has a unique ID
                                id={item.id}
                                category={category}
                                cart={false}
                                name={item.name}
                                image={`data:${item.images[0].type};base64,${item.images[0].data}`} // Use base64 data as image source
                                price={item.price}
                                code={item.code}
                                alt={item.name}
                            />
                        ))}
                    </div>
                }

                <ReactPaginate
                    activeClassName={'item active '}
                    breakClassName={'item break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    marginPagesDisplayed={2}
                    nextClassName={"item next "}
                    nextLabel={'>'}
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    previousLabel={'<'}
                    id="pagination"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    );
}

export default MultipleListings;
