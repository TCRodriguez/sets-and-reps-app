import fittyApiClient from '../../axios-http'

export default {
    namespaced: true,
    state: {
        token: null,
        messages: null,
    },

    actions: {
        login(context, payload) {
            return new Promise ((resolve, reject) => {
                fittyApiClient.post('login', {
                    email: payload.email,
                    password: payload.password
                })
                .then(response => {
                    context.commit('UPDATE_TOKEN', `Bearer ${response.data.data.token}`)
                    console.log('success')
                    resolve(response.data.data.token)
                })
                .catch(error => {
                    // console.log(error.response)

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
                    resolve(response.data.data)
                })
                .catch(error => {
                    console.log('Trainer creation failed.')
                    reject(error);
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
            console.log(state.messages)
            // ? Does something like a setTimeout() function go here? 
            // ? Since the computed property will be changed?
            // setTimeout(() => {
            //     state.messages = null
            // }, 4000);
        }
    },
}