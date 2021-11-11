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

      <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
        <Card.Body>
          <Card.Text>테스트 계정</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">@Test_account2</Card.Subtitle>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
        <Card.Body>
          <Card.Text>테스트 계정</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">@Test_account2</Card.Subtitle>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
        <Card.Body>
          <Card.Text>Test for account</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">@temp_111</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Search
