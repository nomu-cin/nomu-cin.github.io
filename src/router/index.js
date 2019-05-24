import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import graficos from '@/components/graficos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/graficos/:Pid',
      name: 'graficos',
      component: graficos
    }
  ]
})