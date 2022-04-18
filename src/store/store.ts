import login from '../store/modules/login';
import clients from '../store/modules/clients';
import clientWorkouts from '../store/modules/clientWorkouts';
// import trainerExercises from '../store/modules/trainerExercises';

// import Vue from 'vue';
// import Vuex from 'vuex';
// Vue.use(Vuex);


import { createStore } from "vuex";

const store = createStore({
    modules: {
        login,
        clients,
        clientWorkouts,
        // trainerExercises,
    },
    state: {
        message: "Can you see me?",
    },
});

export default store;