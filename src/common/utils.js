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

//可使用一下例子测试
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
