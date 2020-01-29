import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext'

const Search = ({ showClearBtn, clearUsers, setAlert }) => {
  const [text, setText] = useState('');
  const githubContext = useContext(GithubContext);

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please input something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  }
  const onChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input type='text' name='text' placeholder='Search User...' value={text} onChange={onChange} />
        <input type='submit' value="Search" className='btn btn-dark btn-block' />
      </form>
      {showClearBtn &&
        <button onClick={clearUsers}
          className="btn btn-light btn-block">Clear User</button>}
    </div>
  )
}

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
}
export default Search
