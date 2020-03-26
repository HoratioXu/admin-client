import React, {Component} from 'react';
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import memory from "../../utils/memory";
import Header from "../../components/header/header";
import NavLeft from "../../components/nav-left/nav-left";
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
const {Sider, Footer, Content } = Layout;

export default class Admin extends Component{

    render(){
        const user = memory.user;
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return(
            <Layout style={{height: '100%'}}>
                <Sider><NavLeft /></Sider>
                <Layout>
                    <Header />
                    <Content style={{backgroundColor: 'white'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>Please use Chrome browser
                    for best experience</Footer>
                </Layout>
            </Layout>
        )
    }
}
