/* eslint-disable vue/no-unused-components */
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
                        <h1>Create Log</h1>
                    </ion-text>
                </ion-row>
                <!-- <ion-row>
                    <ion-input placeholder="Exercise Name" v-model="exerciseId" type="text"></ion-input>
                    <ion-row>
                        <span>{{ errorMessage }}</span>
                    </ion-row>

                </ion-row>
                <ion-row>
                    <ion-input placeholder="Sets" v-model="sets" type="number"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Reps" v-model="reps" type="number"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Weight" v-model="weight" type="text"></ion-input>
                </ion-row> -->
                <Form @submit="createLog" ref="form">
                    <Field name="exerciseId" v-slot="{ field }" rules="required">
                        <ion-searchbar v-model="exerciseQuery" placeholder="Search Exercises" ref="searchbar" @ionFocus="handleSearchbarFocus()" @input="handleSearchbarChange($event.target.value)"></ion-searchbar>
                        <ion-list ref="exerciseList">
                            <ion-item v-for="exercise in exercises" @click="setExercise(exercise.id, exercise.exercise_name)">{{ exercise.exercise_name}}</ion-item>
                        </ion-list>
                        <ion-input id="exercise-name-field" v-bind="field" type="text" v-model="exerciseName" readonly></ion-input>
                    </Field>
                    <ErrorMessage name="exerciseId"></ErrorMessage>

                    <Field v-model="sets" name="sets" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" type="number" placeholder="Sets" inputmode="numeric" clear-input></ion-input>
                    </Field>
                    <ErrorMessage name="sets"></ErrorMessage>

                    <Field v-model="reps" name="reps" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" type="number" placeholder="Reps" inputmode="numeric" clear-input></ion-input>
                    </Field>
                    <ErrorMessage name="reps"></ErrorMessage>

                    <Field v-model="weight" name="weight" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" type="number" placeholder="Weight" inputmode="numeric" clear-input></ion-input>
                    </Field>
                        <ErrorMessage name="weight"></ErrorMessage>



                    <ion-button type="submit" expand="block">Submit</ion-button>
                    <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                        <ion-fab-button @click="createLog()" type="submit">

                            OK
                        </ion-fab-button>
                    </ion-fab>  -->
                </Form>
                <!-- <ion-input v-model="exerciseId"></ion-input> -->
                <!-- <form @submit="createLog()">
                    <ion-input v-model="value" name="value"></ion-input>
                    <span>{{ errorMessage }}</span>
                    <ion-button type="submit">Submit</ion-button>
                </form> -->
                <!-- <ion-input v-model="exerciseId"></ion-input>
                <span>{{ errorMessage }}</span> -->
                <!-- <form >
                    <ion-input v-model="exerciseId"></ion-input>
                    <span>{{ errorMessage }}</span>
                    <ion-button type="submit" @submit="createLog">Submit</ion-button>
                </form> -->
            </ion-grid>
            <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="createLog()">

                    OK
                </ion-fab-button>
            </ion-fab> -->
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
    IonButtons,
    IonBackButton,
    IonItem,
    IonList,
    IonSearchbar
} from '@ionic/vue';

import { checkmarkOutline, cloudyNight } from "ionicons/icons";

import { useStore } from 'vuex';

import { ref, defineComponent, computed } from "vue";

import { useRouter } from 'vue-router';

import { useField, useResetForm, useForm} from 'vee-validate';

// import { defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';

// defineRule('required', required);
// import { required } from '@vee-validate/rules';


import * as yup from 'yup';



export default defineComponent(  {
    // name: 'ClientWorkout',
    props: {
        clientName: {type: String, required: true},
        clientId: {type: String, required: true},
        workoutId: {type: String, required: true},
        clientWorkoutName: {type: String, required: true},
        clientWorkoutDate: {type: String, required: true},
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
        IonText,
        // IonFab,
        // IonFabButton,
        // IonIcon,
        IonInput,
        IonButtons,
        IonBackButton,
        // checkmarkOutline
        IonList,
        // Form,
        // Field,
        // ErrorMessage,
        IonItem,
        IonSearchbar,
    },
    // data() {
    //     return {
    //         // exerciseId: null,
    //         sets: null,
    //         reps: null,
    //         weight: null,
    //         duration: null,
    //         completedAt: null,
    //     }
    // },
    setup(props) {
        // useForm();
        // const { exerciseId, errorMessage } = useField('exerciseId', yup.string().required());
        const store = useStore();
        
        const router = useRouter();

        const exerciseQuery = ref(null);
        const exerciseId = ref(null);
        const exerciseName = ref(null);
        const sets = ref(null);
        const reps = ref(null);
        const weight = ref(null);
        const duration = ref(null);
        const completedAt = ref(null);
        // const {exerciseId, sets, reps, weight, duration, completedAt} = ref(null);
        // const { value, errorMessage } = useField('value', yup.string().required());
        // const exerciseId = useField('name')
        // const { exerciseId, sets, reps, weight, duration, completedAt} = ref(null);

        const resetForm = useResetForm(); 
        const textRules = yup.string().required();

        // const searchbar = ref();
  
  

        function createLog() {
            // alert(values)
            // console.log("ID is: " + exerciseId.value)
            // console.log()
            // this.$router.push({
            //     name: 'AddExerciseLog',
            //     params: {
            //         clientId: this.clientId,
            //         workoutId: this.workoutId,
            //     }
            // })

            const logData = {
                clientId: props.clientId,
                workoutId: props.workoutId,
                exerciseId: exerciseId.value,
                sets: sets.value,
                reps: reps.value,
                weight: weight.value,
                duration: duration.value,
                completedAt: completedAt.value
            };

            // console.log(store.getters['trainerExercises/getExercises'])
            store.dispatch('clientWorkouts/createClientWorkoutExerciseLog', logData)
            .then(() => {
                router.replace({
                    name: 'ClientWorkout',
                    params: {
                        backButtonText: "ClientWorkouts"
                    }
                })
            })
            console.log(logData);
            // this.$refs.form.resetForm();
            // this.$validator.reset();
        }
        function handleSearchbarChange(query) {
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
        }

        function handleSearchbarFocus() {
            console.log("hi")
            console.log(this.exerciseName)
        }

        function setExercise(id, name) {
            // console.log(name)
            // this.$refs.searchbar.value = exercise;
            exerciseId.value = id;
            exerciseName.value = name;
            // console.log("exerciseId.value is: " + exerciseId.value)
            // console.log("this.exerciseId is: " + this.exerciseId)
            console.log(exerciseQuery.value)
            exerciseQuery.value = '';
            this.$refs.exerciseList.$el.style.display = 'none'; 

        }
        return {
            exerciseQuery,
            exerciseName,
            exerciseId,
            createLog,
            resetForm,
            sets,
            reps,
            weight,
            duration,
            completedAt,
            // value,
            // errorMessage,
            textRules,
            exercises: computed(() => store.getters['trainerExercises/getExercises']),
            handleSearchbarChange,
            handleSearchbarFocus,
            setExercise,
        }
    },
    mounted() {
        // console.log(this.store.getters['trainerExercises/getExercises'])
        this.$store.dispatch('clientWorkouts/getClientWorkoutExerciseLogs', this.workoutId)
        this.$refs.exerciseList.$el.style.display = 'none';
    },
})
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
    }

    /* ion-icon {
        color: white;
    } */
</style>