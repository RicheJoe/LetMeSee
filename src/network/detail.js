import {  request } from "./request"

export function getDetail(iid){
    return request({
        baseURL: 'http://152.136.185.210:8000/api/z8',
        url:"/detail",
        params:{
            iid
        }
    })
} 