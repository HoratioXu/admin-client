import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {connect} from "react-redux";

import {logout} from "../../redux/actions";
import {generateDateFull} from "../../utils/date";
import ButtonLink from "../button-link/button-link";
import './header.less'

const { confirm } = Modal;

class Header extends Component{

    state = {
      sysTime: generateDateFull(Date.now())
    };

    updateTime = () =>{
        this.timer = setInterval(()=>{
            const sysTime = generateDateFull(Date.now());
            this.setState({sysTime});
        }, 1000);
    };

    logout = () =>{
        confirm({
            title: 'Do you Want to log out?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                this.props.logout();
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
        let title = this.props.headTitle;
        const {sysTime} = this.state;
        return(
            <div className='header'>
                <div className='header-top'>
                    <span>Welcom, {this.props.user.username}</span>
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

export default connect(
    state => ({headTitle: state.headTitle, user: state.user}),
    {logout}
)(withRouter(Header));
