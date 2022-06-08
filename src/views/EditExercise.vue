/* eslint-disable vue/no-mutating-props */
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Edit Exercise</ion-title>
                <ion-buttons slot="start">
                    <ion-back-button
                        :text="backButtonText"
                    ></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-grid>
                <!-- <ion-row>
                    <ion-text>
                        <h1>Create Workout</h1>
                    </ion-text>
                </ion-row> -->
                <ion-row>
                    <ion-input placeholder="Exercise name..." v-model="newExerciseName"></ion-input>
                </ion-row>
            </ion-grid>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="editExercise()">
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
    // IonText,
    IonFab,
    IonFabButton,
    // IonIcon,
    IonInput,
    IonButtons,
    IonBackButton,
} from '@ionic/vue';

export default {
    props: {
        exerciseName: {type: String, required: true},
        exerciseId: {type: String, required: true},
        backButtonText: {type: String, required: true},
        // clientName: {type: String, required: true},
        // clientId: {type: String, required: true},
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
        // IonText,
        IonFab,
        IonFabButton,
        // IonIcon,
        IonInput,
        IonButtons,
        IonBackButton,
        // checkmarkOutline
        // IonList
    },
    data() {
        return {
            newExerciseName: null,
        }
    },
    mounted() {
        this.newExerciseName = this.exerciseName
    },
    methods: {
        editExercise() {
            const exerciseData = {
                exerciseId: this.exerciseId,
                exerciseName: this.exerciseName,
            }
            this.$store.dispatch('trainerExercises/editExercise', exerciseData)
            .then(() => {
                this.$router.replace({
                    name: 'ExerciseList'
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