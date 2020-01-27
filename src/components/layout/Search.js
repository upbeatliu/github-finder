import React, { Component } from 'react'

export class Search extends Component {
  state = {
    text: '',
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please input somthing', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ state: '' });
    }
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input type="text" name='text' value={this.state.text} onChange={this.onChange} placeholder='Search User...' />
          <input type="submit" value='Search' className='btn btn-dark btn-block' />
        </form>
        {showClear && <button onClick={clearUsers} className='btn btn-light btn-block'>Clear</button>}
      </div>
    )
  }
}

export default Search
