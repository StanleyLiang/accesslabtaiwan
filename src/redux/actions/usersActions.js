import LinkHeaderParse from 'parse-link-header';
import { USER } from '../../constants/actions';
import { checkStatus, parseJSON } from '../../utils/apiUtils';

export const getUsersList = (since = 0, per = 20) => {
    const result = (data, current) => {
        return {
            type: USER.LIST.RESULT,
            data,
            current
        };
    };
    const progress = (inProgress) => {
        return {
            type: USER.LIST.PROGRESS,
            inProgress
        };
    };
    const paginationUpdate = (next) => {
        return {
            type: USER.LIST.PAGINATION.UPDATE.NEXT,
            next
        };
    };
    return (dispatch, getState) => {
        dispatch(progress(true));
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users?since=${since}&per_page=${per}`)
            .then(checkStatus)
            .then((response) => {
                if (response.headers.has('link')) {
                    const link = LinkHeaderParse(response.headers.get('link'));
                    let { next } = getState().users.list;

                    if (link.next) {
                        next = link.next.since
                    }
                    dispatch(paginationUpdate(next));
                }
                if (response.headers.has('content-type')) {
                    if (response.headers.get('content-type').indexOf('application/json') !== -1) {
                        return response.json();
                    }
                }
                return new Promise((resolve) => {
                    resolve({});
                });
            })
            .then((data) => {
                setTimeout(() => {
                    dispatch(result(data.map((item) => {
                        const { avatar_url, login, site_admin } = item;
                        return {
                            avatar_url,
                            login,
                            site_admin
                        };
                    }), since));
                    dispatch(progress(false));
                }, 1500);
                resolve();
            })
            .catch((error) => {
                dispatch(progress(false));
                reject(error);
            });
        });
    };
};

export const getUserListPaginationNext = () => {
    return (dispatch, getState) => {
        const { next } = getState().users.list.pagination;
        dispatch(getUsersList(next));
    };
};

export const getUserListPaginationPrev = () => {
    return (dispatch, getState) => {
        const { prev } = getState().users.list.pagination;
        dispatch(getUsersList(prev));
    };
};

export const getUserData = (login) => {
    const result = (data) => {
        return {
            type: USER.DETAIL.RESULT,
            data
        };
    };
    const progress = (inProgress) => {
        return {
            type: USER.DETAIL.PROGRESS,
            inProgress
        };
    };
    return (dispatch) => {
        dispatch(progress(true));
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users/${login}`)
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                setTimeout(() => {
                    const { avatar_url, name, bio, login, site_admin, location, blog } = data;
                    const resultData = {
                        avatar_url, name, bio, login, site_admin, location, blog
                    };
                    dispatch(result(resultData));
                    dispatch(progress(false));
                }, 1500);
                resolve();
            })
            .catch((error) => {
                dispatch(progress(false));
                reject(error);
            });
        });
    };
};