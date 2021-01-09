import React from 'react'

export default function ErrorMessages(props) {
    return (
        <div className="errorMessage">
            <span>{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </div>
    )
}
