import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import GetDiary from './GetDiary'
import { useSelector } from 'react-redux'

const DiaryList = () => {
  const diary = useSelector(state => state)

  return (
    <>
      <GetDiary />
      {diary.map((data, i) => {
        return (
          <Card key={i} style={{ width: '18rem', marginBottom: '0.5rem' }}>
            <Card.Body>
              <Card.Title>{data.mood}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{data.date}</Card.Subtitle>
              <Card.Text>{data.todoBool ? '성공 ' + data.todoText : '실패 ' + data.todoText}</Card.Text>
            </Card.Body>
          </Card>
        )
      })}
    </>
  )
}

export default DiaryList
