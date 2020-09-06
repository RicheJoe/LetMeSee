<template>
  <div class="ele-table">
    <el-table :data="cartList" style="width: 100%"  @select="checkboxChange" @select-all="selectedAll"  >
        <el-table-column type="selection" width="48px" align="center" >
            <!-- <template slot-scope="scope">
                <el-checkbox ></el-checkbox> 
            </template> -->
        </el-table-column>
    
        <el-table-column label="商品信息"  min-width="100px"  >
        <template slot-scope="scope">
            
             
            <div class="shopItem">
                <img :src="scope.row.image" class="shopItem-img">
                <div class="shop-right">
                    <div class="shopItem-title">{{scope.row.title}}</div>
                    <div class="shopItem-price">￥{{scope.row.price}} <span style="margin-left:44px">x</span>{{scope.row.count}}</div>
                </div>
            </div>
        
        </template>
        </el-table-column>
        <el-table-column label="操作" width="68px" >
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
     data() {
      return {
          
        
      }
    },
    computed:{
        ...mapGetters([
            'cartList'
        ]),
    },
    methods: {
     
      handleDelete(index, row) {
        //console.log(index, row);
        this.$confirm('确定删除该商品？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass:'deleteWarn'
        }).then(() => {
          //删除数组中指定的元素
          this.cartList.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      selectedAll (selection){
          
        //console.log(selection);
        this.$store.commit('checkboxChangeAll', selection)
           
        
       
      },

      checkboxChange(selection,row){
          //console.log(selection,row);
          this.$store.commit('checkboxChange', row)
      }

    }
}
</script>

<style>
.ele-table{
    width: 100%;
}
.el-table__row{
    height: 100px;
}
.deleteWarn{
    width: 240px;
    height: 120px;
}
.shopItem{
    height: 100px;
    display: flex;
    align-items: center;
}
.shopItem-img{
    width: 64px;
    height: 84px;

}
.shop-right{
    display: flex;
    flex-wrap: wrap;
    height: 80%;
}
.shopItem-title{
    height: 50%;
  
    overflow : hidden;
    
    white-space : wrap; 
}
.shopItem-price{
    margin-left: 5px;
}
* {
    touch-action: pan-y;
}
</style>