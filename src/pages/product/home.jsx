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

import { reqProduct } from '../../api/service'
import { PAGE_SIZE} from "../../utils/constants";

const Option = Select.Option;

export default class ProductHome extends Component{

    constructor(props) {
        super(props);
        this.state={
            products: [{
                "status": 1,
                "imgs": [
                    "image-1559402396338.jpg"
                ],
                "_id": "5ca9e05db49ef916541160cd",
                "name": "Lenovo ThinkPad 4809",
                "desc": "ppppppppppppppppppppp",
                "price": 65999,
                "pCategoryId": "5ca9d6c0b49ef916541160bb",
                "categoryId": "5ca9db9fb49ef916541160cc",
                "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">ddddddddddddddddddddddddddd</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">dddddddddddddd</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
                "__v": 0
            },
                {
                    "status": 1,
                    "imgs": [
                        "image-1559402448049.jpg",
                        "image-1559402450480.jpg"
                    ],
                    "_id": "5ca9e414b49ef916541160ce",
                    "name": "ASUS",
                    "desc": "ddddddddddddddddddddddd",
                    "price": 6799,
                    "pCategoryId": "5ca9d6c0b49ef916541160bb",
                    "categoryId": "5ca9db8ab49ef916541160cb",
                    "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">dddddddddddddddddddd</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">dddddddddddddddddddddddddddd</span>&nbsp;</p>\n",
                    "__v": 0
                },],
            total: 0,
            loading: false,
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
                        <ButtonLink>Detail</ButtonLink>
                        <ButtonLink>Change</ButtonLink>
                    </span>
                )}
            },

        ]
    };

    getProducts = async (pageNum) => {
        this.setState({
            loading: true
        });
        const result = await reqProduct(pageNum, 3);
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
        const {products, total, loading} = this.state;
        const title = (
            <span>
                <Select value='productName' onChange={value => this.setState({searchType: value})}>
                    <Option key='productName' value='productName'>Search by name</Option>
                    <Option key='productDesc' value='productDesc'>Search by description</Option>
                </Select>
                <Input style={{width: 150, marginLeft: 10, marginRight: 10}} placeholder='keyword'/>
                <Button type='primary'>Search</Button>
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
