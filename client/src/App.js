import { Container } from "react-bootstrap";
import Layout from "./layouts/Layout";
import React, { useState } from 'react'
import axios from "axios";

function App() {
  const callApi = async () => {
    axios.get("/test").then((res) => console.log(res.data.test));
  };
  
  React.useEffect(() => {
      callApi();
    }, []);
  

  let [count, setCount] = useState(0);  //state 선언

  return (
    <Layout>
      <Container style={{ minHeight: "75vh" }}>
        <h3> apaap <span onClick={ () => { setCount(count + 1) } }>💕</span> {count} </h3>
      </Container>
    </Layout>
  );
}

export default App;
