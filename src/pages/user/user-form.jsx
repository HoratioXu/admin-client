import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Select,} from 'antd'

const {Item} = Form;
const Option = Select.Option;

export default function UserForm(props){

    const [form] = Form.useForm();
    props.setForm(form);
    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 16}
    };
    const {user, roles} = props;
    return (
        <Form {...formItemLayout} form={form}>
            <Item
                name='username'
                label="User"
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
                ]}
            >
                <Input type="text" placeholder="Please enter a name"/>
            </Item>
            {
                !user._id ?
                    (
                        <Item
                            name='password'
                            label="Password"
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
                            ]}
                        >
                            <Input type="password" placeholder="Please enter the password"/>
                        </Item>
                    ) : null
            }
            <Item name='phone' label="Phone number">
                <Input type="phone" placeholder="please enter the phone number"/>
            </Item>
            <Item name='email' label="Email">
                <Input type="email" placeholder="Please enter your email address"/>
            </Item>
            <Item
                name='role_id'
                label="Role"
                rules={[
                    {
                        required: true,
                        whiteSpace: true,
                        message: 'Please select a role!',
                    }
                    ]}
            >
                <Select style={{width: 200}} placeholder='Please choose a role'>
                    {
                        roles.map(role =>
                            <Option key={role._id} value={role._id}>
                                {role.name}
                            </Option>
                        )
                    }
                </Select>
            </Item>
        </Form>
    );
}
UserForm.propTypes = {
    setForm: PropTypes.func.isRequired,
    user: PropTypes.object,
    roles: PropTypes.array
};
