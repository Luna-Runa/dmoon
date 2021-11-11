import React, { useState } from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import RegisterModal from '../components/modals/RegisterModal'
import LogInModal from '../components/modals/LogInModal'

const Header = () => {
  const [RegisterModalOn, setRegisterModalOn] = useState(false)
  const [LogInModalOn, setLogInModalOn] = useState(false)

  return (
    <>
      <RegisterModal show={RegisterModalOn} onHide={() => setRegisterModalOn(false)} />
      <LogInModal show={LogInModalOn} onHide={() => setLogInModalOn(false)} />
      <header style={{ marginBottom: '1rem' }}>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>DMoon</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">홈</Nav.Link>
                <Nav.Link href="/diary">일기장</Nav.Link>
                <Nav.Link href="/friends">친구</Nav.Link>
              </Nav>
              <Nav className="ms-auto">
                <Nav.Link>
                  <Button variant="primary" onClick={() => setLogInModalOn(true)}>
                    로그인
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button variant="secondary" onClick={() => setRegisterModalOn(true)}>
                    회원가입
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default Header
