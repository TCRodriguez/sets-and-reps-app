import { createRouter, createWebHistory, createMemoryHistory, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
// import TabsPage from '../views/TabsPage.vue';
import LoginScreen from '../views/LoginScreen.vue';
import CreateTrainer from '../views/CreateTrainer.vue';
import EditTrainer from '../views/EditTrainer.vue';
import MainTabs from '../views/MainTabs.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/tabs/tab1'
  // },
  {
    path: '/',
    // component: LoginScreen,
    name: 'LoginScreen',
    component: LoginScreen,
    props: true,
    // beforeEnter: (to, from) => {
    //   console.log("before enter - to")
    //   console.log(to.params)
    //   console.log("before enter - from") 
    //   console.log(from.params)
    // }
  },
  {
    path: '/trainers',
    name: 'CreateTrainer',
    component: CreateTrainer,
    props: true,
  },
  {
    path: '/trainers/:trainerId',
    name: 'EditTrainer',
    component: EditTrainer,
    props: true,
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
        name: 'ClientList',
        component: () => import('@/views/ClientList.vue'),
      },
      {
        path: 'clients/create',
        name: 'CreateClient',
        component: () => import('@/views/CreateClient.vue'),
        props: true,
      },
      {
        path: 'clients/:clientId/edit',
        name: 'EditClient',
        component: () => import('@/views/EditClient.vue'),
        props: true,
      },
      {
        path: 'clients/:clientId/workouts',
        name: 'ClientWorkouts',
        component: () => import('@/views/ClientWorkoutsList.vue'),
        props: true,
      },
      {
        path: 'clients/:clientId/workouts/create',
        name: 'CreateWorkout',
        component: () => import('@/views/CreateWorkout.vue'),
        props: true,
      },
      {
        path: 'clients/:clientId/workouts/:clientWorkoutId/edit',
        name: 'EditWorkout',
        component: () => import('@/views/EditWorkout.vue'),
        props: true,
      },
      {
        path: 'clients/:clientId/workouts/:workoutId/exercise-logs',
        name: 'ClientWorkout',
        component: () => import('@/views/ClientWorkout.vue'),
        props: true,
      },
      {
        path: 'clients/:clientId/workouts/:workoutId/create',
        name: 'CreateLog',
        component: () => import('@/views/CreateLog.vue'),
        props: true,
      },
      {
        path: 'clients/:clientId/workouts/:workoutId/exercise-logs/:logId',
        name: 'EditLog',
        component: () => import('@/views/EditLog.vue'),
        props: true,
        beforeEnter: (to, from) => {
          console.log("before enter - to")
          console.log(to.params)
          console.log("before enter - from") 
          console.log(from.params)
        }
      },
      {
        path: 'exercises',
        name: 'ExerciseList',
        component: () => import('@/views/ExerciseList.vue'),
        props: true,
      },
      {
        path: 'exercises/create',
        name: 'CreateExercise',
        component: () => import('@/views/CreateExercise.vue'),
        props: true,
      },
      {
        path: 'exercises/edit',
        name: 'EditExercise',
        component: () => import('@/views/EditExercise.vue'),
        props: true,
      },
      {
        path: 'settings',
        name: 'SettingsScreen',
        component: () => import('@/views/SettingsScreen.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
