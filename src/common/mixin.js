import {debounce} from 'common/utils';
export const itemListenerMaxin = {
    //混入  两个组件之间可以共用代码mixin
    //在detail中使用 mixin：[]  会和detail中的mounted生命周期内容混合

    data(){
        return{
            ItemImgListener:null
        }
    },
    mounted(){
        const refresh = debounce( this.$refs.scroll.refresh,100);
        this.ItemImgListener=()=>{
            refresh()   
        }
        this.$bus.$on('itemImageload', this.ItemImgListener)
        //console.log("我是混入内容");
    }
}