<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Create New Client</ion-title>
                <ion-buttons slot="start">
                    <ion-back-button
                        :text="backButtonText"
                    ></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <ion-grid>
                <!-- <ion-row>
                    <ion-input placeholder="First Name" v-model="first_name"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Last Name" v-model="last_name"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Starting Weight" v-model="starting_weight"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Email" v-model="email"></ion-input>
                </ion-row>
                <ion-row>
                    <ion-input placeholder="Phone Number" v-model="phone_number"></ion-input>
                </ion-row> -->
                <Form @submit="createClient">
                    <Field v-model="first_name" name="first_name" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" placeholder="First Name" type="text" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="first_name"></ErrorMessage>
                    <Field v-model="last_name" name="last_name" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" placeholder="Last Name" type="text" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="last_name"></ErrorMessage>
                    <Field v-model="starting_weight" name="starting_weight" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" placeholder="Starting Weight" type="text" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="starting_weight"></ErrorMessage>
                    <Field v-model="email" name="email" v-slot="{ field }" rules="required|email">
                        <ion-input v-bind="field" placeholder="Email" type="email" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="email"></ErrorMessage>
                    <!-- <Field v-model="phone_number" name="phone_number" v-slot="{ field }" :rules="{ regex:/^[2-9]\d{2}[2-9]\d{2}\d{4}$/ }">
                        <ion-input v-bind="field" placeholder="Phone Number" type="text" clear-input></ion-input>  
                    </Field> -->
                    <Field v-model="phone_number" name="phone_number" v-slot="{ field }" rules="required">
                        <ion-input v-bind="field" placeholder="Phone Number" type="text" clear-input></ion-input>  
                    </Field>
                    <ErrorMessage name="phone_number"></ErrorMessage>
                    <ion-button type="submit" expand="block">Submit</ion-button>
                </Form>
            </ion-grid>

            <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="createClient()">
                    OK
                </ion-fab-button>
            </ion-fab> -->
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
    IonGrid,
    // IonRow,
    // IonCol,
    // IonItem,
    IonInput,
    // IonFab,
    // IonFabButton,
    IonButtons,
    IonBackButton,
    // IonButton,
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
        // IonButton,
    },
    data() {
        return {
            first_name: null,
            last_name: null,
            starting_weight: null,
            email: null,
            phone_number: null,
        }
    },
    mounted() {
        // Resets the "clicked" state of the edit button
        // this.editButtonClicked = false;

        // this.$store.dispatch('clientWorkouts/updateWorkouts', this.clientId)
    },
    methods: {
        createClient() {
            console.log('first')
            const clientData = {
                first_name: this.first_name,
                last_name: this.last_name,
                starting_weight: this.starting_weight,
                email: this.email,
                phone_number: this.phone_number,
            }

            this.$store.dispatch('clients/createClient', clientData)
            .then(() => {
                this.$router.replace({
                    name: 'ClientList'
                })
            })

                    //         fittyApiClient.post('clients', {
                    // first_name: payload.first_name,
                    // last_name: payload.last_name,
                    // starting_weight: payload.starting_weight,
                    // email: payload.email,
                    // phone_number: payload.phone_number
                    // },
                    // { headers: {
                    //     'Authorization': rootState.login.token
                    // },


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