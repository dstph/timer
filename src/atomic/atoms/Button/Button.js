import React from 'react';

const Button = ({children, onClickHandler}) => {
  return <button type='button' onClick={onClickHandler}>{children}</button>
}

export default Button;