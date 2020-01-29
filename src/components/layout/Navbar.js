import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = props => {
  return (
    <nav className='navbar bg-primary'>
      <h1><i className={props.icon}></i> {props.title}</h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>

    </nav>
  )
}
Navbar.defaultProps = {
  icon: 'fa fa-simplybuilt',
  title: 'Navbar'
}
Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
export default Navbar
