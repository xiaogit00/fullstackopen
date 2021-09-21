// How do I code the reducer? What do I need to send?

// {
//     type: "NEW",
//     message: "Hello"
//
// }

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case "NEW_NOTIFICATION": {
            return action.message
        }

        case "HIDE_NOTIFICATION": {
            return action.message
        }
        default:
            return state
    }
}

export const setNotification = (notification, displayTime) => {
    return async dispatch => {
        console.log("this is the value of notification within dispatch", notification)
        dispatch({
            type: "NEW NOTIFICATION",
            message: notification
        })

        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
                message: null
            })
        }, displayTime * 1000)
    }
}



export default notificationReducer
