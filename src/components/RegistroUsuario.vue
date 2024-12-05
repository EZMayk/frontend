<template>
  <div>
    <header>
      <div class="Encabezado">
        <h1>Inventario de Mobiliario</h1>
      </div>
    </header>
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
              placeholder="Ingrese su correo con el dominio @live.uleam.edu.ec"
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
      error: null,
    };
  },
  methods: {
  validarDatos() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!this.usuario.nombres.trim()) return "El campo 'Nombres' es obligatorio.";
    if (!this.usuario.apellidos.trim()) return "El campo 'Apellidos' es obligatorio.";
    if (!this.usuario.telefono.trim()) return "El campo 'Teléfono' es obligatorio.";
    if (!this.usuario.direccion.trim()) return "El campo 'Dirección' es obligatorio.";
    if (!emailRegex.test(this.usuario.correo)) return "El correo debe ser del dominio @live.uleam.edu.ec.";
    if (!passwordRegex.test(this.usuario.contrasena))
      return "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un signo especial.";
    return null; // No hay errores
  },
    async registrarse() {
      const mensajeError = this.validarDatos();
      if (mensajeError) {
        alert(mensajeError);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.usuario),
        });

        if (response.ok) {
          alert("Usuario registrado con éxito. Redirigiendo...");
          this.$router.push("/login");
        } else {
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
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
}

.Encabezado {
    background-color: #645252;
    text-align: center;
    padding: 18px;
    color: white;
}

footer {
    background-color: #645252;
    text-align: center;
    padding: 8px;
    color: white;
    font-size: 14px;
    margin-top: auto;
    width: 100%; /* Asegura que ocupe todo el ancho */
}

.Encabezado h1 {
    margin: 0;
    font-size: 2.5em;
}

.login-usuario,
.registro-usuario {
    background-color: white;
    padding: 20px;
    max-width: 400px;
    margin: 30px auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

h2 {
    color: #000000;
    text-align: center;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.input-group input {
    width: 94%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    background-color: #770c0c;
    color: white;
    padding: 10px;
    border: none;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #645252;
}

p {
    text-align: center;
}

p a {
    color: #770c0c;
    text-decoration: none;
}

p a:hover {
    text-decoration: underline;
}

</style>
