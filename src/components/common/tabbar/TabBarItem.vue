<template>
    <div class="tab-bar-item" @click="itemClick">
        <!-- <img src="../../assets/Imgs/tabbar/首页1.png" alt="">
        <div>首页</div> -->
        <div v-if="!isActive"><slot  name="item-icon"></slot></div>
        <div v-else><slot  name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>      
    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data() {
        return{
           // isActive:true
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle(){
            return this.isActive ? { color: this.activeColor} :{}
        }
    },

    methods:{
        itemClick(){
           this.$router.replace(this.path)
            
        }
    }
}
</script>

<style  scoped>

.tab-bar-item{
  /* 均等分 */
  flex: 1;   
  text-align: center;
  height: 49px;
  font-size: 14px;

}

.tab-bar-item  img {
    width: 26px;
    height: 26px;
    margin-top: 3px;
    vertical-align: middle;

}


</style>
