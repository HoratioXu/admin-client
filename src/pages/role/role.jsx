import React, {Component} from 'react';
import {Button, Card, Table, Modal, message, Input, Form} from "antd";
import {PAGE_SIZE} from "../../utils/constants";

import { reqAddRole, reqRoles, reqUpdateRole } from "../../api/service";
import memory from "../../utils/memory";
import {generateDate} from "../../utils/date";
import AuthForm from "./auth-form";
import storage from "../../utils/storage";

const {Item} = Form;

export default class Role extends Component{
    constructor(props) {
        super(props);
        this.initColumn();
        this.state = {
            role: {},
            roles:[],
            isShowAdd: false,
            isShowAuth: false,
        };
        this.addForm = React.createRef();
        this.authForm = React.createRef();

    }



    initColumn = () => {
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Date created',
                dataIndex: 'create_time',
                render: generateDate
            },
            {
                title: 'Auth date',
                dataIndex: 'auth_time',
                render: generateDate
            },
            {
                title: 'Authorizer',
                dataIndex: 'auth_name'

            },
        ]
    };

    getRoles = async () => {
        const res = await reqRoles();
        if(res.status === 0){
            const roles = res.data;
            this.setState({roles});
        }
    };

    onRow = (role) => {
        return {
            onClick: (event) => {
                this.setState({role});
            }
        }
    };

    addRole = () => {
        const form = this.addForm.current;
        form.validateFields().then(async value =>{
            this.setState({
                isShowAdd: false
            });
            const {roleName} = value;
            form.resetFields();
            const result = await reqAddRole(roleName);
            if (result.status===0) {
                message.success('Role created');
                const role = result.data;
                this.setState(state => ({
                    roles: [...state.roles, role]
                }))
            } else {
                message.success('Failed to create role')
            }
        }).catch(e =>{
            console.log(e);
        });
    };

    updateRole = async () => {
        this.setState({
            isShowAuth: false
        });
        const role = this.state.role;
        role.menus = this.authForm.current.getMenus();
        role.auth_time = Date.now();
        role.auth_name = memory.user.username;
        const result = await reqUpdateRole(role);
        if (result.status===0) {
            if(role._id === memory.user.role_id){
                memory.user = {};
                storage.removeUser();
                this.props.history.replace('/login');
                message.success('The current user\'s permission has changed, please log in again')
            }else{
                message.success('Role updated');
                this.setState({
                    roles: [...this.state.roles]
                });
            }
        }else{
            message.error('Failed to update');
        }
    };

    componentDidMount() {
        this.getRoles();
    }

    render(){
        const {roles, role, isShowAdd, isShowAuth} = this.state;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const title = (
            <span>
                <Button type='primary'  onClick={() => this.setState({isShowAdd: true})}>Create role</Button>
                &nbsp;&nbsp;
                <Button type='primary'
                        disabled={!role._id}
                        onClick={() => this.setState({isShowAuth: true})}
                >
                    Edit
                </Button>
            </span>
        );
        return(
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination = {{defaultPageSize: PAGE_SIZE}}
                    rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
                    onRow={this.onRow}
                />
                <Modal
                    title="Add role"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({isShowAdd: false});
                        this.addForm.current.resetFields();
                    }}
                >
                    <Form ref={this.addForm}>
                        <Item
                            name='roleName'
                            label="Title"
                            {...formItemLayout}
                            rules={[{required: true, message: 'you have to input a name'}]}
                        >
                            <Input type="text" placeholder="Please enter a title"/>
                        </Item>
                    </Form>
                </Modal>
                <Modal
                    title="Permission Setting"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({isShowAuth: false})
                    }}
                >
                    <AuthForm ref={this.authForm} role={role}/>
                </Modal>
            </Card>
        )
    }
}
