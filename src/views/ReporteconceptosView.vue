<template>
  <div class="navbar-central">
  <div>
    <div class="titulo-central">Reportes por Conceptos</div>
    <div class="container-from-search">
      <div>
        <label>Periodo:</label>
      </div>
      <div>
        <select class="controlselect" v-model="selectCodperiodo" ref="selectPeriodo" @change="obtenerPeriodo">
          <option value="0" disabled>Seleccione Periodo</option>
          <option v-for='periodos in dataPeriodos' :key='periodos.pll_id' :value='periodos.pll_id' v-text='periodos.pll_periodo'></option>
        </select>
      </div>
      <div>
        <label>Concepto:</label>
      </div>
      <div>
        <select class="controlselect" v-model="selectCodConcepto" ref="selectConcepto" @change="obtenerConcepto">
          <option value="0" disabled>Seleccione Concepto</option>
          <option v-for='conceptos in dataConceptos' :key='conceptos.con_id' :value='conceptos.con_id' v-text="conceptos.con_concepto+' : '+conceptos.con_nombre"></option>
        </select>
      </div>
    </div>
    <div class="container-reportes">
      <h2>Generar Reporte</h2>
      <button class="btnj btnj-one" @click="excelConcepto(selectCodperiodo,selectCodConcepto,periodoSelect,conceptoSelect)">Por Conceptos</button>
    </div>
    <!--Loading-->
    <Loading :is-visible='isVisible' :text='loadingText'></Loading>
    <!--Loading-->
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

.container-reportes {
  margin-top: 15px;
  border: 1px solid #ccc6c6dd;
  border-radius: 4px;
  padding: 15px;
}

</style>

<script setup lang="ts">
  import {ref, onMounted } from 'vue'
  import NoabonoService from '@/services/NoabonoService'
  import ConceptosService from '@/services/ConceptosService'
  import Loading from '@/components/LoadingComponent.vue'
  import Swal from 'sweetalert2'

  let dataPeriodos = ref([{
    pll_id : '',
    pll_periodo:''
  }])

  let dataConceptos = ref([{
    con_id:'',
    con_concepto : '',
    con_nombre:''
  }])

  let selectCodperiodo = ref(0)
  let selectCodConcepto = ref(0)
  let selectPeriodo = ref()
  let selectConcepto = ref()
  const periodoSelect = ref()
  const conceptoSelect = ref()

  const isVisible = ref(false)
  const loadingText = ref('Loading ...');

  //Obtener el periodo seleccionado
  const obtenerPeriodo = () => {
    if(selectPeriodo.value) {
      const selectedIndex = selectPeriodo.value.selectedIndex;
      const selectedOption = selectPeriodo.value.options[selectedIndex]
      periodoSelect.value = selectedOption.text;
    }
  }

   //Obtener el concepto seleccionado
   const obtenerConcepto = () => {
    if(selectConcepto.value) {
      const selectedIndex = selectConcepto.value.selectedIndex;
      const selectedOption = selectConcepto.value.options[selectedIndex]
      conceptoSelect.value = selectedOption.text;
    }
  }

  //Reporte de AFP Nominal con Clasificador y secuencia
  const excelConcepto = async(id_planilla:number,id_concepto:number,periodo:string,concepto:string) => {

    if ( id_planilla == 0 || id_concepto == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo ...'
      const response = await ConceptosService.excelConceptosnominal(id_planilla,id_concepto,periodo,concepto);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

  }

  const msgpendiente = () => {
    alert('Mensaje: Opción en Elaboración')
  }

  const periodosNoabono = async() => {

    const response = await NoabonoService.periodosNoabono();

    if (response.status == false) {
      alert(response.message)
    } else {
      dataPeriodos.value = response.dataPeriodosnoabono
    }
  }

  const optionConceptos = async() => {

    const response = await ConceptosService.optionConceptos();

    if (response.status == false) {
      alert(response.message)
    } else {
      dataConceptos.value = response.dataConceptos
    }
  }
  
  onMounted(() => {
    periodosNoabono()
    optionConceptos()
  })

</script>