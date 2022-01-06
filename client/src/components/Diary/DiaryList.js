import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Card, Button, Stack, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const DiaryList = () => {
  const history = useHistory()

  const reducer = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(async () => {
    await axios.get('/diary/list').then(({ data }) => dispatch({ type: 'diary', payload: data }))
    return () => {
      cleanup
    }
  }, [])

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
      {reducer.diaryReducer.map((data, i) => {
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
                    history.push('/diary/edit/' + data._id)
                  }}
                >
                  수정
                </Button>
                <Button
                  className="ms-auto"
                  variant="danger"
                  onClick={async () => {
                    await axios
                      .delete('/delete', {
                        data: {
                          // 서버에서 req.body.{} 로 확인할 수 있다.
                          _id: data._id,
                        },
                        withCredentials: true,
                      })
                      .then()
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
