import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, Container, Form } from 'react-bootstrap'
import RegisterModal from '../components/modals/RegisterModal'
import LogInModal from '../components/modals/LogInModal'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Header = () => {
  const [RegisterModalOn, setRegisterModalOn] = useState(false)
  const [LogInModalOn, setLogInModalOn] = useState(false)

  const history = useHistory()

  const reducer = useSelector(state => state)

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
                <Nav.Link as={Link} to="/">
                  홈
                </Nav.Link>
                <Nav.Link as={Link} to="/diary">
                  일기장
                </Nav.Link>
                <Nav.Link as={Link} to="/friends">
                  유저 검색
                </Nav.Link>
              </Nav>
              {reducer.sessionReducer[0].id ? (
                <>
                  <Form.Label>@{reducer.sessionReducer[0].id}</Form.Label>
                  <Nav.Link>
                    <Button variant="primary" onClick={() => history.push('/info')}>
                      내 정보
                    </Button>
                  </Nav.Link>
                </>
              ) : (
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
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default Header
