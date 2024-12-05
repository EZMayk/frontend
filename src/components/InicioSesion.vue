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
          <input v-model="correo" type="email" id="correo" placeholder="Ingrese su correo" required />
        </div>
        <div class="input-group">
          <label for="contrasena">Contraseña:</label>
          <input v-model="contrasena" type="password" id="contrasena"  placeholder="Ingrese su contraseña" required />
          
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

header {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centra el contenido horizontalmente */
    background-color: #645252; /* Color de fondo del encabezado */
    padding: 10px 0; /* Espaciado superior e inferior */
    color: white; /* Color del texto del encabezado */
  }

.Encabezado {
    background-color: #645252;
    text-align: center;
    padding: 18px;
    color: white;
    width: 100%;
    justify-content: center;
    align-items: center
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
