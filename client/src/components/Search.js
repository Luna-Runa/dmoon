import React, { useState } from 'react'
import { InputGroup, Button, FormControl, Card } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Search = () => {
  const [searchText, setSearchText] = useState('')

  const dispatch = useDispatch()

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="유저 닉네임 검색"
          onChange={e => {
            setSearchText(e.currentTarget.value)
          }}
        />
        <Button
          variant="outline-primary"
          onClick={async () => {
            await axios
              .post('/friends/search', { searchText })
              .then(res => dispatch({ type: 'user', payload: res.data }))
              .catch(err => {
                console.log(err)
              })
          }}
        >
          검색
        </Button>
      </InputGroup>
    </div>
  )
}

export default Search
