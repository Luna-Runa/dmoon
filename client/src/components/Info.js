import React, { useEffect } from 'react'
import axios from 'axios'
import { Button, Stack } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const Info = () => {
  const dispatch = useDispatch()
  const reducer = useSelector(state => state)

  useEffect(async () => {
    await axios
      .get('/info')
      .then(res =>
        dispatch({ type: 'session', payload: [{ id: res.data.id, name: res.data.name, friends: res.data.friends }] }),
      )
    return () => {
      cleanup
    }
  }, [])

  return (
    <>
      {reducer.sessionReducer[0].id ? (
        <Stack gap={3}>
          <div>
            <p>{reducer.sessionReducer[0].name}</p>
            <p className="text-muted" style={{ fontSize: '90%' }}>
              @{reducer.sessionReducer[0].id}
            </p>
            <p style={{ color: 'red' }}>
              집중 목표 : {reducer.sessionReducer[0].goal ? reducer.sessionReducer[0].goal : '미설정'}
            </p>
            <Link to="/friends" style={{ textDecoration: 'none', color: '#70a1ff' }}>
              친구 {reducer.sessionReducer[0].friends ? reducer.sessionReducer[0].friends.length + '명' : '0명'}
            </Link>
          </div>
          <div>
            <Button
              className="mb-5"
              //onClick={}
            >
              프로필 수정
            </Button>
          </div>
          <div className="ms-auto">
            <Button
              variant="danger"
              onClick={async () => {
                await axios
                  .get('/logout')
                  .then(res => {
                    if (res.data) {
                      dispatch({ type: 'session', payload: [{ id: undefined, name: undefined }] })
                    }
                  })
                  .catch(err => console.log(err))
              }}
            >
              로그아웃
            </Button>
          </div>
        </Stack>
      ) : (
        <>
          <Redirect to="/" />
        </>
      )}
    </>
  )
}

export default Info
