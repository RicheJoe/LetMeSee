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
  </div>
</template>

<script>
import childone from "./childComps/childone";
import fs from "fs";
import docx4js from "docx4js";
import mammoth from "mammoth";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "category",
  components: {
    childone
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
      resultws: {}
    };
  },
  watch: {},
  methods: {
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
      reader.onload = function (e) {
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
      reader.onloadend = function (event) {
        var arrayBuffer = reader.result;
        console.log(arrayBuffer);

        mammoth
          .extractRawText({ arrayBuffer: arrayBuffer })
          .then(function (resultObject) {
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
  },
  props: {},
  destroyed() {}
};
</script>

<style >
</style>
