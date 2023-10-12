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
      <button class="btnj btnj-secundary" @click="ExcelAFPArchivoPDT(selectCodperiodo)">Generar Archivo PDT</button>
      <button class="btnj btnj-secundary" @click="msgpendiente()">Estructura 4 .ide</button>
      <button class="btnj btnj-secundary" @click="msgpendiente()">Estructura 5 .tra</button>
      <button class="btnj btnj-secundary" @click="msgpendiente()">Estructura 17 .est</button>
      <button class="btnj btnj-secundary" @click="msgpendiente()">Estructura 29 .edu</button>
      <button class="btnj btnj-secundary" @click="msgpendiente()">Estructura 11 .per</button>
    </div>
    <div class="container-reportes">
      <h2>Reportes AFP</h2>
      <button class="btnj btnj-secundary" @click="ExcelAFPNominal(selectCodperiodo)">AFP Nominal</button>
      <button class="btnj btnj-secundary" @click="msgpendiente()">AFP</button>
    </div>
    <div class="container-reportes">
      <h2>Reportes 100 en 100</h2>
      <button class="btnj btnj-secundary" @click="msgpendiente()">Generar Archivos</button>
    </div>
    <!--Loading-->
    <Loading :is-visible='isVisible' :text='loadingText'></Loading>
    <!--Loading-->
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
  import AfpexcelNominalService from '@/services/AfpexcelNominalService'
  import PdtexcelService from '@/services/PdtexcelService'
  import Loading from '@/components/LoadingComponent.vue'

  let dataPeriodos = ref([{
    pll_id : '',
    pll_periodo:''
  }])

  let selectCodperiodo = ref(0)

  const isVisible = ref(false)
  const loadingText = ref('Loading ...');

  //REPORTE DE AFP CON CLASIFICADOR Y SECUENCIA FUNCIONAL
  const ExcelAFPNominal = async(id:number) => {

    if ( id == 0 ) {
      alert('Seleccionar Periodo')
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo AFP ...'
      const response = await AfpexcelNominalService.excelAfpnominal(id);
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }

  }

  //REPORTE EXCEL DE PDT - ESTRUCTURA SOLICITADA
  const ExcelAFPArchivoPDT = async(id:number) => {

    if ( id == 0 ) {
      alert('Seleccionar Periodo')
      return
    }

    try {
      isVisible.value = true
      loadingText.value = 'Generando Archivo PDT ...'
      const response = await PdtexcelService(id);
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

<style scoped>

</style>