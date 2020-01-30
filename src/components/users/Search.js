import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
  const [text, setText] = useState('');
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

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
      {githubContext.users.length > 0 && (
        <button onClick={githubContext.clearUsers}
          className="btn btn-light btn-block">Clear User</button>)}
    </div>
  )
}

export default Search
