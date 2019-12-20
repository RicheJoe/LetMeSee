import {request} from "./request"

export function getHomeMultidata(){
    return request({
        url:'./home/multidata'
    })
}

export function getHomeGoods(type,page){
    return request({
    //   baseURL: 'localhost:3000',
      url: './home/data',
      params:{
          type,page
      }
    })

}

