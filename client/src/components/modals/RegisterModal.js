import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const RegisterModal = ({ show, onHide }) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saveAlert, setSaveAlert] = useState(false)
  const [falseAlert, setFalseAlert] = useState(false)

  useEffect(() => {
    let mounted = true
    if (saveAlert === true) {
      setTimeout(() => {
        setSaveAlert(false)
        onHide(true)
      }, 1000)
    }

    if (falseAlert === true) {
      setTimeout(() => {
        setFalseAlert(false)
      }, 2000)
    }
    return () => (mounted = false)
  }, [saveAlert, falseAlert])

  useEffect(() => {
    setId('')
    setName('')
    setPassword('')
    setConfirmPassword('')
    return () => {}
  }, [show])

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>아이디</Form.Label>
            <Form.Control value={id} placeholder="Enter id" onChange={e => setId(e.currentTarget.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              value={name}
              type="email"
              placeholder="Enter name"
              onChange={e => setName(e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              value={password}
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="passwordConfirm">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              value={confirmPassword}
              type="password"
              placeholder="Confirm password"
              onChange={e => setConfirmPassword(e.currentTarget.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2 my-3">
            <Button
              variant="info"
              type="button"
              onClick={async () => {
                await axios
                  .post('/register', { id, name, password, confirmPassword })
                  .then(res => {
                    if (res.data) setSaveAlert(true)
                    else {
                      setFalseAlert(true)
                      setPassword('')
                      setConfirmPassword('')
                    }
                  })
                  .catch(err => console.log(err))
              }}
            >
              회원가입
            </Button>
          </div>
        </Form>

        <Alert show={saveAlert} variant="success">
          회원가입에 성공했습니다!
        </Alert>

        <Alert show={falseAlert} variant="danger">
          입력 내용을 다시 한번 확인해주세요!
        </Alert>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal
