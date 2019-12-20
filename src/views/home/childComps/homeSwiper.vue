<template>
    <swiper>
            <swiper-item v-for="items in banners" >
                <a :href="items.link">
                    <img :src="items.image" alt="">
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

        }
    },
    watch: {

    },
    methods: {

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
