<template>
  <header >
    <div class="Encabezado">
      <h1>Sistema de Gestión de Inventario</h1>
    </div>
  </header>
  <router-view />
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mensaje: 'Bienvenido al sistema de inventario',
      datos: [],
      menuVisible: false, // Nueva propiedad para controlar la visibilidad del menú
    };
  },
  methods: {
    toggleMenu() {
      // Alternar la visibilidad del menú
      this.menuVisible = !this.menuVisible;
    },
    async cargarDatos() {
      try {
        const respuesta = await axios.get('http://localhost:3000/api/mobiliario');
        this.datos = respuesta.data;
      } catch (error) {
        console.error('Hubo un error al cargar los datos:', error);
      }
    },
  },
};
</script>

<style>
    body{
      background-image: url('../public/img/fondo1.jpg');
    }
</style>
