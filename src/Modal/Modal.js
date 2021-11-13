import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      console.log(e.target);
      this.props.onClose();
    }
  };
  render() {
    // const { src, alt } = this.props;
    return (
      (
        <div className="Overlay" onClick={this.handleBackdropClick}>
          <img src={this.props.modalUrl} alt="aaa" />
        </div>
      ),
      modalRoot
    );
  }
}
