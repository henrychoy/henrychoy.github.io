import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stocks from '../views/Stocks.vue'
import Covid from '../views/Covid.vue'
import ToDo from '../views/ToDo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {title: 'Home'}
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks,
    meta: {title: 'Stocks'}
  },
  {
    path: '/covid',
    name: 'Covid',
    component: Covid,
    meta: {title: 'Covid'}
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: ToDo,
    meta: {title: 'toDo'}
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// page titles
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
