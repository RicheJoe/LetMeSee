<template>
  <div class="Content">
    <div v-for="(item, index) in List" :key="index" class="item">
      <div class="header" name="1" @click="headerToggle(index)">
        {{ item }}
        <i
          class="el-icon-arrow-right"
          :class="{
            arrowDown: ActiveIndex === index,
            arrowRight: ActiveIndex !== index
          }"
        ></i>
      </div>
      <div class="content" :class="{ contentActive: ActiveIndex === index }">
        <div class="result">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "collapse",
  props: {
    List: {
      type: Array,
      default() {
        return ["识别结果", "Requset", "Response"];
      }
    }
  },
  data() {
    return {
      ActiveIndex: 0
    };
  },
  methods: {
    headerToggle(index) {
      if (this.ActiveIndex === index) {
        this.ActiveIndex = 9;
      } else {
        this.ActiveIndex = index;
      }
    }
  }
};
</script>

<style  lang='scss' scoped>
.Content {
  width: 300px;
  .item {
    .header {
      padding: 12px;
      height: 40px;
      background-color: #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;

      box-shadow: 0px 1px 0px 0px #e5e5e5, 0px -1px 0px 0px #e5e5e5;
      .arrowDown {
        animation: myframe 0.3s linear;
        -webkit-animation: myframe 0.3s linear;
        animation-fill-mode: forwards;
      }
      @keyframes myframe {
        from {
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
        }
        to {
          transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
        }
      }
      .arrowRight {
        animation: myframes 0.3s linear;
        -webkit-animation: myframes 0.3s linear;
        animation-fill-mode: forwards;
      }
      @keyframes myframes {
        from {
          transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
        }
        to {
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
        }
      }
    }
    .result {
      margin: 12px;

      min-height: 100px;

      .resText {
        font-size: 14px;
        font-weight: 600;
        min-height: 40px;
      }
      .codeEdit {
        font-size: 14px;
      }
    }
    .content {
      max-height: 0px;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }
    .contentActive {
      transition: max-height 0.3s ease-in;
      max-height: 336px;
      overflow: auto;
    }
  }
}
</style>