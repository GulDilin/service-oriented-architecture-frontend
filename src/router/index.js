import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: () => import('@/components/Main'),
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
    ],
  },
];

const router = new Router({
  routes: routes,
  mode: 'history',
});

export default router;