import * as React from 'react';
import { Component } from 'react';
import * as $ from 'jquery'
import { Link } from 'react-router-dom'
import * as ReactDOM from 'react-dom'
import * as styles from './AddUser.css'
import * as ReactIntl from 'react-intl'
import { IntlComponent, FormattedNumber, FormattedMessage, FormattedDate} from 'react-intl'

// var i18n = new (require('i18n-2'))
// import * as Switch from 'rc-switch'
// import * as Switch from 'react-bootstrap-switch'
import UserDataForm from '../UserDataForm';


export default class AddUser extends React.Component<any, any> {
    constructor() {
        super();        
    }    
    
    render() {
        return (
            <UserDataForm addNew={true} userId={this.props.match.params.id}/>
        );
    }
}