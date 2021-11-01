import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/view',
    component: () => import('@/components/Main'),
    name: 'main',
    children: [
      {
        path: 'city',
        name: 'city',
        components: {
          content: () => import('@/components/City/Table.vue'),
        },
      },
      {
        path: 'human',
        name: 'human',
        components: {
          content: () => import('@/components/Human/Table.vue'),
        },
      },
      {
        path: 'coordinates',
        name: 'coordinates',
        components: {
          content: () => import('@/components/Coordinates/Table.vue'),
        },
      },
      {
        path: '',
        redirect: { name: 'city' },
      },
    ],
  },
  {
    path: '',
    redirect: { name: 'main' },
  },
];

const router = new Router({
  routes: routes,
  mode: 'history',
  base: process.env.VUE_APP_SUBPATH ?? '/',
});

export default router;