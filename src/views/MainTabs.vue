<template>
    <ion-page>
        <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
            <ion-tab-button tab="tab1" href="/tabs/clients">
            <!-- <ion-icon :icon="triangle" /> -->
            <ion-icon :icon="personOutline" />
            <ion-label>Clients</ion-label>
            </ion-tab-button>
            
            <ion-tab-button tab="tab2" href="/tabs/exercises">
            <ion-icon :icon="barbellOutline" />
            <!-- <dumbbell-icon></dumbbell-icon> -->
            <ion-label>Exercises</ion-label>
            </ion-tab-button>
            
            <ion-tab-button tab="tab3" href="/tabs/settings">
            <ion-icon :icon="cogOutline" />
            <ion-label>Setings</ion-label>
            </ion-tab-button>
        </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, personOutline, barbellOutline, cogOutline } from 'ionicons/icons';
import DumbbellIcon from '@/components/DumbbellIcon.vue';


export default {
    components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
    setup() {
        return {
        ellipse, 
        square, 
        triangle,
        personOutline,
        barbellOutline,
        cogOutline,
        // DumbbellIcon
        }
    }
}
</script>

<style>
    svg {
        width: 10%;
        height: auto;
    }
</style>