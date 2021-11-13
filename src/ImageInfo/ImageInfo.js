//import imageAPI from '../services/pixabay-api';
import React, { Component } from 'react';
import ImageGallery from 'ImageGallery';
import ImagesErrorView from 'ImagesErrorView';
import Button from 'Button';
import Modal from 'Modal';
// import ImageGallery from 'ImageGallery';
// import ImagesPendingView from './ImagesPendingView';
// import ImagesErrorView from './ImagesErrorView';
// import ImageGallery from './ImageGallery';
// import PropTypes from 'prop-types'
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageInfo extends Component {
  state = {
    reject: 0,
    photo: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    showModal: false,
    modalUrl: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ status: Status.PENDING });

      fetch(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12&q=${this.props.query}&key=23459982-aeff0c389b47d03a141af0a17`,
      )
        .then(respons => {
          if (respons.ok) {
            return respons.json();
          }

          return Promise.reject(
            new Error(`Sorry we dont have$ {this.props.query}`),
          );
        })
        .then(photo =>
          this.setState({
            photo: [...photo.hits],
            page: this.state.page + 1,
            status: Status.RESOLVED,
          }),
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
    console.log(this.state);
  }
  loadMore = () => {
    this.setState(() => ({
      page: this.state.page + 1,
    }));
  };
  toggleModal = modalUrl => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalUrl: modalUrl,
    }));
  };
  onGalleryCardClick = e => {
    const url = e.currentTarget.getAttribute('datalarge');
    this.toggleModal(url);
  };

  render() {
    const { photo, status } = this.state;

    if (status === 'idle') {
      return <div>Please enter your search </div>;
    }
    if (status === 'pending') {
      return <div>loading...</div>;
    }

    if (photo.length === 0) {
      return <p>Sorry we nothing find for you</p>;
    }
    if (status === 'resolved') {
      return (
        <>
          {this.state.showModal && (
            <Modal onClose={this.toggleModal} modalUrl={this.state.modalUrl} />
          )}
          <ImageGallery photo={photo} onImgClick={this.onGalleryCardClick} />;
        </>
      );
    }

    // if ([...photo.hits].page > 2) {
    //   console.log(photo);
    //   return <Button onClick={this.loadMore}>Load More</Button>;
    // }
  }
}
