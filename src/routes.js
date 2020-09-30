import Vue from 'vue';
import Router from 'vue-router';

import FormUser from './components/FormUser'
import Table from './components/Table';

Vue.use(Router);

export const routes = [
  { path: '/', name: 'home', component: Table },
  { path: '/table', name: 'Table', component: Table },
  { path: '/new-user', name: 'NewUser', component: FormUser },
  { path: '/edit-user-:id', name: 'EditUser', component: FormUser }
]