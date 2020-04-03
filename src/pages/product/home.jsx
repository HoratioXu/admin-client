import React, {Component} from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ButtonLink from "../../components/button-link/button-link";

import { reqProduct, reqSearchProducts, reqUpdateProductStatus } from '../../api/service'
import { PAGE_SIZE} from "../../utils/constants";

const Option = Select.Option;

export default class ProductHome extends Component{

    constructor(props) {
        super(props);
        this.state={
            products: [],
            total: 0,
            loading: false,
            searchType:'productName',
            searchKey:''
        };
        this.initColumns();
    }

    initColumns = () => {
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Description',
                dataIndex: 'desc'
            },
            {
                width: 100,
                title: 'Price',
                dataIndex: 'price',
                render: (price) => <span>${price}</span>
            },
            {
                width: 100,
                title: 'Status',
                render: (product) => {
                    const {_id, status} = product;
                    const newStatus = status === 1? 2:1;
                    return (
                    <span style={{textAlign: "center"}}>
                        <Button type='primary'
                            onClick={()=>this.updateProductStatus(_id, newStatus)}
                        >
                            {status===1? 'UnShelve':'Shelve'}
                        </Button>
                        <p style={{margin: 0, fontWeight:"bold"}}>{status===1? 'On sale':'Unavailable'}</p>
                    </span>
                )}
            },
            {
                width: 100,
                title: 'Edit',
                render: (product) => {return (
                    <span>
                        <ButtonLink onClick={() => this.props.history.push('/product/detail', product)}>
                            Detail
                        </ButtonLink>
                        <ButtonLink onClick={() => this.props.history.push('/product/addUpdate', product)}>
                            Change
                        </ButtonLink>
                    </span>
                )}
            },

        ]
    };

    getProducts = async (pageNum) => {
        this.pageNum = pageNum;
        this.setState({
            loading: true
        });
        const {searchKey, searchType} = this.state;
        let result;
        if(searchKey){
            result = await reqSearchProducts({pageNum, pageSize:PAGE_SIZE, searchKey, searchType});
        }else{
            result = await reqProduct(pageNum, 3);
        }
        this.setState({
            loading: false
        });
        if(result.status === 0){
            const {total, list} = result.data;
            this.setState({
                total,
                products: list
            });
        }
    };

    updateProductStatus = async (productId, status) => {
        const result = await reqUpdateProductStatus(productId, status);
        if (result.status === 0) {
            message.success('Update success!');
            this.getProducts(this.pageNum || 1)
        }
    };

    componentDidMount() {
        this.getProducts(1);
    }


    render(){
        const {products, total, loading, searchType} = this.state;
        const title = (
            <span>
                <Select value={searchType} onChange={value => this.setState({searchType: value})}>
                    <Option key='productName' value='productName'>Search by name</Option>
                    <Option key='productDesc' value='productDesc'>Search by description</Option>
                </Select>
                <Input style={{width: 150, marginLeft: 10, marginRight: 10}}
                       placeholder='keyword'
                       onChange={(event)=>{this.setState({searchKey:event.target.value})}}
                />
                <Button type='primary' onClick={()=>{this.getProducts(1)}}>Search</Button>
            </span>
        );
        const extra = (
            <ButtonLink type='primary' style={{float: 'right'}} onClick={()=>this.props.history.push('/product/addUpdate')}>
                <PlusCircleOutlined/>
                Add product
            </ButtonLink>
        );
        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    columns={this.columns}
                    dataSource={products}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }


}
