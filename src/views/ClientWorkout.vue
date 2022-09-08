<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <!-- <ion-title>{{clientWorkoutDate}}</ion-title> -->
                <ion-title>{{clientName}}</ion-title>
                <ion-buttons slot="start">
                    <!-- <ion-back-button
                        :text="backButtonText"
                        defaultHref="/tabs/clients/:clientId/workouts"
                    ></ion-back-button> -->
                    <ion-button @click="goToWorkouts()">&#60; Workouts</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-text>
                <h1>{{clientWorkoutDate}}</h1>
            </ion-text>
            <ion-list ref="logsList">
                <ion-item-sliding
                    v-for="log in clientWorkoutExerciseLogs" 
                    :key="log.id"
                >
                    <ion-item-options side="start">
                        <ion-item-option color="danger" @click="openDeleteLogPopover(log.id)">Delete</ion-item-option>
                    </ion-item-options>

                    <!-- <ion-item>
                        <ion-label>{{ clientWorkout.name ? clientWorkout.name : clientWorkout.date.substring(0, 10) }}</ion-label>
                    </ion-item> -->

                    <ion-item>
                        <ion-grid>
                            <ion-row class="title-row">
                                <ion-text class="exercise-name">
                                    <h2>{{log.exercise_name}}</h2>
                                </ion-text>
                                <!-- <div class="table-buttons">
                                    <ion-button size="small" @click="goToEditLogScreen(log.workout_id, log.id, log.sets, log.reps, log.weight)">
                                        Edit
                                    </ion-button>
                                    <ion-button size="small" color="danger">
                                        Delete
                                    </ion-button>
                                </div> -->

                            </ion-row>
                            <ion-row class="table-headers">
                                <ion-col>
                                    <ion-text>
                                        <h4>Sets</h4>
                                    </ion-text>
                                </ion-col>
                                <ion-col>
                                    <ion-text>
                                        <h4>Reps</h4>
                                    </ion-text>
                                </ion-col>
                                <ion-col>
                                    <ion-text>
                                        <h4>Weight</h4>
                                    </ion-text>
                                </ion-col>
                            </ion-row>

                            <ion-row class="table-row">
                                <ion-col>{{log.sets}}</ion-col>
                                <ion-col>{{log.reps}}</ion-col>
                                <ion-col>{{log.weight}}</ion-col>
                            </ion-row>

                        </ion-grid>
                    </ion-item>

                    <ion-item-options side="end">
                        <ion-item-option 
                        @click="goToEditLogScreen(log.workout_id, log.id, log.exercise_name, log.sets, log.reps, log.weight)"
                        >Edit</ion-item-option>
                    </ion-item-options>
                <!-- <ion-popover :is-open="isOpenRef" reference="trigger" side="right" showBackdrop="true" @didDismiss="closeDeleteLogPopover()">
                    <ion-content>
                        <ion-text>Are you sure you want to delete this log?</ion-text>
                        <ion-item :button="true" :detail="false" @click="confirmDelete(log.workout_id, log.id)">
                            <ion-label>Yes</ion-label>
                        </ion-item>
                        <ion-item :button="true" :detail="false" @click="closeDeleteLogPopover()">
                            <ion-label>No</ion-label>
                        </ion-item>
                    </ion-content>
                </ion-popover> -->
                </ion-item-sliding>
            </ion-list>

            <ion-popover :is-open="isOpenRef" reference="trigger" side="right" showBackdrop="true" @didDismiss="closeDeleteLogPopover()">
                <ion-content>
                    <ion-text>Are you sure you want to delete this log?</ion-text>
                    <ion-item :button="true" :detail="false" @click="confirmDelete()">
                        <ion-label>Yes</ion-label>
                    </ion-item>
                    <ion-item :button="true" :detail="false" @click="closeDeleteLogPopover()">
                        <ion-label>No</ion-label>
                    </ion-item>
                </ion-content>
            </ion-popover>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="goToCreateLogScreen()">
                    <ion-icon src="https://dl.dropbox.com/s/tumsf8khofi8sbk/add-log.svg"></ion-icon>
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
    IonCol,
    IonText,
    IonFab,
    IonFabButton,
    IonIcon,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonPopover,
    IonLabel,
    IonButtons,
    // IonBackButton,
    IonButton,
    useIonRouter,
    // IonFabList
} from '@ionic/vue';

