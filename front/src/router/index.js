import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import { authGuard } from '../auth/authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('../views/Transactions.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue'),
    beforeEnter: authGuard,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
