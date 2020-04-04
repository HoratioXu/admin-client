import React, {Component} from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    message
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import ButtonLink from "../../components/button-link/button-link";
import {getCategoryReq, reqAddOrUpdateProduct} from '../../api/service'
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";

const {Item} = Form;
const {TextArea} = Input;

export default class AddUpdate extends Component{

    constructor(props) {
        super(props);
        this.state = {
            options: [],
        };
        this.picWall = React.createRef();
        this.editor = React.createRef();
        const product = this.props.location.state;
        this.product = product || {};
        this.isUpdate = !!product
    }

    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const subCategories = await this.getCategories(targetOption.value);
        targetOption.loading = false;
        if(subCategories && subCategories.length>0) {
            const cOptions = subCategories.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }));
            targetOption.children = cOptions
        } else { // 没有子分类
            targetOption.isLeaf = true;
        }
        this.setState({
            options: [...this.state.options],
        });
    };

    getCategories = async (parentId) => {
        const result = await getCategoryReq(parentId);
        if (result.status === 0) {
            const categories = result.data;
            if (parentId === '0') {
                this.initOptions(categories)
            } else {
                return categories
            }
        }
    };

    initOptions = async (categories) => {
        const options = categories.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }));
        const {product, isUpdate} = this;
        if(isUpdate && product.pCategoryId!=='0') {
            const subCategories = await this.getCategories(product.pCategoryId);
            if (subCategories && subCategories.length>0) {
                const cOptions = subCategories.map(c => ({
                    value: c._id,
                    label: c.name,
                    isLeaf: true,
                }));
                const targetOption = options.find(option => option.value===product.pCategoryId);
                targetOption.children = cOptions;
            }
        } 
        this.setState({
            options
        })
    };

    onFinish = async (values) => {
        const {name, desc, price, categoryIds} = values;
        const imgs = this.picWall.current.getImageNames();
        const detail = this.editor.current.getDetail();
        let pCategoryId = '';
        let categoryId = '';
        if(categoryIds.length===1) {
            pCategoryId = '0';
            categoryId = categoryIds[0];
        } else {
            pCategoryId = categoryIds[0];
            categoryId = categoryIds[1];
        }
        const product = {name, desc, price, pCategoryId, categoryId, detail, imgs};
        if(this.isUpdate)
            product._id = this.product._id;
        const result = await reqAddOrUpdateProduct(product);
        if(result.status===0) {
            message.success('Product update success');
            this.props.history.goBack();
        }
    };

    validatePrice = (rule, value, callback) => {
        value = value * 1;
        if(value>0) {
            callback()
        } else {
            callback('Price must be greater than 0')
        }
    };

    componentDidMount () {
        this.getCategories('0')
    }

    render(){
        const {product, isUpdate} = this;
        const {pCategoryId, categoryId} = product;
        const {options} = this.state;
        const categoryIds = [];
        if(isUpdate) {
            if(pCategoryId==='0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId)
            }
        }
        const title = (
            <span>
                <ButtonLink onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{fontSize: 20}} />
                </ButtonLink>
                {isUpdate ? 'Edit product' : 'Add product'}
            </span>
        );
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 10 }
        };
        console.log(product);

        return(
            <Card title={title}>
                <Form
                    onFinish={this.onFinish}
                    initialValues={{
                        name: product.name,
                        desc: product.desc,
                        price: product.price,
                        categoryIds: categoryIds,
                    }}
                >
                    <Item label="Product Name" {...formItemLayout}
                          name='name'
                          rules={[{required: true, message: 'you have to input a name'}]}
                    >
                        <Input placeholer='please input a name'/>
                    </Item>

                    <Item label="Description" {...formItemLayout}
                          name='desc'
                          rules={[{required: true, message: 'you have to input the description'}]}
                    >
                        <TextArea placeholder="please input a description" autosize='true' />
                    </Item>

                    <Item label="Price" {...formItemLayout}
                          name='price'
                          rules={[
                              {required: true, message: 'you have to input the price'},
                              {validator: this.validatePrice}
                          ]}
                    >
                        <Input type='number' placeholer='please input a price' addonAfter='CAD'/>
                    </Item>

                    <Item label="Category" {...formItemLayout}
                          name='categoryIds'
                          rules={[{required: true, message: 'you have to select a category'}]}
                    >
                        <Cascader
                            options={options}
                            loadData={this.loadData}
                        />
                    </Item>

                    <Item label="Images" {...formItemLayout}>
                        <PicturesWall ref={this.picWall} imgs={product.imgs}/>
                    </Item>

                    <Item
                        label="Details"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}>
                        <RichTextEditor ref={this.editor} detail={product.detail}/>
                    </Item>

                    <Button type='primary'
                            htmlType="submit"
                            style={{marginLeft: '30%'}}
                    >
                        {this.isUpdate? 'Update Changes': 'Create Product'}
                    </Button>
                </Form>
            </Card>
        )
    }
}
