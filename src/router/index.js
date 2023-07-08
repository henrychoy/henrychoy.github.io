import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pets from '../views/Pets.vue'
import ToDo from '../views/ToDo.vue'
import Questions from '../views/Questions.vue'
import Charts from '../views/Charts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pets',
    name: 'Pets',
    component: Pets
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: ToDo
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Questions
  },
  {
    path: '/charts',
    name: 'Charts',
    component: Charts
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
