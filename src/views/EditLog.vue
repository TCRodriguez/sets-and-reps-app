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
                    <Field name="exerciseId" v-slot="{ field }" rules="required">
                        <!-- <ion-input v-bind="field" type="text" placeholder="Exercise" clear-input></ion-input> -->
                        <ion-searchbar v-model="exerciseQuery" placeholder="Search Exercises" ref="searchbar" @input="handleSearchbarChange($event.target.value)"></ion-searchbar>
                        <ion-list ref="exerciseList">
                            <ion-item v-for="exercise in exercises" v-bind:key="exercise.id" @click="setExercise(exercise.id, exercise.exercise_name)">{{ exercise.exercise_name}}</ion-item>
                        </ion-list>
                        <ion-input id="exercise-name-field" v-bind="field" type="text" v-model="exerciseName" readonly></ion-input>
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
    IonList,
    IonItem,
    IonSearchbar,
} from '@ionic/vue';

import { mapGetters } from 'vuex';

import { checkmarkOutline } from "ionicons/icons";

export default {
    // name: 'ClientWorkout',
    props: {
        clientName: {type: String, required: true},
        clientId: {type: String, required: true},
        workoutId: {type: String, required: true},
        logId: {type: String, required: true},
        previousExerciseName: {type: String, required: true},
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
        IonList,
        IonItem,
        IonSearchbar,
    },
    computed: {
        ...mapGetters({
            exercises: 'trainerExercises/getExercises'
        })
    },
    data() {
        return {
            exerciseQuery: null,
            exerciseName: null,
            // exerciseId: null,
            sets: null,
            reps: null,
            weight: null,
            duration: null,
            completedAt: null,
        }
    },
    mounted() {
        console.log("This is the exercise name: " + this.previousExerciseName)
        this.exerciseName = this.previousExerciseName;
        this.$refs.exerciseList.$el.style.display = 'none';
        const ids = {
            clientWorkoutId: this.workoutId,
            clientWorkoutExerciseLogId: this.logId
        }
        this.$store.dispatch('clientWorkouts/getClientWorkoutExerciseLog', ids)
        .then(response => {
            this.exerciseId = response.exercise_id
            console.log(response.exercise_id)
            console.log(response.exercise_name)
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
                exerciseName: this.exerciseName,
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
        handleSearchbarChange(query) {
            // console.log(exerciseName)
            this.$refs.exerciseList.$el.style.display = 'block';
            if(!query) {
               this.$refs.exerciseList.$el.style.display = 'none'; 
            }
            console.log(query)
            // console.log(Array.from(this.$refs.exerciseList.children))
            // console.log(Array.from(this.$refs.exerciseList.$el.children))
            // this.$refs.exerciseList.$el.children.forEach(el => {
            //     console.log(el)
            // })
            for (let index = 0; index < this.$refs.exerciseList.$el.children.length; index++) {
                const element = this.$refs.exerciseList.$el.children[index];
                // console.log(element.textContent)
                const shouldShow = element.textContent.toLowerCase().indexOf(query.toLowerCase()) > -1;
                element.style.display = shouldShow ? 'block' : 'none';
                
            }
        },
        setExercise(id, name) {
            // console.log(name)
            // this.$refs.searchbar.value = exercise;
            this.exerciseId = id;
            this.exerciseName = name;
            // console.log("exerciseId.value is: " + exerciseId.value)
            // console.log("this.exerciseId is: " + this.exerciseId)
            console.log(this.exerciseQuery)
            this.exerciseQuery = '';
            this.$refs.exerciseList.$el.style.display = 'none'; 
        }
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

    #exercise-name-field {
        border: none;
        font-size: 2rem;
    }

    /* ion-icon {
        color: white;
    } */
</style>