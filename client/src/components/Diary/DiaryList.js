import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Card, Button, Stack, Form } from 'react-bootstrap'
import GetDiary from './GetDiary'
import { useSelector } from 'react-redux'

const DiaryList = () => {
  const diary = useSelector(state => state)
  const history = useHistory()

  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <Form.Label column="lg">일기장 내역</Form.Label>
        <Button
          className="ms-auto"
          variant="secondary"
          onClick={() => {
            history.goBack()
          }}
        >
          뒤로가기
        </Button>
      </Stack>

      <GetDiary />
      {diary.map((data, i) => {
        return (
          <Card key={i} style={{ width: '18rem', marginBottom: '0.5rem' }}>
            <Card.Body>
              <Card.Title>{data.mood}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{data.date}</Card.Subtitle>
              <Card.Text>{data.todoBool ? '성공 ' + data.todoText : '실패 ' + data.todoText}</Card.Text>
              <Stack direction="horizontal" gap={3}>
                <Button
                  className="me-auto"
                  variant="primary"
                  onClick={() => {
                    history.goBack()
                  }}
                >
                  수정
                </Button>
                <Button
                  className="ms-auto"
                  variant="danger"
                  onClick={() => {
                    history.goBack()
                  }}
                >
                  삭제
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        )
      })}
    </>
  )
}

export default DiaryList
