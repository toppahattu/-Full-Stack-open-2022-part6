import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const votedAnecdote = action.payload
      return state.map(a => 
        a.id !== votedAnecdote.id ? a : votedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = (id, anecdote) => {
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(vote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer