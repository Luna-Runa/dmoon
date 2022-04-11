import axios from 'axios'
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/ko.js'

const Home = () => {
  const reducer = useSelector(state => state)
  const [timeline, setTimeline] = useState([{}])

  const getFriends = () => {
    if (reducer.sessionReducer[0].friends.length === 0 ){
      return "타임라인이 비어있습니다. 친구를 추가했을 경우 친구의 일기가 나타납니다.";
    }
    axios.post('/timeline', { friends: reducer.sessionReducer[0].friends }).then(({ data }) => setTimeline(data))
  }

  const setLike = data => {
    axios.post('/like', { _id: data })
    getFriends()
  }

  return (
    <>
      {!reducer.sessionReducer[0].id ? (
        <div>로그인 해주세요</div>
      ) : (
        <>
          {console.log(timeline)}
          {!timeline[0].id && getFriends()}
          {timeline[0].id &&
            timeline.map((data, i) => {
              return (
                <Card key={i} style={{ width: '18rem', marginBottom: '0.5rem' }}>
                  <Card.Body>
                    <TextDiv>
                      <span>
                        {data.name} (@{data.id})
                      </span>
                      <span style={{ color: 'gray', marginBottom: '0.5rem' }}>
                        {moment(data.date, 'LLL').fromNow()}
                      </span>
                    </TextDiv>
                    <Card.Title>{data.mood}</Card.Title>
                    <Card.Text>{data.todoBool ? '✔ ' + data.todoText : '❌ ' + data.todoText}</Card.Text>
                    <LikesBox onClick={() => setLike(data._id)}>💕{data.likes}</LikesBox>
                  </Card.Body>
                </Card>
              )
            })}
        </>
      )}
    </>
  )
}

export default Home

const LikesBox = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  border: none;
`

const TextDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