import { ref } from 'vue';

// import TrashIcon from '@/components/TrashIcon.vue'

import { mapState } from 'vuex';

export default {
    // name: 'ClientWorkout',
    props: {
        clientName: {type: String, required: true},
        clientId: {type: String, required: true},
        workoutId: {type: String, required: true},
        clientWorkoutName: {type: String, required: true},
        clientWorkoutDate: {type: String, required: true},
        backButtonText: {type: String, required: true}
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
        IonList,
        IonItem,
        IonText,
        IonFab,
        IonFabButton,
        IonIcon,
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
        IonPopover,
        IonLabel,
        IonButtons,
        // IonBackButton,
        IonButton,
        // IonFabList,
        // TrashIcon
        // IonList
    },
    computed: {
        ...mapState('clientWorkouts', {
            clientWorkoutExerciseLogs: state => state.logs
        })
    },
    mounted() {
        console.log("mounted() hit in ClientWorkout.vue")
        this.$store.dispatch('clientWorkouts/getClientWorkoutExerciseLogs', this.workoutId)
    },
    setup(props) {
            const ionRouter = useIonRouter();
            const goToWorkouts = () => {
                console.log(props.clientId)
                // ionRouter.back(`/tabs/clients/${props.clientId}/workouts`)
                ionRouter.navigate(`/tabs/clients/${props.clientId}/workouts`, 'back', 'push')
            };

            return { goToWorkouts }

    },
    data() {
        return {
            isOpenRef: ref(false),
            selectedLogWorkoutId: null,
            selectedLogId: null,
        }
    },
    methods: {
        goToCreateLogScreen() {
            // alert('test')
            this.$router.push({
                name: 'CreateLog',
                params: {
                    clientId: this.clientId,
                    workoutId: this.workoutId,
                    clientName: this.clientName,
                    backButtonText: 'Workout'
                }
            })
        },
        goToEditLogScreen(workoutId, logId, exerciseName, sets, reps, weight) {
            // alert('test')
            // console.log(this.$refs.logsList)
            this.$refs.logsList.$el.closeSlidingItems();
            console.log(exerciseName);
            this.$router.push({
                name: 'EditLog',
                params: {
                    workoutId: workoutId,
                    clientName: this.clientName,
                    clientId: this.clientId,
                    logId: logId,
                    previousExerciseName: exerciseName,
                    sets: sets,
                    reps: reps,
                    weight: weight,
                    backButtonText: 'Workout'

                }
            })
        },
        openDeleteLogPopover(logId) {
            this.selectedLogId = logId;
            this.isOpenRef = ref(true);
            this.$refs.logsList.$el.closeSlidingItems();
            // this.$store.dispatch('clientWorkouts/deleteClientWorkoutExerciseLog', logData)
        },
        closeDeleteLogPopover() {
            console.log("Open ref is now false")
            this.isOpenRef = ref(false);
        },
        confirmDelete() {
            console.log("Did I happen?")
            const logData = {
                clientId: this.clientId,
                workoutId: this.workoutId,
                logId: this.selectedLogId,
            }
            this.$store.dispatch('clientWorkouts/deleteClientWorkoutExerciseLog', logData)
            .then(() => {
                this.isOpenRef = ref(false);
            })
        },
        // goToWorkouts() {
        //     // alert('boom')

        // }
    }
}
</script>

<style scoped>
    /* ion-grid:not(.exercise-name) {
        border-radius: 50px;
    } */
    /* ion-page::-webkit-scrollbar {
        display: none;
    } */

    ::-webkit-scrollbar {
        display: none;
    }

    ion-fab-button {
        --background: #7D80DA;
    }

    .button-native {
        color: white;
    }

    /* ion-icon {
        color: red;
    } */

    .title-row {
        justify-content: space-between;
        align-items: center;
    }

    ion-text {
        padding: 0;
    }

    ion-content {
        --padding-start: 5%;
        --padding-end: 5%;
    }
    h1 {
        font-family: 'ArchivoBlack-Regular';
        font-size: 2rem;
    }

    .table-headers {
        background-color: #161316;
        text-align: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .table-row {
        text-align: center;
    }

    .table-row {
        border: 1px solid #fcfcfc50;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .table-row ion-col {
        border-left: 0.5px solid #fcfcfc50;
        border-right: 0.5px solid #fcfcfc50;
    }

    
</style>