import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
// import { ImSearch } from 'react-icons.in';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
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
      <header className={s.Searchbar__header}>
        <form className={s.SearchForm} onSubmit={this.handleQuerySubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButton__label}>Search</span>
            {/* <ImSearch /> */}
          </button>

          <input
            className={s.SearchForm__input}
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleQueryChange}
            // autoComplete="off"
            // autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
