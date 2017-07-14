import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router'
import AddUser from './AddUserPage/AddUser'
import {UserList} from './UserListPage/UserList'
import createBrowserHistory from 'history/createBrowserHistory'
import EditUser from './EditUserPage/EditUser';

export default class AppContainer extends React.Component<any, any>{    
    render() {
        const { history } = this.props;
        return (
            <Router history={ history }>

                <Switch>
                    <Route exact path="/" component={ UserList } />
                    <Route path="/newuser" component={ AddUser } /> 
                    <Route path="/edituser/:id" component={ EditUser } />
                </Switch>               
                                              
            </Router>                
        )
    }
}