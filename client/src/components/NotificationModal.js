import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-20px)'};
  transition: transform 0.3s ease-in-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
  color: #666;
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &.primary {
    background-color: #007bff;
    color: white;
    &:hover {
      background-color: #0056b3;
    }
  }

  &.secondary {
    background-color: #6c757d;
    color: white;
    &:hover {
      background-color: #545b62;
    }
  }
`;

const NotificationModal = ({
  isOpen,
  onClose,
  title,
  message,
  primaryButtonText = 'OK',
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}) => {
  if (!isOpen) return null;

  const handlePrimaryClick = () => {
    if (onPrimaryButtonClick) {
      onPrimaryButtonClick();
    }
    onClose();
  };

  const handleSecondaryClick = () => {
    if (onSecondaryButtonClick) {
      onSecondaryButtonClick();
    }
    onClose();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          {secondaryButtonText && (
            <Button className="secondary" onClick={handleSecondaryClick}>
              {secondaryButtonText}
            </Button>
          )}
          <Button className="primary" onClick={handlePrimaryClick}>
            {primaryButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NotificationModal; 