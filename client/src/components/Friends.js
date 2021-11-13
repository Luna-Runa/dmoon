import React from 'react'
import Search from './Search'
import { Card } from 'react-bootstrap'

const Friends = () => {
  return (
    <div>
      <Search />

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

export default Friends
