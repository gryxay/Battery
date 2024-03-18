import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ListingAlternate from './ListingAlternate';
import Listing from './Listing';
import '../styles/Pagination.css';
import useWindowDimensions from '../hooks/useWindowDimensions';

const MultipleListings = ({ itemsPerPage }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const items = Array.from({ length: 45 }, (_, i) => i + 1); // Generate an array of numbers from 1 to 45
  
    const { height, width } = useWindowDimensions();

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage;
      setItemOffset(newOffset);
    };

    return (
    <>
    { width >1250 &&
      <div id="multiple-listings-main" >
        <div id="multipleListingContainer">
          {currentItems.map((item) => (
          <ListingAlternate
              key={item}
              cart={false}
              name={`VARTA akumuliatorius ${item}`}
              image={require(`../assets/prop1.jpg`)}
              price={'10.99'}
              code={`ASD123${item}`}
              alt={`Prop ${item}`}
            />
            ))}
          </div>
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
    }

    {
      width <= 1250 &&
      <div id="multiple-listings-main" >
      <div id="multipleListingContainer">
        {currentItems.map((item) => (
        <Listing
            key={item}
            cart={false}
            name={`VARTA akumuliatorius ${item}`}
            image={require(`../assets/prop1.jpg`)}
            price={'10.99'}
            code={`ASD123${item}`}
            alt={`Prop ${item}`}
          />
          ))}
        </div>
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
    }
    
    </>
    );
}

export default MultipleListings;
