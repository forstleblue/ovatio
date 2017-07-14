import * as React from 'react'
import * as FontAwesome from 'react-icons/fa'
import {MdCancel, MdChat, MdCheck} from 'react-icons/md'
import * as styles from './UserList.css'
import { Link } from 'react-router-dom'
import { UserList } from './UserList';
import * as $ from 'jquery'
import { dataTablesWrapper } from './userList.css'
import UserRow from './UserRow';
// import 'datatables.net-dt/css/jquery.dataTables.css'
// require("datatables.net")
// var DataTable = require("datatables.net")
// / <reference path="../../../node_modules/@types/datatables.net" />
import * as DataTables from 'datatables.net'
import * as DataTable  from 'datatables.net'
interface userData {
    professional:   boolean,
    businessName:   string,
    companyId:      string,
    firstName:      string,
    lastName:       string,
    status:         string,    
    commission:     string,     
    address:        string,
    secAddress:     string,
    city:           string,
    zipCode:        string,
    email:          string,
    telephone:      string,
    country:        string
}

interface userList extends React.Props<any> {
    userDataList: Array<userData>
}


export default class UserTable extends React.Component<userList, any> {
    constructor(props:any){
        super(props);
        this.state = {
            filterText:''
        };
        this.handleClick = this.handleClick.bind(this);
        this.filterChange = this.filterChange.bind(this);
    }

    componentDidMount() {

        // ($(this.refs.main) as any).DataTable({
        //    dom: '<"data-table-wrapper"t>',
        //    data: this.props.userDataList,
           
        //    ordering: false
        // });
    }

    filterChange(event:any){
        this.setState({filterText:event.target.value})
    }

    handleClick(e:any){
        this.setState(prevState => ({
            isToggleon: !prevState.isToggleon
        }));
    }

    render(){
                
        return (
            <div className={styles.dataTablesWrapper}>
                
                <div className={styles.addArea}>
                    <Link to="/newuser" replace className="btn btn-primary btn-lg">Ajouter</Link>                    
                </div>
                
                <div className="row">
                    <div className="col-sm-4">
                        <label>                            
                            <input type="text" placeholder="Search..." value={this.state.filterText} ref="filerText" onChange={this.filterChange} />
                        </label>
                    </div>
                    <div className="check-label col-sm-6">
                        <label className="textarea">
                        <input type="checkbox" name="checkbox" checked={this.state.checkbox} onChange={this.handleClick}/>
                        Afficher Apporteurs désactivés</label>
                    </div>
                    <div className="dataTables_length col-sm-2">
                        <label>
                            Show
                            <select name="data_length">
                                <option value="10">10</option>
                                <option value="10">20</option>
                                <option value="10">30</option>
                            </select>
                        </label>
                    </div>
                </div>
                
                <div className="table-responsive">
                    <table className="table table-striped" ref="user_table">
                        <thead>
                            <tr>
                                <th>Statut</th>
                                <th>Entreprise</th>
                                <th>Nom</th>
                                <th>Courriel<i className="fa fa-email"></i></th>
                                <th>Téléphone</th>
                                <th>% Com</th>
                                <th><label onClick={this.handleClick}>Actions</label></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.userDataList.map((row, i) => 
                                <UserRow key={i} row = {row} filterText={this.state.filterText} />                                
                            )}                            
                        </tbody>
                    </table>
                </div>
            </div>            
        )
    }
}