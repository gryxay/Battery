import { Carousel as ImageCarousel } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../styles/Main.css';
import Listing from './Listing';
import ListingAlternate from './ListingAlternate';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Main = () => {

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

    const { height, width } = useWindowDimensions();


    return (
        <div id="parent">
            <div id="mainContainer">
                <div className="carousel">
                    <ImageCarousel style={{ width: '35vw', height: '60vh'}} slide={true} data-bs-theme="dark">
                    <ImageCarousel.Item>
                        <img src={require('../assets/prop1.jpg')} alt='prop 1'  />
                    </ImageCarousel.Item>
                    <ImageCarousel.Item>
                    <img src={require('../assets/prop2.jpg')} alt='prop 2' />
                    </ImageCarousel.Item>
                    </ImageCarousel>
                </div>

                { width && width > 1200 &&
                <div id="new">
                    <h2>Mėnesio Prekės</h2>
                    <Listing cart={false} name={'VARTA akumuliatorius 1'} image={require('../assets/prop1.jpg')} price={'10.99'} code={'ASD123'}  alt={'Prop 1'}/>
                    <Listing cart={false} name={'VARTA akumuliatorius 2'} image={require('../assets/prop2.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 2'}/>
                    <Listing cart={false} name={'VARTA akumuliatorius 1'} image={require('../assets/prop1.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                    <Listing cart={false} name={'VARTA akumuliatorius 2'} image={require('../assets/prop2.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 2'}/>
                </div>
                }

                { width && width <= 1200 &&
                <div id="new">
                    <h2>Mėnesio Prekės</h2>
                    <Carousel responsive={responsive}>
                        <ListingAlternate cart={false} name={'VARTA akumuliatorius 1'} image={require('../assets/prop1.jpg')} price={'10.99'} code={'ASD123'}  alt={'Prop 1'}/>
                        <ListingAlternate cart={false} name={'VARTA akumuliatorius 2'} image={require('../assets/prop2.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 2'}/>
                        <ListingAlternate cart={false} name={'VARTA akumuliatorius 1'} image={require('../assets/prop1.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                        <ListingAlternate cart={false} name={'VARTA akumuliatorius 2'} image={require('../assets/prop2.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 2'}/>
                    </Carousel>
                </div>
                }
            </div>

            <hr style={{ width: "90%", alignSelf: "center", marginTop: "4vh" }}/>

            <div id="popular">
                <h2>Perkamiausi</h2>
                <Carousel responsive={responsive}>
                    <ListingAlternate name={'VARTA akumuliatorius 1'} image={require('../assets/prop1.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 2'} image={require('../assets/prop2.jpg')} price={'15.99'} code={'ASD123'} alt={'Prop 2'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 1'} image={require('../assets/prop1.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 2'} image={require('../assets/prop2.jpg')} price={'15.99'} code={'ASD123'} alt={'Prop 2'}/>
                </Carousel>
            </div>

            <hr style={{ width: "90%", alignSelf: "center", marginTop: "4vh" }}/>

            <div id="popular">
                <h2>Akumuliatoriai</h2>
                <Carousel responsive={responsive}>
                    <ListingAlternate name={'VARTA akumuliatorius 1'} image={require('../assets/prop1.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 2'} image={require('../assets/prop2.jpg')} price={'15.99'} code={'ASD123'} alt={'Prop 2'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 1'} image={require('../assets/prop1.jpg')} price={'10.99'} code={'ASD123'} alt={'Prop 1'}/>
                    <ListingAlternate name={'VARTA akumuliatorius 2'} image={require('../assets/prop2.jpg')} price={'15.99'} code={'ASD123'} alt={'Prop 2'}/>
                </Carousel>
            </div>

            <hr style={{ width: "90%", alignSelf: "center", marginTop: "4vh" }}/>
        </div>
      );
}

export default Main;