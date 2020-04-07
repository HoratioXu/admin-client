import React, {Component} from 'react';
import UserForm from "./user-form";

export default class User extends Component{

    constructor(props) {
        super(props);
    }
    log = () =>{
        console.log(this.form);
    };

    render(){

        return(
            <div>
                <button onClick={this.log}>pring</button>
                <UserForm setForm={(form)=>this.form=form}/>
            </div>
        )
    }
}
