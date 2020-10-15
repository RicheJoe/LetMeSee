//防抖函数封装
export function 
debounce(func,delay){
    let timer = null;
    return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
}
//节流
export function 
throttle(func,delay){
  let lasttime = 0;
  return function(...args){
    let nowdate = new Date();
    if(nowdate - lasttime >delay){
      func.apply(this,args);
      lasttime = nowdate
    }
  }
}


//时间戳转真实时间
export function 
formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };
