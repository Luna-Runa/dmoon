import React from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

const Info = () => {
  const dispatch = useDispatch()
  const reducer = useSelector(state => state)

  return (
    <>
    {
      reducer.sessionReducer[0].id ? (
        <>
      <Button
        className="mb-3"
        onClick={async () => {
          await axios
            .get('/info')
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }}
      >
        저장
      </Button>
      

      <Button
        className="mb-3"
        onClick={async () => {
          await axios
            .get('/logout')
            .then(res => {
              if(res.data == 1) {
                // 로그아웃 처리
                // dispatch를 이용하여 state에 저장된 유저 정보 수동으로 삭제
                dispatch({ type: 'session', payload: [{ id: undefined, name: undefined }] })
              }
            })
            .catch(err => console.log(err))
        }}
      >
        로그아웃
      </Button>
      </>
      ) : (
        <>로그인 해주세요</>
      )
    }
    </>
  )
}

export default Info
