import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

import VueRouter from 'vue-router'

Vue.use(Element)
Vue.use(VueRouter)

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'login',
      component(resolve) {
        require.ensure(['./components/Login.vue'], ()=>{
          resolve(require('./components/Login.vue'));
        });
      },

      meta: {requiresAuth: true}
    },
    {
      // path: '/detail/:id',
      path:'/detail',
      name: 'detail',
      component(resolve) {
        require.ensure(['./components/Main.vue'], ()=>{
          resolve(require('./components/Main.vue'));
        });
      },
      children:[
        {
          path: 'maincontent',
          component(resolve) {
            require.ensure(['./components/mainContent.vue'], ()=>{
              resolve(require('./components/mainContent.vue'));
            });
          },
          children:[
            {// 动态路由
              path: ':id',
              name: 'watch',
              component(resolve) {
                require.ensure(['./components/mainContent.vue'], ()=>{
                  resolve(require('./components/mainContent.vue'));
                });
              },
            }
          ]
        },
        {
          path: 'mainuser',
          component(resolve) {
            require.ensure(['./components/mainUser.vue'], ()=>{
              resolve(require('./components/mainUser.vue'));
            });
          },
          children:[
            {// 动态路由
              path: ':id',
              name: 'watch',
              component(resolve) {
                require.ensure(['./components/mainUser.vue'], ()=>{
                  resolve(require('./components/mainUser.vue'));
                });
              },
            }
          ]
        }
      ],

      meta: {requiresAuth: true}
    }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
