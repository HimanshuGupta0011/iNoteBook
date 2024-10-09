import React from 'react'

const Alert = ({ msg, type }) => {
  return (
    <>
      {msg !== null ? <div className={`alert alert-${type}`} role="alert">
          {msg}
        </div> : ''}
    </>
  )
}

export default Alert