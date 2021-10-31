import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: '/index',
    name: 'Home',
    component: Home,
    redirect: "/index/welcome",
    children: [
      {
        path: "welcome",
        component: () => import('../components/Welcome.vue')
      },
      {
        path: "goodsquery",
        component: () => import('../components/GoodsQuery.vue')
      },
      {
        path: "goods",
        component: () => import('../components/Goods.vue')
      },
      {
        path: "userquery",
        component: () => import('../components/UserQuery.vue')
      },
      {
        path: "userset",
        component: () => import('../components/UserSet.vue')
      },
      {
        path: "category",
        component: () => import('../components/Category.vue')
      },
      {
        path: "saleinfo",
        component: () => import('../components/SaleInfo.vue')
      },
      {
        path: "trendinfo",
        component: () => import('../components/TrendInfo.vue')
      },
      {
        path: "pieinfo",
        component: () => import('../components/PieInfo.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem("mytoken") ? true : false;
  if (to.path === "/login") {
    next();
  } else {
    isLogin ? next() : next("/login")
  }
})

export default router
