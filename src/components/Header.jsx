import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import "./Header.css";

const Header = () => {
    return (
        <div id="header">
            <img src={require('../assets/logo.png')} alt="Varta logo" id="logo" />
            <div id="input">
                <input type="text" placeholder="Ieškoti"></input>
                <button>Ieškoti</button>
            </div>
            <div id="icons">
                <RiShoppingCart2Fill size={40} id="cart" />
                <MdAccountCircle size={40} />
            </div>
        </div>
    )
}

export default Header;