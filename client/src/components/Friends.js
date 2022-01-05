import React from 'react'
import Search from './search'
import { Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Friends = () => {
  const reducer = useSelector(state => state)
  return (
    <div>
      <Search />
      <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
        <Card.Body>
          <Card.Text>테스트</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">@test</Card.Subtitle>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
        <Card.Body>
          <Card.Text>테스트계정</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">@test2</Card.Subtitle>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
        <Card.Body>
          <Card.Text>테스트의 테스트는</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">@temp</Card.Subtitle>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
        <Card.Body>
          <Card.Text>마지막테스트</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">@abc</Card.Subtitle>
        </Card.Body>
      </Card>

      {/* {reducer.userReducer.map((data, i) => {
        if (!isEmpty(data)) {
          return (
            <Card key={i} style={{ width: '18rem', marginBottom: '0.5rem' }}>
              <Card.Body>
                <Card.Text>{data.name}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{data.id}</Card.Subtitle>
                <Button
                  className="me-auto"
                  variant="primary"
                  onClick={() => {
                    history.push('/diary/edit/' + data._id)
                  }}
                >
                  친구 추가
                </Button>
              </Card.Body>
            </Card>
          )
        }
      })} */}
    </div>
  )
}

const isEmpty = function (value) {
  if (
    value == '' ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == 'object' && !Object.keys(value).length)
  ) {
    return true
  } else {
    return false
  }
}

export default Friends
