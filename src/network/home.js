import {request} from "./request"

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return request({
       baseURL: 'http://152.136.185.210:8000/api/z8',
      url: './home/data',
      params:{
          type,page
      }
    })

}


// export function getHomeGoods() {
//     return request({
//         //baseURL: 'file:///F:/jq%20easyui案例/虚拟键盘/',
//         url: '/home/data',
//         // params: {
//         //     type, page
//         // }
//     })

// }

