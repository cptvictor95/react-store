import React, { useState } from 'react';
import './styles.scss';
import Button from './../Forms/Button/button'

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return [
    <div className="modalOverlay" onClick={() => toggleModal()} />,
    <div className="modalWrap">
      <div className="modal">
        <Button className="closeModal" onClick={() => toggleModal()}>X</Button>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  ];
}

export default Modal;