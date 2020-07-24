import React from 'react';

export const NotesAppBar = () => {
  return (
    <div className="notes__appbar">
      <span>24 de julio de 2020</span>
      <div>
        <button className="btn">Picture</button>
        <button className="btn">Save</button>
      </div>
    </div>
  );
};