import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const BadgeAdmin = ({ position }) => {
  const style = { position };
  return (
    <div className="badge-admin" style={style}>
      ADMIN
    </div>
  );
}

BadgeAdmin.propTypes = {
  position: PropTypes.string
};

BadgeAdmin.defaultProps = {
  position: 'static'
}
 
export default BadgeAdmin;