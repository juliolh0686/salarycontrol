<template>
  <div>
    <div class="titulo-central">Reportes Declaración</div>
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
    </div>
    <div class="container-reportes">
      <h2>Reportes PDT PLAME</h2>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">Generar Archivo PDT</button>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">Estructura 4 .ide</button>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">Estructura 5 .tra</button>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">Estructura 17 .est</button>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">Estructura 29 .edu</button>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">Estructura 11 .per</button>
    </div>
    <div class="container-reportes">
      <h2>Reportes AFP</h2>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">AFP Nominal</button>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">AFP</button>
    </div>
    <div class="container-reportes">
      <h2>Reportes 100 en 100</h2>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">Generar Archivos</button>
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
  import AfpexcelNominalService from '@/services/AfpexcelNominalService'

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

  let selectCodperiodo = ref()


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

  const ExcelAFPNominal = async(id:number) => {

    const response = await AfpexcelNominalService.excelAfpnominal(id);
    //console.log(response.arraydata)

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

.text-right {
  text-align: right;
}

td {
  padding: 0 5px;
}

</style>