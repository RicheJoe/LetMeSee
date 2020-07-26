import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import('../views/home/home.vue')
const CateGory = () => import('../views/category/category.vue')
const Cart = () => import('../views/cart/cart.vue')
const Profile = () => import('../views/profile/profile.vue')
//安装
//测试gitgit 2222222
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: CateGory,
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
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
})


//导出
export default router
