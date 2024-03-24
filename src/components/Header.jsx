import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import "../styles/Header.css";
import useWindowDimensions from '../hooks/useWindowDimensions';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";

const Header = () => {

    const { height, width } = useWindowDimensions();

    const [toggleDropdown1, setToggleDropdown1] = useState(false);
    const [toggleDropdown2, setToggleDropdown2] = useState(false);
    const [toggleDropdown3, setToggleDropdown3] = useState(false);
    const [toggleDropdown4, setToggleDropdown4] = useState(false);
    const [toggleDropdown5, setToggleDropdown5] = useState(false);
    const [toggleDropdown7, setToggleDropdown7] = useState(false);
    const [toggleDropdown8, setToggleDropdown8] = useState(false);
    const [toggleDropdown10, setToggleDropdown10] = useState(false);
    const [toggleDropdownInner1, setToggleDropdownInner1] = useState(true);
    const [toggleDropdownInner2, setToggleDropdownInner2] = useState(true);
    const [toggleDropdownInner3, setToggleDropdownInner3] = useState(true);
    const [toggleDropdownInner4, setToggleDropdownInner4] = useState(true);

    const toggleDropdown = (dropdownNumber) => {
        switch(dropdownNumber) {
            case 1:
                setToggleDropdown1(!toggleDropdown1);
                break;
            case 2:
                setToggleDropdown2(!toggleDropdown2);
                break;
            case 3:
                setToggleDropdown3(!toggleDropdown3);
                break;
            case 4:
                setToggleDropdown4(!toggleDropdown4);
                break;
            case 5:
                setToggleDropdown5(!toggleDropdown5);
                break;
            case 7:
                setToggleDropdown7(!toggleDropdown7);
                break;
            case 8:
                setToggleDropdown8(!toggleDropdown8);
                break;
            case 10:
                setToggleDropdown10(!toggleDropdown10);
                break;
            default:
                break;
        }
    }

    const navbarElements = (
        <Nav className="me-auto">
            <NavDropdown title="Lemputės" id="basic-nav-dropdown1" show={toggleDropdown1} onClick={() => toggleDropdown(1)}>

                <NavDropdown title="Šviesos diodų LED" className="dropdown-item " id="dropdown-inner" drop="right" show={toggleDropdownInner1}>
                    <NavDropdown.Item href="/sviesos-diodu-led-e14">E14</NavDropdown.Item>
                    <NavDropdown.Item href="/sviesos-diodu-led-e27">E27</NavDropdown.Item>
                    <NavDropdown.Item href="/sviesos-diodu-led-g4">G4</NavDropdown.Item>
                    <NavDropdown.Item href="/sviesos-diodu-led-gu10">GU10</NavDropdown.Item>
                    <NavDropdown.Item href="/sviesos-diodu-led-gu53">GU5.3</NavDropdown.Item>
                    <NavDropdown.Item href="/sviesos-diodu-led-g9">G9</NavDropdown.Item>
                    <NavDropdown.Item href="/sviesos-diodu-led-mr16">MR16</NavDropdown.Item>
                    <NavDropdown.Item href="/sviesos-diodu-led-t8">T8</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown.Item href="/led-halogenines">Halogeninės</NavDropdown.Item>
                <NavDropdown.Item href="/led-kaitrines">Kaitrinės</NavDropdown.Item>
                <NavDropdown.Item href="/led-automobiliu">Automobilių</NavDropdown.Item>
                <NavDropdown.Item href="/led-kitos">Kitos</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="LED šviestuvai" id="basic-nav-dropdown2" show={toggleDropdown2} onClick={() => toggleDropdown(2)}>
                <NavDropdown.Item href="/led-sviestuvai-pultu">Valdomi pultu</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-imontuojami">Įmontuojami</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-pavirsiniai">Paviršiniai</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-torserai">Staliniai, toršerai</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-prozektoriai">Prožektoriai</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-pramoniniai">Pramoniniai</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-saules">Saulės</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-ip44-54-55">IP44, IP54, IP55</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="LED juostos" id="basic-nav-dropdown3" show={toggleDropdown3} onClick={() => toggleDropdown(3)}>
                <NavDropdown.Item href="/led-juostos-ip20">IP20</NavDropdown.Item>
                <NavDropdown.Item href="/led-juostos-ip65">IP65</NavDropdown.Item>
                <NavDropdown.Item href="/led-juostos-maitinimo-saltiniai">Maitinimo šaltiniai</NavDropdown.Item>
                <NavDropdown.Item href="/led-juostos-valdikliai">Valdikliai</NavDropdown.Item>
                <NavDropdown.Item href="/led-juostos-profiliai">Profiliai</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Baterijos" id="basic-nav-dropdown4" show={toggleDropdown4} onClick={() => toggleDropdown(4)}>
                
                <NavDropdown title="Standartinės" className="dropdown-item" id="dropdown-inner" drop="end" show={toggleDropdownInner2}>
                    <NavDropdown.Item href="/baterijos-aa">AA</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-aaa">AAA</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-c">C</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-d">D</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-9v">9V</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-3r12">3R12</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-kitos">Kitos</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Įkraunamos baterijos" className="dropdown-item" id="dropdown-inner" drop={'end'}  show={toggleDropdown5} onClick={() => toggleDropdown(5)}>
                
                <NavDropdown title="Ni-MH įkraunamos baterijos" className="dropdown-item" id="dropdown-inner" drop="end" show={toggleDropdownInner3}>
                    <NavDropdown.Item href="/ni-mh-ikraunamos-baterijos-aa">AA</NavDropdown.Item>
                    <NavDropdown.Item href="/ni-mh-ikraunamos-baterijos-aaa">AAA</NavDropdown.Item>
                    <NavDropdown.Item href="/ni-mh-ikraunamos-baterijos-c">C</NavDropdown.Item>
                    <NavDropdown.Item href="/ni-mh-ikraunamos-baterijos-d">D</NavDropdown.Item>
                    <NavDropdown.Item href="/ni-mh-ikraunamos-baterijos-9v">9V</NavDropdown.Item>
                    <NavDropdown.Item href="/ni-mh-ikraunamos-baterijos-kitos">Kitos</NavDropdown.Item>
                </NavDropdown>

                    <NavDropdown.Item href="/svino-akumuliatoriai">Švino-rugštiniai akumuliatoriiai</NavDropdown.Item>
                    <NavDropdown.Item href="/li-on-baterijos">Li-ion baterijos</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown.Item href="licio-cr-baterjos">Ličio CR</NavDropdown.Item>
                <NavDropdown.Item href="/mikro-baterijos">Mikro</NavDropdown.Item>
            </NavDropdown>


            <Nav.Link id="basic-nav-dropdown6">Įkrovikliai</Nav.Link>

            <NavDropdown title="Žibintuvėliai" id="basic-nav-dropdown7" show={toggleDropdown7} onClick={() => toggleDropdown(7)}>
                <NavDropdown.Item href="/ikraunami-zibintuveliai">Įkraunami</NavDropdown.Item>
                <NavDropdown.Item href="/zibintuveliai-su-baterijomis">Su baterijomis</NavDropdown.Item>
                <NavDropdown.Item href="/zibintuveliai-galvos">Galvos</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Elektros instaliacija" id="basic-nav-dropdown8" show={toggleDropdown8} onClick={() => toggleDropdown(8)}>
                <NavDropdown.Item href="/elektros-instaliacija-jungikliai">Jungikliai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-lizdai">Lizdai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-kaladeles">Kaladėlės</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-kistukai">Kištukai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-sakotuvai">Šakotuvai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-kabeliu-kanalai">Kabelių kanalai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-ilgintuvai">Ilgintuvai</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Kitos prekės" id="basic-nav-dropdown10" show={toggleDropdown10} onClick={() => toggleDropdown(10)}>

                <NavDropdown title="Lipnios juostos" className="dropdown-item" id="dropdown-inner" drop="end" show={toggleDropdownInner4}>
                    <NavDropdown.Item href="/kitos-prekes-pakavimo">Pakavimo</NavDropdown.Item>
                    <NavDropdown.Item href="/kitos-prekes-dazymo">Dažymo</NavDropdown.Item>
                    <NavDropdown.Item href="/kitos-prekes-profesionalios">Profesionalios</NavDropdown.Item>
                    <NavDropdown.Item href="/kitos-prekes-kitos">Kitos</NavDropdown.Item>
                </NavDropdown>
            </NavDropdown>

        </Nav>
    )

    return (
        <>

        {
            width >= 1000 &&
            <div id="header">
                <a href="/" style={{ width: '3rem', height: '3rem' }}>
                    <img src={require('../assets/logo.png')} alt="Battery logo" id="logo" />
                </a>
                <div id="icons" className="d-flex">
                    <a href="/cart">
                        <RiShoppingCart2Fill size={40} id="headerCart" />
                    </a>
                    <a href="/account">
                        <MdAccountCircle size={40} />
                    </a>
                </div>
            </div>
        }

        {
            width < 1000 &&
            <Navbar key={false} expand={false} className="bg-body-tertiary mb-3" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">BATTERY</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
                    <div id="mobile-header-container" className="d-inline-flex">
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-false`}
                            aria-labelledby={`offcanvas`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvas`} style={{ color: 'white'}}>
                                BATTERY
                            </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {navbarElements}
                            </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        <Nav.Link href="/cart">
                            <RiShoppingCart2Fill size={40} id="headerCart" />
                        </Nav.Link>
                        <Nav.Link href="/account">
                            <MdAccountCircle size={40} />
                        </Nav.Link>
                    </div>
                </Container>
            </Navbar>
        }

    </>

    )
}

export default Header;