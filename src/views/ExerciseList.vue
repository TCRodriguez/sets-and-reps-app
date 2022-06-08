<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Exercises</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list ref="exerciseList">
                <ion-item-sliding
                    v-for="exercise in exercises"
                    :key="exercise.id"
                >
                    <ion-item-options side="start">
                        <ion-item-option color="danger" @click="openDeleteExercisePopover(exercise.id)">Delete</ion-item-option>
                    </ion-item-options>

                    <ion-item>
                        <ion-label>{{exercise.exercise_name}}</ion-label>
                    </ion-item>

                    <ion-item-options side="end">
                        <ion-item-option @click="goToEditExerciseScreen(exercise.exercise_name, exercise.id)">Edit</ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>


            <ion-popover :is-open="isOpenRef" reference="trigger" side="right" showBackdrop="true" @didDismiss="closeDeleteExercisePopover()">
                <ion-content>
                    <ion-text>Are you sure you want to delete this log?</ion-text>
                    <ion-item :button="true" :detail="false" @click="confirmDelete()">
                        <ion-label>Yes</ion-label>
                    </ion-item>
                    <ion-item :button="true" :detail="false" @click="closeDeleteExercisePopover()">
                        <ion-label>No</ion-label>
                    </ion-item>
                </ion-content>
            </ion-popover>


            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="goToCreateExerciseScreen()">
                    <!-- <ion-icon :icon="addOutline"></ion-icon> -->
                    <add-button class="add-button"></add-button>
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
        IonList,
        IonItem,
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
        IonFab,
        // IonIcon,
        IonFabButton,
        IonPopover,
        IonText,
        IonLabel,
        // addOutline
} from '@ionic/vue'
import { mapState } from 'vuex';

import { ref } from 'vue';

// import { e } from 'ionicons/icons';
import AddButton from '@/components/AddButton.vue';
export default {
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
        IonFab,
        // IonIcon,
        IonFabButton,
        // addOutline
        AddButton,
        IonPopover,
        IonText,
        IonLabel,
    },
    computed: {
        ...mapState('trainerExercises', {
            exercises: state => state.exercises
        })
    },
    data() {
        return {
            isOpenRef: false,
            selectedExerciseId: null,
        }
    },
    mounted() {
        // alert("Did this mount happen?")
        this.$store.dispatch('trainerExercises/updateExercises')
    },
    methods: {
        goToCreateExerciseScreen() {
            this.$router.push({
                name: 'CreateExercise',
                params: {
                    backButtonText: 'Exercises'
                }
            })
        },
        goToEditExerciseScreen(exerciseName, exerciseId) {
            this.$refs.exerciseList.$el.closeSlidingItems();
            this.$router.push({
                name: 'EditExercise',
                params: {
                    exerciseName: exerciseName,
                    exerciseId: exerciseId,
                    backButtonText: 'Exercises'
                }
            })
        },
        openDeleteExercisePopover(exerciseId) {
            this.selectedExerciseId = exerciseId;
            this.isOpenRef = ref(true);
            this.$refs.exerciseList.$el.closeSlidingItems();
        },
        closeDeleteExercisePopover() {
            console.log("Open ref is now false")
            this.isOpenRef = ref(false);
        },
        confirmDelete() {
            console.log("Did I happen?")

            this.$store.dispatch('trainerExercises/deleteExercise', this.selectedExerciseId)
            .then(() => {
                this.isOpenRef = ref(false);
            })
        }
    }
}
</script>

<style scoped>
    ion-fab-button {
        --background: #7D80DA;
    }

    svg {
        color: white;
        width: 75%;
        height: auto;
    }
</style>