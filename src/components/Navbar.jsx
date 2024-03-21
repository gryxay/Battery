import React, { useState } from 'react';
import '../styles/Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
import useWindowDimensions from '../hooks/useWindowDimensions';

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
    const [showDropdownInner4, setShowDropdownInner4] = useState(false);

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
            case 104:
                setShowDropdownInner4(true);
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
            case 104:
                setShowDropdownInner4(false);
                break;
            default:
                break;
        }
    }

    const navbarElements = (
        <Nav className="me-auto">
            <NavDropdown title="Lemputės" id="basic-nav-dropdown1" show={showDropdown1} onMouseEnter={() => showDropdown(1)} onMouseLeave={() => hideDropdown(1)}>

                <NavDropdown title="Šviesos diodų LED" className="dropdown-item" id="dropdown-inner" drop="end" show={showDropdownInner1} onMouseEnter={() => showDropdown(101)} onMouseLeave={() => hideDropdown(101)}>
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

            <NavDropdown title="LED šviestuvai" id="basic-nav-dropdown2" show={showDropdown2} onMouseEnter={() => showDropdown(2)} onMouseLeave={() => hideDropdown(2)}>
                <NavDropdown.Item href="/led-sviestuvai-pultu">Valdomi pultu</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-imontuojami">Įmontuojami</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-pavirsiniai">Paviršiniai</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-torserai">Staliniai, toršerai</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-prozektoriai">Prožektoriai</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-pramoniniai">Pramoniniai</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-saules">Saulės</NavDropdown.Item>
                <NavDropdown.Item href="/led-sviestuvai-ip44-54-55">IP44, IP54, IP55</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="LED juostos" id="basic-nav-dropdown3" show={showDropdown3} onMouseEnter={() => showDropdown(3)} onMouseLeave={() => hideDropdown(3)}>
                <NavDropdown.Item href="/led-juostos-ip20">IP20</NavDropdown.Item>
                <NavDropdown.Item href="/led-juostos-ip65">IP65</NavDropdown.Item>
                <NavDropdown.Item href="/led-juostos-maitinimo-saltiniai">Maitinimo šaltiniai</NavDropdown.Item>
                <NavDropdown.Item href="/led-juostos-valdikliai">Valdikliai</NavDropdown.Item>
                <NavDropdown.Item href="/led-juostos-profiliai">Profiliai</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Baterijos" id="basic-nav-dropdown4" show={showDropdown4} onMouseEnter={() => showDropdown(4)} onMouseLeave={() => hideDropdown(4)}>
                
                <NavDropdown title="Standartinės" className="dropdown-item" id="dropdown-inner" drop="end" show={showDropdownInner2} onMouseEnter={() => showDropdown(102)} onMouseLeave={() => hideDropdown(102)}>
                    <NavDropdown.Item href="/baterijos-aa">AA</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-aaa">AAA</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-c">C</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-d">D</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-9v">9V</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-3r12">3R12</NavDropdown.Item>
                    <NavDropdown.Item href="/baterijos-kitos">Kitos</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Įkraunamos baterijos" className="dropdown-item" id="dropdown-inner" drop={'end'}  show={showDropdown5} onMouseEnter={() => showDropdown(5)} onMouseLeave={() => hideDropdown(5)}>
                
                <NavDropdown title="Ni-MH įkraunamos baterijos" className="dropdown-item" id="dropdown-inner" drop="end" show={showDropdownInner3} onMouseEnter={() => showDropdown(103)} onMouseLeave={() => hideDropdown(103)}>
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

            <NavDropdown title="Žibintuvėliai" id="basic-nav-dropdown7" show={showDropdown7} onMouseEnter={() => showDropdown(7)} onMouseLeave={() => hideDropdown(7)}>
                <NavDropdown.Item href="/ikraunami-zibintuveliai">Įkraunami</NavDropdown.Item>
                <NavDropdown.Item href="/zibintuveliai-su-baterijomis">Su baterijomis</NavDropdown.Item>
                <NavDropdown.Item href="/zibintuveliai-galvos">Galvos</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Elektros instaliacija" id="basic-nav-dropdown8" show={showDropdown8} onMouseEnter={() => showDropdown(8)} onMouseLeave={() => hideDropdown(8)}>
                <NavDropdown.Item href="/elektros-instaliacija-jungikliai">Jungikliai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-lizdai">Lizdai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-kaladeles">Kaladėlės</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-kistukai">Kištukai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-sakotuvai">Šakotuvai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-kabeliu-kanalai">Kabelių kanalai</NavDropdown.Item>
                <NavDropdown.Item href="/elektros-instaliacija-ilgintuvai">Ilgintuvai</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Kitos prekės" id="basic-nav-dropdown10" show={showDropdown10} onMouseEnter={() => showDropdown(10)} onMouseLeave={() => hideDropdown(10)}>

                <NavDropdown title="Lipnios juostos" className="dropdown-item" id="dropdown-inner" drop="end" show={showDropdownInner4} onMouseEnter={() => showDropdown(104)} onMouseLeave={() => hideDropdown(104)}>
                    <NavDropdown.Item href="/kitos-prekes-pakavimo">Pakavimo</NavDropdown.Item>
                    <NavDropdown.Item href="/kitos-prekes-dazymo">Dažymo</NavDropdown.Item>
                    <NavDropdown.Item href="/kitos-prekes-profesionalios">Profesionalios</NavDropdown.Item>
                    <NavDropdown.Item href="/kitos-prekes-kitos">Kitos</NavDropdown.Item>
                </NavDropdown>
            </NavDropdown>

        </Nav>
    )

    const { height, width } = useWindowDimensions();
    const [show, setShow] = useState(false);


    return (
        <>
        {
            width >= 1000 &&
            <Navbar expand="md" variant="dark" className="bg-body-tertiary">
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
                    {navbarElements}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        }
        </>
    );
}

export default Navigation;
