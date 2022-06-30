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
                        <h1>Edit Log</h1>
                    </ion-text>
                </ion-row>
                <!-- <ion-row>
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
                </ion-row> -->
                <Form @submit="editLog" ref="form">
                    <Field v-model="exerciseId" name="exerciseId" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" type="text" placeholder="Exercise" clear-input></ion-input>
                    </Field>
                    <ErrorMessage name="exerciseId"></ErrorMessage>

                    <Field v-model="sets" name="sets" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" type="number" placeholder="Sets" clear-input></ion-input>
                    </Field>
                    <ErrorMessage name="sets"></ErrorMessage>

                    <Field v-model="reps" name="reps" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" type="number" placeholder="Reps" clear-input></ion-input>
                    </Field>
                    <ErrorMessage name="reps"></ErrorMessage>

                    <Field v-model="weight" name="weight" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" type="number" placeholder="Weight" clear-input></ion-input>
                    </Field>
                    <ErrorMessage name="weight"></ErrorMessage>


                    <ion-button type="submit" expand="block">Submit</ion-button>
                    <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                        <ion-fab-button @click="createLog()" type="submit">

                            OK
                        </ion-fab-button>
                    </ion-fab>  -->
                </Form>
            </ion-grid>
            <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed"> -->
                <!-- <ion-fab-button @click="editLog()"> -->
                    <!-- <ion-icon name="checkmark-outline"></ion-icon> -->
                    <!-- OK -->
                    <!-- <ion-icon name="checkbox-outline"></ion-icon> -->
                    <!-- <ion-icon name="checkbox"></ion-icon> -->
                <!-- </ion-fab-button> -->
            <!-- </ion-fab> -->
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
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
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
} from '@ionic/vue';

import { checkmarkOutline } from "ionicons/icons";

export default {
    // name: 'ClientWorkout',
    props: {
        clientName: {type: String, required: true},
        clientId: {type: String, required: true},
        workoutId: {type: String, required: true},
        logId: {type: String, required: true},
        backButtonText: {type: String, required: true},
        // exerciseId: {type: String, required: true},
        // clientWorkoutName: {type: String, required: true},
        // clientWorkoutDate: {type: String, required: true}
        // sets: {type: String, required: true},
        // reps: {type: String, required: true},
        // weight: {type: String, required: true},
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
        // IonFab,
        // IonFabButton,
        // IonIcon,
        IonInput,
        // checkmarkOutline
        // IonList,
        IonButton,
        IonButtons,
        IonBackButton,
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
        const ids = {
            clientWorkoutId: this.workoutId,
            clientWorkoutExerciseLogId: this.logId
        }
        this.$store.dispatch('clientWorkouts/getClientWorkoutExerciseLog', ids)
        .then(response => {
            this.exerciseId = response.exercise_id
            this.sets = response.sets
            this.reps = response.reps
            this.weight = response.weight
            this.duration = response.duration
            this.completedAt = response.completed_at
        })
        .catch(error => {
            console.log(error.response)
        })
    },
    methods: {
        editLog() {
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
                logId: this.logId,
                exerciseId: this.exerciseId,
                sets: this.sets,
                reps: this.reps,
                weight: this.weight,
                duration: this.duration,
                completedAt: this.completedAt
            };
            console.log(logData);
            this.$store.dispatch('clientWorkouts/editClientWorkoutExerciseLog', logData)
            .then(() => {
                this.$router.replace({
                    name:'ClientWorkout'
                });
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
        --padding-start: 2%;
        margin: 2% 0;
    }

    /* ion-icon {
        color: white;
    } */
</style>