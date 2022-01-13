import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Friends = () => {
  const reducer = useSelector(state => state)
  const [friends, setFriends] = useState([])

  useEffect(async () => {
    await axios
      .post('/friends/list', { friends: reducer.sessionReducer[0].friends })
      .then(res => {
        console.log(res)
        setFriends(res)
      })
      .catch(err => {
        console.log(err)
      })
    return () => {
      cleanup
    }
  }, [])

  return (
    <>
      {friends.data &&
        friends.data.map((data, i) => {
          return (
            <Card key={i} style={{ width: '18rem', marginBottom: '0.5rem' }}>
              <Card.Body>
                <Card.Text>{data.name}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">@{data.id}</Card.Subtitle>
                <Button
                  className="me-auto"
                  variant="primary"
                  onClick={async () => {
                    await axios
                      .delete('/friends/delete', {
                        data: {
                          // withCredentials와 같이 써서 서버에서 req.body.{} 로 확인할 수 있다.
                          user: reducer.sessionReducer[0].id,
                          friends: data.id,
                        },
                        withCredentials: true,
                      })
                      .then()
                  }}
                >
                  친구 삭제
                </Button>
              </Card.Body>
            </Card>
          )
        })}
    </>
  )
}

export default Friends
