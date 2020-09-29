import Vue from 'vue';
import Router from 'vue-router';

import NewUser from './components/NewUser'
import Table from './components/Table';

Vue.use(Router);

export const routes = [
  { path: '/', name: 'home', component: Table },
  { path: '/table', name: 'Table', component: Table },
  { path: '/new-user', name: 'NewNewUser', component:NewUser }
]