import React from 'react'

const Alert = ({ alert }) => {
  return (
    alert !== null && <div className={`alert alert-${alert.type}`}>
      <i className='fa fa-lightbulb-o'></i>{alert.meg}
    </div>
  )
}

export default Alert