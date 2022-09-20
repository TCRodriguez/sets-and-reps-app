<template>
        <!-- <KeyboardAvoidingView class="container" behavior="padding">
            <text class="fitty-title text-color-primary">Sets</text>
            <text class="fitty-title text-color-primary">&</text>
            <text class="fitty-title text-color-primary" style="margin-bottom: 50">Reps</text>


            <View class="error-message"
                :style="[errorMessage != null ? {'backgroundColor': 'red' } : {'backgroundColor': '#080708' }]"
            >
                <text class="text-color-primary">{{errorMessage}}</text>
            </View>
            <text-input class="login-field" placeholder="email" placeholderTextColor="#FCFCFC" v-model="email"/>
            <text-input class="login-field" placeholder="password" placeholderTextColor="#FCFCFC" v-model="password"/>

            <text class="button" @press="login()">Login</text>
        </KeyboardAvoidingView> -->
        <ion-page>
            <ion-content>
                <ion-grid>
                    <!-- <ion-row class="ion-justify-content-center" style="height: 100%"> -->
                        <ion-row class="ion-align-items-center" style="padding-top: 25%;">
                            <ion-col>
                                <div class="ion-text-center ion-align-self-end">
                                    <h1 class="title">Sets</h1>
                                    <h1 class="title" style="margin-top: 0; margin-bottom: 0;">&</h1>
                                    <h1 class="title">Reps</h1>
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row class="ion-justify-content-center">
                            <ion-col>
                                <div>
                                    <ion-toast
                                        :is-open="isOpenRef"
                                        :message="errorMessage"
                                        :duration="2000"                   
                                    ></ion-toast>
                                </div>
                                <div class="container">
                                    <!-- <ion-item>
                                        <ion-input placeholder="Email" v-model="email"></ion-input>
                                    </ion-item>
                                    <ion-item>
                                        <ion-input placeholder="Password" v-model="password"></ion-input>
                                    </ion-item> -->
                                    <Form @submit="login">
                                        <Field v-model="email" name="email" v-slot="{ field }" rules="required|email">
                                        <ion-input v-bind="field" type="email" placeholder="Email" clear-input></ion-input> 
                                        </Field>
                                        <ErrorMessage name="email"></ErrorMessage>
                                        <Field v-model="password" name="password" v-slot="{ field }" rules="required">
                                        <ion-input v-bind="field" type="password" placeholder="Password" clear-input></ion-input> 
                                        </Field>
                                        <ErrorMessage name="password"></ErrorMessage>
                                        <ion-button type="Submit" expand="block">
                                            Login
                                        </ion-button>
                                    </Form>
                                    <ion-button @click="goToCreateTrainerScreen()" id="sign-up-btn" fill="outline" expand="block">
                                        Sign up
                                    </ion-button>
                                </div>
                            </ion-col>
                        </ion-row>
                        <!-- <ion-row class="ion-justify-content-center">
                            <ion-col size="3">
                                <div>
                                    <ion-button type="Submit">
                                        Login
                                    </ion-button>
                                </div>
                            </ion-col>
                        </ion-row> -->
                    <!-- </ion-row> -->
                    
                </ion-grid>
            </ion-content>
        </ion-page>
</template>

<script lang="ts">
import { 
    IonGrid, 
    IonRow, 
    IonCol, 
    // IonItem, 
    IonToast,
    IonInput,
    IonButton,
    IonContent,
    IonPage,
} from '@ionic/vue'

import { mapState } from 'vuex'

export default {
    components: {
        IonGrid,
        IonRow,
        IonCol,
        // IonItem,
        IonToast,
        IonInput,
        IonButton,
        IonContent,
        IonPage,
    },
    computed: {
        ...mapState('login', {
            errorMessage: state => state.messages
        })
    },
    data() {
        return {
            email: 'tr@example.com',
            password: 'password123',
            trainerId: null,
            isOpenRef: false,
        }
    },
    props: {
        navigation: {
            type: Object
        }
    },
    methods: {
        login() {
            const payload = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('login/login', payload)
            .then(() => {
                // const ionRouter = useIonRouter();
                this.$router.push('/tabs/', 'forward');
            })
            .catch(error => {
                console.log(error)
                if(error.response.data !== undefined){
                    this.errorMessage = error.response.data.errors.email[0];
                }
                this.isOpenRef = true;
                setTimeout(() => {
                    this.isOpenRef = false;
                }, 2000);
                // console.log(error.response.data.errors.email[0])
                // console.log(this.errorMessage);
            })
        },
        goToCreateTrainerScreen() {
            this.$router.push({
                name: 'CreateTrainer',
                params: {
                    backButtonText: 'Login'
                }
            })
        }
    }
}
</script>

<style scoped>
    ion-grid {
        height: 100%; 
    }

    ::placeholder {
        color: #FCFCFC;
    }
    .container {
        /* display: flex;
        flex-direction: row; */
        /* align-items: center;
        justify-content: center; */
        /* height: 100%; */
        background-color: #080708;
        margin: 0 2em;
    }

    .title {
        font-size: 4em;
        font-family: 'ArchivoBlack-Regular';
        /* font-weight: bold; */
        margin: 0;
    }

    .login-field {
        height: 5%;
        width: 55%;
        border-color: #FCFCFC;
        border-width: 3;
        border-radius: 5;
        padding-left: 10;
        margin-bottom: 10;
        color: #FCFCFC;
    }

    .text-color-primary {
        color: white;
    }
</style>