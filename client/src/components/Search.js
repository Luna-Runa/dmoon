import React, { useState } from 'react'
import { InputGroup, Button, FormControl, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [users, setUsers] = useState([])

  const reducer = useSelector(state => state)

  return (
    <>
      {!reducer.sessionReducer[0].id ? (
        <>로그인 해주세요</>
      ) : (
        <InputGroup className="mb-3">
          <FormControl
            value={searchText}
            placeholder="유저 닉네임 검색"
            onChange={e => {
              setSearchText(e.currentTarget.value)
            }}
          />
          <Button
            variant="outline-primary"
            onClick={async () => {
              await axios
                .post('/search', { searchText })
                .then(res => setUsers(res.data))
                .catch(err => {
                  console.log(err)
                })
            }}
          >
            검색
          </Button>
        </InputGroup>
      )}

      {users &&
        users.map((data, i) => {
          if (data) {
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
                        .post('/friends/add', { user: reducer.sessionReducer[0].id, friends: data.id })
                        .then(res => {
                          if (res) {
                            /* 친구 추가 메시지 or 변화 */
                          }
                        })
                        .catch(err => {
                          console.log(err)
                        })
                    }}
                  >
                    친구 추가
                  </Button>
                </Card.Body>
              </Card>
            )
          }
        })}
    </>
  )
}

export default Search
