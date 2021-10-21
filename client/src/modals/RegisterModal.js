import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login'
import HorizontalLine from '../components/HorizonLine'

const SignUpModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          회원가입
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>닉네임</Form.Label>
            <Form.Control placeholder="Enter nickname" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" />
          </Form.Group>

          <div className="d-grid gap-2 my-3">
            <Button variant="info" type="button">
              회원가입
            </Button>
            <HorizontalLine text={"OR"} />
            <GoogleLogin
              render={(renderProps) => {
                return (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    style={{
                      backgroundColor: "#176BEF",
                      borderColor: "#176BEF",
                    }}
                  >
                    <i className="fab fa-google">&nbsp;</i>Register With Google
                  </Button>
                );
              }}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal;