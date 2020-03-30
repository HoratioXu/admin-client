import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'

import AddUpdate from "./add-update";
import ProductHome from "./home";
import Detail from "./detail";

export default class Product extends Component{

    render(){
        return(
            <Switch>
                <Route path='/product' component={ProductHome} exact />
                <Route path='/product/addUpdate' component={AddUpdate} />
                <Route path='/product/detail' component={Detail} />
                <Redirect to='/product' />
            </Switch>
        )
    }
}
