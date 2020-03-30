import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, method='GET'){
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
