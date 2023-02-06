import React from 'react';
import classes from './Modal.module.css';

// TODO: add type for module

const Modal = ({ children, visible, setVisible }: any) => {
  const rootClasses = [classes.modal];
  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)} aria-hidden="true">
      <div className={classes.content} onClick={(e) => e.stopPropagation()} aria-hidden="true">
        {children}
      </div>
    </div>
  );
};

export default Modal;
