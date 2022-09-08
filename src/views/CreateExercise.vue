<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Create Exercise</ion-title>
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
                        <h1>Create Exercise</h1>
                    </ion-text>
                </ion-row> -->
                <!-- <ion-row>
                    <ion-input placeholder="Exercise name..." v-model="exerciseName"></ion-input>
                </ion-row> -->
                <ion-toast
                    :is-open="displayDuplicateExerciseError"
                    message="An exercise with that name already exists!"
                    :duration="1500"
                    position="top"
                    @didDismiss="setOpen(false)"
                ></ion-toast>
                <Form @submit="createExercise" ref="form">
                    <Field v-model="exerciseName" name="exerciseName" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" type="text" placeholder="Exercise" clear-input></ion-input>
                    </Field>
                    <ErrorMessage name="exerciseName"></ErrorMessage>
                    <ion-button type="submit" expand="block">Submit</ion-button>
                </Form>
            </ion-grid>
            <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="createExercise()"> -->
                    <!-- OK -->
                    <!-- <ion-icon name="checkmark-outline"></ion-icon> -->
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
    // IonRow,
    // IonCol,
    // IonText,
    // IonFab,
    // IonFabButton,
    // IonIcon,
    IonInput,
    IonButtons,
    IonBackButton,
    IonToast,
} from '@ionic/vue';

export default {
    props: {
        backButtonText: {type: String, required: true},
    },
    components: { 
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonGrid,
        // IonRow,
        // IonCol,
        // IonText,
        // IonFab,
        // IonFabButton,
        // IonIcon,
        IonInput,
        IonButtons,
        IonBackButton,
        IonToast,
        // checkmarkOutline
        // IonList
    },
    data() {
        return {
            exerciseName: null,
            displayDuplicateExerciseError: false
        }
    },
    mounted() {
        // this.$store.dispatch('trainerExercises/createExercise', this.exerciseName)
        this.displayDuplicateExerciseError = false;
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
            .catch(() => {
                this.setOpen(true);
                console.log("An exercise with that name already exists.")
            })
        },
        setOpen(state: boolean) {
            this.displayDuplicateExerciseError = state;
        }
    }
}
</script>

<style scoped>
    ion-input {
        border: 1px solid #fcfcfc50;
        border-radius: 5px;
        --padding-start: 2%;
        margin: 2% 0;
    }
</style>