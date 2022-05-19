<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{clientName}}</ion-title>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list ref="workoutsList">
                <ion-item-sliding 
                    v-for="clientWorkout in clientWorkouts" 
                    :key="clientWorkout.id"
                    button @click="goToClientWorkout(clientWorkout.id, clientWorkout.name, clientWorkout.date.substring(0, 10))"
                >
                    
                    
                    <ion-item-options side="start">
                        <ion-item-option color="danger" @click="deleteWorkout()">Delete</ion-item-option>
                    </ion-item-options>

                    <ion-item>
                        <ion-label>{{ clientWorkout.name ? clientWorkout.name : clientWorkout.date.substring(0, 10) }}</ion-label>
                    </ion-item>

                    <ion-item-options side="end">
                        <ion-item-option 
                        @click="goToEditWorkoutScreen(clientWorkout.id, clientWorkout.date.substring(0, 10))"
                        >Edit</ion-item-option>
                    </ion-item-options>
                    
                    <!-- <div>
                        <ion-text>
                            <p>{{clientWorkout.name ? clientWorkout.name : clientWorkout.date.substring(0, 10)}}</p>
                        </ion-text>
                    </div> -->



                </ion-item-sliding>
            </ion-list>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="goToCreateWorkoutScreen()">
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
    // IonGrid,
    // IonRow,
    // IonCol,
    IonList,
    IonItem,
    IonFab,
    IonFabButton,
    IonIcon,
    // IonButton,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
} from '@ionic/vue';

import { mapState } from 'vuex';

// import OptionsButton from '@/components/OptionsButton.vue'


export default {
    props: {
        clientName: {type: String, required: true},
        clientId: {type: String, required: true}
    },
    components: { 
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        // IonGrid,
        // IonRow,
        // IonCol,
        IonList,
        IonItem,
        IonFab,
        IonFabButton,
        IonIcon,
        // IonButton,
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
        IonLabel,
        // OptionsButton
    },
    data() {
        return {
            // clientName: null,
            // optionsActive: false,
            editButtonClicked: false,
        }
    },
    computed: {
        ...mapState('clientWorkouts', {
            clientWorkouts: state => state.workouts
        })
    },
    mounted() {
        // Resets the "clicked" state of the edit button
        this.editButtonClicked = false;

        this.$store.dispatch('clientWorkouts/updateWorkouts', this.clientId)
    },
    methods: {
        goToClientWorkout(clientWorkoutId, clientWorkoutName, clientWorkoutDate) {
            // console.log("Did goToClientWorkout get hit?")

            // // ! Check if goToEditWorkoutScreen() has been hit. If so, don't execute this router push event.
            if(this.editButtonClicked)  {
                return
            }

            this.$router.push({
                name: 'ClientWorkout',
                params: {
                    clientId: this.clientId,
                    clientName: this.clientName,
                    workoutId: clientWorkoutId,
                    clientWorkoutName: clientWorkoutName,
                    clientWorkoutDate: clientWorkoutDate
                }
            })
        },
        goToCreateWorkoutScreen() {
            this.$router.push({
                name: 'CreateWorkout',
                params: {
                    clientName: this.clientName
                }
            })
        },
        goToEditWorkoutScreen(clientWorkoutId, clientWorkoutDate) {
            this.editButtonClicked = true;

            this.$refs.workoutsList.$el.closeSlidingItems();
            this.$router.push({
                name: 'EditWorkout',
                params: {
                    clientName: this.clientName,
                    clientWorkoutId: clientWorkoutId,
                    clientWorkoutDate: clientWorkoutDate
                }
            })
        }
    }
}
</script>

<style scoped>
    ion-fab-button {
        --background: #7D80DA;
    }

    ion-item {
        justify-content: space-between;
    }
</style>