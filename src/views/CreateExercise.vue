<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Create Exercise</ion-title>
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
                    <ion-input placeholder="Exercise name..." v-model="exerciseName"></ion-input>
                </ion-row>
            </ion-grid>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="createExercise()">
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
    IonInput
} from '@ionic/vue';

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
        // IonText,
        IonFab,
        IonFabButton,
        // IonIcon,
        IonInput,
        // checkmarkOutline
        // IonList
    },
    data() {
        return {
            exerciseName: null,
        }
    },
    mounted() {
        // this.$store.dispatch('trainerExercises/createExercise', this.exerciseName)
    },
    methods: {
        createExercise() {
            // const data = {
            //     clientId: this.clientId,
            //     clientWorkoutDate: this.clientWorkoutDate,
            // }
            this.$store.dispatch('trainerExercises/createExercise', this.exerciseName)
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