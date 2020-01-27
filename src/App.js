import React, { Fragment, Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Search from './components/layout/Search'
import Spinner from './components/layout/Spinner'
import Users from './components/users/Users'
import User from './components/users/User'
import About from './components/pages/About'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  //get all data
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_SECRET}`);
  //   this.setState({ users: res.data, loading: false });
  // }

  //search part uers
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  }

  //get single Github user page
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

  //clear users
  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (meg, type) => {
    this.setState({ alert: { meg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  }

  render() {
    const { users, user, loading } = this.state;

    if (this.state.loading) {
      return <Spinner />
    } else {
      return (
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert alert={this.state.alert} />
              <Switch>
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search setAlert={this.setAlert} searchUsers={this.searchUsers}
                      showClear={users.length > 0 ? true : false}
                      clearUsers={this.clearUsers} />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )} />
                <Route exact path='/about' render={About} />
                <Route exact path='/user/:login' render={props => (
                  <User {...props} getUser={this.getUser} user={user} loading={loading} />
                )} />
              </Switch>
            </div>
          </div>
        </Router>
      )
    }
  }
}

export default App;