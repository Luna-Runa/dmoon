import React from 'react'

const DiaryEdit = () => {
  return (
    <>
      <h3> 오늘의 기분 </h3>
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
          onChange={e => {
            setTodoText(e.target.value)
          }}
        />
      </InputGroup>

      <Stack direction="horizontal" gap={3}>
        <Button
          className="mb-3"
          onClick={() => {
            axios
              .post('/diary/add', { mood, todoBool, todoText })
              .then(setSaveAlert(true))
              .catch(err => {
                console.log(err)
              })
          }}
        >
          저장
        </Button>

        <Button
          className="mb-3 ms-auto"
          variant="info"
          onClick={() => {
            push('/diary/list')
          }}
        >
          목록
        </Button>
      </Stack>

      <Alert show={saveAlert} variant="success">
        저장에 성공했습니다!
      </Alert>
    </>
  )
}

export default DiaryEdit
