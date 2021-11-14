import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import PropTypes from 'prop-types';
import Searchbar from 'Searchbar';
import ImageInfo from './ImageInfo';
export default class App extends Component {
  static propTypes = {
    handleFormSubmit: PropTypes.func,
  };
  state = {
    query: '',
    page: 1,
  };
  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageInfo query={this.state.query} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
