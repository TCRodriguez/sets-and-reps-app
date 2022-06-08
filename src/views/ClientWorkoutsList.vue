<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{clientName}}</ion-title>
                <ion-buttons slot="start">
                    <ion-back-button
                        :text="backButtonText"
                        defaultHref="/tabs/clients"
                    ></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list ref="workoutsList">
                <ion-item-sliding 
                    v-for="clientWorkout in clientWorkouts" 
                    :key="clientWorkout.id"
                    button
                >
                    <ion-item-options side="start">
                        <ion-item-option color="danger" @click="openDeleteWorkoutPopover(clientWorkout.id)">Delete</ion-item-option>
                    </ion-item-options>

                    <ion-item @click="goToClientWorkout(clientWorkout.id, clientWorkout.name, clientWorkout.date.substring(0, 10))">
                        <ion-label>{{ clientWorkout.name ? clientWorkout.name : clientWorkout.date.substring(0, 10) }}</ion-label>
                    </ion-item>

                    <ion-item-options side="end">
                        <ion-item-option 
                        @click="goToEditWorkoutScreen(clientWorkout.id, clientWorkout.date.substring(0, 10))"
                        >Edit</ion-item-option>
                    </ion-item-options>

                <!-- <ion-popover :is-open="isOpenRef" reference="trigger" side="right" showBackdrop="true" @didDismiss="closeDeleteWorkoutPopover()">
                    <ion-content>
                        <ion-text>Are you sure you want to delete this log?</ion-text>
                        <ion-item :button="true" :detail="false" @click="confirmDelete(clientWorkout.id)">
                            <ion-label>Yes</ion-label>
                        </ion-item>
                        <ion-item :button="true" :detail="false" @click="closeDeleteWorkoutPopover()">
                            <ion-label>No</ion-label>
                        </ion-item>
                    </ion-content>
                </ion-popover> -->


                </ion-item-sliding>
            </ion-list>

            <ion-popover :is-open="isOpenRef" reference="trigger" side="right" showBackdrop="true" @didDismiss="closeDeleteWorkoutPopover()">
                <ion-content>
                    <ion-text>Are you sure you want to delete this log?</ion-text>
                    <ion-item :button="true" :detail="false" @click="confirmDelete()">
                        <ion-label>Yes</ion-label>
                    </ion-item>
                    <ion-item :button="true" :detail="false" @click="closeDeleteWorkoutPopover()">
                        <ion-label>No</ion-label>
                    </ion-item>
                </ion-content>
            </ion-popover>

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
    IonPopover,
    IonText,
    IonButtons,
    IonBackButton,
} from '@ionic/vue';

import { mapState } from 'vuex';

import { ref } from 'vue';
// import OptionsButton from '@/components/OptionsButton.vue'


export default {
    props: {
        clientName: {type: String, required: true},
        clientId: {type: String, required: true},
        backButtonText: {type: String, required: true},
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
        IonPopover,
        IonText,
        IonButtons,

    IonBackButton,
        // OptionsButton
    },
    data() {
        return {
            // clientName: null,
            // optionsActive: false,
            // editButtonClicked: false,
            // deleteButtonClicked: false,
            isOpenRef: false,
            selectedWorkoutId: null,
            // backButtonText: ""
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
        .then(() => {
            console.log(this.clientWorkouts)
        })

    },
    methods: {
        goToClientWorkout(clientWorkoutId, clientWorkoutName, clientWorkoutDate) {
            // console.log("Did goToClientWorkout get hit?")

            // // ! Check if goToEditWorkoutScreen() has been hit. If so, don't execute this router push event.
            // if(this.editButtonClicked || this.deleteButtonClicked)  {
            //     return
            // }

            this.$router.push({
                name: 'ClientWorkout',
                params: {
                    clientId: this.clientId,
                    clientName: this.clientName,
                    workoutId: clientWorkoutId,
                    clientWorkoutName: clientWorkoutName,
                    clientWorkoutDate: clientWorkoutDate,
                    backButtonText: 'Workouts'
                }
            })
        },
        goToCreateWorkoutScreen() {
            this.$router.push({
                name: 'CreateWorkout',
                params: {
                    clientName: this.clientName,
                    backButtonText: 'Workouts',
                }
            })
        },
        goToEditWorkoutScreen(clientWorkoutId, clientWorkoutDate) {
            // this.editButtonClicked = true;

            this.$refs.workoutsList.$el.closeSlidingItems();
            this.$router.push({
                name: 'EditWorkout',
                params: {
                    clientName: this.clientName,
                    clientWorkoutId: clientWorkoutId,
                    clientWorkoutDate: clientWorkoutDate,
                    backButtonText: 'Workouts'
                }
            })
        },
        openDeleteWorkoutPopover(workoutId) {
            this.selectedWorkoutId = workoutId;
            this.isOpenRef = ref(true);
            this.$refs.workoutsList.$el.closeSlidingItems();
            // this.$store.dispatch('clientWorkouts/deleteClientWorkoutExerciseLog', logData)
        },
        closeDeleteWorkoutPopover() {
            console.log("Open ref is now false")
            this.isOpenRef = ref(false);
        },
        confirmDelete() {
            console.log("Did I happen?")
            const workoutData = {
                clientId: this.clientId,
                workoutId: this.selectedWorkoutId,
            }
            this.$store.dispatch('clientWorkouts/deleteClientWorkout', workoutData)
            .then(() => {
                this.isOpenRef = ref(false);
            })
        },
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