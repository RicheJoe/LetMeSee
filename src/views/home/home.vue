<template>
    <!-- <h2>首页</h2> -->
    <div id='home'>
        <nav-bar class="home-nav"><div slot ='center'>购物街</div></nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" class="tab-control"></tab-control>

        <ul>
            <li>1test1</li>
            <li>2test1</li>
            <li>3test1</li>
            <li>4test1</li>
            <li>5test1</li>
            <li>6test1</li>
            <li>7test1</li>
            <li>8test1</li>
            <li>9test1</li>
            <li>10test1</li>
            <li>11test1</li>
            <li>12test1</li>
            <li>13test1</li>
            <li>14test1</li>
            <li>15test1</li>
            <li>16test1</li>
            <li>17test1</li>
            <li>18test1</li>
            <li>19test1</li>
            <li>20test1</li>
            <li>21test1</li>
            <li>22test1</li>
            <li>23test1</li>
            <li>24test1</li>
            <li>25test1</li>
            <li>26test1</li>
            <li>27test1</li>
            <li>28test1</li>
            <li>29test1</li>
            <li>30test1</li>
        </ul>
        

    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import tabControl from 'components/content/tabControl/tabControl';

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
        tabControl
       
    },
    //组件初始化完成之后调用  
    created() {
        //请求多数据数据  
        this.getHomeMultidata(),
        this.getHomeGoods('pop')
        // this.getHomeGoods('new')
        // this.getHomeGoods('sell')

        

    },
    methods: {
        getHomeMultidata(){
        getHomeMultidata().then(res=>{
            this.banners=res.data.banner.list
            this.recommends=res.data.recommend.list     
            })
        },
        getHomeGoods(type){
            console.log(this.goods[type].page);
            
            let page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res=>{
                // this.goods[type].list.push(...res)
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page + 1
           
        })
        

        }


    },
    computed: {

    },
    data() {
        return{
            banners:[],
            recommends:[],
            goods:{
                'pops':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},  
            }
            
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

.home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
}
#home{
    padding-top: 44px
}

.tab-control{
    /* 吸顶效果 和导航高一样即可 */
    position: sticky;    
    top: 44px
}

</style>
