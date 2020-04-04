import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
    static propTypes = {
        detail: PropTypes.string
    };
    constructor (props) {
        super(props);

        const detail = this.props.detail;
        let editorState;
        if(detail) {
            const blocksFromHtml = htmlToDraft(detail);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            editorState = EditorState.createWithContent(contentState)
        } else {
            editorState = EditorState.createEmpty()
        }
        this.state = {
            editorState
        }
    }

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/manage/img/upload');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    const url = response.data.url;
                    resolve({data:{link:url}});
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    };
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    };
    render() {
        const {editorState} = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{height: 250, border: '1px solid #000', padding: '0 30px'}}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
            />
        )
    }
}
