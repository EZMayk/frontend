<template>
  <div>
    <main>
      <section class="registro-usuario">
        <h2>Registro de Usuario</h2>
        <form @submit.prevent="registrarse">
          <!-- Grupo para el nombre -->
          <div class="input-group">
            <label for="nombres">Nombres:</label>
            <input
              type="text"
              id="nombres"
              v-model="usuario.nombres"
              placeholder="Ingrese sus nombres"
              required
            />
          </div>

          <!-- Grupo para el apellido -->
          <div class="input-group">
            <label for="apellidos">Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              v-model="usuario.apellidos"
              placeholder="Ingrese sus apellidos"
              required
            />
          </div>

          <!-- Grupo para el teléfono -->
          <div class="input-group">
            <label for="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              v-model="usuario.telefono"
              placeholder="Ingrese su teléfono"
              required
            />
          </div>

          <!-- Grupo para la dirección -->
          <div class="input-group">
            <label for="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              v-model="usuario.direccion"
              placeholder="Ingrese su dirección"
              required
            />
          </div>

          <!-- Grupo para el correo -->
          <div class="input-group">
            <label for="correo">Correo:</label>
            <input
              type="email"
              id="correo"
              v-model="usuario.correo"
              placeholder="Ingrese su correo"
              required
            />
          </div>

          <!-- Grupo para la contraseña -->
          <div class="input-group">
            <label for="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              v-model="usuario.contrasena"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <!-- Botón para enviar -->
          <button type="submit">REGISTRARSE</button>
        </form>

        <!-- Enlace para iniciar sesión -->
        <p>
          ¿Ya tiene una cuenta?
          <router-link to="/login">Inicie sesión aquí</router-link>
        </p>
      </section>
    </main>

    <footer>
      <p>&copy; 2024 Gestión de Inventario</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "RegistroUsuario",
  data() {
    return {
      usuario: {
        nombres: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        correo: "",
        contrasena: "",
      },
      error: null, // Para manejar errores en la interfaz
    };
  },
  methods: {
    validarDatos() {
      // Validaciones básicas antes de enviar los datos al servidor
      if (!this.usuario.nombres.trim()) return "El campo 'Nombres' es obligatorio.";
      if (!this.usuario.apellidos.trim()) return "El campo 'Apellidos' es obligatorio.";
      if (!this.usuario.telefono.trim()) return "El campo 'Teléfono' es obligatorio.";
      if (!this.usuario.direccion.trim()) return "El campo 'Dirección' es obligatorio.";
      if (!this.usuario.correo.trim()) return "El campo 'Correo' es obligatorio.";
      if (!this.usuario.contrasena.trim()) return "El campo 'Contraseña' es obligatorio.";
      if (this.usuario.contrasena.length < 6)
        return "La contraseña debe tener al menos 6 caracteres.";
      return null; // Sin errores
    },
    async registrarse() {
      try {
        // Validar datos antes de enviarlos
        const mensajeError = this.validarDatos();
        if (mensajeError) {
          alert(mensajeError);
          return;
        }

        const response = await fetch("http://localhost:3000/api/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.usuario),
        });

        if (response.ok) {
          alert("Usuario registrado con éxito. Redirigiendo...");
          this.$router.push("/login");
        } else {
          // Manejar errores específicos del backend
          const errorData = await response.json();
          alert(`Error: ${errorData.message || "Error al registrar el usuario."}`);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("No se pudo conectar con el servidor. Asegúrate de que está en ejecución.");
      }
    },
  },
};
</script>


<style scoped>
.Encabezado {
  text-align: center;
  background-color: #f4f4f4;
  padding: 1rem;
}

main {
  max-width: 600px;
  margin: 2rem auto;
}

.registro-usuario {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

footer {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
}
</style>
