import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import { IconContext } from "react-icons";
import SearchBar from './SearchBar';
import { PiFilmSlateLight } from "react-icons/pi";
import './styles/Navbar.css';

export default function Navbar() {
    const [navbarCollapsed, setNavbarCollapsed] = useState<boolean>(false);

    return (
        <BootstrapNavbar 
        className="navbar" 
        collapseOnSelect
        expand="sm"
        variant="dark"
        >
          <Container>
            <BootstrapNavbar.Brand className="navbar__brand" href="#home">
                <IconContext.Provider value={{ size: "2em", className: "navbar__brand-icon" }}>
                    <PiFilmSlateLight />
                </IconContext.Provider>
            </BootstrapNavbar.Brand>
            <SearchBar/>

            <BootstrapNavbar.Toggle
                className="navbar__toggle ms-auto"
                aria-controls="responsive-navbar-nav"
                onClick={() => setNavbarCollapsed(!navbarCollapsed)}
            />
            <BootstrapNavbar.Collapse className="navbar__collapse" id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#movies">Movies</Nav.Link>
                    <Nav.Link href="#tv">TV Series</Nav.Link>
                    <Nav.Link href="#forme">For Me</Nav.Link>
                </Nav>
            </BootstrapNavbar.Collapse>
          </Container>
        </BootstrapNavbar>
    );
}