const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
        const addGoodState = {
            ...state,
            good: state.good + 1
        }
      return addGoodState
    case 'OK':
        const addOkState = {
            ...state,
            ok: state.ok + 1
        }
        return addOkState
    case 'BAD':
        const addBadState = {
            ...state,
            bad: state.bad + 1
        }
        return addBadState
    case 'ZERO':
        console.log("state:", state)
      return initialState
    default:
        return state
  }

}

export default counterReducer
