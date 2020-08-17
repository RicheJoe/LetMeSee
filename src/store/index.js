import Vue from 'vue'
import Vuex from 'vuex'

//安装
Vue.use(Vuex)
//创建store对象
const store = new Vuex.Store({
    state:{
        cartList:[], //加入购物车的商品信息
        // ischeckedAll:true
    },
    mutations:{
        //这个addcart方法实现了两个功能 新增商品或者同样的商品数量+1
        //但是对mutation来说，尽量让他每个方法对应完成的事件单一   也就是一个方法完成一个功能
        //所以把下面代码放到action中去
        //addCart(state,payload){
            //判断重复商品

            //法1 循环遍历
            // let oldproduct = null;
            // for(let item of state.cartList){
            //     if(item.iid===payload.iid){
            //         oldproduct = item 
            //     }
            // }
            // if(oldproduct){
            //     oldproduct.count += 1 //oldproduct改变 对应的item也改变
            // }else{
            //     payload.count = 1;
            //     state.cartList.push(payload)
            // }


            //法2 数组方法
            // let product = state.cartList.find((item)=>{
            //     return  item.iid === payload.iid  //返回唯一的id对应只有一个
            // })

            // if(product){
            //     product.count += 1 
            // }else{
            //     payload.count = 1;
            //     state.cartList.push(payload)
            // }
    //}

            //对应下方action的方法
            addCounter(state,payload){
                payload.count++
            },
            addToCart(state,payload){
                payload.checked=true
                state.cartList.push(payload)
            },
            checkboxChange(state,payload){
                payload.checked = ! payload.checked
            },
            checkboxChangeAll(state,payload){
               console.log(payload);
            }
            
        
    },
    actions:{
        addCart(context,payload){
            let product = context.state.cartList.find((item)=>{
                return  item.iid === payload.iid  //返回唯一的id对应只有一个
            })

            if(product){
                context.commit('addCounter',product)
            }else{
                payload.count = 1;
                context.commit('addToCart',payload)
            }
            
        }
    },
    getters:{
        cartLength(state){
            return state.cartList.length
        },
        cartList(state){
            return state.cartList
        },
        // ischeckedALL(state){
        //     if (state.cartList.length===0){return false}
        //    else{return state.cartList.every(item=>item.checked==true) }         
        // }
        
        
    }

})
//挂载到vue实例上
export default store