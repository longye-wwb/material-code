import Vue from 'vue';
import VueRouter from 'vue-router';
import Photon from "../photon/router.js";

Vue.use(VueRouter)

/**
 *  解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/',
    redirect: "/photon"
  },
  // bpmn-js
  {
    path: '/bpmn',
    name: 'Bpmn',
    component: () => import("../components/layouts/ActivitiBpmnLayout.vue"),

  },
  // LoginLayout
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/layouts/LoginLayout.vue'),
    children: [{
      path: 'password',
      name: 'Password',
      component: () => import('../components/form/login/LoginForm.vue'),
    }, {
      path: 'account',
      name: 'AccountSuccess',
      component: () => import('../components/form/login/AccountLoginSuccessForm.vue'),
    }, {
      path: 'cas',
      name: 'CasSuccess',
      component: () => import('../components/form/login/CasServiceLoginForm.vue'),
    }],
  },
  {
    path: '/',
    name: 'BasicManagerLayout',
    component: () => import("../components/layouts/index/BasicManagerLayout.vue"),
    children: [
      // Crledu.manager,
      // Dcedu.manager,
      Photon.manager,
      // Test.manager,
    ],
  },
  {
    path: '/',
    name: 'BaseHomeLayout',
    component: () => import("../components/layouts/index/HomeLayout.vue"),
    children: [
      Photon.home,
    ],
  },
  {
    path: '/',
    name: "Error",
    component: () => import("../components/layouts/FullContentLayout.vue"),
    children: [{
        path: '*',
        name: 'Notfound',
        component: () => import("../views/error/NotFoundView.vue"),
      }

    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;