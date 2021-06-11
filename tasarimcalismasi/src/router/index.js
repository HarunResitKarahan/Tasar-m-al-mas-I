import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import SosyalBilimlerCategory from '../views/category/SosyalBilimlerCategory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tests',
    name: 'Tests',
    component: () => import(/* webpackChunkName: "about" */ '../views/tests/Tests.vue'),
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/sosyalbilimlercategory',
    name: 'SosyalBilimlerCategory',
    component: SosyalBilimlerCategory
  },
  {
    path: '/matematikcategory',
    name: 'MatematikCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/category/MatematikCategory.vue')
  },
  {
    path: '/fencategory',
    name: 'FenCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/category/FenCategory.vue')
  },
  {
    path: '/turkcecategory',
    name: 'TurkceCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/category/TurkceCategory.vue')
  },
  {
    path: '/yabancidil',
    name: 'YabanciDilCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/category/YabanciDilCategory.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
