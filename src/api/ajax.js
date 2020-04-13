import axios from 'axios'
import {message} from 'antd'

const BASE = '/api';

export default function ajax(url, data={}, method='GET'){
    url = BASE + url;
    return new Promise(resolve => {
        let resPromise;
        if(method==='GET'){
            resPromise = axios.get(url,{
                params: data
            });
        }
        else{
            resPromise = axios.post(url, data);
        }
        resPromise.then(res=>{
            resolve(res.data)
        }).catch(e=>{
            message.error('fail to login: ' + e.message);
        });
    });
}
