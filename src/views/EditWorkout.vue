<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{clientName}}</ion-title>
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
                    <ion-text>
                        <h1>Edit Workout Date</h1>
                    </ion-text>
                    <ion-datetime presentation="date" v-model="newClientWorkoutDate"></ion-datetime>
                </ion-row>
                <!-- <ion-row>
                    <ion-input placeholder="Date" v-model="clientWorkoutDate"></ion-input>
                </ion-row> -->
            </ion-grid>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="editWorkout()">
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
    IonText,
    IonFab,
    IonFabButton,
    // IonIcon,
    // IonInput,
    IonDatetime,
    IonButtons,
    IonBackButton,
} from '@ionic/vue';

import { checkmarkOutline } from "ionicons/icons";

import { mapState } from 'vuex';

export default {
    // name: 'ClientWorkout',
    props: {
        clientName: {type: String, required: true},
        clientId: {type: String, required: true},
        // clientWorkoutName: {type: String, required: true},
        clientWorkoutId: {type: String, required: true},
        backButtonText: {type: String, required: true},
        clientWorkoutDate: {type: String, required: true}
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
        IonText,
        IonFab,
        IonFabButton,
        // IonIcon,
        // IonInput,
        // checkmarkOutline
        // IonList
        IonDatetime,
        IonButtons,
        IonBackButton,
    },
    data() {
        return {
            newClientWorkoutDate: null,
        }
    },
    mounted() {
        // this.$store.dispatch('clientWorkouts/createClientWorkout', this.clientWorkoutDate)
        this.newClientWorkoutDate = this.clientWorkoutDate;
    },
    methods: {
        editWorkout() {
            console.log(this.newClientWorkoutDate)

            const data = {
                clientId: this.clientId,
                clientWorkoutDate: this.newClientWorkoutDate,
                clientWorkoutId: this.clientWorkoutId
            }
            console.log(data)
            this.$store.dispatch('clientWorkouts/editClientWorkout', data)
            .then(() => {
                console.log('Do we get here?')
                this.$router.replace({
                    name: 'ClientWorkouts'
                })
            })
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
</style>