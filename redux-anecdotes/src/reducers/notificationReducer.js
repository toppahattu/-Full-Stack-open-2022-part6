import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
        return action.payload
    }
  }
})

export const { notify } = notificationSlice.actions

let timeoutId
export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(notify(content))
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
    timeoutId = setTimeout(() => {
      dispatch(notify(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer