<template>
  <div class="navbar-central">
  <div>
    <div class="titulo-central">Reportes Declaración</div>
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
    </div>
    <div class="container-reportes">
      <h2>Reportes PDT PLAME</h2>
      <button class="btnj btnj-one" @click="ExcelAFPArchivoPDT(selectCodperiodo,periodoSelect)">Generar Archivo PDT</button>
      <button class="btnj btnj-three" @click="generarTxtid(selectCodperiodo,periodoSelect)">Estructura 4 .ide</button>
      <button class="btnj btnj-three" @click="generarTxttra(selectCodperiodo,periodoSelect)">Estructura 5 .tra</button>
      <button class="btnj btnj-three" @click="generarTxtest(selectCodperiodo,periodoSelect)">Estructura 17 .est</button>
      <button class="btnj btnj-three" @click="generarTxtedu(selectCodperiodo,periodoSelect)">Estructura 29 .edu</button>
      <button class="btnj btnj-three" @click="generarTxtper(selectCodperiodo,periodoSelect)">Estructura 11 .per</button>
    </div>
    <div class="container-reportes">
      <h2>Reportes AFP</h2>
      <button class="btnj btnj-one" @click="ExcelAFPNominal(selectCodperiodo,periodoSelect)">AFP Nominal</button>
      <button class="btnj btnj-one" @click="excelAFP(selectCodperiodo, periodoSelect)">AFP</button>
    </div>
    <div class="container-reportes">
      <h2>Reportes 100 en 100</h2>
      <button class="btnj btnj-two" @click="excelPdt100(selectCodperiodo)">Generar Archivos</button>
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
  import AfpexcelNominalService from '@/services/AfpexcelNominalService'
  import PdtexcelService from '@/services/PdtexcelService'
  import PdttxtService from '@/services/PdttxtService'
  import AfpexcelService from '@/services/AfpexcelService'
  import Pdtexcel100Service from '@/services/Pdtexcel100Service'
  import Loading from '@/components/LoadingComponent.vue'
  import Swal from 'sweetalert2'

  let dataPeriodos = ref([{
    pll_id : '',
    pll_periodo:''
  }])

  let selectCodperiodo = ref(0)
  let selectPeriodo = ref()
  const periodoSelect = ref()

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


  //Reporte de AFP Nominal con Clasificador y secuencia
  const ExcelAFPNominal = async(id:number,periodo:string) => {

    if ( id == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo AFP ...'
      const response = await AfpexcelNominalService.excelAfpnominal(id,periodo);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

  }

  //Reporte Excel PDT - Extructura Solicitada
  const ExcelAFPArchivoPDT = async(id:number,periodo:string) => {

    if ( id == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo PDT ...'
      const response = await PdtexcelService(id,periodo);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

  }

  //Generar Archivo estructura .IDE
  const generarTxtid = async(id:number,periodo:string) => {

    if ( id == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo IDE ...'
      const response = await PdttxtService.fileid(id,periodo);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

  }

  //Generar Archivo estructura .TRA
  const generarTxttra = async(id:number,periodo:string) => {

    if ( id == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo IDE ...'
      const response = await PdttxtService.filetra(id,periodo);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

    }

 //Generar Archivo estructura .EST
  const generarTxtest = async(id:number,periodo:string) => {

    if ( id == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo IDE ...'
      const response = await PdttxtService.fileest(id,periodo);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

    }


  //Generar Archivo estructura .EDU
  const generarTxtedu = async(id:number,periodo:string) => {

    if ( id == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo IDE ...'
      const response = await PdttxtService.fileedu(id,periodo);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

    }

//Generar Archivo estructura .PER
  const generarTxtper = async(id:number, periodo:string) => {

    if ( id == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo IDE ...'
      const response = await PdttxtService.fileper(id,periodo);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

    }

    //GENERAR ARCHIVO AFPEXCEL
  const excelAFP = async(id:number,periodo:string) => {

    if ( id == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo IDE ...'
      const response = await AfpexcelService.Afpexcel(id,periodo);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

    }

    //GENERAR ARCHIVO EXCEL 100 EN 100
  const excelPdt100 = async(id:number) => {

    if ( id == 0 ) {
      Swal.fire({
        icon: 'info',
        text: 'Seleccionar Periodo',
      })
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo ...'
      const response = await Pdtexcel100Service(id);

      Swal.fire({
        icon: 'success',
        html: 'Archivos Generados: '+response.conteo+'<br>Directorio: D:/DATACARGA/',
      })

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
  
  onMounted(() => {
    periodosNoabono()
  })

</script>