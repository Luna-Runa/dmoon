import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

import { useSelector } from 'react-redux'

const Home = () => {
  
  const reducer = useSelector(state => state)

  return (
    <>
    {
      reducer.sessionReducer[0].id ? (
        <>
        <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
          <Card.Body>
            <a>@Test_account 💕1</a>
            <Card.Title>즐거움</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">2021. 11. 5.</Card.Subtitle>
            <Card.Text>성공 과제</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
          <Card.Body>
            <a>@Test_account2 💕0</a>
            <Card.Title>그저그럼</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">2021. 11. 3.</Card.Subtitle>
            <Card.Text>성공 운동</Card.Text>
          </Card.Body>
        </Card>
        </>
      ) : (
        <>로그인 해주세요</>
      )
    }
      
    </>
  )
}

export default Home
