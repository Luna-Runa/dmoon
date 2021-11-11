import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import HorizonLine from '../HorizonLine'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

const LogInModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <div className="d-grid gap-2 my-3">
            <Button
              variant="info"
              type="button"
              onClick={() => {
                axios
                  .post('/react/login', { id: 'test', pw: 1234 })
                  .then(({ res }) => /* dispatch({ type: 'set', payload: data } )*/ {})
                  .catch(err => {
                    console.log(err)
                  })
              }}
            >
              로그인
            </Button>
            <HorizonLine text={'OR'} />
            <GoogleLogin
              render={renderProps => {
                return (
                  <Button
                    onClick={renderProps.onClick()}
                    disabled={renderProps.disabled}
                    style={{
                      backgroundColor: '#176BEF',
                      borderColor: '#176BEF',
                    }}
                  >
                    <i className="fab fa-google">&nbsp;</i>Log In With Google
                  </Button>
                )
              }}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LogInModal
