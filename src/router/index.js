import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import test from '@/test.vue'
import Login from '@/views/Login.vue'
import Manage from '@/views/Manage.vue'
import FoodClass from '@/views/food/FoodClass.vue'
import FoodManage from '@/views/food/FoodManage.vue'
import User from '@/views/user/User.vue'
import UserPassword from '@/views/user/UserPassword.vue'
import HomePage from '@/views/hp/HomePage.vue'
import About from '@/views/hp/About.vue'
import Cart from '@/views/hp/Cart.vue'
import Menu from '@/views/hp/Menu.vue'
import ulogin from '@/ulogin.vue'
import navbar from '@/navbar.vue'
import uuser from '@/views/hp/uuser.vue'
import usercenter from '@/views/hp/usercenter.vue'
import introduce from '@/views/hp/introduce.vue'
import { useTokenStore } from '@/stores/token.js'
// 路由配置
const routes = [
  {
    path: "/test",
    component: test,
    meta: { requireAuth: false }
  },
  {
    path: "/ulogin",
    component: ulogin,
    meta: { requireAuth: false }
  },
  {
    path: '/Login',
    component: Login,
    meta: { requireAuth: false }
  },
  {
    path: '/Manage',
    component: Manage,
    redirect: '/Manage/FoodClass',
    meta: { requireAuth: true },
    children: [
      { path: 'FoodClass', component: FoodClass },
      { path: 'FoodManage', component: FoodManage },
      { path: 'User', component: User },
      { path: 'UserPassword', component: UserPassword }
    ]
  },
  {
    path: '/HomePage',
    component: HomePage,
    children: [
      { path: 'navbar', component: navbar }
    ],
    redirect: '/HomePage/navbar'
  },
  {
    path: '/About',
    component: About,
    children: [
      { path: 'navbar', component: navbar }
    ],
    redirect: '/About/navbar'
  },
  {
    path: '/Cart',
    component: Cart,
    meta: { requireAuth: true },
    children: [
      { path: 'navbar', component: navbar }
    ],
    redirect: '/Cart/navbar'
  },
  {
    path: '/Menu',
    component: Menu,
    meta: { requireAuth: false },
    children: [
      { path: 'navbar', component: navbar }
    ],
    redirect: '/Menu/navbar'
  },
  {
    path: '/uuser',
    component: uuser,
    meta: { requireAuth: true },
    redirect: '/uuser/usercenter',
    children: [
      { path: 'usercenter', component: usercenter },
      { path: 'introduce', component: introduce }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore()
  const isAuthenticated = Boolean(tokenStore.token) // 检查是否有认证标记，例如在 localStorage 中的 token

  if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
    next({
      path: '/ulogin',
      query: { redirect: to.fullPath } // 在登录后可以重定向回之前试图访问的页面
    })
    ElMessage.error({ message: '无权限，请登录', duration: 1500 });


  } else {
    next() // 继续导航
  }
})

export default router
