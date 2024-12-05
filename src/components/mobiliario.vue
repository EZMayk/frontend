<template>
  <div>
    <header>
      <div class="Encabezado">
        <h1 class="titulo">Sistema de Gestión de Inventario</h1>
        <button id="menu-boton" @click="toggleMenu">☰</button>
        <div id="menu-desplegable" class="menu-desplegable" v-show="menuVisible">
          <ul>
            <li><router-link to="/login">Cerrar Sesión</router-link></li>
          </ul>
        </div>
      </div>
      <nav class="Menu">
        <router-link to="/panel-control">Inicio</router-link>
        <router-link to="/mobiliarios">Inventario</router-link>
        <router-link to="/reportes">Reportes</router-link>
        <router-link to="/perfil-usuario">Perfil</router-link>
      </nav>
    </header>

    <main>
      <h2>Registrar Mobiliario</h2>
      <form @submit.prevent="agregarMueble">
        <div class="input-group">
          <input type="number" v-model="mueble.id" placeholder="ID del mueble" required />
        </div>
        <div class="input-group">
          <input type="text" v-model="mueble.nombre" placeholder="Nombre del mueble" required />
        </div>
        <div class="input-group">
          <input type="text" v-model="mueble.tipo" placeholder="Tipo de mueble" required />
        </div>
        <div class="input-group">
          <input type="text" v-model="mueble.ubicacion" placeholder="Ubicación" required />
        </div>
        <div class="input-group">
          <select v-model="mueble.estado" required>
            <option value="nuevo">Nuevo</option>
            <option value="danado">Dañado</option>
            <option value="en-reparacion">En reparación</option>
          </select>
        </div>
        <button type="submit">Agregar Mueble</button>
      </form>
    </main>
  </div>
</template>
<script>
export default {
  name: "RegistrarMobiliario",
  data() {
    return {
      menuVisible: false,
      mueble: {
        id: null,
        nombre: "",
        tipo: "",
        ubicacion: "",
        estado: "nuevo",
      },
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    async agregarMueble() {
      try {
        const response = await fetch("/api/inventario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.mueble),
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          this.resetForm();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor.");
      }
    },
    resetForm() {
      this.mueble = {
        id: null,
        nombre: "",
        tipo: "",
        ubicacion: "",
        estado: "nuevo",
      };
    },
  },
};
</script>
