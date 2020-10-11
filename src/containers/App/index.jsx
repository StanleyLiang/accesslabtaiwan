import React from 'react';
import { Switch, Route } from 'react-router';
import { MAIN, DETAIL, LIST_PAGINATION } from '../../constants/routes';
import List from '../List';
import Detail from '../Detail';
import ListPagination from '../ListPagination';
import './style.scss';

const propTypes = {}

const App = (props) => {
    return (
        <div className="app">
            <Switch>
                <Route
                    path={`${DETAIL}/:login`}
                    component={Detail}
                />
                <Route
                    path={LIST_PAGINATION}
                    component={ListPagination}
                />
                <Route
                    path={MAIN}
                    component={List}
                />
            </Switch>
        </div>
    );
};

App.propTypes = propTypes;

export default App;
