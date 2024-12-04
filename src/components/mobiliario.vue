<template>
    <div>
      <header>
        <div class="Encabezado">
          <button @click="toggleMenu">☰</button>
          <div v-show="menuVisible" id="menu-desplegable" class="menu-desplegable">
            <ul>
              <li><a href="/login">Cerrar Sesión</a></li>
            </ul>
          </div>
        </div>
        <nav class="Menu">
          <a href="/PanelControl">Inicio</a>
          <a href="/mobiliario">Inventario</a>
          <a href="/reportes">Reportes</a>
          <a href="/perfil">Perfil</a>
        </nav>
      </header>
  
      <main>
        <h2>Registrar Mobiliario</h2>
        <form @submit.prevent="agregarMueble">
          <input v-model="mueble.id" type="number" placeholder="ID del mueble" required />
          <input v-model="mueble.nombre" type="text" placeholder="Nombre del mueble" required />
          <input v-model="mueble.tipo" type="text" placeholder="Tipo de mueble" required />
          <input v-model="mueble.ubicacion" type="text" placeholder="Ubicación" required />
          <select v-model="mueble.estado" required>
            <option value="nuevo">Nuevo</option>
            <option value="danado">Dañado</option>
            <option value="en-reparacion">En reparación</option>
          </select>
          <button type="submit">Agregar Mueble</button>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuVisible: false, // Estado del menú desplegable
        mueble: {
          id: '',
          nombre: '',
          tipo: '',
          ubicacion: '',
          estado: 'nuevo', // Valor por defecto
        },
      };
    },
    methods: {
      toggleMenu() {
        // Alternar la visibilidad del menú
        this.menuVisible = !this.menuVisible;
      },
      agregarMueble() {
        // Aquí puedes agregar la lógica para manejar la adición de un mueble.
        console.log("Mueble agregado:", this.mueble);
        // Resetear el formulario (opcional)
        this.mueble = {
          id: '',
          nombre: '',
          tipo: '',
          ubicacion: '',
          estado: 'nuevo',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados para el componente */
  </style>
  