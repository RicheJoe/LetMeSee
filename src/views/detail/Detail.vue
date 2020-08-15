<template>
    <div id="detail">
       <DetailNavBar class="datail-nav" @titleClick="titleClick" ref="nav"/>
       <Scroll class="content"  :probeType=3 :pull-up-load="true" ref="scroll"
              @scroll="contentScroll">
            <DetailSwiper :topImages="topImages"/>
            <DetailBaseInfo :goods="goods"></DetailBaseInfo>
            <DetailShopInfo :shop="shop"></DetailShopInfo>
            <DetailImageInfo :detailInfo="detailInfo" @imageLoad="imageLoad"/>
            <DetailParamInfo :paramInfo="paramInfo" ref="params"/>
            <DetailCommentInfo :commentInfo="commentInfo" ref="commentInfo"/>
            <GoodsList :goods="recommends" ref="recommend"/>
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

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,GoodsInfo,Shop,GoodsParam ,getRecommend}  from "network/detail.js"
import {debounce} from 'common/utils';
import {itemListenerMaxin} from 'common/mixin'

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
            commentInfo:{},
            recommends:[],
            themeTopYs:[0,0,0,0],//各个主题菜单的高度y   
            currentIndex:0
        }
    },
    mixins:[itemListenerMaxin],
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailImageInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList
    },
    created(){
        //保存传递来的参数iid
        this.iid=this.$route.params.iid  //params传递这样取id  如果用query传递  这里写this.query.id
        //根据id请求数据
        getDetail(this.iid).then(res=>{
           
           const data = res.result
           //console.log(data);
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

           //拿到数据后渲染结束  获取对应dom的高度以供点击菜单跳转对应高度使用
           this.$nextTick(()=>{  
               //这个函数就等到渲染完毕后在执行里面的代码
               //根据最新的数据，对应的dom是已经被渲染出来了
               //但是图片依然没有加载完（目前获取的offsettop不包含图片的高度）所以重新渲染会有问题
                // this.themeTopYs=[];
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                // console.log(this.themeTopYs);
           })  
           
           
        });

        //获取详情页推荐数据
        getRecommend().then(res=>{
            //console.log(res);
            this.recommends=res.data.list
        })
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh()

            //到数据后渲染结束  获取对应dom的高度以供点击菜单跳转对应高度使用
            this.themeTopYs=[];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
                this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop-44);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
                //console.log(this.themeTopYs);
        },
        titleClick(index){
            //根据菜单的点击  滚动到相应的位置
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
        },

        //获取scroll发射的位置事件
        contentScroll(position){
            //console.log(position);
            //获取Y值
            const positionY = -position.y
            //与themeTopYs中的值进行对比
            // [0, 6237, 7047, 7263]
                //当positionY 在 0-6237时 index=0
                //当positionY 在 6237-7047时 index=1
                //当positionY 在 7047-7263时 index=2
                //当positionY 大于7263时 index=3 
                //但是这个值是动态获取的
            let length= this.themeTopYs.length
            for(let i = 0;i<length;i++){
                //if(()||())两个判断语句
                if(this.currentIndex !== i &&
                    ((i<length-1&&positionY>=this.themeTopYs[i]&& positionY < this.themeTopYs[i+1])
                    ||(i===length-1&&positionY>=this.themeTopYs[i]))
                ){
                    this.currentIndex=i;
                    //console.log(this.currentIndex);
                    this.$refs.nav.currentIndex=this.currentIndex
                }
            }

        }
    },
    mounted(){
        // const refresh = debounce( this.$refs.scroll.refresh,100);
        // this.ItemImgListener=()=>{
        //     refresh()   
        // }
        // this.$bus.$on('itemImageload', this.ItemImgListener)
    },
    destroyed(){
         this.$bus.$off('itemImageload', this.ItemImgListener)        
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