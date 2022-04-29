/* eslint-disable vue/no-unused-components */
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{clientName}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-grid>
                <ion-row>
                    <ion-text>
                        <h1>Create Log</h1>
                    </ion-text>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Exercise Name" v-model="exerciseId"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Sets" v-model="sets"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Reps" v-model="reps"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Weight" v-model="weight"></ion-input>
                </ion-row>
            </ion-grid>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="createLog()">
                    <ion-icon name="checkmark-outline"></ion-icon>
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
    IonIcon,
    IonInput
} from '@ionic/vue';

import { checkmarkOutline } from "ionicons/icons";

import { mapState } from 'vuex';

export default {
    // name: 'ClientWorkout',
    props: {
        clientName: {type: String, required: true},
        clientId: {type: String, required: true},
        workoutId: {type: String, required: true},
        clientWorkoutName: {type: String, required: true},
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
        IonIcon,
        IonInput,
        // checkmarkOutline
        // IonList
    },
    data() {
        return {
            exerciseId: null,
            sets: null,
            reps: null,
            weight: null,
            duration: null,
            completedAt: null,
        }
    },
    mounted() {
        this.$store.dispatch('clientWorkouts/getClientWorkoutExerciseLogs', this.workoutId)
    },
    methods: {
        createLog() {
            // alert('test')
            // this.$router.push({
            //     name: 'AddExerciseLog',
            //     params: {
            //         clientId: this.clientId,
            //         workoutId: this.workoutId,
            //     }
            // })
            const logData = {
                clientId: this.clientId,
                workoutId: this.workoutId,
                exerciseId: this.exerciseId,
                sets: this.sets,
                reps: this.reps,
                weight: this.weight,
                duration: this.duration,
                completedAt: this.completedAt
            };
            console.log(logData);
            this.$store.dispatch('clientWorkouts/createClientWorkoutExerciseLog', logData);
            this.$router.replace({
                name:'ClientWorkout'
            });
        },
    }
}
</script>

<style scoped>
    ion-grid {
        padding: 0 4%;
    }

    ion-row {
        margin-bottom: 2%;

    }

    ion-input {
        border: 1px solid #fcfcfc50;
        border-radius: 5px;
        padding-inline-start: 2%;
    }

    /* ion-icon {
        color: white;
    } */
</style>