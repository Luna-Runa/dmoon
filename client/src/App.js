import { Container } from 'react-bootstrap'
import Layout from './layouts/Layout'
import React from 'react'
import Router from './components/Routes'
import { withRouter } from 'react-router-dom'

function App() {
  return (
    <Layout>
      <Container style={{ minHeight: '75vh' }}>
        <Router />
      </Container>
    </Layout>
  )
}

export default withRouter(App)
