import { createRouter, createWebHistory, createMemoryHistory, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import LoginScreen from '../views/LoginScreen.vue'
import ClientList from '../views/ClientList.vue';
import MainTabs from '../views/MainTabs.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/tabs/tab1'
  // },
  {
    path: '/',
    component: LoginScreen,
  },
  {
    path: '/clients',
    component: ClientList,
  },
  {
    path: '/tabs/',
    component: MainTabs,
    children: [
      {
        path: '',
        // redirect: '/tabs/tab1'
        redirect: '/tabs/clients',
      },
      // {
      //   path: 'tab1',
      //   component: () => import('@/views/Tab1Page.vue')
      // },
      {
        path: 'clients',
        component: () => import('@/views/ClientList.vue'),
      },
      {
        path: 'clients/:clientId',
        name: 'ClientWorkouts',
        component: () => import('@/views/ClientWorkoutsList.vue'),
        props: true,
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
