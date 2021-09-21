import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const sortedAnecdotes = anecdotes.sort((a,b) => {
        return b.votes - a.votes
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log(anecdote.content)
        dispatch(setNotification(anecdote.content, 5))
      dispatch(voteAction(anecdote.id))
    }


    return (
        <>
        {sortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        </>
    )
}

export default AnecdoteList
