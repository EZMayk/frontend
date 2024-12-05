<template>
  <div>
    <header>
      <div class="encabezado">
        <button @click="toggleMenu">☰</button>
        <div v-show="menuVisible" class="menu-desplegable">
          <ul>
            <li><a href="inicioSesion.html">Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
      <nav class="menu">
        <a href="/panel-control">Inicio</a>
        <a href="/mobiliarios">Agregar Muebles</a>
        <a href="/reporte">Reportes</a>
        <a href="/perfil-usuario">Perfil</a>
      </nav>
    </header>

    <main>
      <!-- Perfil del usuario -->
      <div v-if="perfil" class="perfil-container">
        <p><strong>Nombres:</strong> {{ perfil.nombres }}</p>
        <p><strong>Apellidos:</strong> {{ perfil.apellidos }}</p>
        <p><strong>Teléfono:</strong> {{ perfil.telefono }}</p>
        <p><strong>Dirección:</strong> {{ perfil.direccion }}</p>
        <p><strong>Correo:</strong> {{ perfil.correo }}</p>
        <p>
          <strong>Contraseña:</strong> ***** 
          <button @click="mostrarFormularioContrasena">Editar Contraseña</button>
          <button @click="mostrarFormularioPerfil">Editar Perfil</button>
        </p>
      </div>

      <!-- Formulario para editar perfil -->
      <div v-if="editandoPerfil" class="formulario-editar-perfil">
        <h2>Editar Perfil</h2>
        <form @submit.prevent="guardarPerfil">
          <label for="nombres">Nombres:</label>
          <input v-model="formData.nombres" type="text" id="nombres" required />

          <label for="apellidos">Apellidos:</label>
          <input v-model="formData.apellidos" type="text" id="apellidos" required />

          <label for="telefono">Teléfono:</label>
          <input v-model="formData.telefono" type="tel" id="telefono" required />

          <label for="direccion">Dirección:</label>
          <input v-model="formData.direccion" type="text" id="direccion" required />

          <label for="correo">Correo:</label>
          <input v-model="formData.correo" type="email" id="correo" required />

          <button type="submit">Guardar Cambios</button>
          <button type="button" @click="cancelarEdicionPerfil">Cancelar</button>
        </form>
      </div>

      <!-- Formulario para editar contraseña -->
      <div v-if="editandoContrasena" class="formulario-editar-contrasena">
        <h2>Editar Contraseña</h2>
        <form @submit.prevent="guardarContrasena">
          <label for="contrasena-actual">Contraseña Actual:</label>
          <input 
            v-model="formData.contrasenaActual" 
            type="password" 
            id="contrasena-actual" 
            required 
          />

          <label for="nueva-contrasena">Nueva Contraseña:</label>
          <input 
            v-model="formData.nuevaContrasena" 
            type="password" 
            id="nueva-contrasena" 
            required 
          />

          <label for="confirmar-contrasena">Confirmar Contraseña:</label>
          <input 
            v-model="formData.confirmarContrasena" 
            type="password" 
            id="confirmar-contrasena" 
            required 
          />

          <button type="submit">Guardar Cambios</button>
          <button type="button" @click="cancelarEdicionContrasena">Cancelar</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "PerfilUsuario",
  data() {
    return {
      menuVisible: false,
      perfil: null, // Información del usuario cargada desde el servidor
      editandoContrasena: false, // Muestra/oculta el formulario de edición de contraseña
      editandoPerfil: false, // Muestra/oculta el formulario de edición de perfil
      formData: {
        contrasenaActual: "",
        nuevaContrasena: "",
        confirmarContrasena: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        correo: "",
      },
    };
  },
  methods: {
    // Alterna la visibilidad del menú desplegable
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },

    // Muestra el formulario para editar la contraseña
    mostrarFormularioContrasena() {
      this.editandoContrasena = true;
    },

    // Muestra el formulario para editar el perfil
    mostrarFormularioPerfil() {
      this.editandoPerfil = true;
      // Cargar los datos actuales en el formulario
      this.formData.nombres = this.perfil.nombres;
      this.formData.apellidos = this.perfil.apellidos;
      this.formData.telefono = this.perfil.telefono;
      this.formData.direccion = this.perfil.direccion;
      this.formData.correo = this.perfil.correo;
    },

    // Oculta el formulario de edición de perfil y limpia los campos
    cancelarEdicionPerfil() {
      this.editandoPerfil = false;
      this.formData = {
        contrasenaActual: "",
        nuevaContrasena: "",
        confirmarContrasena: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        correo: "",
      };
    },

    // Oculta el formulario de edición de contraseña y limpia los campos
    cancelarEdicionContrasena() {
      this.editandoContrasena = false;
      this.formData.contrasenaActual = "";
      this.formData.nuevaContrasena = "";
      this.formData.confirmarContrasena = "";
    },

    // Carga la información del perfil desde el servidor
    async cargarPerfil() {
      try {
        const response = await fetch("/api/perfil");
        if (!response.ok) throw new Error("No se pudo cargar el perfil.");
        this.perfil = await response.json();
      } catch (err) {
        console.error(err);
        alert("Error al cargar el perfil.");
      }
    },

    // Guarda la nueva contraseña del usuario
    async guardarContrasena() {
      if (this.formData.nuevaContrasena !== this.formData.confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      try {
        const response = await fetch("/api/actualizarContrasena", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contrasenaActual: this.formData.contrasenaActual,
            nuevaContrasena: this.formData.nuevaContrasena,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al actualizar la contraseña.");
        }

        alert("Contraseña actualizada con éxito.");
        this.cancelarEdicionContrasena();
        this.cargarPerfil();
      } catch (err) {
        console.error(err);
        alert("Error al actualizar la contraseña. Verifique la información ingresada.");
      }
    },

    // Guarda los cambios en el perfil
    async guardarPerfil() {
      try {
        const response = await fetch("/api/actualizarPerfil", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombres: this.formData.nombres,
            apellidos: this.formData.apellidos,
            telefono: this.formData.telefono,
            direccion: this.formData.direccion,
            correo: this.formData.correo,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al actualizar el perfil.");
        }

        alert("Perfil actualizado con éxito.");
        this.cancelarEdicionPerfil();
        this.cargarPerfil();
      } catch (err) {
        console.error(err);
        alert("Error al actualizar el perfil.");
      }
    },
  },
  mounted() {
    this.cargarPerfil();
  },
};
</script>

<style scoped>
/* Estilos básicos para el componente */
.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f4f4f4;
}
.menu {
  display: flex;
  justify-content: space-around;
  background-color: #ccc;
  padding: 10px;
}
.menu a {
  text-decoration: none;
  color: #333;
}
.menu-desplegable {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
}
.perfil-container {
  padding: 20px;
  background-color: #e9e9e9;
  margin: 20px;
}
.formulario-editar-perfil, .formulario-editar-contrasena {
  padding: 20px;
  background-color: #f9f9f9;
  margin: 20px;
}
</style>
