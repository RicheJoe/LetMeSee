import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import('../views/home/home.vue')
const CateGory = () => import('../views/category/category.vue')
const Cart = () => import('../views/cart/cart.vue')
const Profile = () => import('../views/profile/profile.vue')
//安装
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
    component: CateGory
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
})


//导出
export default router
