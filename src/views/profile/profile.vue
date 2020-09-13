<template>
  <div>
    <h2>个人</h2>
    <el-button type="success">成功按钮</el-button>
    <div class="echarts"></div>
  </div>
</template>

<script>
export default {
  name: "profile",
  components: {},
  computed: {},
  data() {
    return {};
  },
  watch: {},
  methods: {},
  mounted() {
    var echarts = require("echarts");

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementsByClassName("echarts")[0]);
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#fff'
            }
        }
      },
      legend: {
        data: ['价格', '销量'],
        left:'150px'
    },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        axisPointer: {
                type: 'shadow'
            }
      },
      yAxis: {},
      color: [
        "#37A2DA",
        "#E062AE",
        "#32C5E9",
        "#67E0E3",
        "#9FE6B8",
        "#FFDB5C",
        "#ff9f7f",
        "#fb7293",
        "#E690D1",
        "#e7bcf3",
        "#9d96f5",
        "#8378EA",
        "#96BFFF",
      ],
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
        {
          name: "价格",
          type: "bar",
          data: [220, 182, 191, 234, 290, 180],
        },
      ],
    });
  },
  props: {},
  destroyed() {},
};
</script>

<style >
.echarts {
  width: 100vw;
  height: 50vh;
  background-color: #e7e5c8;
  margin-top: 12px;
}
</style>
