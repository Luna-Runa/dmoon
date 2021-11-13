import React from 'react'
import { InputGroup, Button, FormControl, Card } from 'react-bootstrap'

const Search = () => {
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl placeholder="유저 이름 검색" aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <Button variant="outline-secondary" id="button-addon2">
          검색
        </Button>
      </InputGroup>
    </div>
  )
}

export default Search
