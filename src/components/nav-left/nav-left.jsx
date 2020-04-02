import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'

import { Menu } from 'antd';

import navList from "../../config/navConfig";
import logo from "../../assets/images/logo.png";
import './nav-left.less'

const { SubMenu } = Menu;
const { Item } = Menu;


class NavLeft extends Component{

    constructor(props) {
        super(props);
        this.menuItem = this.createMenuItem(navList);
    }

    createMenuItem = (navList)=>{
        const path = this.props.location.pathname;
        return navList.map(item => {
            if(!item.children)
                return (
                    <Item key={item.key}>
                        <Link to={item.key}>
                            <item.icon />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                );
            else{
                const subItem = item.children.find(child=>path.indexOf(child.key)===0);
                if(subItem)
                    this.openKey = item.key;
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <item.icon />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.createMenuItem(item.children)}
                    </SubMenu>
                );
            }
        });
    };


    render(){
        let selectKey = this.props.location.pathname;
        const openKey = this.openKey;
        if(selectKey.indexOf('/product') === 0)
            selectKey = '/product';

        return(
            <div className='nav-left'>
                <Link to='/' className='nav-left-header'>
                    <img src={logo} alt='logo'/>
                    <h1>React Panel</h1>
                </Link>
                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuItem}
                </Menu>
            </div>
        )
    }
}

export default withRouter(NavLeft);
