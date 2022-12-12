import fittyApiClient from '../../axios-http'

export interface LoginState {
    token: string,
    messages: string,
    newTrainerCreated: boolean,
    loggedInTrainer: object
}


export default {
    namespaced: true,
    // state: (): LoginState => ({
    //     token: null,
    //     messages: null,
    //     newTrainerCreated: false,
    //     loggedInTrainer: null,
    // }),
    state: {
        token: null,
        messages: null,
        newTrainerCreated: false,
        loggedInTrainer: null,
    },
    getters: {
        getTrainer(state) {
            return state.loggedInTrainer;
        }
    },
    actions: {
        login(context, payload) {
            return new Promise ((resolve, reject) => {
                fittyApiClient.post('login', {
                    email: payload.email,
                    password: payload.password
                })
                .then(response => {
                    context.commit('UPDATE_TOKEN', `Bearer ${response.data.token.token}`)
                    console.log('success')
                    console.log(response.data)
                    context.commit('UPDATE_LOGGED_IN_TRAINER', response.data.trainer);
                    resolve(response.data.token.token)
                })
                .catch(error => {
                    console.log(error.response)

                    const errorMessage = error.response.data.errors.email[0]
                    // console.log(error.response.data.errors.email[0])
                    context.commit('UPDATE_MESSAGES', errorMessage)
                    reject(error)
                })
            })
        },
        createTrainer(context, data) {
            return new Promise((resolve, reject) => {
                fittyApiClient.post('trainers', {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    user_name: data.user_name,
                    email: data.email,
                    password: data.password
                })
                .then(response => {
                    console.log('Trainer created via front end.');
                    context.commit('UPDATE_NEW_TRAINER_STATUS', true);
                    resolve(response.data.data)
                })
                .catch(error => {
                    console.log('Trainer creation failed.')
                    reject(error);
                })
            })
        },
        editTrainer(context, data) {
            return new Promise((resolve, reject) => {
                fittyApiClient.put(`trainers/${data.trainerId}/`, {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    user_name: data.user_name,
                    email: data.email,
                    // password: data.password
                })
                .then(response => {
                    console.log('Trainer created via front end.');
                    resolve(response.data.data)
                })
                .catch(error => {
                    console.log('Trainer creation failed.')
                    reject(error);
                })
            })
        },
        logout() {
            return new Promise ((resolve, reject) => {
                fittyApiClient.post('logout')
                .then(response => {
                    console.log('Trainer has logged out.')
                    console.log(response.data)
                })
            })
        }
        
    },

    mutations: {
        UPDATE_TOKEN(state, token) {
            state.token = token
        },
        UPDATE_MESSAGES(state, messages) {
            state.messages = messages
            console.log(state.messages + "test")
            // ? Does something like a setTimeout() function go here? 
            // ? Since the computed property will be changed?
            // setTimeout(() => {
            //     state.messages = null
            // }, 4000);
        },
        UPDATE_NEW_TRAINER_STATUS(state, showMessageBoolean) {
            console.log(showMessageBoolean)
            state.newTrainerCreated = showMessageBoolean;
        },
        UPDATE_LOGGED_IN_TRAINER(state, loggedInTrainer) {
            state.loggedInTrainer = loggedInTrainer;
        }
    },
}
