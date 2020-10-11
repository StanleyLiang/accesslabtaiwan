import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DETAIL } from '../../constants/routes';
import Badge from '../../components/BadgeAdmin';
import './style.scss';

const UserListItem = ({ avatar_url, login, site_admin }) => {
  return (
    <tr>
      <td>
        <Link to={`${DETAIL}/${login}`}>
          <div
            className="user-avatar"
          >
            <img
              src={avatar_url}
              alt={login}
            />
            {
              site_admin && <Badge position="absolute" />
            }
          </div>
        </Link>
      </td>
      <td><span className="user-login">{login}</span></td>
    </tr>
  );
}

UserListItem.propTypes = {
  avatar_url: PropTypes.string,
  login: PropTypes.string,
  site_admin: PropTypes.bool
};
 
export default UserListItem;