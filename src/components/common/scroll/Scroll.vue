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
            scroll:{},
          

        }
    },
    mounted(){

        //   setTimeout(this.__initScroll, 10)
        //创建Bscroll
        this.scroll=new BScroll(this.$refs.wrapper,{ 
            click: true,
            probeType:this.probeType,   
            // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
            // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
            // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 
            // 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，
            // 即不派发 scroll 事件。
            pullUpLoad:this.pullUpLoad  //上拉加载
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
    //     __initScroll() {
	// 	    // 1.初始化BScroll对象
	// 	    if (!this.$refs.wrapper) return
    //     this.scroll = new BScroll(this.$refs.wrapper, {
    //       probeType: this.probeType,
    //       click: true,
    //       pullUpLoad: this.pullUpLoad
    //     })
    //     // 2.将监听事件回调
    //     this.scroll.on('scroll', pos => {
    //       this.$emit('scroll', pos)
    //     })
    //     // 3.监听上拉到底部
    //     this.scroll.on('pullingUp', () => {
    //       //console.log('上拉加载');
    //       this.$emit('pullingUp')
    //     })
    //   },
        //返回顶部封装
        scrollTo (x,y,time) {
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        //下拉完成继续加载
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        //刷新scroll
        refresh(){
           //console.log('=====');
            this.scroll && this.scroll.refresh()  
        },

        //获取当前纵坐标值
        getscrollY(){
            return this.scroll ? this.scroll.y : 0
        }

    },
    watch:{
        data() {
        setTimeout(this.refresh, 20)
      }
    }
    
}
</script>

<style scoped>

</style>