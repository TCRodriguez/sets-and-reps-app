import { resolveComponent } from 'vue';
import fittyApiClient from '../../axios-http';

export default {
    namespaced: true,
    state: {
        exercises: [],
    },

    actions: {
        updateExercises({commit, rootState}) {
            return new Promise((resolve, reject) => {
                fittyApiClient.get('exercises', {
                    headers: {
                        'Authorization': rootState.login.token
                    }
                })
                .then(response => {
                    console.log("We got the exercises!")
                    console.log(response.data.data)
                    commit('UPDATE_EXERCISES', response.data.data)
                    // console.log(this.results)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        createExercise({rootState, dispatch}, exerciseName) {
            return new Promise((resolve, reject) => {
                fittyApiClient.post('exercises', {
                    exercise_name: exerciseName
                    },
                    { headers: {
                        'Authorization': rootState.login.token
                    },
                })
                .then(response => {
                    console.log(response)
                    dispatch('updateExercises')
                    resolve(response)
                    this.navigation.navigate('Exercises')
                })
                .catch(error => {
                    reject(error)
                    console.log(error.response.data.message)
                    console.log(error.response.data.message.includes('violation: 1062'));
                    
                })
            })
        },
        editExercise({rootState, dispatch}, payload) {
            return new Promise((resolve, reject) => {
                fittyApiClient.put(`exercises/${payload.exerciseId}`, {
                    exercise_name: payload.exerciseName
                    },
                    { headers: {
                        'Authorization': rootState.login.token
                    },
                })
                .then(response => {
                    console.log('Exercise updated.')
                    console.log(response)
                    dispatch('updateExercises')
                    resolve(response)
                })
                .catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        },
        deleteExercise({rootState, dispatch}, exerciseId) {
            return new Promise((resolve, reject) => {
                fittyApiClient.delete(`exercises/${exerciseId}`, {
                    headers: {
                        'Authorization': rootState.login.token
                    }
                })
                .then(response => {
                    console.log(response)
                    dispatch('updateExercises')
                    resolve(response)
                })
                .catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        }
    },

    getters: {
        getExercises(state) {
            return state.exercises;
        }
    },

    mutations: {
        UPDATE_EXERCISES(state, exercises) {
            state.exercises = exercises
        }
    }







}