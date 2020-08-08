<template>
    <div id="detail">
       <DetailNavBar class="datail-nav" />
       <Scroll class="content"  :probeType=3 :pull-up-load="true" ref="scroll">
       <DetailSwiper :topImages="topImages"/>
       <DetailBaseInfo :goods="goods"></DetailBaseInfo>
       <DetailShopInfo :shop="shop"></DetailShopInfo>
       <DetailImageInfo :detailInfo="detailInfo" @imageLoad="imageLoad"/>
       <DetailParamInfo :paramInfo="paramInfo"/>
       <DetailCommentInfo :commentInfo="commentInfo"/>
       </Scroll>
    </div>
  
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailImageInfo from './childComps/DetailImageInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll';

import {getDetail,GoodsInfo,Shop,GoodsParam }  from "network/detail.js"

export default {
    name: "Detail",
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{}
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailImageInfo,
        DetailParamInfo,
        DetailCommentInfo
    },
    created(){
        //保存传递来的参数iid
        this.iid=this.$route.params.iid  //params传递这样取id  如果用query传递  这里写this.query.id
        //根据id请求数据
        getDetail(this.iid).then(res=>{
           
           const data = res.result
           console.log(data);
           //获取上方图片信息--轮播图
           this.topImages=data.itemInfo.topImages
           //获取商品详情
           this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
           //获取店铺信息
           this.shop = new Shop(data.shopInfo)
           //获取下方图片信息  imageinfo
           this.detailInfo= data.detailInfo
           //获取下方商品参数信息
           this.paramInfo  = new GoodsParam (data.itemParams.info,data.itemParams.rule)
           //获取评论信息
           if(data.rate.cRate  !==0){
            this.commentInfo =data.rate.list[0]
           }
        })
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh()
        }
    }

}
</script>

<style scoped>
#detail{
   
  position: relative;
  z-index: 10;
  background-color: #fff;   
   height: 100vh;
   overflow: hidden;
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