<template> 
    <div class="bottom-bar">
        <!-- <div class="item-selectorall">
            <el-checkbox  v-model='ischeckedALL'  @change="checkboxChangeAll()">全选</el-checkbox>
        </div> -->

        <div class="totalPrice">
            合计：￥ {{totalPrice}}
        </div>

        <div class="calculate">
            结算({{checkedLength}})
        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name:'CartBottomBar',
    data(){
      return {
          ischeckedALL:false
      }
    },
    computed:{
        ...mapGetters([
            'cartList'
        ]),
        totalPrice(){
            return this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((pre,item)=>{
                return pre+item.price * item.count
            },0).toFixed(2)
        },
        checkedLength(){ //结算显示的数量
             return this.$store.state.cartList.filter(item=>{
                 return item.checked}).length
        },
        // ischeckedALL_cupte(){
        //          if (this.$store.state.cartList.length===0){return false}
        //         else{return this.$store.state.cartList.every(item=>item.checked==true) }     
        // }
        
        
    },
    methods:{
        // checkboxChangeAll(){
        //     // this.$store.commit('checkboxChangeAll',this.ischeckedALL)
        //     // console.log(this.ischeckedALL);
        //     if(this.ischeckedALL_cupte){
        //         this.cartList.forEach(element => {
        //             element.checked = false
        //         });
        //     }else{
        //         this.cartList.forEach(element => {
        //             element.checked = true
        //         });
        //     }
        // }
    },
    
    

}
</script>

<style>
.bottom-bar{
    height: 48px;
    position: relative;
    background-color: var(--color-tint);
    display: flex;
}
.item-selectorall {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center; 
  }
.totalPrice{
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
     background-color: var(--color-tint);


}
.calculate{
    
    width: 30%;
    height: 100%;
    display: flex;
    padding: 0px 10px  0px 40px;
    align-items: center;
    color: #fff;
    background-color: rgb(235, 102, 62);

}
   .el-checkbox__inner {
    border-radius: 50%;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, 
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: var(--color-tint);
    border-color:#fff ;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner{
      border-color: rgb(212, 206, 206);
  }

</style>