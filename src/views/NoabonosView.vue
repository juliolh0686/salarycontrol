<template>
  <div>
    <h1>No Abonos</h1>
    <form action="">
      <label>DNI:</label>
      <input type="text">
      <button>Buscar</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Nº</th>
          <th>Periodo</th>
          <th>Monto Bruto</th>
          <th>Descuentos</th>
          <th>liquido</th>
          <th>Aportes</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>202307</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>Planilla desl mes de Julio 2023</td>
          <td>Activo</td>
          <td> <button class="btn btn-primary">Editar</button><button class="btn btn-primary">Eliminar</button> </td>
        </tr>
        <tr>
          <td>2</td>
          <td>202307</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>Planilla desl mes de Julio 2023</td>
          <td>Activo</td>
        </tr>
        <tr>
          <td>3</td>
          <td>202307</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>Planilla desl mes de Julio 2023</td>
          <td>Activo</td>
        </tr>
      </tbody>
    </table>
  </div>

  <button id="openModalBtn" @click="Abrirmodal">Abril Modal</button>

  <div id="myModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="cerrarmodal">&times;</span>
        <h2>Formulario</h2>
      </div>
      <div class="modal-body">
        <input type="text" placeholder="Nombre">
        <input type="email" placeholder="Correo Electronico">
        <input type="password" placeholder="Contraseña">
      </div>
      <div class="modal-footer">
        <button id="submitBtn" class="btj">Enviar</button>
        <button class="close" @click="cerrarmodal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

table {
  //table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;
  color: #6c757d;
}

table thead tr {
  height: 30px;
}

table tbody tr {
  height: 30px;
  border-bottom: 1px solid rgb(61, 63, 65);
}

thead {
  background-color: $primaryColor;
  color: #FFF;
}


// FORMULARIO MODAL
.modal {
  //display: none;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease-in-out;
}

.modal.active {
  //display: block;
  opacity: 1;
  pointer-events: auto;
}

.modal-content {
  background-color: white;
  margin: 15% auto;
  padding: 10px;
  border: 1px solid #888;
  width: 40%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.modal-header {
  padding: 10px;
  background-color: #f2f2f2;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 10px;
  background-color: #f2f2f2;
  text-align: right;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.btj {
  
}



</style>

<script setup lang="ts">
  import {ref, onMounted} from 'vue'

  const cerrarmodal = () => {
    const modal = document.getElementById("myModal") as HTMLDivElement;
    modal.classList.remove("active")
  }

  const Abrirmodal = () => {
    const modal = document.getElementById("myModal") as HTMLDivElement;
    modal.classList.add("active")
  }

</script>