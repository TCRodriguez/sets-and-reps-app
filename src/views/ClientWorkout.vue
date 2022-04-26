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
                <ion-row>
                    <ion-text class="exercise-name">
                        <h2>{{log.exercise_name}}</h2>
                    </ion-text>
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


                <!-- Perhaps a v-for here to get a row for each set? Set 1, Set 2, Set 3... -->
                <!-- <ion-row class="table-row" v-for="(set, index) in log.sets" :key="set.id">
                    <ion-col>{{index + 1}}</ion-col>
                    <ion-col>{{log.reps}}</ion-col>
                    <ion-col>{{log.weight}}</ion-col>
                </ion-row> -->
                <ion-row class="table-row">
                    <ion-col>{{log.sets}}</ion-col>
                    <ion-col>{{log.reps}}</ion-col>
                    <ion-col>{{log.weight}}</ion-col>
                </ion-row>
            </ion-grid>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button>
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
    IonIcon
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
        IonText,
        IonFab,
        IonFabButton,
        IonIcon
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

<style scoped>
    /* ion-grid:not(.exercise-name) {
        border-radius: 50px;
    } */

    ion-fab-button {
        --background: #7D80DA;
    }

    /* ion-icon {
        color: red;
    } */

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