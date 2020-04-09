import React, {Component} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom'

import {reqLogin} from '../../api/service'
import memory from "../../utils/memory";
import storage from '../../utils/storage'
import './login.less'
import logo from '../../assets/images/logo.png';


export default class Login extends Component{

     onFinish = async values => {
        const {username, password} = values;
        const res = await reqLogin(username, password);
        if(res.status===0){
            const user = res.data;
            message.success('Login success');
            memory.user = user;
            storage.saveUser(user);
            this.props.history.replace('/home');
        }else{
            message.error('Fail to login, please check the username or password')
        }

    };

    render(){
        const user = memory.user;
        if(user._id){
            return <Redirect to='/' />
        }

        return(
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo'/>
                    <h1> Backend administrator</h1>
                </header>
                <section className='login-content'>
                    <h2>Log in</h2>
                    <Form onFinish={this.onFinish} className="login-form">
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    whiteSpace: true,
                                    message: 'Please input your Username!',
                                },
                                {
                                    min: 4,
                                    message: 'At least 4 characters!',
                                },
                                {
                                    max: 12,
                                    message: 'At most 12 characters!',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message: 'letter number and _!',
                                }
                            ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    whiteSpace: true,
                                    message: 'Please input your Password!',
                                },
                                {
                                    min: 4,
                                    message: 'At least 4 characters!',
                                },
                                {
                                    max: 12,
                                    message: 'At most 12 characters!',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message: 'letter number and _!',
                                }
                            ]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
