import axios from 'axios';

export function request(config) {
    //1.创建axioxs实例
    const instance222 = axios.create({
            baseURL: 'http://123.207.32.32:8000',
            timeout: 5000
    })

    //1.请求拦截
    instance222.interceptors.request.use(config=>{
        return config //拦截后放行   不然调用会失败
    },err=>{
        //console.log(err);//发送失败
        
    })

    //2.响应拦截
    instance222.interceptors.response.use(res =>{
        return res.data
    },err =>{
        //console.log(err);
    })



    //3.发送真正的请求  直接返回
    return instance222(config)

  
}


