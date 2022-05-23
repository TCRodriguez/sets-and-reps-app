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
                        <ion-item-option color="danger" @click="deleteClient(client.id)">Delete</ion-item-option>
                    </ion-item-options>

                    <ion-item @click="goToClientWorkoutsListScreen(client.id, client.name)">
                        <ion-label>{{ client.first_name }} {{ client.last_name }}</ion-label>
                    </ion-item>

                    <ion-item-options side="end">
                        <ion-item-option 
                        @click="goToEditClientScreen(client.id, client.first_name, client.last_name, client.starting_weight, client.email, client.phone_number)"
                        >Edit</ion-item-option>
                    </ion-item-options>

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
    IonFabButton
} from '@ionic/vue';

import { mapState } from 'vuex';

import AddClientIcon from '@/components/AddClientIcon.vue'

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
            editButtonClicked: false,
            deleteButtonClicked: false,
        }
    },
    mounted() {
        this.$store.dispatch('clients/updateClientList')
    },
    methods: {
        goToCreateClientScreen() {
            // this.navigation.navigate("CreateClient")
            this.$router.push({
                name: 'CreateClient'
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
                    clientName: clientName
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
                }
            })

            // this.editButtonClicked = false;
        },
        deleteClient(clientId) {
            // this.deleteButtonClicked = true;
            this.$refs.clientList.$el.closeSlidingItems();

            const clientData = {
                clientId: clientId,
            }

            this.$store.dispatch('clients/deleteClient', clientData)
            .then(() => {
                this.deleteButtonClicked = false;
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