<template>
  <div class="cart-list">
      <CartListItem v-for="(item,index) in cartList"  :key="index"  :product='item'/>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import {mapGetters} from 'vuex'
export default {
    name:'CartList',
    components:{
        CartListItem
    },
    computed:{
         ...mapGetters([
            'cartList'
        ]),
    },
    methods:{
        checkboxChange(){
            console.log(this);
        }
    }
    
}
</script>

<style scoped>

</style>>

