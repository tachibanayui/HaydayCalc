import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"

function Header() {
    return (
        <Navbar expand="lg" className="navbar-dark sticky-top bg-dark">
            <Container style={{ background: "transparent" }}>
                <Navbar.Brand href="/">HayDay Calc</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                        <Link className="nav-link" to="/recipe-graph">
                            Recipe Graph
                        </Link>
                        <Link className="nav-link" to="/not-implemented">
                            Production Planner
                        </Link>
                        <Link className="nav-link" to="/not-implemented">
                            About Us
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
