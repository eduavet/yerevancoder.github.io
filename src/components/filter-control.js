import React from 'react';

export default ({ known_tags, filtered_tags, on_checkbox_toggle }) => {
  console.log({ known_tags, filtered_tags });
  const input_pairs = known_tags.map(name => {
    return (
      <span key={`${Math.random()}`} className={'PlainFlexRow'}>
        <input
          type={'checkbox'}
          onChange={event => on_checkbox_toggle({ name, checked: event.target.checked })}
          checked={filtered_tags.has(name)}
        />
        <label>{name}</label>
      </span>
    );
  });
  return <div className={'FilterControl'}>{input_pairs}</div>;
};
