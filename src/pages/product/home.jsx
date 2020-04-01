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

import { reqProduct, reqSearchProducts } from '../../api/service'
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
                render: (product) => {return (
                    <span style={{textAlign: "center"}}>
                        <Button type='primary'>UnShelve</Button>
                        <p style={{margin: 0, fontWeight:"bold"}}>On Sale</p>
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

    componentDidMount() {
        this.getProducts(1);
    }


    render(){
        const {products, total, loading, searchType, searchKey} = this.state;
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
            <Button type='primary' style={{float: 'right'}}>
                <PlusCircleOutlined/>
                Add product
            </Button>
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
