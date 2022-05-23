import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/index/index'
import MyTest from '@/components/MyTest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/test',
      name: 'MyTest',
      component: MyTest
    }
  ]
})
