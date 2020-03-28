import React, {Component} from 'react';
import { Card, Button, Table } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';

import ButtonLink from "../../components/button-link/button-link";
export default class Category extends Component{

    render(){
        const title = 'Level I';
        const extra = (
            <Button type='primary'>
                <PlusCircleOutlined/>
                Create
            </Button>
        );
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Edit',
                width: 300,
                render: () =>(
                    <span>
                        <ButtonLink>Rename</ButtonLink>
                        <ButtonLink>Subcategory</ButtonLink>
                    </span>
                )
            }
        ];

        return(
            <Card title={title} extra={extra}>
                <Table bordered dataSource={dataSource} columns={columns} />
            </Card>
        )
    }
}
