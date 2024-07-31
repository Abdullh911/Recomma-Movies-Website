import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        position: 'relative',
        width: '80%',
        maxWidth: '800px',
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        padding: '20px',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5em',
          cursor: 'pointer',
        }}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;