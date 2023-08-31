<template>
  <div>
    <div class="titulo-central">No Abonos - Reportes</div>
    <div class="container-from-search">
      <div>
        <label>Periodo:</label>
      </div>
      <div>
        <select v-model="selectCodperiodo">
          <option value="0" disabled>Seleccione Periodo</option>
          <option v-for='periodos in dataPeriodos' :key='periodos.pll_id' :value='periodos.pll_id' v-text='periodos.pll_periodo'></option>
        </select>
      </div>
      <div>
        <button class="btnj btnj-primary" @click="getmostrarNoabono(selectCodperiodo)">Buscar</button>
      </div>
      <div>
        <button class="btnj btnj-secundary" @click="generarPDF(selectCodperiodo)">PDF</button>
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
  import {ref, onMounted } from 'vue'
  import NoabonoService from '@/services/NoabonoService'
  import NoabonoPdfService from '@/services/NoabonoPdfService'

  let lista_personal = ref({})
  let dataPeriodos = ref([])
  let selectCodperiodo = ref()

  const getmostrarNoabono = async(id:number) => {

    if(selectCodperiodo.value == undefined) {
      alert('Seleccionar Periodo')
    } else {
      lista_personal.value = {};

      const response = await NoabonoService.mostrarNoabono(id);

      if (response.status == false) {
        alert(response.message)
      } else {
        lista_personal.value = response.personal
      }
    }

  }

  const generarPDF = async(id:number) => {
    const response = await NoabonoPdfService(id);
  }


  const periodosNoabono = async() => {

    const response = await NoabonoService.periodosNoabono();

    if (response.status == false) {
      alert(response.message)
    } else {
      dataPeriodos.value = response.dataPeriodosnoabono
    }
  }

  onMounted(() => {
    periodosNoabono()
  })

</script>