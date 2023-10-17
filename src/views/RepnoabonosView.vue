<template>
  <div class="navbar-central">
  <div>
    <div class="titulo-central">No Abonos - Reportes</div>
    <div class="container-from-search">
      <div>
        <label>Periodo:</label>
      </div>
      <div>
        <select class="controlselect" v-model="selectCodperiodo">
          <option value="0" disabled>Seleccione Periodo</option>
          <option v-for='periodos in dataPeriodos' :key='periodos.pll_id' :value='periodos.pll_id' v-text='periodos.pll_periodo'></option>
        </select>
      </div>
      <div>
        <button class="btnj btnj-primary" @click="getmostrarNoabono(0,selectCodperiodo)">Buscar</button>
      </div>
      <div>
        <button class="btnj btnj-secundary" @click="generarPDF(selectCodperiodo)">PDF</button>
      </div>
      <div>
        <button class="btnj btnj-secundary" @click="generarExcel(selectCodperiodo)">Excel</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>N°</th>
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
        <tr v-for="(personal, index) in lista_personal" :key="personal.p_id">
          <td> {{ index+pagination.from }} </td>
          <td> {{ personal.p_id }} </td>
          <td> {{ personal.p_a_paterno }} </td>
          <td>{{ personal.p_a_materno }}</td>
          <td>{{ personal.p_nombres }}</td>
          <td>{{ personal.p_num_doc }}</td>
          <td>{{ personal.dp_cod_cargo }}</td>
          <td>{{ personal.cargo_car_id }}</td>
          <td class="text-right">{{ personal.dp_bruto }}</td>
          <td class="text-right">{{ personal.dp_afecto }}</td>
          <td class="text-right">{{ personal.dp_desc }}</td>
          <td class="text-right">{{ personal.dp_liquido }}</td>
          <td class="text-right">{{ personal.dp_essalud }}</td>
        </tr>
      </tbody>
    </table>
    <nav class="container-pagination">
      <ul class="pagination">
        <li class="page-item" v-if="pagination.current_page>1">
            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page-1)">Anterior</a>
        </li>
          <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active':'']">
            <a class="page-link" href="#" @click.prevent="cambiarPagina(page)">{{ page }}</a>
        </li>
          <li class="page-item" v-if="pagination.current_page<pagination.last_page">
            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page+1)">Siguiente</a>
        </li>
      </ul>
    </nav>
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

  import {ref, onMounted , computed } from 'vue'
  import NoabonoService from '@/services/NoabonoService'
  import NoabonoPdfService from '@/services/NoabonoPdfService'
  import NoabonoExcelService from '@/services/NoabonoExcelService'

  let pagination = ref(
    {
    'total': 0,
    'current_page': 0,
    'per_page': 0,
    'last_page': 0,
    'from': 0,
    'to': 0
  }
  ) 

  let lista_personal = ref([{
    p_id :'',
    p_a_paterno : '',
    p_a_materno : '',
    p_nombres : '',
    p_num_doc : '',
    dp_cod_cargo : '',
    cargo_car_id: '',
    dp_bruto: 0,
    dp_afecto: 0,
    dp_desc: 0,
    dp_liquido: 0,
    dp_essalud: 0
  }])

  let dataPeriodos = ref([{
    pll_id : '',
    pll_periodo:''
  }])

  let selectCodperiodo = ref(0)


  const offset = ref(3);

  // Propiedad computada que calcula 'isActived'
  const isActived = computed(() => {
    return pagination.value.current_page;
  });

  // Propiedad computada que calcula 'pagesNumber'
    const pagesNumber = computed(() => {

      if (!pagination.value.to) {
        return [];
      }

      let from = pagination.value.current_page - offset.value;
      if (from < 1) {
        from = 1;
      }

      let to = from + (offset.value * 2);
      if (to >= pagination.value.last_page) {
        to = pagination.value.last_page;
      }

      const pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++;
      }

      return pagesArray;
    });




  const cambiarPagina = (page:number) => {
    pagination.value.current_page = page;
    getmostrarNoabono(page,selectCodperiodo.value);
  }


  const getmostrarNoabono = async(page:number, id:number) => {

    if(selectCodperiodo.value == undefined) {
      alert('Seleccionar Periodo')
    } else {
      lista_personal.value = [{
        p_id :'',
        p_a_paterno : '',
        p_a_materno : '',
        p_nombres : '',
        p_num_doc : '',
        dp_cod_cargo : '',
        cargo_car_id: '',
        dp_bruto: 0,
        dp_afecto: 0,
        dp_desc: 0,
        dp_liquido: 0,
        dp_essalud: 0
      }];


      const response = await NoabonoService.mostrarNoabono(page,id);

      if (response.status == false) {
        alert(response.message)
      } else {
        lista_personal.value = response.personal.data
        pagination.value = response.pagination
      }
    }

  }

  const generarPDF = async(id:number) => {
    const response = await NoabonoPdfService(id);
  }

  const generarExcel = async(id:number) => {
    const response = await NoabonoExcelService(id);
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

<style scoped>

.container-pagination {
  margin-top: 20px;
}
.pagination {
  display: flex;
}

.pagination .page-item .page-link {
  text-decoration: none;
  color: white;
}

.pagination .page-item {
  background-color: #008CBA; 
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  list-style: none;
} 

.pagination .active {
  background-color: #07475c;
}

</style>