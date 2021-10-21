import React, { useState } from 'react'
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import RegisterModal from '../modals/RegisterModal';
import LogInModal from '../modals/LogInModal';

const Header = () => {
    const [RegisterModalOn, setRegisterModalOn] = useState(false);
    const [LogInModalOn, setLogInModalOn] = useState(false);

    return (
        <>
            <RegisterModal
                show={RegisterModalOn}
                onHide={() => setRegisterModalOn(false)}
            />
            <LogInModal
                show={LogInModalOn}
                onHide={() => setLogInModalOn(false)}
            />
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand>DMoon</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link>
                                    <Button variant="primary" onClick={() => setLogInModalOn(true)}>로그인</Button>
                                </Nav.Link>
                                <Nav.Link>
                                    <Button variant="secondary" onClick={() => setRegisterModalOn(true)}>회원가입</Button>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;
