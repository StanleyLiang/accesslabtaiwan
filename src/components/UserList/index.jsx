import React from 'react';
import PropTypes from 'prop-types';
import UserListItem from '../UserListItem';

const UserList = ({ data }) => {
  return (
    <>
      <p>{`total: ${data.legnth}`}</p>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>avatar</th>
            <th>login</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <UserListItem
              key={`listItem${user.login}`}
              {...user}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

UserList.propTypes = {
  data: PropTypes.array
};
 
export default UserList;