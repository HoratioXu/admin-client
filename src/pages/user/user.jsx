import React, {Component} from 'react';
import {Card, Button, Table, Modal} from 'antd'
import ButtonLink from "../../components/button-link/button-link";
import UserForm from "./user-form";
import {reqUsers, reqAddOrUpdateUser, reqDeleteUser} from "../../api/service";
import {generateDate} from "../../utils/date";
import {PAGE_SIZE} from "../../utils/constants";

export default class User extends Component{

    constructor(props) {
        super(props);
        this.initColumns();
        this.state = {
            isShow: false,
            users: [],
            roles: [],
        }
    }

    initColumns = () => {
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'username'
            },
            {
                title: 'Email',
                dataIndex: 'email'
            },
            {
                title: 'Phone number',
                dataIndex: 'phone'
            },
            {
                title: 'Register date',
                dataIndex: 'create_time',
                render: generateDate
            },
            {
                title: 'Role',
                dataIndex: 'role_id',
                render: value => this.roleNames[value]
            },
            {
                title: 'Edit',
                render: (user) => (
                    <span>
                        <ButtonLink onClick={() => this.showUpdate(user)}>Update</ButtonLink>
                        &nbsp;&nbsp;
                        <ButtonLink onClick={() => this.clickDelete(user)}>Delete</ButtonLink>
                    </span>
                )
            },
        ]
    };

    initRoleNames = (roles) => {
        this.roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name;
            return pre
        }, {});
    };

    clickDelete = (user) => {
        Modal.confirm({
            content: `Do you want to delete ${user.username}?`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id);
                if (result.status === 0) {
                    this.getUsers();
                }
            }
        })
    };

    showUpdate = (user) => {
        this.user = user;
        this.setState({
            isShow: true
        })
    };

    getUsers = async () => {
        const result = await reqUsers();
        if (result.status === 0) {
            const {users, roles} = result.data;
            this.initRoleNames(roles);
            this.setState({
                users,
                roles
            })
        }
    };

    showAddUser = () => {
        this.user = null;
        this.setState({
            isShow: true
        })
    };

    AddOrUpdateUser = async () => {
        const user = this.form.getFieldsValue();
        this.form.resetFields();
        if (this.user) {
            user._id = this.user._id
        }
        this.setState({
            isShow: false
        });
        const result = await reqAddOrUpdateUser(user);
        if (result.status === 0) {
            this.getUsers()
        }
    };

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const {users, roles, isShow} = this.state;
        const user = this.user || {};
        const title = <Button type="primary" onClick={this.showAddUser}>Create user</Button>;
        return (
            <div>
                <Card title={title}>
                    <Table
                        columns={this.columns}
                        rowKey='_id'
                        dataSource={users}
                        bordered
                        pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                    />
                    <Modal
                        title={user._id ? 'Update user' : 'Add user'}
                        visible={isShow}
                        onCancel={() => this.setState({isShow: false})}
                        onOk={this.AddOrUpdateUser}
                    >
                        <UserForm
                            setForm={(form) => this.form = form}
                            user={user}
                            roles={roles}
                        />
                    </Modal>
                </Card>
            </div>
        )
    }
}



