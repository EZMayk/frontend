import { createRouter, createWebHistory } from 'vue-router';
import RegistroUsuario from '../components/RegistroUsuario.vue';
import InicioSesion from '../components/InicioSesion.vue';
import PanelControl from '../components/PanelControl.vue';
import mobiliario from '../components/mobiliario.vue';
import perfil from '../components/perfil.vue';

const routes = [
    { path: '/', redirect: '/login' }, // Redirigir al registro
    { path: '/registro', component: RegistroUsuario },
    { path: '/login', component: InicioSesion },
    { path: '/panel-control', component: PanelControl },
    { path: '/mobiliarios', component: mobiliario },
    { path: '/perfil-usuario', component: perfil },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
