import React from 'react';

export default ({ disabled, value, ballon_position, ballon_caption }) => (
  <span data-balloon={ballon_caption} data-balloon-pos={ballon_position}>
    <input className={'SubmitInput'} disabled={disabled} type={'submit'} value={value} />
  </span>
);
