import React, {Component} from 'react';
import { Card, Button, Table, message, Modal, Form, Select, Input} from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { getCategoryReq, addCategoryReq, updateCategoryReq} from "../../api/service";

import ButtonLink from "../../components/button-link/button-link";

const Item = Form.Item;
const Option = Select.Option;

export default class Category extends Component{

    constructor(props) {
        super(props);
        this.initCat();
        this.state = {
            categories: [],
            subCategories: [],
            loading: false,
            parentId: '0',
            parentName: '',
            showStatus: 0
        };
    }

    initCat = () =>{
        this.columns = [
            {
                title: 'Category Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Edit',
                width: 300,
                render: (category) =>(
                    <span>
                        <ButtonLink onClick={()=>{this.showUpdate(category)}}>Rename</ButtonLink>
                        {this.state.parentId==='0'?
                            <ButtonLink onClick={()=>{this.showSubcategories(category)}}>Subcategory</ButtonLink>:
                            null
                        }

                    </span>
                )
            }
        ];
    };

    getCategories = async(parentId) => {
        this.setState({loading: true});
        parentId = parentId || this.state.parentId;
        const res = await getCategoryReq(parentId);
        this.setState({loading: false});
        if(res.status === 0){
            const categories = res.data;
            if(parentId === '0'){
                this.setState({categories});
            }else{
                this.setState({
                    subCategories: categories
                });
            }
        }else{
            console.log(res);
            message.error('failed to load category list, try again later');
        }

    };

    showCategories = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategories: [],
            showStatus: 0,
        },()=>{
            if(this.formAdd){
                this.formAdd.setFieldsValue({parentId: this.state.parentId, categoryName:''})
            }
        });

    };

    showSubcategories = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            this.getCategories();
            if(this.formAdd){
                this.formAdd.setFieldsValue({parentId: this.state.parentId, categoryName:''});
            }
        });

    };

    showUpdate = (category) => {
        this.category = category;
        this.setState({
            showStatus: 2
        },()=>{
            if(this.formUpdate)
                this.formUpdate.setFieldsValue({categoryName:category.name})
        });
    };

    addCategory = async () => {
        const {parentId, categoryName} = this.formAdd.getFieldsValue();
        this.setState({showStatus: 0});
        const result = await addCategoryReq(parentId, categoryName);
        if (result.status === 0) {
            if( parentId===this.state.parentId) {
                this.getCategories();
            } else if (parentId === '0') {
                this.getCategories(parentId);
            }
        }
    };



    updateCategory = async () => {
        const categoryId = this.category._id;
        const {categoryName} = this.formUpdate.getFieldsValue();
        this.setState({showStatus: 0});
        const result = await updateCategoryReq({categoryId,categoryName});
        if(result.status === 0)
            this.getCategories();
    };






    componentDidMount() {
        this.getCategories();
    }

    render(){
        const {categories, loading, subCategories, parentId, parentName, showStatus} = this.state;
        const category = this.category || {};
        const extra = (
            <Button type='primary' onClick={() =>{
                this.setState({
                showStatus: 1
                });

            }}>
                <PlusCircleOutlined/>
                Create
            </Button>
        );
        const title = parentId === '0' ? 'Main' : (
            <span>
                <ButtonLink onClick={this.showCategories}>Main category</ButtonLink> &nbsp;&nbsp;
                <ArrowRightOutlined />&nbsp;&nbsp;
                <span>{parentName}</span>
            </span>
        );
        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={parentId === '0' ? categories : subCategories}
                    columns={this.columns}
                    loading={loading}
                    pagination={{pageSize: 5, showQuickJumper: true, showSizeChanger: true}}
                />

                <Modal
                    title="Create a new category"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={
                        () => {
                        this.setState({showStatus: 0});
                        }
                    }
                >
                    <Form
                        ref={(form)=>this.formAdd = form}
                        initialValues={{parentId, categoryName: ''}}
                    >
                        <Item name='parentId' label='Classification'>
                            {
                                <Select>
                                    <Option key='0' value='0'>Level one category</Option>
                                    {
                                        categories.map(c => <Option key={c._id}
                                                                    value={c._id}>{c.name}</Option>)
                                    }
                                </Select>
                            }
                        </Item>
                        <Item name='categoryName' label='Category name'>
                            {
                                <Input placeholder='Create a name'/>
                            }
                        </Item>
                    </Form>
                </Modal>

                <Modal
                    title="Rename"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={
                        () => {
                            this.setState({showStatus: 0});
                        }
                    }
                >
                    <Form
                        ref={(form)=>this.formUpdate = form}
                        initialValues={{categoryName: category.name}}
                    >
                        <Item name='categoryName' label='Category name'>
                            {
                                <Input placeholder='Create a name'/>
                            }
                        </Item>
                    </Form>
                </Modal>
            </Card>


        )
    }
}
