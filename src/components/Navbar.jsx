import React, { useState } from 'react';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';

const Navigation = () => {

    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showDropdown3, setShowDropdown3] = useState(false);
    const [showDropdown4, setShowDropdown4] = useState(false);
    const [showDropdown5, setShowDropdown5] = useState(false);
    const [showDropdown7, setShowDropdown7] = useState(false);
    const [showDropdown8, setShowDropdown8] = useState(false);
    const [showDropdown10, setShowDropdown10] = useState(false);
    const [showDropdownInner1, setShowDropdownInner1] = useState(false);
    const [showDropdownInner2, setShowDropdownInner2] = useState(false);
    const [showDropdownInner3, setShowDropdownInner3] = useState(false);

    const showDropdown = (dropdownNumber) => {
        switch(dropdownNumber) {
            case 1:
                setShowDropdown1(true);
                break;
            case 2:
                setShowDropdown2(true);
                break;
            case 3:
                setShowDropdown3(true);
                break;
            case 4:
                setShowDropdown4(true);
                break;
            case 5:
                setShowDropdown5(true);
                break;
            case 7:
                setShowDropdown7(true);
                break;
            case 8:
                setShowDropdown8(true);
                break;
            case 10:
                setShowDropdown10(true);
                break;
            case 101:
                setShowDropdownInner1(true);
                break;
            case 102:
                setShowDropdownInner2(true);
                break;
            case 103:
                setShowDropdownInner3(true);
                break;
            default:
                break;
        }
    }

    const hideDropdown = (dropdownNumber) => {
        switch(dropdownNumber) {
            case 1:
                setShowDropdown1(false);
                break;
            case 2:
                setShowDropdown2(false);
                break;
            case 3:
                setShowDropdown3(false);
                break;
            case 4:
                setShowDropdown4(false);
                break;
            case 5:
                setShowDropdown5(false);
                break;
            case 7:
                setShowDropdown7(false);
                break;
            case 8:
                setShowDropdown8(false);
                break;
            case 10:
                setShowDropdown10(false);
                break;
            case 101:
                setShowDropdownInner1(false);
                break;
            case 102:
                setShowDropdownInner2(false);
                break;
            case 103:
                setShowDropdownInner3(false);
                break;
            default:
                break;
        }
    }

    return (
        <Navbar expand="lg" variant="dark" className="bg-body-tertiary" style={{ backgroundColor: '#0c1e8d' }}>
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Lemputės" id="basic-nav-dropdown1" show={showDropdown1} onMouseEnter={() => showDropdown(1)} onMouseLeave={() => hideDropdown(1)}>

                            <NavDropdown title="Šviesos diodų LED" className="dropdown-item" id="dropdown-inner" drop="end" show={showDropdownInner1} onMouseEnter={() => showDropdown(101)} onMouseLeave={() => hideDropdown(101)}>
                                <NavDropdown.Item href="#action/3.2">E14</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">E27</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">G4</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">GU10</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">GU5.3</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">G9</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">MR16</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">T8</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown.Item href="#action/3.2">Halogeninės</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Kaitrinės</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Automobilių</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Kitos</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="LED šviestuvai" id="basic-nav-dropdown2" show={showDropdown2} onMouseEnter={() => showDropdown(2)} onMouseLeave={() => hideDropdown(2)}>
                            <NavDropdown.Item href="#action/3.1">Valdomi pultu</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Įmontuojami</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Paviršiniai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Staliniai, toršerai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Prožektoriai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Pramoniniai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Saulės</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">IP44, IP54, IP55</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="LED juostos" id="basic-nav-dropdown3" show={showDropdown3} onMouseEnter={() => showDropdown(3)} onMouseLeave={() => hideDropdown(3)}>
                            <NavDropdown.Item href="#action/3.1">IP20</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">IP65</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Maitinimo šaltiniai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Valdikliai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Profiliai</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Baterijos" id="basic-nav-dropdown4" show={showDropdown4} onMouseEnter={() => showDropdown(4)} onMouseLeave={() => hideDropdown(4)}>
                            
                            <NavDropdown title="Standartinės" className="dropdown-item" id="dropdown-inner" drop="end" show={showDropdownInner2} onMouseEnter={() => showDropdown(102)} onMouseLeave={() => hideDropdown(102)}>
                                <NavDropdown.Item href="#action/3.2">AA</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">AAA</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">C</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">D</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">9V</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">3R12</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Kitos</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown.Item href="#action/3.2">Ličio CR</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Mikro</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Įkraunamos baterijos" id="basic-nav-dropdown5" show={showDropdown5} onMouseEnter={() => showDropdown(5)} onMouseLeave={() => hideDropdown(5)}>
                            
                            <NavDropdown title="Ni-MH įkraunamos baterijos" className="dropdown-item" id="dropdown-inner" drop="end" show={showDropdownInner3} onMouseEnter={() => showDropdown(103)} onMouseLeave={() => hideDropdown(103)}>
                                <NavDropdown.Item href="#action/3.2">AA</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">AAA</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">C</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">D</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">9V</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Kitos</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown.Item href="#action/3.2">Švino-rugštiniai akumuliatoriiai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Li-ion baterijos</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link id="basic-nav-dropdown6">Įkrovikliai</Nav.Link>

                        <NavDropdown title="Žibintuvėliai" id="basic-nav-dropdown7" show={showDropdown7} onMouseEnter={() => showDropdown(7)} onMouseLeave={() => hideDropdown(7)}>
                            <NavDropdown.Item href="#action/3.1">Įkraunami</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Su baterijomis</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Galvos</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Elektros instaliacija" id="basic-nav-dropdown8" show={showDropdown8} onMouseEnter={() => showDropdown(8)} onMouseLeave={() => hideDropdown(8)}>
                            <NavDropdown.Item href="#action/3.1">Jungikliai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Lizdai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Kaladėlės</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Kištukai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Šakotuvai</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Kabelių kanalai</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link id="basic-nav-dropdown6">Ilgintuvai</Nav.Link>

                        <NavDropdown title="Lipnios juostos" id="basic-nav-dropdown10" show={showDropdown10} onMouseEnter={() => showDropdown(10)} onMouseLeave={() => hideDropdown(10)}>
                            <NavDropdown.Item href="#action/3.1">Pakavimo</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Dažymo</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Profesionalios</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Kitos</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link id="basic-nav-dropdown6">Kitos prekės</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
