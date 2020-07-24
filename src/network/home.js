import {request} from "./request"

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

// export function getHomeGoods(type,page){
//     return request({
//     //   baseURL: 'localhost:3000',
//       url: './home/data',
//       params:{
//           type,page
//       }
//     })

// }


export function getHomeGoods() {
    return request({
        //baseURL: 'file:///F:/jq%20easyui案例/虚拟键盘/',
        url: '/home/data',
        // params: {
        //     type, page
        // }
    })

}

