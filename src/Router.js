import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Auth from './pages/auth';
import Main from './pages/main';
import Graph from './pages/graph';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      props: true
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      props: true,
    },
    {
      path: '/graph',
      name: 'graph',
      component: Graph,
      props: true,
    },
  ],
});

export default router;
