<template>
  <div>
    <!-- <h2>个人</h2>
    <el-button type="success">成功按钮</el-button> -->
    <div class="echarts"></div>
    <input type="file" @change="Onchange" />

    <div class="box">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <test-comp v-model="visible"></test-comp>
    <div class="clock"></div>
  </div>
</template>

<script>
import ExceL from "exceljs";
import fs from "file-saver";
import echarts from "echarts";
import _ from "lodash";
import testComp from "./testComp.vue";
import FlipClock from "flipclock";
export default {
  name: "profile",
  components: { testComp },
  computed: {},
  data() {
    return {
      visible: true
    };
  },
  watch: {},
  methods: {
    async Onchange(e) {
      //xlsx插件用着读取
      //这个exceljs用来写   好   ，当然也可以读取
      const Excel = require("exceljs");
      const fs = require("fs");

      console.log("change");
      let file = e.target.files[0];
      let filename = file.name;

      /*
 npm install exceljs
*/

      const excelfile = "score.xlsx";
      var workbook = new Excel.Workbook();

      workbook.xlsx.load(file).then(function() {
        var worksheet = workbook.getWorksheet(1); //获取第一个worksheet
        worksheet.eachRow(function(row, rowNumber) {
          var rowSize = row.cellCount;
          var numValues = row.actualCellCount; //console.log("单元格数量/实际数量:"+rowSize+"/"+numValues); // cell.type单元格类型：6-公式 ;2-数值；3-字符串
          row.eachCell(function(cell, colNumber) {
            if (cell.type == 6) {
              var value = cell.result;
            } else {
              var value = cell.value;
            }
            console.log("Cell " + colNumber + " = " + cell.type + " " + value);
          });
        });
      });
    },
    echartsInit() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementsByClassName("echarts")[0]);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#fff"
            }
          }
        },
        legend: {
          data: ["价格", "销量"],
          left: "150px"
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          axisPointer: {
            type: "shadow"
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
          "#96BFFF"
        ],
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: "价格",
            type: "bar",
            data: [220, 182, 191, 234, 290, 180]
          }
        ]
      });
    }
  },
  mounted() {
    //打乱数组
    console.log(_.shuffle([1, 2, 3, 4]), FlipClock);
    // var clock = new FlipClock(
    //   document.querySelector(".your-clock"),
    //   new Date().toLocaleDateString(),
    //   {
    //     clockFace: "MinuteCounter"
    //   }
    // );

    const el = document.querySelector(".clock");

    const clock = new FlipClock(el, new Date(), {
      face: "TwelveHourClock"
    });
  },
  props: {},
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100vw;
  height: 50vh;
  background-color: #e7e5c8;
  margin-top: 12px;

  display: none;
}

.box {
  height: 400px;
  border: 1px solid #000;
  display: flex;
  div {
    height: 100%;
  }
  .left {
    background-color: rgb(129, 189, 230);
    width: 100px;
    float: left;
  }
  .right {
    background-color: rgb(204, 233, 154);
    flex: 1;
  }
}
</style>
