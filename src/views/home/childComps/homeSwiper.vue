<template>
    <swiper>
            <swiper-item v-for="(items,index) in banners" :key="index" >
                <a :href="items.link">
                    <img :src="items.image" alt="" @load='imgload'>
                </a>
            </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"


export default {
    name:"HomeSwiper",
    components: {
        Swiper,
        SwiperItem

    },
    computed: {

    },
    data() {
        return{
            isImgLoaded: false
        }
    },
    watch: {

    },
    methods: {
        imgload(){
          if(!this.isImgLoaded)  //图片加载完成一次后改变为true   不调用了
            this.$emit("swiperImageLoad");
            this.isImgLoaded = true
        }

    },
    mounted() {

    },
    props: {
        banners:{
            type:Array,
            default() {
                return []
            }
        }

    },
    destroyed() {

    },
}
</script>

<style scoped>

</style>
