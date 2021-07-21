<template>
  <div>
    <h2>分类</h2>
    <childone>
      <div>
        <div>
          <h2>111</h2>
        </div>
      </div>
    </childone>
    <input type="file" accept=".txt ,.docx" ref="upload" @change="onChange" />
    <button @click="getData">请求数据</button>
    <button @click="downloadFile">下载文件</button>
    <input type="file" @change="onChange2" />

    <div class="video">
      <video id="myVideo" class="video-js vjs-big-play-centered"></video>
    </div>
    <collapse></collapse>
  </div>
</template>

<script>
import childone from "./childComps/childone";
import collapse from "../../components/common/collapse/collapse";

import fs from "fs";
import docx4js from "docx4js";
import mammoth from "mammoth";
import FileSaver from "file-saver";
import XLSX from "xlsx";

import Videojs from "video.js";
import "video.js/dist/video-js.css";
import video_zhCN from "video.js/dist/lang/zh-CN.json";
Videojs.addLanguage("zh-CN", video_zhCN); //设置播放器的语言
import { fire, fir2 } from "../../common/utils";

export default {
  name: "category",
  components: {
    childone,
    collapse
  },
  computed: {},
  data() {
    return {
      counter: 0,
      arr: [1, 2, 3, 4, 5],
      tom: {
        age: 12,
        height: 100
      },
      resultws: {},
      fire: [fire, fir2]
    };
  },
  watch: {},
  methods: {
    open_second: function() {
      this.$refs.my_group.elements[1].open(); // opens second element
    },
    downloadFile() {
      // var blob = new Blob(["Hello, world!"], {
      //   type: "text/plain;charset=utf-8"
      // });
      // FileSaver.saveAs(blob, "hello world.txt");

      // FileSaver.saveAs("https://httpbin.org/image", "image.jpg");

      var file = new File(["Hello, world!"], "hello world.txt", {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(file);
    },
    onChange2(e) {
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        let json1 = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);
        console.log(json1, workbook);
      };
      reader.readAsBinaryString(file);
    },
    btnClick() {
      for (let i = 0; i < 100; i++) {
        this.counter++;
        console.log("yi", this.$refs.test.innerText);
      }

      console.log("er", this.$refs.test.innerText);

      setTimeout(() => {
        console.log("san", this.$refs.test.innerText);
      }, 0);
    },
    btnClick2() {
      this.arr.push(9);

      delete this.tom.age;
    },
    onChange(e) {
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function(event) {
        var arrayBuffer = reader.result;
        console.log(arrayBuffer);

        mammoth
          .extractRawText({ arrayBuffer: arrayBuffer })
          .then(function(resultObject) {
            // $result.innerHTML = resultObject.value
            console.log(resultObject.value);
          });
      };
      reader.readAsArrayBuffer(file);
      // return new Promise(function (resolve, reject) {
      //   let file = e.target.files[0];
      //   if (file) {
      //     let reader = new FileReader();
      //     reader.readAsArrayBuffer(file);
      //     reader.onload = function (evt) {
      //       resolve(evt.target.result);
      //     };
      //   } else reject("error");
      // }).then(res => {
      //   mammoth.convertToHtml({ arrayBuffer: res }).then(res => {
      //     console.log(this);
      //   });
      //   //var mammoth = new mammoth();
      // });

      // mammoth
      //   .convertToHtml({ arrayBuffer: resultws })
      //   .then(res => {

      //   })
      //   .done();
      // if (file) {
      //   let reader = new FileReader();
      //   reader.readAsText(file, "UTF-8");
      //   reader.onload = function (evt) {
      //     // console.log(file);
      //     // console.log(evt.target.result);
      //     // var mammoth = require("mammoth");
      //     // //var converter = new mammoth();
      //     // console.log(typeof mammoth.extractRawText);
      //     // var result = mammoth.ExtractRawText("file.name");
      //     // var html = result.Value; // 纯文本
      //   };

      //   // var converter = new DocumentConverter();
      //   //
      //   // var warnings = result.Warnings; // 转换期间产生的所有警告
      //   // console.log(html);
      // }
    },
    getData() {
      console.log(1);
    }
  },
  mounted() {
    // console.log(docx4js);
    // docx4js.load("./1.docx").then(docx => {
    //   //you can render docx to anything (react elements, tree, dom, and etc) by giving a function
    //   console.log(docx);
    // });
    // docx4js.create().then(docx => {
    //   //do anything you want
    //   docx.save("./new.docx");
    // });
    let id = document.querySelector("#myVideo");
    let player = Videojs(
      id,
      {
        autoplay: true,
        controls: true,
        height: 400,
        sources: [
          {
            src: "https://www.runoob.com/try/demo_source/movie.mp4",
            type: "video/mp4"
          }
        ]
      },
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
    player.on("playing", function() {
      console.log("视频播放中");
    });
    player.on("ended", function() {
      console.log("视频播放结束");
    });
    //切换
    setTimeout(() => {
      player.src("https://www.runoob.com/try/demo_source/mov_bbb.mp4");
    }, 5000);
  },
  props: {},
  destroyed() {}
};
</script>

<style scoped>
.video {
  width: 800px;
  height: 450px;

  background-color: rgb(209, 194, 194);
}
</style>
