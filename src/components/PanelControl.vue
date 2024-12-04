<template>
    <div>
      <!-- Encabezado -->
      <header>
        <div class="Encabezado">
          <button id="menu-boton" @click="toggleMenu">☰</button>
          <div v-if="menuVisible" class="menu-desplegable">
            <ul>
              <li><a href="/">Cerrar Sesión</a></li>
            </ul>
          </div>
        </div>
        <nav class="Menu">
          <a href="/panel-control">Inicio</a>
          <a href="/mobiliario">Agregar-Muebles</a>
          <a href="/reportes">Reportes</a>
          <a href="/perfil">Perfil</a>
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
        menuVisible: false, // Controla la visibilidad del menú desplegable
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
  
      // Función para alternar la visibilidad del menú
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Agrega los estilos aquí (similares a los que tenías en tu archivo CSS) */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    background-color: #645252;
  }
  
  header {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centra el contenido horizontalmente */
    background-color: #645252; /* Color de fondo del encabezado */
    padding: 10px 0; /* Espaciado superior e inferior */
    color: white; /* Color del texto del encabezado */
  }
  
  .Encabezado {
    display: flex;
    align-items: center; /* Alinea verticalmente el botón y el título */
    width: 100%; /* Asegura que ocupe todo el ancho */
    justify-content: center; /* Centra el título */
  }
  
  #menu-boton {
    position: absolute; /* Posiciona el botón en la esquina izquierda */
    left: 10px; /* Espaciado desde la izquierda */
    top: 10px; /* Espaciado desde la parte superior */
  }
  
  h1 {
    margin: 0; /* Elimina el margen del título */
    text-align: center; /* Asegura que el texto esté centrado */
  }
  
  h2 {
    text-align: center; /* Centra el texto del encabezado h2 */
  }
  
  nav.Menu {
    display: flex;
    justify-content: center; /* Centra los enlaces de navegación */
    margin-top: 10px; /* Espaciado superior para separar del título */
  }
  
  nav.Menu a {
    margin: 0 15px; /* Espaciado entre los enlaces */
    text-decoration: none; /* Elimina el subrayado de los enlaces */
    color: white; /* Color del texto de los enlaces */
  }
  
  /* Otros estilos que ya tenías */
  </style>
  