import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NewListing from "../components/NewListing";
import '../styles/Crud.css';
import { useParams } from "react-router";

const Crud = () => {

    const { id } = useParams();

    return (
        <>
            <Header />
            <Navbar />
            <NewListing id={id} />
            <Footer />
        </>
    )
}

export default Crud;