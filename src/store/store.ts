import login from '../store/modules/login';
import clients from '../store/modules/clients';
import clientWorkouts from '../store/modules/clientWorkouts';
import trainerExercises from '../store/modules/trainerExercises';

// import Vue from 'vue';
// import Vuex from 'vuex';
// Vue.use(Vuex);

import { LoginState } from './modules/login';
import { createStore } from "vuex";
import Vuex from 'vuex';



export interface State {
    login: LoginState
}


export const store = createStore<State>({
    modules: {
        login,
        clients,
        clientWorkouts,
        trainerExercises,
    },
//     // state: {
//     //     message: "Can you see me?",
//     // },
});

// export default new Vuex.Store<State>({
//     modules: {
//         login,
//         clients,
//         clientWorkouts,
//         trainerExercises
//     }
// })

// export const store = new Vuex.Store({
//     modules: {
//         login,
//         clients,
//         clientWorkouts,
//         trainerExercises
//     }
// })

// export default store;