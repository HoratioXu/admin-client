import React, {Component} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from "../../redux/actions";
import './login.less'
import logo from '../../assets/images/logo.png';


class Login extends Component{

     onFinish = async values => {
        const {username, password} = values;
        this.props.login(username, password);

    };

    render(){
        const user = this.props.user;
        if(user && user._id){
            return <Redirect to='/home' />
        }
        const loginError = this.props.user.errorMsg;
        if(loginError)
            message.error(loginError);

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

export default connect(
    state => ({user: state.user}),
    {login}
)(Login);
