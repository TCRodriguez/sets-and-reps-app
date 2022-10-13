<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Edit Account Info</ion-title>
                <ion-buttons slot="start">
                    <ion-back-button
                        :text="backButtonText"
                    ></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-grid>
                <Form @submit="editTrainer">
                    <Field v-model="first_name" name="first_name" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" placeholder="First Name" type="text" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="first_name"></ErrorMessage>

                    <Field v-model="last_name" name="last_name" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" placeholder="Last Name" type="text" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="last_name"></ErrorMessage>

                    <Field v-model="user_name" name="user_name" v-slot="{ field }" rules="required|min:3|max:12">
                        <ion-input v-bind="field" placeholder="Username" type="text" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="user_name"></ErrorMessage> 
                    
                    <Field v-model="email" name="email" v-slot="{ field }" rules="email">
                        <ion-input v-bind="field" placeholder="Email" type="email" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="email"></ErrorMessage>

                    <!-- <Field v-model="password" name="password" v-slot="{ field }" rules="required|min:8">
                        <ion-input v-bind="field" placeholder="Password" type="text" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="password"></ErrorMessage> -->

                    <ion-button type="submit" expand="block">Submit</ion-button>
                </Form>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    // IonRow,
    // IonCol,
    // IonItem,
    IonInput,
    // IonFab,
    // IonFabButton,
    IonButtons,
    IonBackButton,
    IonButton,
} from '@ionic/vue';

import { mapState } from 'vuex';

// import OptionsButton from '@/components/OptionsButton.vue'


export default {
    props: {
        backButtonText: {type: String, required: true},
    },
    components: { 
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonGrid,
        // IonRow,
        // IonCol,
        // IonItem,
        IonInput,
        // IonFab,
        // IonFabButton,
        IonButtons,
        IonBackButton,
        IonButton,
    },
    data() {
        return {
            // first_name: null,
            // last_name: null,
            // user_name: null,
            // email: null,
            // password: null,
            trainerId: null,
            first_name: null,
            last_name: null,
            user_name: null,
            email: null,
            // password: null,
        }
    },
    mounted() {
        // Resets the "clicked" state of the edit button
        // this.editButtonClicked = false;
        const trainer = this.$store.getters['login/getTrainer'];
        this.trainerId = trainer.id;
        this.first_name = trainer.first_name;
        this.last_name = trainer.last_name;
        this.user_name = trainer.user_name;
        this.email = trainer.email;
        // this.password = trainer.password;


        // this.$store.dispatch('clientWorkouts/updateWorkouts', this.clientId)
    },
    methods: {
        editTrainer() {
            const trainerData = {
                trainerId: this.trainerId,
                first_name: this.first_name,
                last_name: this.last_name,
                user_name: this.user_name,
                email: this.email,
                // password: this.password,
            }

            this.$store.dispatch('login/editTrainer', trainerData)
            .then(() => {
                this.$router.replace({
                    name: 'Settings',
                })
            })
        }
    }
}
</script>

<style scoped>
    ion-input {
        border: 1px solid #fcfcfc50;
        border-radius: 5px;
        --padding-start: 2%;
        margin: 2% 0;
    }

    ion-fab-button {
        --background: #7D80DA;
    }
</style>