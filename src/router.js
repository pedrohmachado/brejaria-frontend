import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

Vue.use(Router)

let router = new Router ({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/HelloWorld.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/Login.vue')
    },
    {
      path: '/eu',
      name: 'Eu',
      component: () => import('./components/Perfil.vue')
    },
    {
      path: '/produtos',
      name: 'Produtos',
      component: () => import('./components/Produtos.vue')
    },
    {
      path: '/eventos',
      name: 'Eventos',
      component: () => import('./components/Eventos.vue')
    },
    {
      path: '/sobre',
      name: 'Sobre',
      component: () => import('./components/Sobre.vue')
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: () => import('./components/Cadastro.vue')
    },
    {
      path: '/evento/novo',
      name: 'EventoCadastro',
      component: () => import('./components/EventoCadastro.vue')
    },
    {
      path: '/produto/novo',
      name: 'ProdutoCadastro',
      component: () => import('./components/ProdutoCadastro.vue')
    },
    {
      path: 'evento/:id',
      name: 'EventoDetalhes',
      component: () => import('./components/EventoDetalhes.vue')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

const openRoutes = ['Login', 'Cadastro', 'Home'];

router.beforeEach((to, from, next) => {
  if(openRoutes.includes(to.name)){
    next()
  } else if (localStorage.getItem('token')){
    next()
  } else {
    next('/login')
  }
})

export default router



