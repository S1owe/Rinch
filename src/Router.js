import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Auth from './pages/auth';
import Main from './pages/main';
import Graph from './pages/graph';
import Network from './pages/Network'
import PageWithModal from '@/pages/PageWithModal';
import Search from './pages/search';
import Worker from './pages/worker';
import TeamRating from './pages/TeamRating';
import Team from './pages/team';
import Comm from './pages/comm';

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
    {
      path: '/search',
      name: 'search',
      component: Search,
      props: true,
    },
    {
      path: "/worker/:id",
      name: "Worker",
      component: Worker,
      props: true,
    },
    {
      path: '/team-rating/:id',
      name: 'team-rating',
      component: TeamRating,
      props: true,
    },
    {
      path: '/team/:id',
      name: 'team',
      component: Team,
      props: true,
    },
    {
      path: '/comm',
      name: 'comm',
      component: Comm,
      props: true,
    },
  ],
});

export default router;
