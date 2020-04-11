import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Line extends Component {
    state = {
        sales: [5, 20, 36, 10, 10, 20],
        inventories: [15, 30, 46, 20, 20, 40]
    };

    getOption = () => {
        const {sales, inventories} = this.state;
        return {
            title: {
                text: 'Week to Week Comparison'
            },
            tooltip: {},
            legend: {
                data:['This week', 'Last week']
            },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'line',
                data:sales
            }, {
                name: 'In stock',
                type: 'line',
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
                    <Button type='primary' onClick={this.update}>Analysis</Button>
                </Card>
                <Card>
                    <ReactEcharts option={this.getOption()} style={{height: 300}}/>
                </Card>
            </div>
        )
    }
}
