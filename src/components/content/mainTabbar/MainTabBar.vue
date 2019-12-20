<template>
    <tab-bar>
      <tab-bar-item path="/home" activeColor='deeppink'>
          <img slot="item-icon-active" src="~assets/imgs/tabbar/首页1.png" alt="">
          <img slot="item-icon" src="~assets/imgs/tabbar/首页2.png" alt="">
          <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item  path="/category" >
          <img slot="item-icon-active" src="~assets/imgs/tabbar/分类1.png" alt="">
          <img slot="item-icon" src="~assets/imgs/tabbar/分类2.png" alt="">
          <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item  path="/cart" activeColor='deeppink'>
          <img slot="item-icon-active" src="~assets/imgs/tabbar/购物车满.png" alt="">
          <img slot="item-icon" src="~assets/imgs/tabbar/购物车空.png" alt="">
          <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item  path="/profile" >
          <img slot="item-icon-active" src="~assets/imgs/tabbar/我1.png" alt="">
          <img slot="item-icon" src="~assets/imgs/tabbar/我2.png" alt="">
          <div slot="item-text">我的</div>
      </tab-bar-item>     
    </tab-bar> 
</template>

<script>

import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'


export default {
    components: {
        TabBar,
        TabBarItem


    }
    
}
</script>

<style >

</style>
