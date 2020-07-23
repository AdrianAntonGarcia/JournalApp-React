import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://www.gettyimages.es/gi-resources/images/500px/983794168.jpg)',
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">
            Un nuevo día
        </p>
        <p className="journal__entry-content">
            Enim sit in veniam voluptate in ut duis minim elit culpa ex exercitation culpa nostrud.
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
