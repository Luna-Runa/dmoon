import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Friends = () => {
  const reducer = useSelector(state => state)

  return (
    <>
      {reducer.sessionReducer[0].friends.map((data, i) => {
        return (
          <Card key={i} style={{ width: '18rem', marginBottom: '0.5rem' }}>
            <Card.Body>
              <Card.Text>{data.name}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">@{data}</Card.Subtitle>
              <Button
                className="me-auto"
                variant="primary"
                onClick={async () => {
                  console.log({ user: reducer.sessionReducer[0].id, friends: data })
                  await axios
                    .post('/friends/delete', { user: reducer.sessionReducer[0].id, friends: data })
                    .then(res => {
                      if (res) {
                        /* 친구 삭제 메시지 or 변화 */
                      }
                    })
                    .catch(err => {
                      console.log(err)
                    })
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
