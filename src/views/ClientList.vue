/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-unused-components */
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Clients</ion-title>
                <!-- <ion-buttons slot="end">
                    <ion-button @click="optionsActive = !optionsActive">
                        <options-button class="options-button"></options-button>
                    </ion-button>
                </ion-buttons> -->
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list ref="clientList">
                <ion-item-sliding 
                    v-for="client in clients" 
                    :key="client.id"
                >
                    

                    <ion-item-options side="start">
                        <ion-item-option color="danger" @click="openDeleteClientPopover(client.id)">Delete</ion-item-option>
                    </ion-item-options>

                    <ion-item @click="goToClientWorkoutsListScreen(client.id, client.name)">
                        <ion-label>{{ client.first_name }} {{ client.last_name }}</ion-label>
                    </ion-item>

                    <ion-item-options side="end">
                        <ion-item-option 
                        @click="goToEditClientScreen(client.id, client.first_name, client.last_name, client.starting_weight, client.email, client.phone_number)"
                        >Edit</ion-item-option>
                    </ion-item-options>

                    <!-- <ion-popover :is-open="isOpenRef" reference="trigger" side="right" showBackdrop="true" @didDismiss="closeDeleteClientPopover()">
                        <ion-content>
                            <ion-text>Are you sure you want to delete this log?</ion-text>
                            <ion-item :button="true" :detail="false" @click="confirmDelete(client.id)">
                                <ion-label>Yes</ion-label>
                            </ion-item>
                            <ion-item :button="true" :detail="false" @click="closeDeleteClientPopover()">
                                <ion-label>No</ion-label>
                            </ion-item>
                        </ion-content>
                    </ion-popover> -->

                    <!-- <div>
                        <ion-text>
                            {{ client.first_name }} {{ client.last_name }}
                        </ion-text>
                    </div> -->
                    <!-- <div v-show="optionsActive">
                        <ion-button size="small" @click="goToEditWorkoutScreen(clientWorkout.id, clientWorkout.date.substring(0, 10))">Edit</ion-button>
                        <ion-button size="small" color="danger">Delete</ion-button>
                    </div> -->
                </ion-item-sliding>
            </ion-list>
            <ion-popover :is-open="isOpenRef" reference="trigger" side="right" showBackdrop="true" @didDismiss="closeDeleteClientPopover()">
                <ion-content>
                    <ion-text>Are you sure you want to delete this log?</ion-text>
                    <ion-item :button="true" :detail="false" @click="confirmDelete()">
                        <ion-label>Yes</ion-label>
                    </ion-item>
                    <ion-item :button="true" :detail="false" @click="closeDeleteClientPopover()">
                        <ion-label>No</ion-label>
                    </ion-item>
                </ion-content>
            </ion-popover>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="goToCreateClientScreen()">
                    <add-client-icon class="add-client-icon"></add-client-icon>
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
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonFab,
    IonFabButton,
    IonPopover,
    IonText,
} from '@ionic/vue';

import { mapState } from 'vuex';

import AddClientIcon from '@/components/AddClientIcon.vue';

import { ref } from 'vue';

// import OptionsButton from '@/components/OptionsButton.vue'


export default {
    // props: ['clientName'],
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
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
        IonLabel,
        AddClientIcon,
        IonFab,
        IonFabButton,
        IonPopover,
        IonText,
        // OptionsButton
    },
    computed: {
        ...mapState('clients', {
            clients: state => state.list
        })
    },
    data() {
        return {
            // optionsActive: false,
            // editButtonClicked: false,
            // deleteButtonClicked: false,
            isOpenRef: false,
            selectedClientId: null,
        }
    },
    mounted() {
        this.$store.dispatch('clients/updateClientList')
        .then(() => {
            console.log(this.$store.getters['login/getTrainer']);
            this.$store.dispatch('trainerExercises/updateExercises')
        })
    },
    methods: {
        goToCreateClientScreen() {
            // this.navigation.navigate("CreateClient")
            this.$router.push({
                name: 'CreateClient',
                params: {
                    backButtonText: 'Clients'
                }
            })
        },
        goToClientWorkoutsListScreen(clientId, clientName) {
            // console.log("client workouts list hit")
            // if(this.editButtonClicked || this.deleteButtonClicked)  {
            //     return
            // }
            // console.log("testing")

            // this.navigation.navigate("ClientWorkouts", {
            //     clientId: clientId,
            //     clientName: clientName
            // })
            this.$router.push({
                // path: `clients/${clientId}`,
                name: 'ClientWorkouts',
                params: {
                    clientId: clientId,
                    clientName: clientName,
                    backButtonText: 'Clients'
                }
            })
        },
        goToEditClientScreen(clientId, clientFirstName, clientLastName, clientStartingWeight, clientEmail, clientPhoneNumber) {
            console.log(clientId)
            console.log(clientFirstName)
            console.log(clientLastName)
            console.log(clientStartingWeight)
            console.log(clientEmail)
            console.log(clientPhoneNumber)

            // this.editButtonClicked = true;
            this.$refs.clientList.$el.closeSlidingItems();
            this.$router.push({
                name: 'EditClient',
                params: {
                    clientId: clientId,
                    first_name: clientFirstName,
                    last_name: clientLastName,
                    starting_weight: clientStartingWeight,
                    email: clientEmail,
                    phone_number: clientPhoneNumber,
                    backButtonText: 'Clients'
                }
            })

            // this.editButtonClicked = false;
        },
        openDeleteClientPopover(clientId) {
            this.selectedClientId = clientId;
            this.isOpenRef = ref(true);
            this.$refs.clientList.$el.closeSlidingItems();
            // this.$store.dispatch('clientWorkouts/deleteClientWorkoutExerciseLog', logData)
        },
        closeDeleteClientPopover() {
            console.log("Open ref is now false")
            this.isOpenRef = ref(false);
        },
        confirmDelete() {
            // this.deleteButtonClicked = true;
            this.$refs.clientList.$el.closeSlidingItems();

            const clientData = {
                clientId: this.selectedClientId,
            }

            this.$store.dispatch('clients/deleteClient', clientData)
            .then(() => {
                this.isOpenRef = ref(false);
            })
        }
    }
}
</script>

<style scoped>
    ion-fab-button {
        --background: #7D80DA;
    }

    ion-buttons {
        width: 15%;
    }

    ion-list {
        margin-bottom: 20%;
    }

    .options-button {
        width: 75%;
        height: auto;
    }

    .add-client-icon {
        /* color: red; */
        width: 50%;
        height: auto;
    }
</style>