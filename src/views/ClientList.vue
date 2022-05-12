/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-unused-components */
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Clients</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="optionsActive = !optionsActive">
                        <options-button class="options-button"></options-button>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list>
                <ion-item 
                    v-for="client in clients" 
                    :key="client.id"
                    @click="goToClientWorkoutsListScreen(client.id, client.name)"
                >
                    <div>
                        <ion-text>
                            {{ client.first_name }} {{ client.last_name }}
                        </ion-text>
                    </div>
                    <div v-show="optionsActive">
                        <ion-button size="small" @click="goToEditWorkoutScreen(clientWorkout.id, clientWorkout.date.substring(0, 10))">Edit</ion-button>
                        <ion-button size="small" color="danger">Delete</ion-button>
                    </div>
                </ion-item>
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
    IonFab,
    IonFabButton
} from '@ionic/vue';

import { mapState } from 'vuex';

import AddClientIcon from '@/components/AddClientIcon.vue'

import OptionsButton from '@/components/OptionsButton.vue'


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
        AddClientIcon,
        IonFab,
        IonFabButton,
        OptionsButton
    },
    computed: {
        ...mapState('clients', {
            clients: state => state.list
        })
    },
    data() {
        return {
            optionsActive: false,
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