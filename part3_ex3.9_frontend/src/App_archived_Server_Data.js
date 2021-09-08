import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // useEffect(() => {
  // console.log('effect')
  // axios
  //   .get('http://localhost:3001/notes')
  //   .then(response => {
  //     console.log('promise fulfilled')
  //     setNotes(response.data)
  //     })
  //   }, [])

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  //Handle input
  const inputHandler = event => {
    setNewNote(event.target.value)
  }
  // Event Handler: New note
  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
}
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')      })
}
  //toggleImportance Event handler
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

  noteService
  .update(id, changedNote)
  .then(returnedNote => {
    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
  })
  }


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notes.map((note, i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} //THIS BASICALLY ANSWERS MY QUERIES OF
                                                                  //IDENTIFYING THE ROW TO TARGET
          />
        )}
      </ul>
    </div>
  )
}

export default App
