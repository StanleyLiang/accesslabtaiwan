import React, { useEffect, useRef } from 'react';
import PropsTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsersList, getUserListPaginationNext, getUserListPaginationPrev } from '../../redux/actions/usersActions';
import UserList from '../../components/UserList';
import Badge from '../../components/BadgeAdmin';
import { MAIN } from '../../constants/routes';
import { PER_PAGE, MAX_USERS } from '../../constants/common';
import Pagination from '../../components/Pagination';
import './style.scss';

const List = ({ get, inProgress, data, next, prev, prevSince }) => {
  const listRef = useRef(null);
  useEffect(() => {
    get(0, PER_PAGE);
  }, []);
  const scrollToTop = () =>{ 
    if (!!listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const onPagePrev = () => {
    prev();
    scrollToTop();
  };
  const onPageNext = () => {
    next();
    scrollToTop();
  };
  return (
    <div ref={listRef}>
      <h2>Users List - pagination</h2>
      <div>
        <span>adminstrator is marked with </span>
        <Badge />
      </div>
      <div>
        <Link to={MAIN}>
          Show List without pagination
        </Link>
      </div>
      <hr />
      {
        inProgress ?
          <p>loading...</p>
          :
          <>
            <UserList data={data} />
            <Pagination
              onNext={onPageNext}
              onPrev={onPagePrev}
              prevDisabled={prevSince === 0}
            />
          </>
      }
    </div>
  );
}

List.propTypes = {
  get: PropsTypes.func,
  next: PropsTypes.func,
  prev: PropsTypes.func,
  inProgress: PropsTypes.bool,
  data: PropsTypes.array,
  prevSince: PropsTypes.number
};
 
function mapStateToProps(state) {
  return {
      inProgress: state.users.list.progress,
      data: state.users.list.data,
      prevSince: state.users.list.pagination.prev
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        get: getUsersList,
        next: getUserListPaginationNext,
        prev: getUserListPaginationPrev
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
