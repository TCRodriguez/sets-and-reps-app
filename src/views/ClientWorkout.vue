<template>
    <!-- <ion-page></ion-page> -->
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <!-- <ion-title>{{clientWorkoutDate}}</ion-title> -->
                <ion-title>{{clientName}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-text>
                <h1>{{clientWorkoutDate}}</h1>
            </ion-text>
            <ion-grid v-for="log in clientWorkoutExerciseLogs" :key="log.id">
                <ion-row>{{log.exercise_name}}</ion-row>
                <ion-row>
                    <ion-col>Sets</ion-col>
                    <ion-col>Reps</ion-col>
                    <ion-col>Weight</ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>{{log.sets}}</ion-col>
                    <ion-col>{{log.reps}}</ion-col>
                    <ion-col>{{log.weight}}</ion-col>
                </ion-row>
            </ion-grid>
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
    IonCol,
} from '@ionic/vue';

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
        IonCol,
        // IonList
    },
    computed: {
        ...mapState('clientWorkouts', {
            clientWorkoutExerciseLogs: state => state.logs
        })
    },
    mounted() {
        this.$store.dispatch('clientWorkouts/getClientWorkoutExerciseLogs', this.workoutId)
    }
}
</script>

<style>

</style>