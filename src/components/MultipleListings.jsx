import ListingAlternate from './ListingAlternate';

const MultipleListings = () => {
  // Array to store repeated listings
  const listings = Array.from({ length: 15 }, (_, index) => (
    <ListingAlternate
      key={index}
      cart={false}
      name={`VARTA akumuliatorius ${index + 1}`}
      image={require(`../assets/prop1.webp`)}
      price={'10.99'}
      code={`ASD123${index + 1}`}
      alt={`Prop ${index + 1}`}
    />
  ));

  return (
    <div id="multipleListingContainer">
      {listings}
    </div>
  );
}

export default MultipleListings;
