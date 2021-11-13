// import PropTypes from 'prop-types'
import Modal from 'Modal';

import React, { Component } from 'react';
// import PropTypes from 'prop-types'

export default class ImageGallery extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  state = {
    showModal: false,
  };

  render() {
    return (
      <>
        <ul className="ImageGallery">
          {this.props.photo.map(({ id, tags, webformatURL, largeImageURL }) => (
            <li
              key={id}
              datalarge={largeImageURL}
              onClick={this.props.onImgClick}
            >
              <img src={webformatURL} alt={tags} />
            </li>
          ))}
        </ul>
        {/* {this.state.showModal && <Modal onClose={this.toggleModal} />} */}
      </>
    );
  }
}
