import React, {Component} from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqDeleteImg } from "../../api/service";
import {BASE_IMG_PATH, UPLOAD_IMG_NAME } from '../../utils/constants'
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {

    constructor (props) {
        super(props);
        let fileList = [];
        const images = this.props.imgs;
        if (images && images.length > 0) {
            fileList = images.map((img, index) => ({
                uid: -index,
                name: img,
                status: 'done',
                url: BASE_IMG_PATH + img,
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: fileList
        }
    }

    getImageNames = () => {
        return this.state.fileList.map(file => file.name);
    };


    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = async ({ file, fileList }) => {
        if(file.status === 'done'){
            const res = file.response;
            if(res.status === 0){
                message.success('Image uploading success');
                const {name, url} = res.data;
                file = fileList[fileList.length -1];
                file.name = name;
                console.log(file.name);
                file.url = url;
            }else{
                message.error('Failed to upload image');
            }
        }
        if(file.status === 'removed'){
            const res = await reqDeleteImg(file.name);
            if(res.status === 0){
                message.success('Image deleted');
            }else{
                message.error('Failed to delete the image')
            }
        }

        this.setState({ fileList });
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action='/manage/img/upload'
                    accept='image/*'
                    name= {UPLOAD_IMG_NAME}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

