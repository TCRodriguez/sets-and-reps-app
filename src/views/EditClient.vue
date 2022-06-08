<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Edit Client</ion-title>
                <ion-buttons slot="start">
                    <ion-back-button
                        :text="backButtonText"
                    ></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <ion-grid>
                <ion-row>
                    <ion-input placeholder="First Name" v-model="newFirstName"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Last Name" v-model="newLastName"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Starting Weight" v-model="newStartingWeight"></ion-input>
                    {{this.starting_weight}}
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Email" v-model="newEmail"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Phone Number" v-model="newPhoneNumber"></ion-input>
                </ion-row>
            </ion-grid>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="editClient()">
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
    IonButtons,
    IonBackButton,
    // IonButton,
} from '@ionic/vue';

import { mapState } from 'vuex';

// import OptionsButton from '@/components/OptionsButton.vue'


export default {
    props: {
            clientId: { type: String, required: true },
            first_name: { type: String, required: true },
            last_name: { type: String, required: true },
            starting_weight: { type: String, required: true },
            email: { type: String, required: true },
            phone_number: { type: String, required: true },
            backButtonText: {type: String, required: true},
    },
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
        IonButtons,
        IonBackButton,
        // IonButton,
    },
    data() {
        return {
            newFirstName: null,
            newLastName: null,
            newStartingWeight: null,
            newEmail: null,
            newPhoneNumber: null,
        }
    },
    mounted() {
        // Resets the "clicked" state of the edit button
        // this.editButtonClicked = false;

        // this.$store.dispatch('clientWorkouts/updateWorkouts', this.clientId)
        this.newFirstName = this.first_name;
        this.newLastName = this.last_name;
        this.newStartingWeight = this.starting_weight;
        this.newEmail = this.email;
        this.newPhoneNumber = this.phone_number;
    },
    methods: {
        editClient() {
            console.log('first')
            const clientData = {
                clientId: this.clientId,
                first_name: this.newFirstName,
                last_name: this.newLastName,
                starting_weight: this.newStartingWeight,
                email: this.newEmail,
                phone_number: this.newPhoneNumber,
            }

            this.$store.dispatch('clients/editClient', clientData)
            .then(() => {
                this.$router.replace({
                    name: 'ClientList',
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