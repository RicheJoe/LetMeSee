import Vue from 'vue'
import Vuex from 'vuex'

//安装
Vue.use(Vuex)
//创建store对象
const store = new Vuex.Store({
    state:{
        cartList:[], //加入购物车的商品信息
        
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
                payload.checked=false
                state.cartList.push(payload)
            },
            checkboxChange(state,payload){
                    payload.checked = !payload.checked
            },
            checkboxChangeAll(state,payload){
                if(payload.length>0){
                    for(let i in payload){
                        payload[i].checked = true
                    }
                }else{
                    //console.log(state);
                    for(let i in state.cartList){
                        state.cartList[i].checked = false
                    }
                }
                
               
                
             }
            
            
        
    },
    actions:{
        addCart(context,payload){
            // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
            // 因此你可以调用 context.commit 提交一个 mutation，
            // 或者通过 context.state 和 context.getters 来获取 state 和 getters。
            console.log(context);
            let product = context.state.cartList.find((item)=>{
                return  item.iid === payload.iid  //返回唯一的id对应只有一个
            })

            if(product){
                context.commit('addCounter',product)
            }else{
                payload.count = 1;
                context.commit('addToCart',payload)
            }
            
        },
        
    },
    getters:{
        cartLength(state){
            return state.cartList.length
        },
        cartList(state){
            return state.cartList
        },
        
        
        
    }

})
//挂载到vue实例上
export default store