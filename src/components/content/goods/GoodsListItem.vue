<template>
    <div class="goods-item" @click="itemclick">
        <img  v-lazy="showImage" alt="" @load="imageload">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
       
    </div>
    
</template>

<script>
export default {
    name:"GoodsListItem",
    props:{
        goodsItem:{
            type:Object,
            default (){
                return {}
            }
        }
    },
    methods:{
      imageload(){
        //console.log('imageload');图片加载后调用
        this.$bus.$emit('itemImageload')
      },
      itemclick(){
        //console.log('图片点击');跳转到详情页并 把 商品id传过去
        //如果永query传递  放一个对象{path:'xxx',query{iid:'xxx'}}
        this.$router.push("/detail/"+this.goodsItem.iid)
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    }
}
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%; 
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid var(--color-tint); 
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    padding: 0px;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/imgs/common/collect.svg") 0 0/14px 14px; 
  }
</style>>

