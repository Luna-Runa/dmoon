import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const GetDiary = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('/diary/list').then(({ data }) => dispatch({ type: 'set', payload: data }))
  }, [])

  return <></>
}

export default GetDiary
