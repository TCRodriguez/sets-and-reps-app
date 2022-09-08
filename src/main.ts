/* eslint-disable */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/store';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// import { useField, Form, Field, ErrorMessage, defineRule } from 'vee-validate';
import { defineRule, configure, Field, Form, ErrorMessage } from 'vee-validate';
import { required, email, regex, max, min} from '@vee-validate/rules';

import { localize } from '@vee-validate/i18n';

defineRule('required', required);
defineRule('email', email);
defineRule('regex', regex);
defineRule('max', max);
defineRule('min', min);


// configure({
//   generateMessage: context => {
//     return `The field ${context.field} is required.`;
//   },
// })

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: 'This field is required.',
        regex: 'Must be a valid 10-digit phone number.'
      }
    }
  })
})

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);

app
  .component('Field', Field)
  .component('Form', Form)
  .component('ErrorMessage', ErrorMessage);

  
router.isReady().then(() => {
  app.mount('#app');
});