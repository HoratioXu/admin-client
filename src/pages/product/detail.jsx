import React, {Component} from 'react'
import {List, Card} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import {reqCategory} from '../../api/service'
import {BASE_IMG_PATH} from '../../utils/constants'
import ButtonLink from "../../components/button-link/button-link";

const Item = List;

export default class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cName1: '',
            cName2: ''
        }
    }

    getCategoryName = async () => {
        const {categoryId, pCategoryId} = this.props.location.state;
        if (pCategoryId === '0') {
            const result = await reqCategory(categoryId);
            const cName1 = result.data.name;
            this.setState({cName1})
        } else {
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
            const result1 = results[0];
            const result2 = results[1];
            const cName1 = result1.data.name;
            const cName2 = result2.data.name;
            this.setState({cName1, cName2})
        }
    };

    componentDidMount() {
        this.getCategoryName();
    }

    render(){
        const {name, desc, price, imgs, detail} = this.props.location.state;
        console.log(detail);
        const {cName1, cName2} = this.state;
        const title = (
            <span>
                <ButtonLink onClick={() => this.props.history.goBack()}>
                <ArrowLeftOutlined style={{fontSize: 20}}/>
                </ButtonLink>
                &nbsp;&nbsp;Product Detail
            </span>
        );
        const imgStyle = {width: 150, height: 150, marginRight: 10, border: '1px solid black'};
        return (
            <Card className='product-detail' title={title}>
                <List>
                    <Item>
                        <span className='left'>Product Name:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>Description:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>Price:</span>
                        <span>{price + 'CAD'}</span>
                    </Item>
                    <Item>
                        <span className='left'>Category:</span>
                        <span>{cName1 + (cName2 ? ' --> ' + cName2 : '')}</span>
                    </Item>
                    <Item>
                        <span className='left'>Product Image:</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img src={BASE_IMG_PATH + img} alt="img" key={img} style={imgStyle}/>
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>Details:</span>
                        <div dangerouslySetInnerHTML={{__html: detail}}></div>
                    </Item>
                </List>
            </Card>
        )
    }
}
