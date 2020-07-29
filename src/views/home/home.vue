<template>
    <!-- <h2>首页</h2> -->
    <div id='home'>
        <nav-bar class="home-nav">
            <div slot ='center'>购物街</div>
        </nav-bar>

       <Scroll class="content">
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']" class="tab-control"
            @tabClick="tabClick"
            ></tab-control>
            <goods-list :goods="showGoods" />
       </Scroll>


        
       
        

    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import tabControl from 'components/content/tabControl/tabControl';
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll';

import HomeSwiper from "./childComps/homeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from './childComps/FeatureView';


import {getHomeMultidata,getHomeGoods} from "network/home"; //获取数据的接口



export default {
    
    name:'home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        tabControl,
        GoodsList,
        Scroll
       
    },
    //组件初始化完成之后调用  
    created() {
        //请求多数据数据  
        this.getHomeMultidata(),
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

       

    },
    methods: {
        //事件监听方法
        tabClick(index){
            //console.log(index)
            switch (index){
                case 0:
                    this.currentType='pop'
                    break
                case 1:
                    this.currentType='new'
                    break
                case 2:
                    this.currentType='sell'
                    break     

            }
            
        },

        //网络请求方法
        getHomeMultidata(){
        getHomeMultidata().then(res=>{
            this.banners=res.data.banner.list
            this.recommends=res.data.recommend.list     
            })
        },
        getHomeGoods(type){               
            let page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res=>{
                //console.log(res)
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page + 1
           
        })


     


        
        
    }
  
        


    },
    computed: {
        showGoods(){
            return this.goods[this.currentType].list
        }

    },
    data() {
        return{
            banners:[],
            recommends:[],
            goods:{
                'pop':{'page':0,list:[]},
                'new':{'page':0,list:[]},
                'sell':{'page':0,list:[]},  
            },
            currentType:'pop'
            
        }
    },
    watch: {

    },
    mounted() {

    },
    props: {

    },
    destroyed() {

    },
}
</script>

<style >
#home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
}
.home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
}


.tab-control{
    /* 吸顶效果 和导航高一样即可 */
    position: sticky;    
    top: 44px;
    z-index: 9;
}
.content{
    position: absolute;
    overflow: hidden;
    
    top: 44px;
    bottom: 28px;
    left: 0px;
    right: 0px;
}



</style>
