<template>
  <div>
    <h1>Planillas</h1>
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
    <div class="modal-content ancho-ventana30">
      <div class="modal-header">
        <span class="close" @click="cerrarmodal">&times;</span>
        <h2>Formulario</h2>
      </div>
      <div class="modal-body">
        <div class="group-01">
          <label for="" class="label">Periodo</label>
          <input type="text" class="form-control" id="" placeholder="Ingresar Periodo">
        </div>
        <div class="group-01">
          <label for="" class="label">Descripción de Planilla</label>
          <input type="email" placeholder="Correo Electronico">
        </div>
      </div>
      <div class="modal-footer">
        <button id="submitBtn" class="btnj btnj-primary">Enviar</button>
        <button class="btnj btnj-primary" @click="cerrarmodal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>


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