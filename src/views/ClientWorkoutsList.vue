<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{clientName}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <!-- <ion-grid> -->
                <!-- <ion-row> -->
                    <!-- <ion-col> -->
                        <!-- Do a v-for here? -->
                        <ion-list>
                            <ion-item 
                                v-for="clientWorkout in clientWorkouts" 
                                :key="clientWorkout.id"
                                button @click="goToClientWorkout(client.id, client.name)"
                            >
                                {{clientWorkout.date.substring(0, 10)}}
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
        IonList
    },
    data() {
        return {
            // clientName: null,
        }
    },
    computed: {
        ...mapState('clientWorkouts', {
            clientWorkouts: state => state.workouts
        })
    },
    mounted() {
        this.$store.dispatch('clientWorkouts/updateWorkouts', this.clientId)
        console.log(this.clientName)
        // this.clientName = this.$route.params.clientName
    },
}
</script>

<style>

</style>