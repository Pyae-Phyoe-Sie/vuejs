import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/Index.vue'
// import Search from '../components/Search.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import NotFoundLayout from '../layouts/NotFoundLayout.vue'
import Create from '../views/Create.vue'
import List from '../views/List.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Info from '../views/Info.vue'
import Update from '../views/Update.vue'
import Delete from '../views/Delete.vue'
import PageNotFound from '../views/PageNotFound.vue'

import authService from '../services/auth.service'

Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/search',
  //   name: 'Search',
  //   component: Search
  // },
  {
    path: '/auth',
    name: 'auth',
    redirect: '/auth/login',
    component: AuthLayout,
    children: [
      {
        path: '/auth/login',
        name: 'login',
        component: Login
      },
      {
        path: '/auth/register',
        name: 'register',
        component: Signup
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: NotFoundLayout,
    children: [
      {
        path: '/not-found-page',
        name: 'notfound',
        component: PageNotFound
      }
    ]
  },
  {
    path: '/',
    name: 'Default',
    redirect: '/auth/login',
    component: DefaultLayout,
    children: [
      {
        path: '/create',
        name: 'create',
        component: Create
      },
      {
        path: '/list',
        name: 'home',
        component: List
      },
      {
        path: '/info/:id',
        name: 'info',
        component: Info
      },
      {
        path: '/update/:id',
        name: 'update',
        component: Update
      },
      {
        path: '/delete/:id',
        name: 'delete',
        component: Delete
      }
    ]
  },
  {
    path: '/login',
    redirect: '/auth/login',
  },
  {
    path: '/register',
    redirect: '/auth/register',
  },
  { 
    path: "*",
    redirect: '/not-found-page',
  }
  // {
  //   path: '/search',
  //   name: 'Search',
  //   component: Search
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>  {
  // if ((to.name === 'create' || to.name === 'home' || to.name === 'info' ||
  //   to.name === 'update' || to.name === 'delete') && !authService.isLoggedIn()) {
  //   next({name: 'login'});
  // } else if ((to.name === 'login' || to.name === 'register') && authService.isLoggedIn()) {
  //   next({name: 'home'});
  // } else {
  //   next();
  // }

  if ((to.name === 'login' || to.name === 'register') && authService.isLoggedIn()) {
    next({name: 'home'});
  } else if ((to.name === 'login' || to.name === 'register') && !authService.isLoggedIn()) {
    next();
  } else if (!authService.isLoggedIn()) {
    next({name: 'login'});
  } else {
    next();
  }
}) 

export default router
