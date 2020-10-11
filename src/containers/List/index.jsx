import React, { useEffect } from 'react';
import PropsTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsersList } from '../../redux/actions/usersActions';
import UserList from '../../components/UserList';
import Badge from '../../components/BadgeAdmin';
import { LIST_PAGINATION } from '../../constants/routes';
import { MAX_USERS } from '../../constants/common';

import './style.scss';

const List = ({ get, inProgress, data }) => {
  useEffect(() => {
    get(0, MAX_USERS);
  }, []);
  return (
    <div>
      <h2>Users List - no pagination</h2>
      <div>
        <span>adminstrator is marked with </span>
        <Badge />
      </div>
      <div>
        <Link to={LIST_PAGINATION}>
          Show List with Pagination
        </Link>
      </div>
      <hr />
      {
        inProgress ?
          <p>loading...</p>
          :
          <UserList data={data} />
      }
    </div>
  );
}

List.propTypes = {
  get: PropsTypes.func,
  inProgress: PropsTypes.bool,
  data: PropsTypes.array
};
 
function mapStateToProps(state) {
  return {
      inProgress: state.users.list.progress,
      data: state.users.list.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        get: getUsersList
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
