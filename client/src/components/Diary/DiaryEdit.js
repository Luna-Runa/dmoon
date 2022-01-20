import React, { useState, useEffect, memo } from 'react'
import { ToggleButton, ButtonGroup, FormControl, InputGroup, Button, Alert, Stack, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const DiaryEdit = () => {
  const reducer = useSelector(state => state)
  const history = useHistory()
  const params = useParams()

  const data = reducer.diaryReducer.find(data => data._id === params.id)

  const moods = [
    { name: '행복함', value: '1' },
    { name: '즐거움', value: '2' },
    { name: '보통', value: '3' },
    { name: '그저그럼', value: '4' },
    { name: '기분나쁨', value: '5' },
  ]

  const [mood, setMood] = useState(moods.find(temp => temp.name === data.mood).value)
  const [todoBool, setTodoBool] = useState(data.todoArray[0].todoBool)
  const [todoText, setTodoText] = useState(data.todoArray[0].todoText)
  const [saveAlert, setSaveAlert] = useState(false)

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
      <h3> {data.date} 수정 페이지 </h3>
      <br />
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
      <br />

      <h3> 한 일들 </h3>
      <br />

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
          value={todoText}
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
              .put(`/diary/edit/${params.id}`, { _id: data._id, mood, todoBool, todoText })
              .then(res => {
                if (res.data) setSaveAlert(true)
              })
              .catch(err => console.log(err))
          }}
        >
          수정
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
        수정에 성공했습니다!
      </Alert>
    </>
  )
}

export default DiaryEdit
