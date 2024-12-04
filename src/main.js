// src/main.jsS

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Importar el router
import './assets/css/sesion.css';
import './assets/css/panel-control.css';
import './assets/css/perfil.css';
import './assets/css/mobiliario.css';

const app = createApp(App);
app.use(router); // Usar el router en la aplicación
app.mount('#app');
