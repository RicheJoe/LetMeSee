<template>
    <div id="detail">
       <DetailNavBar class="datail-nav"/>
       <Scroll class="content"  :probeType=3 :pull-up-load="true">
       <DetailSwiper :topImages="topImages"/>
       <DetailBaseInfo :goods="goods"></DetailBaseInfo>
       <DetailShopInfo :shop="shop"></DetailShopInfo>
       </Scroll>
    </div>
  
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo'

import Scroll from 'components/common/scroll/Scroll';

import {getDetail,GoodsInfo,Shop}  from "network/detail.js"

export default {
    name:"Detail",
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{}
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll
    },
    created(){
        //保存传递来的参数iid
        this.iid=this.$route.params.iid
        //根据id请求数据
        getDetail(this.iid).then(res=>{
           // console.log(res);
           const data = res.result
           this.topImages=data.itemInfo.topImages
           //获取商品详情
           this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
           //获取店铺信息
           this.shop = new Shop(data.shopInfo)
        })
    }

}
</script>

<style scoped>
#detail{
   
  position: relative;
  z-index: 10;
  background-color: #fff;   
   height: 100vh;
}
.datail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.content{
    height: calc(100% - 44px);
    
    
}

</style>