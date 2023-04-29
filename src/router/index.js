import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cat from '../views/Cat.vue'
import ToDo from '../views/ToDo.vue'
import Questions from '../views/Questions.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cat',
    name: 'Cat',
    component: Cat
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
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
