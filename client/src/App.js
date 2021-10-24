import { Container } from "react-bootstrap";
import Layout from "./layouts/Layout";
import React, { useEffect, useState } from 'react';
import DiaryList from "./components/DiaryList.js";
import axios from "axios";
import { Route } from 'react-router-dom';
//import styled from "styled-components";
//import Diary from "./Diary";
//import GetDiary from "./components/GetDiary";

function App() {
  let [count, setCount] = useState(0);  //state 선언
  let [diary, setDiary] = useState([]);

  useEffect(() => {
    axios
      .get('/react/list')
      .then(({ data }) => setDiary(data));
  }, []);

  return (
    <Layout>
      <Container style={{ minHeight: "75vh" }}>
        <h3> 일기장 내역 <span onClick={() => { setCount(count + 1) }}>💕</span> {count} </h3>
        
        <Route exact path="/diary">
          <DiaryList diary={diary}/>
        </Route>

      </Container>
    </Layout>
  );
}

export default App;
