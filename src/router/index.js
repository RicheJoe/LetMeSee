import Vue from "vue"
import VueRouter from "vue-router"

//路由懒加载
const Home = () => import('../views/home/home.vue')
const CateGory = () => import('../views/category/category.vue')
const Cart = () => import('../views/cart/cart.vue')
const Profile = () => import('../views/profile/profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

//安装
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta:{
      title:'首页'
    },
    // beforeEnter:(to,from,next)=>{
    //     //局部路由独享守卫  当这个路由进入时监听
    //     console.log('home load');
    //     next()
    // },
    children:[
      // {
      //   path: '',
      //   redirect: ''
      // },
      // {
      //   path: '',
      //   component: ''
      // }
    ]
  },
  {
    path: '/category',
    component: CateGory,
    meta:{
      title:'分类'
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta:{
      title:'购物车'
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta:{
      title:'我的'
    },
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta:{
      title:'详情'
    },
  },
]
//创建
const router = new VueRouter({
  routes,
  mode: 'history'
  // 其中，3 种路由模式的说明如下：

  // hash: 使用 URL hash 值来作路由。 支持所有浏览器， 包括不支持 HTML5 History Api 的浏览器；

  // history: 依赖 HTML5 History API 和服务器配置。 具体可以查看 HTML5 History 模式；

  // abstract: 支持所有 JavaScript 运行环境， 如 Node.js 服务器端。 如果发现没有浏览器的 API， 路由会自动强制进入这个模式。
  ,linkActiveClass:''  //活跃状态的路由增加的class 可以设置样式
})

//全局守卫函数
// 前置钩子函数  可以在这里判断是否登录
// router.beforeEach(function(to, from, next) {
//   if (to.meta.needLogin) {  meta加在const route中的meta中
//     //页面是否登录
//     if (localStorage.getItem("token")) {
//       //本地存储中是否有token(uid)数据
//       next(); //表示已经登录
//     } else {
//       //next可以传递一个路由对象作为参数 表示需要跳转到的页面
//       next({
//         name: "login"
//       });
//     }
//   } else {
//     //表示不需要登录
//     next(); //继续往后走
//   }
// });
router.beforeEach((to,from,next)=>{
  //从from跳转到to
  document.title= to.matched[0].meta.title//加match原因是为了防止直接跳child层级出差


  //在这之前可以操作，比如判断是否登录，如果没登录可以直接用next('/login')跳转到登录界面
  next()//必须要
})

//后置钩子函数
router.afterEach((to,from)=>{
  //next不必需

})



//导出
export default router
