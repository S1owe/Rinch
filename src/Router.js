import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Auth from './pages/auth';
import Main from './pages/main';
import Graph from './pages/graph';
import Network from './pages/Network'
import PageWithModal from '@/pages/PageWithModal';

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
  {
      path: '/network',
      name: 'network',
      component: Network,
      props: true,
  },
    {
      path: '/modal',
      name: 'modal',
      component: PageWithModal,
      props: true,
    },
  ],
});

export default router;
