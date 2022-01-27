import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { ToggleButton, ButtonGroup, FormControl, InputGroup, Button, Alert, Stack, Form } from 'react-bootstrap'
import axios from 'axios'

const Diary = () => {
  const [mood, setMood] = useState('1')
  const [todoBool, setTodoBool] = useState(false)
  const [todoText, setTodoText] = useState('')
  const [saveAlert, setSaveAlert] = useState(false)

  const history = useHistory()

  const reducer = useSelector(state => state)

  const user = reducer.sessionReducer[0]

  const moods = [
    { name: '행복함', value: '1' },
    { name: '즐거움', value: '2' },
    { name: '보통', value: '3' },
    { name: '그저그럼', value: '4' },
    { name: '기분나쁨', value: '5' },
  ]

  useEffect(() => {
    let mounted = true
    if (saveAlert === true) {
      setTimeout(() => {
        setSaveAlert(false)
      }, 2000)
    }
    return () => (mounted = false)
  }, [saveAlert])

  return (
    <>
      {!user.id ? (
        <>로그인 해주세요</>
      ) : (
        <>
          <h3> 오늘의 기분 </h3>
          <ButtonGroup className="mb-4">
            {moods.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={'outline-primary'}
                name="mood"
                value={radio.value}
                checked={mood === radio.value}
                onChange={e => setMood(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>

          <h3> 한 일들 </h3>

          <InputGroup className="mb-3">
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="outline-success"
              checked={todoBool}
              value="1"
              onChange={e => setTodoBool(e.currentTarget.checked)}
            >
              성공
            </ToggleButton>
            <FormControl
              onChange={e => {
                setTodoText(e.target.value)
              }}
            />
          </InputGroup>

          <Stack direction="horizontal" gap={3}>
            <Button
              className="mb-3"
              onClick={async () => {
                await axios
                  .post('/diary/add', { id: user.id, mood, todoBool, todoText })
                  .then(setSaveAlert(true))
                  .catch(err => console.log(err))
              }}
            >
              저장
            </Button>

            <Button
              className="mb-3 ms-auto"
              variant="info"
              onClick={() => {
                history.push('/diary/list')
              }}
            >
              목록
            </Button>
          </Stack>

          <Alert show={saveAlert} variant="success">
            저장에 성공했습니다!
          </Alert>
        </>
      )}
    </>
  )
}

export default Diary
