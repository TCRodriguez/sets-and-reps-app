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
                        <h1>Create Workout</h1>
                    </ion-text>
                    <ion-datetime presentation="date" v-model="clientWorkoutDate"></ion-datetime>
                </ion-row>
                <!-- <ion-row>
                    <ion-input placeholder="Date" v-model="clientWorkoutDate"></ion-input>
                </ion-row> -->
            </ion-grid>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="createWorkout()">
                    OK
                    <!-- <ion-icon name="checkmark-outline"></ion-icon> -->
                    <!-- <ion-icon name="checkbox-outline"></ion-icon> -->
                    <!-- <ion-icon name="checkbox"></ion-icon> -->
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
    IonButtons,
    IonBackButton,
    IonDatetime,
} from '@ionic/vue';

import { checkmarkOutline } from "ionicons/icons";

import { mapState } from 'vuex';

export default {
    // name: 'ClientWorkout',
    props: {
        clientName: {type: String, required: true},
        clientId: {type: String, required: true},
        backButtonText: {type: String, required: true},
        // clientWorkoutName: {type: String, required: true},
        // clientWorkoutDate: {type: String, required: true}
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
        IonButtons,
        IonBackButton,
        IonDatetime,
        // checkmarkOutline
        // IonList
    },
    data() {
        return {
            clientWorkoutDate: null,
        }
    },
    mounted() {
        // this.$store.dispatch('clientWorkouts/createClientWorkout', this.clientWorkoutDate)
    },
    methods: {
        createWorkout() {
            // console.log(this.clientWorkoutDate.substring(0, 10));
            // console.log(this.clientWorkoutDate);
            // let today = new Date().toJSON().substring(0, 10);
            let today = new Date().toLocaleDateString("sv")
            // let tempDate = new Date();
            // console.log(tempDate.toLocaleDateString());
            // console.log(today.getUTCDay());
            // let selectedDate = this.clientWorkoutDate === null ? today : this.clientWorkoutDate.substring(0, 10);
            const data = {
                clientId: this.clientId,
                clientWorkoutDate: this.clientWorkoutDate === null ? today : this.clientWorkoutDate.substring(0, 10)
            }
            // console.log(this.$store.getters)
            console.log(data.clientWorkoutDate);
            // console.log(this.$store.getters['clientWorkouts/getWorkoutById'](57));

            console.log(data)
            // const test = this.clientWorkoutDate === null ? "It's null." : new Date();
            // console.log(test)
            this.$store.dispatch('clientWorkouts/createClientWorkout', data)
            .then(response => {
                this.$store.dispatch('clientWorkouts/updateWorkouts', this.clientId)
                .then(() => {
                    console.log("after setTimeout()")
                    const workouts = this.$store.getters['clientWorkouts/getWorkoutsDesc'];
                    const workout = workouts.find(workout => {
                        return workout.id === response.data.data.id
                    });
                    this.$router.replace({
                        name: 'ClientWorkout',
                        params: {
                            clientId: this.clientId,
                            clientName: this.clientName,
                            workoutId: response.data.data.id,
                            clientWorkoutDate: response.data.data.date,
                            clientWorkoutDay: workout.day,
                            backButtonText: 'Workouts'
                        }
                    })
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