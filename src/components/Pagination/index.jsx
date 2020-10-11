import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Pagination = ({ onPrev, onNext, prevDisabled }) => {
  return (
    <div className="pagination">
      Pagination: 
      <button type="text" onClick={onPrev} disabled={prevDisabled}>
        Previous
      </button>
      <button type="text" onClick={onNext}>
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  prevDisabled: PropTypes.bool
}
 
export default Pagination;