import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import { Menu } from 'antd';
import {HomeOutlined, UnorderedListOutlined, ShopOutlined, ShoppingOutlined} from '@ant-design/icons';
import logo from "../../assets/images/logo.png";
import './nav-left.less'

const { SubMenu } = Menu;

export default class NavLeft extends Component{

    render(){
        return(
            <div className='nav-left'>
                <Link to='/' className='nav-left-header'>
                    <img src={logo} alt='logo'/>
                    <h1>React Panel</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <HomeOutlined />
                        <span>Home</span>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <ShoppingOutlined />
                                <span>Management</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <UnorderedListOutlined />
                            <span>Category</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <ShopOutlined />
                            <span>Product</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
