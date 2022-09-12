import fittyApiClient from '../../axios-http';

export default {
    namespaced: true,
    state: {
        workouts: [],
        // For one workout at a time currently.
        logs: [],
    },

    actions: {
        updateWorkouts({commit, rootState}, clientId) {
            console.log('updateWorkouts()')
            return new Promise ((resolve, reject) => {
                fittyApiClient.get(`clients/${clientId}/workouts`, {
                    headers: {
                        'Authorization': rootState.login.token
                    }
                }) 
                .then(response => {
                    const workoutsTemp = [...response.data.data];
                    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

                    workoutsTemp.forEach(el => {
                        const dayTemp = new Date(el.date)
                        el.day = weekday[dayTemp.getUTCDay()] 
                    });

                    // console.log(workoutsTemp)

                    commit('UPDATE_WORKOUTS', workoutsTemp)
                    // this.clientWorkouts = response.data.data;
                    console.log("We got the workouts!")
                    // console.log(response.data.data)
                    resolve("Updated workouts.")
                })
                .catch(error => {
                    console.log("we DID NOT get our client workouts")
                    console.log(error)
                    reject(error)
                })
            })

        },
        createClientWorkout({rootState, dispatch}, payload) {
            console.log('createClientWorkout()')
            return new Promise((resolve, reject) => {
                fittyApiClient.post(`clients/${payload.clientId}/workouts`, {
                    client_id: payload.clientId,
                    date: payload.clientWorkoutDate
                    },
                    { headers: {
                        'Authorization': rootState.login.token
                    },
                })
                .then(response => {
                    dispatch('updateWorkouts', payload.clientId)
                    resolve(response)
                })
                .catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        },
        editClientWorkout({rootState, dispatch}, payload) {
            return new Promise((resolve, reject) => {
                fittyApiClient.put(`clients/${payload.clientId}/workouts/${payload.clientWorkoutId}`, {
                    client_id: payload.clientId,
                    workout_id: payload.clientWorkoutId,
                    date: payload.clientWorkoutDate
                    },
                    { headers: {
                        'Authorization': rootState.login.token
                    },
                })
                .then(response => {
                    console.log(response)
                    console.log("Exercise log updated.")
                    dispatch('updateWorkouts', payload.clientId)
                    resolve(response)
                })
                .catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        },
        deleteClientWorkout({rootState, dispatch}, workoutData) {
            return new Promise((resolve, reject) => {
                fittyApiClient.delete(`clients/${workoutData.clientId}/workouts/${workoutData.workoutId}`, {
                    headers: {
                        'Authorization': rootState.login.token
                    }
                })
                .then(response => {
                    dispatch('updateWorkouts', workoutData.clientId)
                    // .then(() => {
                    //     dispatch('getClientWorkoutExerciseLogs', workoutData.workoutId)
                    // })
                    resolve(response)
                })
            })
        },
        updateLogs({commit}, logs) {
            commit('UPDATE_LOGS', logs)
        },
        createClientWorkoutExerciseLog({rootState, dispatch}, payload) {
            return new Promise((resolve, reject) => {
                fittyApiClient.post(`clients/${payload.clientId}/workouts/${payload.workoutId}/exercise-logs`, {
                    workout_id: payload.workoutId,
                    exercise_id: payload.exerciseId,
                    sets: payload.sets,
                    reps: payload.reps,
                    weight: payload.weight,
                    duration: payload.duration,
                    completed_at: payload.completedAt,
                    },
                    { headers: {
                        'Authorization': rootState.login.token
                    },
                })
                .then(response => {
                    console.log(response)
                    dispatch('updateWorkouts', payload.clientId)
                    .then(() => {
                        dispatch('getClientWorkoutExerciseLogs', payload.workoutId)
                    })
                    resolve(response)
                })
                .catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        },
        getClientWorkoutExerciseLogs({state, commit}, workoutId) {
            return new Promise((resolve, reject) => {
                const result = state.workouts.find(clientWorkout => clientWorkout.id == workoutId).logs
                console.log(result)
                commit('UPDATE_LOGS', result)
                resolve(result);
            })

        },
        getClientWorkoutExerciseLog({state}, ids) {
            const logs = state.workouts.find(clientWorkout => clientWorkout.id == ids.clientWorkoutId).logs
            const log = logs.find(log => log.id == ids.clientWorkoutExerciseLogId)
            return log;

        },
        editClientWorkoutExerciseLog({state, rootState, dispatch}, payload) {
            const clientId = state.workouts.find(clientWorkout => clientWorkout.id == payload.workoutId).client_id

            console.log(payload)

            return new Promise((resolve, reject) => {
                fittyApiClient.put(`clients/${clientId}/workouts/${payload.workoutId}/exercise-logs/${payload.logId}`, {
                    workout_id: payload.workoutId,
                    exercise_id: payload.exerciseId,
                    exercise_name: payload.exerciseName,
                    sets: payload.sets,
                    reps: payload.reps,
                    weight: payload.weight,
                    duration: payload.duration,
                    completed_at: payload.completedAt,
                    },
                    { headers: {
                        'Authorization': rootState.login.token
                    },
                })
                .then(response => {
                    // console.log(response)
                    console.log("Exercise log updated.")
                    console.log(state.logs)
                    dispatch('updateWorkouts', clientId)
                    .then(() => {
                        dispatch('getClientWorkoutExerciseLogs', payload.workoutId)
                    })
                    resolve(response)
                })
                .catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        },
        deleteClientWorkoutExerciseLog({state, rootState, dispatch}, logData) {
            return new Promise((resolve, reject) => {
                fittyApiClient.delete(`clients/${logData.clientId}/workouts/${logData.workoutId}/exercise-logs/${logData.logId}`, {
                    headers: {
                        'Authorization': rootState.login.token
                    }
                })
                .then(response => {
                    // console.log(response)
                    dispatch('updateWorkouts', logData.clientId)
                    .then(() => {
                        dispatch('getClientWorkoutExerciseLogs', logData.workoutId)
                    })
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
        getWorkoutsDesc(state) {
            // Turns each date string (yyyy-mm-dd) into an actual Date object to get sorted
            const tempWorkoutsArray = [...state.workouts].map(object => {
                return {...object, date: new Date(object.date)};
            });

            // Sorts the workouts objects by the 'date' property descending
            const sortedWorkoutsDesc = tempWorkoutsArray.sort(
                (objA, objB) => Number(objB.date) - Number(objA.date),
            );

            // Converts the 'date' property back to the original yyyy-mm-dd string
            sortedWorkoutsDesc.forEach(workout => {
                workout.date = workout.date.toISOString().split('T')[0];
            })

            return sortedWorkoutsDesc;
        },
        getWorkoutById: (state) => (workoutId) => {
            console.log('getWorkoutById was hit');
            console.log(workoutId);
            console.log(state.workouts)
            // state.workouts.forEach(element => console.log(element.id))
            const workout = state.workouts.find(workout => {
                return workout.id === workoutId;
            })
            console.log(workout);
            // return workout;
            // return state.workouts.find(workout => workout.id === workoutId);
            // return workout.day;
        }
    },
    mutations: {
        UPDATE_WORKOUTS(state, workouts) {
            console.log('UPDATE_WORKOUTS()')
            state.workouts = workouts
            // console.log(state.workouts)
        },
        UPDATE_LOGS(state, logs) {
            state.logs = logs
        }
    }


}