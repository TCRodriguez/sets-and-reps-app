<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Create New Client</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <ion-grid>
                <ion-row>
                    <ion-input placeholder="First Name" v-model="first_name"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Last Name" v-model="last_name"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Starting Weight" v-model="starting_weight"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Email" v-model="email"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Phone Number" v-model="phone_number"></ion-input>
                </ion-row>
            </ion-grid>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="createClient()">
                    OK
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    // IonCol,
    // IonItem,
    IonInput,
    IonFab,
    IonFabButton,
    // IonButton,
} from '@ionic/vue';

import { mapState } from 'vuex';

// import OptionsButton from '@/components/OptionsButton.vue'


export default {
    components: { 
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        // IonCol,
        // IonItem,
        IonInput,
        IonFab,
        IonFabButton,
        // IonButton,
    },
    data() {
        return {
            first_name: null,
            last_name: null,
            starting_weight: null,
            email: null,
            phone_number: null,
        }
    },
    mounted() {
        // Resets the "clicked" state of the edit button
        // this.editButtonClicked = false;

        // this.$store.dispatch('clientWorkouts/updateWorkouts', this.clientId)
    },
    methods: {
        createClient() {
            console.log('first')
            const clientData = {
                first_name: this.first_name,
                last_name: this.last_name,
                starting_weight: this.starting_weight,
                email: this.email,
                phone_number: this.phone_number,
            }

            this.$store.dispatch('clients/createClient', clientData)
            .then(() => {
                this.$router.replace({
                    name: 'ClientList'
                })
            })

                    //         fittyApiClient.post('clients', {
                    // first_name: payload.first_name,
                    // last_name: payload.last_name,
                    // starting_weight: payload.starting_weight,
                    // email: payload.email,
                    // phone_number: payload.phone_number
                    // },
                    // { headers: {
                    //     'Authorization': rootState.login.token
                    // },


        }
    }
}
</script>

<style scoped>
    ion-input {
        border: 1px solid #fcfcfc50;
        border-radius: 5px;
        padding-inline-start: 2%;
    }

    ion-fab-button {
        --background: #7D80DA;
    }
</style>