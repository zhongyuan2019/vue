import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from '@/components/user/user.vue'
import Test from '@/components/test/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'Home',
      component: Home,
      children:[
        {
          path:"/user",//对应url地址
          name:"User", 
          component:User
        }
      ]
    },
    {
      path: '/login',
      name:"Login",
      component: Login
    },
    {
      path: '/test',
      name:"Test",
      component: Test
    }
  ]
})
