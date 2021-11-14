import React, { Component } from 'react';
import ImageGallery from 'ImageGallery';
import s from './ImageInfo.module.css';
import Button from 'Button';
import Modal from 'Modal';
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
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12&q=${this.props.query}&page=${this.state.page}&key=23459982-aeff0c389b47d03a141af0a17`,
      )
        .then(respons => {
          return respons.json();
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
  }
  loadMore = () => {
    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12&q=${this.props.query}&page=${this.state.page}&key=23459982-aeff0c389b47d03a141af0a17`,
    )
      .then(respons => {
        return respons.json();
      })
      .then(newPhoto =>
        this.setState(({ photo }) => {
          return {
            photo: [...photo, ...newPhoto.hits],
            page: this.state.page + 1,

            status: Status.RESOLVED,
          };
        }),
      )
      .catch(error => this.setState({ error, status: Status.REJECTED }));
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
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
      return <div className={s.status__message}>Please enter your search </div>;
    }
    if (status === 'pending') {
      return <div className={s.status__message}>loading...</div>;
    }

    if (photo.length === 0) {
      return (
        <div className={s.status__message}>Sorry we nothing found for you</div>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          {this.state.showModal && (
            <Modal onClose={this.toggleModal} modalUrl={this.state.modalUrl} />
          )}
          <ImageGallery photo={photo} onImgClick={this.onGalleryCardClick} />
          {this.state.photo.length > 10 && <Button onClick={this.loadMore} />}
        </>
      );
    }
  }
}
