import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getUserData } from '../../redux/actions/usersActions';
import './style.scss';

const Detail = ({ get, inProgress, data }) => {
  const params = useParams();
  const history = useHistory();
  const { login } = params;
  const [errorInfo, setError] = useState(undefined);
  useEffect(() => {
    get(login).catch((error) => {
      setError(error);
    });
  }, []);
  const {
    avatar_url,
    name,
    bio,
    site_admin,
    location,
    blog } = data;
  return (  
    <div>
      <h2>User Detail: {login}</h2>
      {
        inProgress ? <p>loading...</p> :
        <div className="user-detail-information">
          <img
            className="user-detail-avatar"
            src={avatar_url}
            alt={login}
          />
          <p>{`name: ${name}`}</p>
          <p>{`bio: ${bio}`}</p>
          <p>{`Is admin: ${site_admin ? 'yes' : 'no'}`}</p>
          <p>{location}</p>
          {
            !!blog &&
            <p><a href={blog} target="_balnk" rel="noopener noreferrer">{blog}</a></p>
          }
        </div>
      }
      {
        errorInfo
      }
      <button type="button" onClick={history.goBack}>
        Go Back
      </button>
    </div>
  );
}
 
Detail.propTypes = {
  get: PropsTypes.func,
  inProgress: PropsTypes.bool,
  data: PropsTypes.shape({
    avatar_url: PropsTypes.string,
    name: PropsTypes.string,
    bio: PropsTypes.string,
    login: PropsTypes.string,
    site_admin: PropsTypes.bool,
    location: PropsTypes.string,
    blog: PropsTypes.string
  })
};
 
function mapStateToProps(state) {
  return {
      inProgress: state.users.detail.progress,
      data: state.users.detail.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        get: getUserData
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
