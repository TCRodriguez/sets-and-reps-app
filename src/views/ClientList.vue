/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-unused-components */
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Clients</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <!-- <ion-grid> -->
                <!-- <ion-row> -->
                    <!-- <ion-col> -->
                        <!-- Do a v-for here? -->
                        <ion-list>
                            <ion-item 
                                v-for="client in clients" 
                                :key="client.id"
                                button @click="goToClientWorkoutsListScreen(client.id, client.name)"
                            >
                                {{ client.first_name }} {{ client.last_name }}
                            </ion-item>
                        </ion-list>
                    <!-- </ion-col> -->
                <!-- </ion-row> -->
            <!-- </ion-grid> -->
        </ion-content>

        <ion-grid>
            <ion-row></ion-row>
        </ion-grid>
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
    IonList
} from '@ionic/vue';

import { mapState } from 'vuex';


export default {
    components: { 
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        // IonGrid,
        // IonRow,
        // IonCol,
        IonList
    },
    computed: {
        ...mapState('clients', {
            clients: state => state.list
        })
    },
    mounted() {
        this.$store.dispatch('clients/updateClientList')
    },
    methods: {
        goToCreateClientScreen() {
            this.navigation.navigate("CreateClient")
        },
        goToClientWorkoutsListScreen(clientId, clientName) {
            // console.log("testing")

            // this.navigation.navigate("ClientWorkouts", {
            //     clientId: clientId,
            //     clientName: clientName
            // })
            this.$router.push('')
        },
    }
}
</script>

<style>

</style>