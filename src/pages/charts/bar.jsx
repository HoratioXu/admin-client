import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {
    state = {
        sales: [5, 20, 36, 10, 10],
        inventories: [15, 30, 46, 20, 20]
    };
    getOption = () => {
        const {sales, inventories} = this.state;
        return {
            title: {
                text: '5 Best-Selling Products'
            },
            tooltip: {},
            legend: {
                data:['Sales', 'In stock']
            },
            xAxis: {
                data: ["product1","product2","product3","product4","product5"]
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data:sales
            }, {
                name: 'In stock',
                type: 'bar',
                data: inventories
            }]
        }
    };
    update = () => {
        const sales = this.state.sales.map(sale => sale + 1);
        const inventories = this.state.inventories.map(inventory => inventory -1);
        this.setState({
            sales,
            inventories
        })
    };
    render() {
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>Period change</Button>
                </Card>
                <Card>
                    <ReactEcharts option={this.getOption()} style={{height: 300}}/>
                </Card>
            </div>
        )
    }
}
