import * as React from 'react';
import { Component } from 'react';
import * as $ from 'jquery'
import { Link } from 'react-router-dom'
import * as ReactDOM from 'react-dom'
import * as styles from '../AddUserPage/AddUser.css'

import UserDataForm from '../UserDataForm';
export default class EditUser extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        
    }

    render() {
        return (
            <UserDataForm addNew={false} userId={this.props.match.params.id}/>
        );
    }
}