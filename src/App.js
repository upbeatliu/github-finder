import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
import './App.css';

import GithubState from './context/github/GithubState'

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //get single user
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }
  //get user repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () => { setUsers([]); setLoading(false); }

  const showAlert = (meg, type) => {
    setAlert({ meg, type });
    setTimeout(() => setAlert(null), 3000);
  }

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar title='Navigation' icon='fa fa-lightbulb-o' />

          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    clearUsers={clearUsers}
                    showClearBtn={users.length > 0 ? true : false}
                    setAlert={showAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>)} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                  getUser={getUser} user={user}
                  getUserRepos={getUserRepos} repos={repos}
                  loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
