<template>
<div class="cart">
    <nav-bar class="cart-nav">
        <div slot ='center'>购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <Scroll class="content" ref='scroll'>
        <!-- <CartList /> -->
        <CartListDemo/>
    </Scroll>

    <!-- 底部汇总价格 -->
    <CartBottomBar/>
</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import CartListDemo from './childComps/CartListDemo'

import {mapGetters} from 'vuex' //这样导入vuex中的getters可以直接在计算属性中调用 getter的方法
export default {
    name:'cart',
    components: {
        NavBar,
        Scroll,
        CartList,
        CartBottomBar,


        CartListDemo
    },
    computed: {
        // cartLength(){
        //     return this.$store.getters.cartLength
        // }

        //这样导入vuex中的getters可以直接在计算属性中调用 getter的方法  
        //用之前现在这里注册即可
        ...mapGetters([
            'cartLength'
        ]),
        //还可以重命名  直接用length即可
        // ...mapGetters({
        //     length:'cartLength'
        // })
    },
    data() {
        return{
            count:0
        }
    },
    watch: {

    },
    methods: {

    },
    mounted() {

    },
    props: {

    },
    destroyed() {

    },
    activated() {
        //this.$ref.scroll.refresh()
    }
}
</script>

<style  scoped>
.cart{
    height: 100vh;
}
.cart-nav{
    background-color: var(--color-tint);
    color: #fff;
    z-index: 999;
}
.content{
    height: calc(100% - 44px - 49px - 48px);
    overflow-y: hidden;
}
</style>
