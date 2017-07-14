import * as React from 'react'
import * as FontAwesome from 'react-icons/fa'
import {MdCancel, MdChat, MdCheck} from 'react-icons/md'
import { Component } from 'react';
import * as $ from 'jquery'
import { Link } from 'react-router-dom'
import * as ReactDOM from 'react-dom'
import * as styles from './AddUserPage/AddUser.css'
import UserTable from './UserListPage/UserTable'
import FormErrors from './FormErrors';

interface userID extends React.Props<any> {
    userId: string
    addNew: boolean
}
export default class UserDataForm extends React.Component<userID, any> {
    constructor(props:any){
        super(props);
        this.state = {
            professional: false,
            businessName: '',
            companyId: '',
            firstName: '',
            lastName: '',
            status: 'En cours',
            commission: '30%',
            address: '',
            secAddress: '',
            city: '',
            zipCode: '',
            email: '',
            telephone: '',
            formErrors: {email: ''},
            emailValid: false,
            formValid: false,
            country:'France'           
        };

        
        this.validateFiled = this.validateFiled.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailChange = this.emailChange.bind(this);
    }

    emailChange(event: any) {
        this.setState({ email: event.target.value })
        this.validateFiled("email", event.target.value)
    }
    validateFiled(filedName:any, value:any) {
        let emailValid = this.state.emailValid
        let fieldValidationErrors = this.state.formErrors;
        switch(filedName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors, 
                        emailValid: emailValid})
    }
    
    handleUserInput = (event:any) => {
        var name = event.target.name;
        var value:any;

        if(name=="professional"){
            value = event.target.checked
        } else {
            value = event.target.value
        }
        
        this.setState({[name]: value})   
        this.validateFiled(name, value)   
                    
    }    

    componentWillMount() {
        if(this.props.addNew == true) {
            return
        }
        var url = '/api/user/' + this.props.userId
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            success: function (data: any) {                
                this.setState({
                    professional: data.professional,
                    businessName: data.businessName,
                    companyId: data.companyId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    status: data.status,
                    commission: data.commission,
                    address: data.address,
                    secAddress: data.secAddress,
                    city: data.city,
                    zipCode: data.zipCode,
                    email: data.email,
                    telephone: data.telephone,
                    country: data.country
                })
            }.bind(this),
            error: function (xhr, text, err) {
                console.log("error writing data to db")
            }
        });
    }

    
    
    validateForm() {
        this.setState({formValid: this.state.emailValid})
    }

    errorClass(error:any) {
        return(error.length === 0 ? '' : 'has-error');
    }

    handleSubmit(event: any) {
        event.preventDefault();
        this.validateFiled("email", this.state.email)
        if(this.state.formErrors["email"].length > 0 ){
            return
        }

        var data = {
            professional: this.state.professional,
            businessName: this.state.businessName,
            companyId: this.state.companyId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            status: this.state.status,
            commission: this.state.commission,
            address: this.state.address,
            secAddress: this.state.secAddress,
            city: this.state.city,
            zipCode: this.state.zipCode,
            email: this.state.email,
            telephone: this.state.telephone,
            country: this.state.country
        }

        if(this.props.addNew == true) {
            $.ajax({
                url: '/api/adduser',
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (data: any) {
                    window.location.href = '/'
                    console.log("success write data")
                }.bind(this),
                error: function (xhr, text, err) {
                    console.log("error writing data to db")
                }
            });
        }
        else if(this.props.addNew == false ) {
            var url = '/api/updateuser/' + this.props.userId
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (data: any) {
                    window.location.href = '/'
                    console.log("success write data")
                }.bind(this),
                error: function (xhr, text, err) {
                    console.log("error writing data to db")
                }
            });
        }
        
    }
    render() {
        return (
            <div className="container" style={{ paddingTop: 100 }}>

                <form onSubmit={this.handleSubmit}>
                    
                    <div className="row" style={{ paddingBottom: 40 }}>
                        <div className="col-sm-2">
                            <label>Professionel</label>
                        </div>
                        <div className="col-sm-2">
                            <label className={styles.switchUI}>                                
                                <input type="checkbox" name="professional" defaultChecked={this.state.professional} onChange={this.handleUserInput} />                                                               
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                        <div className="col-sm-2">
                            <label>Particulier</label>
                        </div>
                    </div>
                    <div className="row" style={{ paddingBottom: 40 }}>
                        {this.state.professional ?
                            <div>
                                <div>
                                    <div className="col-sm-2">
                                        <label>Nam apporteur</label>
                                    </div>
                                    <div className="col-sm-2">
                                        <input type="text" name="lastName" onChange={this.handleUserInput} />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <div className="col-sm-2">
                                            <label>Prenom apporteur</label>
                                        </div>
                                        <div className="col-sm-2">
                                            <input type="text" name="firstName" onChange={this.handleUserInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div>
                                    <div className="col-sm-2">
                                        <label>Raison sociale</label>
                                    </div>
                                    <div className="col-sm-2">
                                        <input type="text" name="businessName" onChange={this.handleUserInput} />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <div className="col-sm-2">
                                            <label>Siret</label>
                                        </div>
                                        <div className="col-sm-2">
                                            <input type="text" name="companyId" onChange={this.handleUserInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>


                    <div className="row" style={{ paddingBottom: 40 }}>
                        <div className="col-sm-2">
                            <label>Statut</label>
                        </div>
                        <div className="col-sm-2 ">
                            <select className="select" name="status" value={this.state.status} onChange={this.handleUserInput}>
                                <option value="" disabled>-Sélectionner-</option>
                                <option value="En cours">En cours</option>
                                <option value="Prospect">Prospect</option>
                                <option value="Résilié">Résilié</option>
                            </select>
                        </div>

                        <div className="col-sm-2">
                            <label>Part de reversement</label>
                        </div>
                        <div className="col-sm-2">
                            <select className="select" name="commission" value={this.state.commission} onChange={this.handleUserInput}>
                                <option value="" disabled>-Sélectionner-</option>
                                <option value="30%">30%</option>
                                <option value="50%">50%</option>
                            </select>
                        </div>
                    </div>

                    <div className="row" style={{ paddingBottom: 40 }}>
                        <div className="col-sm-2">
                            <label>Adresse</label>
                        </div>
                        <div className="col-sm-2">
                            <input type="text" required name="address" value={this.state.address} onChange={this.handleUserInput} />
                        </div>

                        <div className="col-sm-2">
                            <label>Adresse(suite)</label>
                        </div>
                        <div className="col-sm-2">
                            <input type="text" required name="secAddress" value={this.state.secAddress} onChange={this.handleUserInput} />
                        </div>
                    </div>

                    <div className="row" style={{ paddingBottom: 40 }}>
                        <div className="col-sm-2">
                            <label>Ville</label>
                        </div>
                        <div className="col-sm-2">
                            <input type="text" required name="city" value={this.state.city} onChange={this.handleUserInput} />
                        </div>

                        <div className="col-sm-2">
                            <label>Code Postal</label>
                        </div>
                        <div className="col-sm-2">
                            <input type="text" required name="zipCode" value={this.state.zipCode} onChange={this.handleUserInput} />
                        </div>
                        <div className="col-sm-2">
                            <label>Pays</label>
                        </div>
                        <div className="col-sm-2">
                            <select className="select" name="country" value={this.state.country} onChange={this.handleUserInput}>
                                <option value="" disabled>-Sélectionner-</option>
                                <option value="France">France</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>
                    </div>

                    <div className="row" style={{ paddingBottom: 40 }}>
                        <div className="col-sm-2">
                            <label>Courriel</label>
                        </div>
                        <div className={`form-group col-sm-2 ${this.errorClass(this.state.formErrors.email)}`}>
                            <input type="text" required name="email" value={this.state.email} onChange={this.handleUserInput} />
                            {this.state.formErrors["email"].length > 0 ?
                                <p>Email is invalid</p>:
                                ''
                            }
                        </div>

                        <div className="col-sm-2">
                            <label>Telephone</label>
                        </div>
                        <div className="col-sm-2">
                            <input type="text" required name="telephone" value={this.state.telephone} onChange={this.handleUserInput} />
                        </div>
                    </div>

                    <div className="row" style={{ paddingBottom: 40 }}>
                        <div className="col-sm-8">
                        </div>
                        <div className="col-sm-2">
                            {this.props.addNew ?
                            <input type="submit" className="btn btn-primary btn-lg" value="Add" />:
                            <input type="submit" className="btn btn-primary btn-lg" value="Update" />
                            }                            
                        </div>
                        <div className="colo-sm-2">
                            <Link to="/" className="btn btn-primary btn-lg">Annuler</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}