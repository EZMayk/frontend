<template>
  <div class="login-page">
    <header>
      <div class="Encabezado">
        <h1>Inventario de Mobiliario</h1>
      </div>
    </header>

    <section class="login-usuario">
      <h2>Ingresa al Sistema</h2>
      <form @submit.prevent="iniciarSesion">
        <div class="input-group">
          <label for="correo">Correo:</label>
          <input v-model="correo" type="email" id="correo" required />
        </div>
        <div class="input-group">
          <label for="contrasena">Contraseña:</label>
          <input v-model="contrasena" type="password" id="contrasena" required />
        </div>
        <button type="submit">ACCEDER</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p>¿No tiene cuenta? <router-link to="/registro">Regístrese aquí</router-link></p>
    </section>

    <footer>
      <p>&copy; 2024 Gestión de Inventario</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correo: "",
      contrasena: "",
      usuarios: [], // Lista de usuarios cargados del XML
      error: null,  // Mensaje de error
    };
  },
  methods: {
  async cargarUsuarios() {
    try {
      const response = await fetch("/usuarios.xml");
      if (!response.ok) throw new Error("Error al cargar XML.");

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");

      this.usuarios = Array.from(xmlDoc.querySelectorAll("usuario")).map((usuario) => ({
        nombres: usuario.querySelector("nombres").textContent,
        correo: usuario.querySelector("correo").textContent,
        contrasena: usuario.querySelector("contrasena").textContent,
      }));
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      this.error = "No se pudo cargar la lista de usuarios.";
    }
  },
  iniciarSesion() {
    const usuario = this.usuarios.find(
      (u) => u.correo === this.correo && u.contrasena === this.contrasena
    );

    if (usuario) {
      alert(`Bienvenido, ${usuario.nombres}`);
      this.$router.push("/panel-control");
    } else {
      this.error = "Correo o contraseña incorrectos.";
    }
  },
},

  mounted() {
    // Cargar usuarios al montar el componente
    this.cargarUsuarios();
  },
};
</script>

<style scoped>
/* Estilos como los proporcionados */
.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
