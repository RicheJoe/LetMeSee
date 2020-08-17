<template>
    <!-- <h2>首页</h2> -->
    <div id='home'>
        <nav-bar class="home-nav">
            <div slot ='center'>购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']" 
            @tabClick="tabClick" ref="tabControl1" class="tab-control"
            v-show="isTabFixed"
            ></tab-control>

       <Scroll class="content" ref="scroll" :probeType=3
        @scroll="contentScroll" :pull-up-load="true"
        @pullingUp="pullingUpLoad" >
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']" 
            @tabClick="tabClick" ref="tabControl2" 
            ></tab-control>
            <goods-list :goods="showGoods" />
       </Scroll>
       <back-top class="backtop" @click.native="backtopClick"  v-show="isShowBacktop"/>


        
       
        

    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import tabControl from 'components/content/tabControl/tabControl';
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backtop/BackTop';

import HomeSwiper from "./childComps/homeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from './childComps/FeatureView';


import {getHomeMultidata,getHomeGoods} from "network/home"; //获取数据的接口
import {debounce} from 'common/utils';
import {itemListenerMaxin} from 'common/mixin'



export default {
    
    name:'home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        tabControl,
        GoodsList,
        Scroll,
        BackTop
       
    },
    mixins:[itemListenerMaxin],
    data() {
        return{
            banners:[],
            recommends:[],
            goods:{
                'pop':{'page':0,list:[]},
                'new':{'page':0,list:[]},
                'sell':{'page':0,list:[]},  
            },
            currentType:'pop',
            isShowBacktop:false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY:0,
            

            
        }
    },
    //组件初始化完成之后调用  
    created() {
        //请求多数据数据  
        this.getHomeMultidata(),
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
       
    },
    mounted (){     
        //使用混入就不用写下方代码  直接引入即可

        // const refresh = debounce( this.$refs.scroll.refresh,100)
        // this.ItemImgListener=()=>{
        //     refresh()   
        // }
        // this.$bus.$on('itemImageload', this.ItemImgListener)     
    },
    methods: {
        
        //事件监听方法

        //1、导航监听
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
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
            
        },
        

        //2、滚动监听  实现返回顶部按钮显示与否
        contentScroll(position){
            //1、判断backtop按钮是否显示
            this.isShowBacktop=-position.y>1000
            //2、判断tabcontrol是否吸顶
            this.isTabFixed = (-position.y)>this.tabOffsetTop

        },


        //3、返回顶部按钮监听
        backtopClick(){
           this.$refs.scroll.scrollTo(0,0,500)
        },
        
        //3、上拉加载更多
        pullingUpLoad(){
            this.getHomeGoods(this.currentType);
            //手动刷新bscroll  防止滑动失效
            this.$refs.scroll.scroll.refresh()


        },

        //4、图片加载完成 
        swiperImageLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            //console.log(this.tabOffsetTop);
        },

        //网络请求方法
        getHomeMultidata(){
        getHomeMultidata().then(res=>{
            this.banners=res.data.banner.list
            this.recommends=res.data.recommend.list     
            }).catch(err=>{
                console.log("服务器繁忙");
            })
        },
        getHomeGoods(type){               
            let page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res=>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page + 1;
                //再次加载
                this.$refs.scroll.finishPullUp()
            }).catch(err=>{
                //抽取放在了request的拦截器里面
                // let self = this;
                // //服务器繁忙是提示
                // function warnMessage(){
                //     self.$message({
                //     showClose: true,
                //     message: '服务器繁忙',
                //     type: 'warning'
                //     });
                // };
                //  const warning = debounce(warnMessage(),500)
            })
        },
    },
    computed: {
        showGoods(){
            return this.goods[this.currentType].list
        }

    },
    
    watch: {

    },

    props: {

    },
    activated(){
        //console.log("activated");
        
        this.$refs.scroll.scrollTo(0,this.saveY,-100);//进入页面后到之前离开的纵坐标
        this.$refs.scroll.refresh()
    },
    deactivated(){
            //console.log("deactivated");
            //保存y值
            this.saveY =  this.$refs.scroll.getscrollY()//记录离开当前页面的纵坐标
            //取消全局事件监听
            this.$bus.$off('itemImageload', this.ItemImgListener)
            

    }, 
    destroyed() { 
        
       
    },
}
</script>

<style scoped >
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
    position: relative;
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
.backtop{
    z-index: 999;
    position: fixed;
    right: 10px;
    bottom: 44px ; 
}




</style>