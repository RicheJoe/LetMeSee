import fire from "../assets/test.mp4";
import fir2 from "../assets/fire2.mp4";
export { fire, fir2 };

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

export function loadImg(url) {
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

export function limitLoad(list, limit, handler) {
  //分割数组  可用下方sliceArray方法
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

/**
 *
 * 返回以 size 为长度的数组分割的原数组
 * 
 * 
 * Array.from(arrayLike,mapFn)
 * arrayLike
  想要转换成数组的伪数组对象或可迭代对象。
  mapFn 可选
  如果指定了该参数，新数组中的每个元素会执行该回调函数。
 */

export function sliceArray(arr, size = 3) {
  let newArr = Array.from(
    { length: Math.ceil(arr.length / size) },
    (item, index) => arr.slice(index * size, (index + 1) * size)
  );
  return newArr;
}

/**
 * 检查数组中某元素出现的次数
 */

export function countWhichOne(arr, value) {
  return arr.reduce((p, c) => (c === value ? (p += 1) : p));
}

/**
 * 统计数组中出现次数最多的元素
 */
export function countInArray(arr) {
  let maxName,
    maxNum = 0;
  let obj = {};

  arr.forEach(i => {
    obj[i] ? (obj[i] += 1) : (obj[i] = 1);
  });

  for (let i in obj) {
    if (obj[i] > maxNum) {
      maxNum = obj[i];
      maxName = i;
    }
  }
  return `出现次数最多的元素为${maxName},出现次数为:${maxNum}次`;
}

/**
 * 数组扁平化 即flat方法的实现
 *   @describe 
 *  Array.prototype.flat()
    flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。 

    @example
    const arr1 = [0, 1, 2, [3, 4]];
    arr1.flat()  //[0, 1, 2, 3, 4]

    const arr2 = [0, 1, 2, [[[3, 4]]]];
    arr2.flat(2)  //[0, 1, 2, [3, 4]]

    const arr3 = [0, 1, 2, [[[3, 4]]]];
    arr3.flat(Infinity)  //[0, 1, 2, [3, 4]] 
 */
let tempArr = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
  5,
  "XXX",
  { name: "超级赛亚人" }
];
/**方法一   利用concat+递归
 * 利用    Array.isArray 判断数组的某一项是不是数组  是的话再次递归展开
 */
export function myFlat1(arr) {
  let result = [];
  arr.forEach(item => {
    if (Array.isArray(item)) result = result.concat(myFlat1(item));
    else result.push(item);
  });
  return result;
}

/**方法二   利用concat+递归  但是使用reduce方法  代码更简洁
 * 利用    Array.isArray 判断数组的某一项是不是数组  是的话再次递归展开
 * @example
 * arr.reduce((pre, cur) => pre.concat(cur), []);    这样可以展开一层  相当于flat（1）
 */
//特例
function exampleFlat(arr) {
  return arr.reduce((pre, cur) => pre.concat(cur), []);
}

/**
 * @describe  reduce实现真正的flat(infinity)
 *  分析：Array.isArray判断当前元素是否可再展开，如果可以就递归 不可以就放入结果数组内
 */
export function myFlat2(arr) {
  return arr.reduce(
    (pre, cur) => pre.concat(Array.isArray(cur) ? myFlat2(cur) : cur),
    []
  );
}

//注意以上两个flat方法扁平化是flat(infinity) 并不能和flat(n)一样控制展开的层级

/**
 *  进阶 实现真正的  Array.prototype.flat()
 * @param {*} arr
 * @param {*} num  要展开的层级   int类型整数
 * @description
 * 首先判断传入的num是否大于0   否则直接返回原数组
 * 若大于0  则根据num展开 一次展开一级 num的值也相应减小一  知道num为0时候则表示展开完毕
 *
 * 注意：不要忘记reduce方法的初始值[]
 */
export function myFlat3(arr, num = Infinity) {
  return num > 0
    ? arr.reduce(
        (pre, cur) =>
          pre.concat(Array.isArray(cur) ? myFlat3(cur, num - 1) : cur),
        []
      )
    : arr;
}

/**
 *  对比两个数组并且返回其中不同的元素 或者相同的元素
 */
export function diffElement(arr1, arr2) {
  return arr1.filter(a => !arr2.includes(a)); //不同
  // return arr1.filter(a => arr2.includes(a)); // 相同
}
