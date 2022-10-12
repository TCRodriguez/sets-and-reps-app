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
              <ion-item @click="confirmLogout()">Logout</ion-item>
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
    IonAlert,
    useIonRouter,
    alertController,
} from '@ionic/vue';

import { mapState } from 'vuex';

import { ref } from 'vue';

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
        IonPopover,
        IonText,
        IonAlert,
        // OptionsButton
    },
    computed: {
        ...mapState('clients', {
            clients: state => state.list
        })
    },
    setup() {
        const ionRouter = useIonRouter();

        const handlerMessage = ref('');
        const confirmLogout = async () => {
            const alert = await alertController.create({
                header: 'Confirm',
                message: 'Are you sure you want to logout?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            handlerMessage.value = 'Logout canceled';
                        },
                    },
                    {
                        text: 'Yes',
                        role: 'confirm',
                        handler: () => {
                            handlerMessage.value = 'Logout confirmed';
                            ionRouter.navigate('/', 'back', 'push');
                        },
                    },
                ],
            });

            await alert.present();

        }

        return { handlerMessage, confirmLogout }
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

    ion-list {
        margin-bottom: 20%;
    }

</style>