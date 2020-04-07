import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Tree} from 'antd'
import navList from "../../config/navConfig";
const Item = Form.Item;

export default class AuthForm extends PureComponent {
    static propTypes = {
        role: PropTypes.object
    };

    constructor(props) {
        super(props);
        const {menus} = this.props.role;
        this.treeData = [{
            title: "Permission",
            key: "all",
            children: this.getTreeData(navList)
        }];
        this.state = {
            checkedKeys: menus
        }
    }

    getMenus = () => this.state.checkedKeys;

    getTreeData = (navList) => {
        return navList.reduce((pre, item) => {
            pre.push(
                {
                    title: item.title,
                    key: item.key,
                    children: item.children? this.getTreeData(item.children):null
                }
            );
            return pre;
        }, []);
    };

    onCheck = checkedKeys => {
        this.setState({ checkedKeys });
    };



    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys: menus
        });
    }

    render() {
        console.log('auth render');
        const {role} = this.props;
        const {checkedKeys} = this.state;
        const formItemLayout = {
            labelCol: { span: 4 }, 
            wrapperCol: { span: 15 },
        }; 
        return (
            <div>
                <Item label='Title' {...formItemLayout}>
                    <Input value={role.name} disabled/>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    treeData={this.treeData}
                />
            </div>
        )
    }
}

