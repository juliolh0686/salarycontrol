<template>
  <div class="navbar-central">
  <div>
    <div class="titulo-central">Autorización de Descuentos</div>
    <div class="container-from-search">
      <div>
        <label>DNI:</label>
      </div>
      <div>
        <input class="inputj" type="text" v-model="numDocumento">
      </div>
      <div>
        <button class="btnj btnj-one" @click="searchRegistros(numDocumento)">Buscar</button>
      </div>
      <div>
        <button class="btnj btnj-two" @click="generarAutorizacionPDF()">Generar Reporte PDF</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Cod_Personal</th>
          <th>Apellido paterno</th>
          <th>Apellido Materno</th>
          <th>Nombres</th>
          <th>Num_Documento</th>
          <th>Cod_Reg</th>
          <th>Cargo</th>
          <th>Bruto</th>
          <th>Afecto</th>
          <th>Descuentos</th>
          <th>Liquido</th>
          <th>Aportes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="personal in lista_personal" :key="personal.p_id">
          <td> {{ personal.p_id }} </td>
          <td> {{ personal.p_a_paterno }} </td>
          <td>{{ personal.p_a_materno }}</td>
          <td>{{ personal.p_nombres }}</td>
          <td>{{ personal.p_num_doc }}</td>
          <td>{{ personal.dp_cod_cargo }}</td>
          <td>{{ personal.cargo_car_id }}</td>
          <td>{{ personal.dp_bruto }}</td>
          <td>{{ personal.dp_afecto }}</td>
          <td>{{ personal.dp_desc }}</td>
          <td>{{ personal.dp_liquido }}</td>
          <td>{{ personal.dp_essalud }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style lang="scss" scoped>

.bx {
  font-size: 20px;
  color: white;
}

.container-from-search {
  display: flex;
  align-items: center;
}

</style>

<script setup lang="ts">
  import {ref } from 'vue'
  import type { Ref } from 'vue'
  import searchAutorizaciondesc from '@/services/AutorizacionDesc'
  import AutorizacionPDFService from '@/services/AutorizacionPdfService'
  import type IListapersonal from '@/interfaces/IListapersonal'

  let numDocumento = ref('')
  const lista_personal:Ref<Array<IListapersonal>> = ref([])

  const searchRegistros = async(numDocumento:string) => {

    lista_personal.value = [];

    const response = await searchAutorizaciondesc.searchAutorizaciondesc(numDocumento);

    if (response.status == false) {
      alert(response.message)
    } else {
      lista_personal.value = response.personal
    }

  }

  const generarAutorizacionPDF = async() => {
    const response = await AutorizacionPDFService(numDocumento.value);
  }

</script>