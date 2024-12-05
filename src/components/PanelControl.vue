<template>
  <div>
    <!-- Encabezado -->
    <header>
      <div class="Encabezado">
        <!-- Título centrado -->
        <h1 class="titulo">Sistema de Gestión de Inventario</h1>

        <!-- Botón de Cerrar Sesión en la esquina derecha -->
        <button id="cerrar-sesion-boton" @click="cerrarSesion">Cerrar Sesión</button>
      </div>

      <nav class="Menu">
        <a href="/panel-control">Inicio</a>
        <a href="/mobiliarios">Agregar-Muebles</a>
        <a href="/reportes">Reportes</a>
        <a href="/perfil-usuario">Perfil</a>
      </nav>
    </header>

    <!-- Contenido Principal -->
    <main>
      <h2>Lista de Muebles Registrados</h2>
      <table id="tablaMuebles">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mueble in muebles" :key="mueble.id">
            <td>{{ mueble.id }}</td>
            <td>{{ mueble.nombre }}</td>
            <td>{{ mueble.tipo }}</td>
            <td>{{ mueble.ubicacion }}</td>
            <td>{{ mueble.estado }}</td>
            <td>
              <button @click="mostrarFormularioEdicion(mueble.id)">Editar</button>
              <button @click="eliminarMueble(mueble.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Formulario para editar mueble -->
      <div v-if="mostrarFormulario" id="editarMuebleFormulario">
        <h3>Editar Mueble</h3>
        <form @submit.prevent="guardarCambios">
          <label for="editarId">ID:</label>
          <input type="text" id="editarId" v-model="muebleEditar.id" disabled />

          <label for="editarNombre">Nombre:</label>
          <input type="text" id="editarNombre" v-model="muebleEditar.nombre" required />

          <label for="editarTipo">Tipo:</label>
          <input type="text" id="editarTipo" v-model="muebleEditar.tipo" required />

          <label for="editarUbicacion">Ubicación:</label>
          <input type="text" id="editarUbicacion" v-model="muebleEditar.ubicacion" required />

          <label for="editarEstado">Estado:</label>
          <select v-model="muebleEditar.estado" required>
            <option value="Nuevo">Nuevo</option>
            <option value="Dañado">Dañado</option>
            <option value="En reparación">En reparación</option>
          </select>

          <button type="submit">Guardar Cambios</button>
          <button type="button" @click="cancelarEdicion">Cancelar</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      muebles: [], // Lista de muebles
      mostrarFormulario: false, // Para mostrar/ocultar el formulario de edición
      muebleEditar: { id: '', nombre: '', tipo: '', ubicacion: '', estado: '' }, // Datos del mueble a editar
    };
  },
  mounted() {
    this.cargarInventario();
  },
  methods: {
    // Función para cargar los datos del inventario desde el archivo JSON
    async cargarInventario() {
      try {
        const response = await fetch('/datos/inventario.json');
        if (!response.ok) {
          throw new Error('Error al cargar los datos del inventario.');
        }
        const datosInventario = await response.json();
        this.muebles = datosInventario.mobiliario;
      } catch (error) {
        console.error('Error:', error);
      }
    },

    // Función para mostrar el formulario de edición
    mostrarFormularioEdicion(id) {
      const mueble = this.muebles.find(m => m.id === id);
      if (mueble) {
        this.muebleEditar = { ...mueble }; // Copiar los datos del mueble al formulario de edición
        this.mostrarFormulario = true; // Mostrar el formulario
      }
    },

    // Función para cancelar la edición
    cancelarEdicion() {
      this.mostrarFormulario = false; // Ocultar el formulario
    },

    // Función para guardar los cambios del mueble
    async guardarCambios() {
      try {
        const response = await fetch(`/api/inventario/${this.muebleEditar.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.muebleEditar),
        });

        if (!response.ok) {
          throw new Error('Error al guardar los cambios del mueble.');
        }

        alert('Mueble actualizado con éxito.');
        this.mostrarFormulario = false;
        this.cargarInventario(); // Recargar la tabla
      } catch (error) {
        console.error('Error:', error);
      }
    },

    // Función para eliminar un mueble
    async eliminarMueble(id) {
      const confirmacion = confirm(`¿Estás seguro de eliminar el mueble con ID: ${id}?`);
      if (confirmacion) {
        try {
          const response = await fetch(`/api/inventario/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Error al eliminar el mueble.');
          }

          alert('Mueble eliminado con éxito.');
          this.cargarInventario(); // Recargar la tabla
        } catch (error) {
          console.error('Error:', error);
        }
      }
    },

    // Función para cerrar sesión
    cerrarSesion() {
      // Redirigir a la página de login (o cerrar sesión según el caso)
      window.location.href = '/login';
    },
  },
};
</script>

<style scoped>
/* Estilos para el encabezado */
.Encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;
}

.titulo {
  font-size: 24px;
  text-align: center;
  width: 100%;
}

#cerrar-sesion-boton {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
}

#cerrar-sesion-boton:hover {
  background-color: #d32f2f;
}

.Menu {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  background-color: #f4f4f4;
}

.Menu a {
  text-decoration: none;
  color: #333;
  padding: 10px 20px;
  margin: 0 10px;
}

.Menu a:hover {
  background-color: #ddd;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>
