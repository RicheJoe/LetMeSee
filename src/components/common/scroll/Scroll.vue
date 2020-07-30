<template >
    <div  ref="wrapper">
        <div >
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            scroll:null,
          

        }
    },
    mounted(){
        //创建Bscroll
        this.scroll=new BScroll(this.$refs.wrapper,{ 
            click: true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
            })
        //监听滚动
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)  //发射事件
        })
        
        //监听上拉事件
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
        })


    },
    methods:{
        //返回顶部封装
        scrollToUp (x,y,time=500) {
            this.scroll.scrollTo(x,y,time)
        },
        //下拉完成继续加载
        finishPullUp(){
            this.scroll.finishPullUp()
        }

    }
    
}
</script>

<style scoped>

</style>