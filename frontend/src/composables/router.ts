import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { checkExpired } from '@/services/auth';
import Auth from '@/views/Auth.vue';
import About from '@/views/About.vue';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile/Profile.vue';
import PlaylistView from '@/views/PlaylistView/PlaylistView.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'about',
    path: '/about',
    component: About,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'playlist',
    path: '/playlist/:id',
    component: PlaylistView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'auth',
    path: '/auth',
    component: Auth,
  },
  {
    name: 'unkown-route',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
    },
  },
];

export const registerRouter = (app: App): void => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  router.beforeEach((to, from, next) => {
    const isExpired = checkExpired();
    const accessToken = localStorage.getItem('access_token');

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (accessToken == null || isExpired) {
        next({ name: 'auth' });
      } else {
        next();
      }
    } else if (to.path === '/auth' && !!accessToken && !isExpired) {
      next({ name: 'home' });
    } else {
      next();
    }
  });

  app.use(router);
};
