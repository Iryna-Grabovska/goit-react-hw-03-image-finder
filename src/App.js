import Button from 'Button';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

// import PropTypes from 'prop-types';
import Searchbar from 'Searchbar';
// import ImageGallery from 'ImageGallery';
import ImageInfo from './ImageInfo';
// import ImageGallery from 'ImageGallery';
export default class App extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };
  state = {
    query: '',
    page: 1,
    // images: [],
  };
  handleFormSubmit = query => {
    this.setState({ query });
  };
  // handleFormSubmit = newQuery => {
  //   // console.log(query);
  //   this.setState({ query: newQuery, images: [] });
  // };
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
