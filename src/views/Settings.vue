<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Settings</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list ref="setingsList">
              <ion-item @click="goToEditTrainerScreen()">Edit Account</ion-item>
            </ion-list>
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

        }
    },
    // mounted() {

    // },
    methods: {
      goToEditTrainerScreen() {
        const trainer = this.$store.getters['login/getTrainer'];
        this.$router.push({
          name: 'EditTrainer',
          params: {
            backButtonText: 'Settings',
            trainerId: trainer.id
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

    ion-buttons {
        width: 15%;
    }

    ion-list {
        margin-bottom: 20%;
    }

</style>