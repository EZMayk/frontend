<template>
    <div>
      <header>
        <div class="Encabezado">
          <button @click="toggleMenu">☰</button>
          <div v-show="menuVisible" id="menu-desplegable" class="menu-desplegable">
            <ul>
              <li><a href="inicioSesion.html">Cerrar Sesión</a></li>
            </ul>
          </div>
        </div>
        <nav class="Menu">
          <a href="panelControl.html">Inicio</a>
          <a href="mobiliario.html">Agregar-Muebles</a>
          <a href="reportes.html">Reportes</a>
          <a href="perfil.html">Perfil</a>
        </nav>
      </header>
  
      <main>
        <div v-if="perfil" id="perfil-container">
          <div>
            <p><strong>Nombres:</strong> {{ perfil.nombres[0] }}</p>
            <p><strong>Apellidos:</strong> {{ perfil.apellidos[0] }}</p>
            <p><strong>Teléfono:</strong> {{ perfil.telefono[0] }}</p>
            <p><strong>Dirección:</strong> {{ perfil.direccion[0] }}</p>
            <p><strong>Correo:</strong> {{ perfil.correo[0] }}</p>
            <p><strong>Contraseña:</strong> {{ '*****' }} 
              <button @click="mostrarFormularioContrasena">Editar Contraseña</button>
            </p>
          </div>
        </div>
  
        <!-- Formulario para editar contraseña -->
        <div v-if="editandoContrasena" id="formEditarContrasena">
          <h2>Editar Contraseña</h2>
          <form @submit.prevent="guardarContrasena">
            <label for="contraseñaActual">Contraseña Actual:</label>
            <input v-model="formData.contrasenaActual" type="password" id="contraseñaActual" name="contraseñaActual" required />
  
            <label for="nuevaContrasena">Nueva Contraseña:</label>
            <input v-model="formData.nuevaContrasena" type="password" id="nuevaContrasena" name="nuevaContrasena" required />
  
            <label for="confirmarContrasena">Confirmar Contraseña:</label>
            <input v-model="formData.confirmarContrasena" type="password" id="confirmarContrasena" name="confirmarContrasena" required />
  
            <button type="submit">Guardar Cambios</button>
            <button type="button" @click="cancelarEdicionContrasena">Cancelar</button>
          </form>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuVisible: false, // Estado del menú desplegable
        perfil: null, // Datos del perfil de usuario
        editandoContrasena: false, // Indica si el usuario está editando la contraseña
        formData: {
          contrasenaActual: '',
          nuevaContrasena: '',
          confirmarContrasena: ''
        }
      };
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      mostrarFormularioContrasena() {
        this.editandoContrasena = true;
      },
      cancelarEdicionContrasena() {
        this.editandoContrasena = false;
        this.formData = {
          contrasenaActual: '',
          nuevaContrasena: '',
          confirmarContrasena: ''
        };
      },
      async cargarPerfil() {
        try {
          const response = await fetch('/perfil');
          if (response.ok) {
            this.perfil = await response.json();
          } else {
            alert('Error al cargar el perfil.');
          }
        } catch (err) {
          console.error('Error al cargar el perfil:', err);
        }
      },
      async guardarContrasena() {
        if (this.formData.nuevaContrasena !== this.formData.confirmarContrasena) {
          alert('Las contraseñas no coinciden.');
          return;
        }
  
        const datosContrasena = {
          contrasenaActual: this.formData.contrasenaActual,
          nuevaContrasena: this.formData.nuevaContrasena
        };
  
        try {
          const response = await fetch('/actualizarContrasena', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosContrasena)
          });
  
          if (response.ok) {
            alert('Contraseña actualizada con éxito.');
            this.cancelarEdicionContrasena();
            this.cargarPerfil();
          } else {
            alert('Error al actualizar la contraseña. Verifique su contraseña actual.');
          }
        } catch (err) {
          console.error('Error al actualizar la contraseña:', err);
        }
      }
    },
    mounted() {
      this.cargarPerfil();
    }
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados para el componente */
  </style>
  