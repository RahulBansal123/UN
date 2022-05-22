import React from 'react';
import styled from 'styled-components';

const Modal = ({
  title,
  width = 50,
  height = 50,
  handleClose,
  children,
  isOpen,
}) => {
  if (width <= 0 || width > 100 || height <= 0 || height > 100) {
    console.error('Modal height and width should be in range of [0,100]');
  }

  const Container = styled.div`
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `;
  const Overlay = styled.div`
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  `;
  const H5 = styled.h5`
    margin: 0 2rem 0 2rem;
  `;
  const ModalContainer = styled.div`
    padding: 18px 0;
    width: ${width}%;
    max-height: ${height}%;
    z-index: 13;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    overflow-x: hidden;
    overflow-y: scroll;
  `;
  const CloseButton = styled.svg`
    width: 15px;
    height: 15px;
    position: absolute;
    right: 25px;
    top: 21px;
    cursor: pointer;
  `;

  return (
    <>
      {isOpen && (
        <Container>
          <Overlay onClick={handleClose}></Overlay>
          <ModalContainer>
            <CloseButton
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20.39 20.39"
              id="modal-close-button"
            >
              <title>close</title>
              <line
                x1="19.39"
                y1="19.39"
                x2="1"
                y2="1"
                fill="none"
                stroke={'currentcolor'}
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="3"
              />
              <line
                x1="1"
                y1="19.39"
                x2="19.39"
                y2="1"
                fill="none"
                stroke={'currentcolor'}
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="3"
              />
            </CloseButton>
            <H5>{title}</H5>
            {children}
          </ModalContainer>
        </Container>
      )}
    </>
  );
};

export default Modal;
