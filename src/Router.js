import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Auth from './pages/auth';
import Main from './pages/main';
import Graph from './pages/graph';
import Network from './pages/Network'
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
      props: true,
      meta: ["Подразделения"],
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      props: true,
      meta: ["Вход"],
    },
    {
      path: '/graph',
      name: 'graph',
      component: Graph,
      props: true,
      meta: ["Графики активности"]
    },
    {
      path: '/network',
      name: 'network',
      component: Network,
      props: true,
      meta: ["Научные интересы"]
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      props: true,
      meta: ["Поиск сотрудников"]
    },
    {
      path: "/worker/:id",
      name: "Worker",
      component: Worker,
      props: true,
      meta: ["Страница сотрудника"]
    },
    {
      path: '/team-rating/:id',
      name: 'team-rating',
      component: TeamRating,
      props: true,
      meta: ["Командный рейтинг"]
    },
    {
      path: '/team/:id',
      name: 'team',
      component: Team,
      props: true,
      meta: ["Страница команды"]
    },
    {
      path: '/comm',
      name: 'comm',
      component: Comm,
      props: true,
      meta: ["Страница Коммерциализации"]
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

// exlint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  document.title = to.meta[0];
  next();
})

export default router;
