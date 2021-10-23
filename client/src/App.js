import { Container } from "react-bootstrap";
import Layout from "./layouts/Layout";
import React, { useState } from 'react'
import axios from "axios";

function App() {
  const callApi = async () => {
    axios.get("/users").then((res) => console.log(res.data.test));
  };
  
  React.useEffect(() => {
      callApi();
    }, []);
  

  const [count, setCount] = useState(0);  //state 선언

  const showLog = () => {
    console.log(count);
  };

  const handleLogButton = () => {
    setTimeout(showLog, 2000);
  };

  const handlePlusButton = () => {
    setCount(prev => prev + 1);
  };

  return (
    <Layout>
      <Container style={{ minHeight: "75vh" }}>
        apaap
        <div style={{ border: '1px solid black', margin: 12 }}>
          <h1>This is Function Component</h1>
          <div>{count}</div>
          <button onClick={handlePlusButton}>+</button>
          <button onClick={handleLogButton}>alert</button>
        </div>
      </Container>
    </Layout>
  );
}

export default App;
