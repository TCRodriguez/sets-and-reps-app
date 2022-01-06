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
        <ion-content>
            <ion-grid>
                <ion-row class="ion-justify-content-center" style="height: 100%">
                    <ion-row class="ion-align-items-center">
                        <ion-col>
                            <div class="ion-text-center ion-align-self-end">
                                <h1 class="title">Sets</h1>
                                <h1 class="title" style="margin-top: 0; margin-bottom: 0;">&</h1>
                                <h1 class="title">Reps</h1>
                            </div>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <div class="container">
                                <ion-item>
                                    <ion-input placeholder="Email"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input placeholder="Password"></ion-input>
                                </ion-item>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-row>
                
            </ion-grid>



        </ion-content>
</template>

<script>
// import { mapState } from 'vuex'

export default {
    computed: {
        // ...mapState('login', {
        //     errorMessage: state => state.messages
        // })
    },
    data() {
        return {
            email: 'tr@example.com',
            password: 'password122',
            trainerId: null,
        }
    },
    props: {
        navigation: {
            type: Object
        }
    },
    methods: {
        login() {
            // const payload = {
            //     email: this.email,
            //     password: this.password
            // }
            // this.$store.dispatch('login/login', payload)
            // .then(() => {
            //     this.navigation.navigate('IOSBottomTabs')
            // })
            // .catch(error => {
            //     this.errorMessage = error.response.data.errors.email[0];
            //     // console.log(error.response.data.errors.email[0])
            //     // console.log(this.errorMessage);
            // })

        },
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

    .button {
        text-align: center;
        font-size: 25;
        width: 55%;
        margin-bottom: 5;
        border-color: #FCFCFC;
        border-width: 1;
        border-radius: 5;
        color: #FCFCFC;
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

    .error-message {
        /* background-color: red; */
        padding: 10;
        margin-bottom: 10;
    }
</style>