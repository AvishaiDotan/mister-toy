import { createRouter, createWebHashHistory } from 'vue-router'

import toyAPP from '../views/toy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'



const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: toyAPP,
    },
    {
      path: '/edit',
      component: toyEdit
    },
    {
      path: '/edit/:id',
      component: toyEdit
    },
    {
      path: '/toy/:id',
      component: toyDetails
    },
  ],
})

export default router
