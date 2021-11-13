import React, { Component } from 'react';
import { toast } from 'react-toastify';
// import { ImSearch } from 'react-icons.in';
// import PropTypes from 'prop-types'

export default class Searchbar extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  state = {
    query: '',
  };
  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };
  handleQuerySubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('enter the queryn');
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleQuerySubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
            {/* <ImSearch /> */}
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleQueryChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
