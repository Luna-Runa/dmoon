import { Container } from "react-bootstrap";
import Layout from "./layouts/Layout";
import React, { useEffect, useState } from 'react'
import DiaryList from "./components/DiaryList.js"
import axios from "axios";

function App() {
  let [count, setCount] = useState(0);  //state 선언
  let [diary, setDiary] = useState([]);

  useEffect(() => {
    axios
      .get('/react/list')
      .then( ( {data} ) => setDiary(data));
  }, []);

/*   axios.get('/react/list').then((res)=>{
    console.log(res.data)
    setDiary(res.data);
}).catch((Error)=>{
    console.log(Error);
})
 */
  

  return (
    <Layout>
      <Container style={{ minHeight: "75vh" }}>
        <h3> 일기장 내역 <span onClick={() => { setCount(count + 1) }}>💕</span> {count} </h3>
      <DiaryList diary = {diary} />
      </Container>
    </Layout>
  );
}

export default App;
