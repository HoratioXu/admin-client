import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import storage from "../../utils/storage";
import {generateDate} from "../../utils/date";
import navList from "../../config/navConfig";
import memory from "../../utils/memory";
import ButtonLink from "../button-link/button-link";
import './header.less'

const { confirm } = Modal;

class Header extends Component{

    state = {
      sysTime: generateDate(Date.now())
    };

    updateTime = () =>{
        this.timer = setInterval(()=>{
            const sysTime = generateDate(Date.now());
            this.setState({sysTime});
        }, 1000);
    };

    getTitle = () =>{
        const path = this.props.location.pathname;
        let title = '';
        navList.forEach(item=>{
            if(item.key === path){
                title = item.title;
            }
            else if(item.children){
                const result = item.children.find(child=>(path.indexOf(child.key) === 0));
                if(result)
                    title = result.title;
            }
        });
        return title;
    };

    logout = () =>{
        confirm({
            title: 'Do you Want to log out?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                storage.removeUser();
                memory.user = {};
                this.props.history.replace('/login');
            },
        });
    };

    componentDidMount() {
        this.updateTime();
        console.log('did mount');
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    render(){
        let title = this.getTitle();
        const {sysTime} = this.state;
        return(
            <div className='header'>
                <div className='header-top'>
                    <span>Welcom, {memory.user.username}</span>
                    <ButtonLink onClick={this.logout}>Log out</ButtonLink>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{sysTime}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
