import React from 'react'
import { useDispatch } from 'react-redux'
import { newNote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'




const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(setNotification(content, 5))
        dispatch(newNote(content))
    }

    return (
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm
