<template>
  <router-view />
</template>

<script>
</script>

<style>
    body{
      background-image: url('../public/img/fondo1.jpg');
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

    #menu-boton {
      position: fixed; /* Fija el botón en la esquina izquierda */
      left: 10px; /* Espaciado desde la izquierda */
      top: 10px; /* Espaciado desde la parte superior */
      background-color: #770c0c; /* Color de fondo del botón */
      color: white; /* Color del texto del botón */
      border: none; /* Sin borde */
      padding: 12px 16px; /* Tamaño del botón */
      font-size: 24px; /* Tamaño de la fuente del botón */
      cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
      border-radius: 4px; /* Bordes redondeados */
      transition: background-color 0.3s ease, transform 0.3s ease; /* Transición suave para el color de fondo y transformaciones */
      z-index: 1000; /* Asegura que el botón esté sobre otros elementos */
    }

    #menu-boton:hover {
      background-color: #645252; /* Cambia el color de fondo al pasar el mouse */
      transform: scale(1.1); /* Aumenta el tamaño del botón al pasar el mouse */
    }

    button {
      background-color: #770c0c; /* Color de fondo del botón de eliminar */
      color: white; /* Color del texto del botón */
      border: none; /* Sin borde */
      padding: 8px 12px; /* Espaciado interno del botón */
      border-radius: 4px; /* Bordes redondeados para el botón */
      cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
      font-size: 16px; /* Tamaño de fuente del botón */
      transition: background-color 0.3s ease, transform 0.3s ease; /* Transición suave */
    }

    button:hover {
      background-color: #645252; /* Color de fondo del botón al pasar el mouse */
      transform: scale(1.1); /* Aumenta el tamaño del botón al pasar el mouse */
    }
  
</style>
