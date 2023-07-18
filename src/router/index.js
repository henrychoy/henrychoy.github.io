import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pets from '../views/Pets.vue'
import ToDo from '../views/ToDo.vue'
import Questions from '../views/Questions.vue'
import Expenses from '../views/Expenses.vue'

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
    path: '/expenses',
    name: 'Expenses',
    component: Expenses
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
