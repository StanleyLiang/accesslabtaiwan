import { USER } from '../../constants/actions';

const initialState = {
    list: {
        data: [],
        progress: true,
        pagination: {
            next: 0,
            current: 0,
            prev: 0,
        }
    },
    detail: {
        data: {
            avatar_url: '',
            name: '',
            bio: '',
            login: '',
            site_admin: false,
            location: '',
            blog: ''
        },
        progress: true
    }
};

const users = (state = initialState, action) => {
    switch (action.type) {
    case USER.LIST.PROGRESS: {
        return Object.assign({}, state, {
            list: {
                ...state.list,
                progress: action.inProgress
            }
        });
    }
    case USER.LIST.RESULT: {
        const pagination = {
            ...state.list.pagination,
            prev: state.list.pagination.prev,
            current: action.current
        };
        return Object.assign({}, state, {
            list: {
                ...state.list,
                data: action.data,
                pagination
            }
        })
    }
    case USER.DETAIL.PROGRESS: {
        return Object.assign({}, state, {
            detail: {
                ...state.detail,
                progress: action.inProgress
            }
        })
    }
    case USER.DETAIL.RESULT: {
        return Object.assign({}, state, {
            detail: {
                ...state.detail,
                data: action.data
            }
        });
    }
    case USER.LIST.PAGINATION.UPDATE.NEXT: {
        const pagination = {
            ...state.list.pagination,
            next: action.next
        };
        const list = {
            ...state.list,
            pagination
        }
        return Object.assign({}, state, { list });
    }
    default:
        return state;
    }
};

export default users;
