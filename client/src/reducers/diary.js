const CHANGE_DIARY = 'diary/CHANGE_DIARY'

export const changeDiary = diary => ({
  type: CHANGE_DIARY,
  diary,
})

function diaryReducer(state = [{}], action) {
  if (action.type === 'diary') {
    const changeState = [...action.payload]
    return changeState
  }
  return state
}
