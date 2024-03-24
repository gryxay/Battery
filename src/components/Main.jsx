import { useState, useEffect } from 'react';
import { Carousel as ImageCarousel } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../styles/Main.css';
import Listing from './Listing';
import ListingAlternate from './ListingAlternate';

const Main = () => {
    const [images, setImages] = useState(['']);
    const { height, width } = useWindowDimensions();

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getItems');
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            setImages(data[0].images); // Fetch images from first item
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    return (
        <div id="parent">
            <div id="mainContainer">
                <div className="carousel">
                    <ImageCarousel style={{ width: '35vw', height: '60vh'}} slide={true} data-bs-theme="dark">
                        {images.map((image, index) => (
                            <ImageCarousel.Item key={index}>
                                <img src={`data:${images[index].type};base64,${images[index].data}`} alt={`prop ${index + 1}`} />
                            </ImageCarousel.Item>
                        ))}
                    </ImageCarousel>
                </div>

                { width && width > 1200 &&
                <div id="new">
                    <h2>Mėnesio Prekės</h2>
                    {images.map((image, index) => (
                        <Listing
                            key={index}
                            cart={false}
                            name={`VARTA akumuliatorius ${index + 1}`}
                            image={`data:${images[index%2].type};base64,${images[index%2].data}`}
                            price={'10.99'}
                            code={'ASD123'}
                            alt={`Prop ${index + 1}`}
                        />
                    ))}
                </div>
                }

                { width && width <= 1200 &&
                <div id="new">
                    <h2>Mėnesio Prekės</h2>
                    <Carousel responsive={responsive}>
                        {images.map((image, index) => (
                            <ListingAlternate
                                key={index}
                                cart={false}
                                name={`VARTA akumuliatorius ${index + 1}`}
                                image={`data:${images[index%2].type};base64,${images[index%2].data}`}
                                price={'10.99'}
                                code={'ASD123'}
                                alt={`Prop ${index + 1}`}
                            />
                        ))}
                    </Carousel>
                </div>
                }
            </div>

            <hr style={{ width: "90%", alignSelf: "center", marginTop: "4vh" }}/>

            <div id="popular">
                <h2>Perkamiausi</h2>
                <Carousel responsive={responsive}>
                    <ListingAlternate name={'VARTA akumuliatorius 1'} image={`data:${images[0].type};base64,${images[0].data}`} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 2'} image={`data:${images[0].type};base64,${images[0].data}`} price={'15.99'} code={'ASD123'} alt={'Prop 2'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 1'} image={`data:${images[0].type};base64,${images[0].data}`} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 2'} image={`data:${images[0].type};base64,${images[0].data}`} price={'15.99'} code={'ASD123'} alt={'Prop 2'}/>
                </Carousel>
            </div>

            <hr style={{ width: "90%", alignSelf: "center", marginTop: "4vh" }}/>

            <div id="popular">
                <h2>Akumuliatoriai</h2>
                <Carousel responsive={responsive}>
                    <ListingAlternate name={'VARTA akumuliatorius 1'} image={`data:${images[0].type};base64,${images[0].data}`} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 2'} image={`data:${images[0].type};base64,${images[0].data}`} price={'15.99'} code={'ASD123'} alt={'Prop 2'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 1'} image={`data:${images[0].type};base64,${images[0].data}`} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 2'} image={`data:${images[0].type};base64,${images[0].data}`} price={'15.99'} code={'ASD123'} alt={'Prop 2'}/>
                </Carousel>
            </div>

            <hr style={{ width: "90%", alignSelf: "center", marginTop: "4vh" }}/>
        </div>
      );
}

export default Main;
