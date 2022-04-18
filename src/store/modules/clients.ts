import fittyApiClient from '../../axios-http';


export default {
    namespaced: true,
    state: {
        list: [],
    },

    actions: {
        updateClientList({commit, rootState}) {
            return new Promise ((resolve, reject) => {
                fittyApiClient.get('clients', {
                    headers: {
                        Authorization: rootState.login.token
                    }
                })
                .then(response => {
                    console.log("it worked!");
                    console.log(response.data.data);
                    const payload = response.data.data
                    const clients = payload.map(client => {
                        return {
                            id: client.id,
                            name: client.first_name + ' ' + client.last_name,
                            first_name: client.first_name,
                            last_name: client.last_name,
                            starting_weight: payload.starting_weight,
                            email: payload.email,
                            phone_number: payload.phone_number,
                        }
                    })
                    commit('updateClientList', clients)
                    resolve(payload)
                })
                .catch(error => {
                    console.log("it didn't work!")
                    console.log(error)
                    reject(error)
                })
            })
        },
        createClient({rootState, dispatch}, payload) {
            return new Promise ((resolve, reject) => {
                fittyApiClient.post('clients', {
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    starting_weight: payload.starting_weight,
                    email: payload.email,
                    phone_number: payload.phone_number
                    },
                    { headers: {
                        'Authorization': rootState.login.token
                    },
                })
                .then(response => {
                    console.log("Client saved.")
                    console.log(response)
                    fittyApiClient.get('clients', {
                        headers: {
                            'Authorization': rootState.login.token
                        }
                    })
                    .then(response => {
                        const payload = response.data.data
                        const clients = payload.map(client => {
                            return {
                                id: client.id,
                                text: client.first_name
                            }
                        })
                        console.log('Are we here?')
                        dispatch('updateClientList', clients)

                    })
                    .catch(error => {
                        console.log(error.response)
                    })
                    resolve('Client list updated')
                })
                .catch(error => {
                    console.log(error.response)
                    console.log("Client NOT saved")
                    reject(error)
                });
            })
        },
        getClient({state}, clientId) {
            const result = state.list.find(client => client.id === clientId)
            return result;
        },
        editClient({rootState, dispatch}, payload) {
            fittyApiClient.put(`clients/${payload.clientId}/`, {
                first_name: payload.first_name,
                last_name: payload.last_name,
                starting_weight: payload.starting_weight,
                email: payload.email,
                phone_number: payload.phone_number
                },
                { headers: {
                    Authorization: rootState.login.token
                },
            })
            .then(response => {
                console.log("Client updated.")
                console.log(response)
                fittyApiClient.get('clients', {
                    headers: {
                        'Authorization': rootState.login.token
                    }
                })
                .then(response => {
                    const results = response.data.data
                    const clients = results.map(client => {
                        return {
                            id: client.id,
                            text: client.first_name
                        }
                    })
                    console.log('Are we here?')
                    dispatch('updateClientList', clients)

                })
                .catch(error => {
                    console.log(error.response)
                })
            })
            .catch(error => {
                console.log(error.response)
                console.log("Client NOT saved")
            });
        },
    },
    mutations: {
        updateClientList(state, clients) {
            state.list = clients
        }
    }
}