<template>
  <div>
       <NavBar>
            <div slot="left"  class="back" @click="backClick" >
                <img src="~assets/imgs/common/back.svg"alt="">
            </div>
            <div slot="center" class="title">
                <div class="title-item" v-for="(item,index) in titles"
                    :class="{isActive : index===currentIndex}"
                    @click="titleClick(index)"
                >{{item}}</div>
            </div>
        </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
    components:{
        NavBar
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    methods:{
        titleClick(index){
            this.currentIndex = index;
            this.$emit("titleClick",index)
        },
        backClick(){
            this.$router.back()
        }
    }

}
</script>

<style scoped>


.title{ 
    display: flex;
    font-size: 14px;
}
.title .title-item{
    flex:1;
}
.isActive{
    color: #f33;
}
.back img {
    margin-top:12px ;
}
</style>