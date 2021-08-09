<template>
  <div class="no-input" v-if="visible">
    我是显示的元素
    <button @click="close">隐藏</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //因为在不是特定元素上使用v-model时，是不能直接更改父组件的数据的。
      // 所以当prop里的值更新之后，但是data里面的值并未更新,如果想要data里面的值也更新，可以写成计算属性，或者用watch监听更改   注意
      visible: this.value
    };
  },
  created() {
    console.log(this.visible, "value");
  },
  watch: {
    //两个问题，1 为什么prop传过来的值没有直接修改
    // 2.计算属性get,set
    value(val) {
      this.visible = val;
    }
  },
  //或者用计算属性
  computed: {
    // visible: {
    //   get() {
    //     return this.value
    //   },
    //   set(val) {}
    // }
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("input", false);
    }
  }
};
</script>

<style  lang='scss'>
</style>