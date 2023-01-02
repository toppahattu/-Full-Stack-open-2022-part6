import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (!state.filter.trim().length) {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  })
  const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
  
  const dispatch = useDispatch()

  const vote = (id) => {
    let anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteFor(id, anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList