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
                    resolve(response.data.data.token)
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
    },

    mutations: {
        UPDATE_TOKEN(state, token) {
            state.token = token
        },
        UPDATE_MESSAGES(state, messages) {
            state.messages = messages
            // ? Does something like a setTimeout() function go here? 
            // ? Since the computed property will be changed?
            setTimeout(() => {
                state.messages = null
            }, 4000);
        }
    },
}