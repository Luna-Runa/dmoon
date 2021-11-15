import React from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

const Info = () => {
  return (
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
      인포페이지
    </>
  )
}

export default Info
