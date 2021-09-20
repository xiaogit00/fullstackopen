const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

//**********************************************************
//*                     Pseudo-code for reducer
//**********************************************************

// Each anecdote is an object.

//Feature wise, it would have to be this. I click on one vote button, then
// the state associated with that button would have to change.

// When coding reducers, I'll just need to think ito features. What kinds
// of actions do I want to perform on the state? In this case, only one
// action. But first, I would need to think about how action data looks like.

// When I click the vote button, action data will look like this:
// {
//     type: "VOTE",
//     data: {
//         id: 3231232
//     }
// }

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'VOTE': {
            //Here, I would need to create a new object, with the
            // state of the new item + 1
            // state is a list of arrays. I'll need to:
            // 1. Create a new array item.
            // 2. create a new state object, that excludes the old item
            // whilst including the new item
            // 3. Return new state object
            const id = action.data.id
            const anecdote = state.find(anecdote => anecdote.id === id)
            const newAnecdote = {
                content: anecdote.content,
                id: anecdote.id,
                votes: anecdote.votes + 1
            }

            const newAnecdotes = state.map(anecdote => (anecdote.id !== id) ? anecdote : newAnecdote)

            return newAnecdotes
        }
        //Alright, now, I would need a way to test this reducer to see if it works.
        // I'll need to write some conditions right

    default:
        return state
    }

}

export default reducer
