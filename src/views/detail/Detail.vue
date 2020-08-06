<template>
    <div id="detail">
       <DetailNavBar/>
       <DetailSwiper :topImages="topImages"/>
    </div>
  
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from './childComps/DetailSwiper'

import {getDetail}  from "network/detail.js"
export default {
    name:"Detail",
    data(){
        return{
            iid:null,
            topImages:[]
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper
    },
    created(){
        //保存传递来的参数iid
        this.iid=this.$route.params.iid
        //根据id请求数据
        getDetail(this.iid).then(res=>{
           // console.log(res);
           this.topImages=res.result.itemInfo.topImages
        })
    }

}
</script>

<style>

</style>