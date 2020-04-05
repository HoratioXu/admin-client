import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Tree} from 'antd'
import navList from "../../config/navConfig";
const Item = Form.Item;
const { TreeNode } = Tree;

export default class AuthForm extends PureComponent {
    static propTypes = {
        role: PropTypes.object
    };

    constructor(props) {
        super(props);
        const {menus} = this.props.role;
        this.treeNodes = this.getTreeNodes(navList);
        this.state = {
            checkedKeys: menus
        }
    }

    getMenus = () => this.state.checkedKeys;

    getTreeNodes = (navList) => {
        return navList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            );
            return pre
        }, []);
    };

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

   /* componentWillReceiveProps (nextProps) {
        console.log('componentWillReceiveProps()', nextProps);
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys: menus
        });
    }*/

    static getDerivedStateFromProps(props, state) {
        const {menus} = props.role;
        return {
            checkedKeys: menus
        };
    }

    render() {
        console.log('AuthForm render()');
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
                >
                    <TreeNode title="Permission" key="all">
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}

