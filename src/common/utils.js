//防抖函数封装
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
//节流
export function throttle(func, delay) {
  let lasttime = 0;
  return function(...args) {
    let nowdate = new Date();
    if (nowdate - lasttime > delay) {
      func.apply(this, args);
      lasttime = nowdate;
    }
  };
}

//时间戳转真实时间
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

import fire from "../assets/test.mp4";
import fir2 from "../assets/fire2.mp4";
import { resolve } from "core-js/fn/promise";

export { fire, fir2 };

/**
 *  树形结构格式化方法
 * @param {*} items 需要树形格式化的数组
 * @param {*} id   顶级对象的id 递归后是自己作为父级的id
 * @param {*} link  父子之间的关系
 */
export function flatNest(items, id = -1, link = "parentId") {
  let result = items
    .filter(item => item[link] === id) //拿到所有的顶级对象放入数组中
    .map(item => ({ ...item, children: flatNest(items, item.id) })); //每个顶级对象下放入自己的其他属性，children属性下则是 以当前数据的id为父id再去递归遍历

  return result;
}

//可使用以下例子测试
let testList = [
  {
    description: "",
    iconUrl: "",
    id: 25,
    name: "测试部门",
    parentId: -1,
    sort: null,
    userId: ""
  },
  {
    description: "",
    iconUrl: "",
    id: 13,
    name: "武器装备组1",
    parentId: 12,
    sort: null,
    userId: "10089"
  },
  {
    description: "",
    iconUrl: "",
    id: 10,
    name: "科研部门",
    parentId: -1,
    sort: null,
    userId: "10159,10172"
  },
  {
    description: "",
    iconUrl: "",
    id: 11,
    name: "科研小组1",
    parentId: 10,
    sort: null,
    userId: "10159"
  },
  {
    description: "",
    iconUrl: "",
    id: 12,
    name: "科研小组2",
    parentId: 10,
    sort: null,
    userId: "10089"
  },
  {
    description: "",
    iconUrl: "",
    id: 14,
    name: "武器装备组2",
    parentId: 12,
    sort: null,
    userId: "10089"
  },
  {
    description: "liujf测试",
    iconUrl: "",
    id: 16,
    name: "调研小组",
    parentId: 18,
    sort: null,
    userId: "10097,10095"
  },
  {
    description: "",
    iconUrl: "",
    id: 15,
    name: "后勤部门",
    parentId: -1,
    sort: 2,
    userId: "10095"
  },
  {
    description: "",
    iconUrl: "",
    id: 17,
    name: "审核小组",
    parentId: -1,
    sort: null,
    userId: "10099"
  },
  {
    description: "",
    iconUrl: "",
    id: 18,
    name: "调研大组",
    parentId: -1,
    sort: null,
    userId: "10095"
  },
  {
    description: "",
    iconUrl: "",
    id: 27,
    name: "测试",
    parentId: 26,
    sort: null,
    userId: ""
  },
  {
    description: "",
    iconUrl: "",
    id: 26,
    name: "测试小组",
    parentId: 25,
    sort: null,
    userId: ""
  }
];

/**
 *
 * 使用Promise实现每隔1秒输出1,2,3
 */
let arr = [1, 2, 3];
arr.reduce((a, p) => {
  return a.then(() => {
    return new Promise(r => {
      setTimeout(() => r(console.log(p)), 1000);
    });
  });
}, Promise.resolve());

arr.reduce(
  (cur, pre) =>
    cur.then(
      () =>
        new Promise(res =>
          setTimeout(() => {
            res(console.log(pre));
          }, 1000)
        )
    ),
  Promise.resolve()
);

/**
 * 使用Promise实现红绿灯交替重复亮
红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在： 


思路：

包裹两层promise  外层执行完再进内层promise 实现异步 

 */

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}
//按时间顺序执行的promise函数
const light = function(timer, fn) {
  return new Promise(resolve => {
    setTimeout(() => {
      fn();
      resolve();
    }, timer);
  });
};

const step = function() {
  Promise.resolve()
    .then(() => light(3000, red))
    .then(() => light(2000, yellow))
    .then(() => light(1000, green));
};

//执行
step();

/**
封装一个异步加载图片的方法
这个相对简单一些，只需要在图片的onload函数中，使用resolve返回一下就可以了。 来看看具体代码：
 * 
 * 
 */

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log("一张图片加载完成");
      resolve(img);
    };
    img.onerror = function() {
      reject(new Error("Could not load image at" + url));
    };
    img.src = url;
  });
}

//拓展   限制异步操作的并发个数并尽可能快的完成全部  一次只能请求3个图片
// 思路  将图片数组分为3个一组的二维数组  用promise.all 请求 结束后在下一组
let imgUrls = [
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png"
];

function limitLoad(list, limit, handler) {
  //分割数组
  const handleUrls = function() {
    let newList = [];
    let count = Math.ceil(list.length / limit);
    for (let i = 0; i < count; i++) {
      newList.push(list.slice(i * limit, (i + 1) * limit));
    }
    return newList;
  };

  let newList = handleUrls();
  console.log(newList); //得到新的二维数组

  const innerList = function(arr) {
    //新二维数组执行加载方法
    return arr.map(a => handler(a));
  };

  newList.forEach(i => {
    //使用promise.all 令新数组每一项执行完毕后再执行下一个循环
    Promise.all(innerList(i)).then(res => {
      console.log(res);
    });
  });
}

limitLoad(imgUrls, 3, loadImg);
