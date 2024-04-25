<template>
  <div class="navbar-central">
  <div class="content-import">
    <div class="titulo-central">Importación de Archivos SIAF</div>
    <div class="container-reportes">
    <div class="container-reportes_item">
      <h2 class="title-item">IMPORTACIÓN DE ARCHIVOS SIAF</h2>
      <select class="form-control controlselect" v-model="tipocarga">
        <option disabled value="">Seleccionar</option>
        <option value="expediente_nota">Expediente Nota</option>
        <option value="expediente_documento">Expediente Documento</option>
        <option value="planilla_mcpp">Planilla MCPP Web</option>
      </select>
      <div class="container-file">
        <input class="input-file" type="file" id="file" name="file" ref="fileInput" @change="handleFileUpload()"/>
      </div>
      <button class="btnj btnj-one" v-on:click="submitFile()">Importar</button>
    </div>
  </div>
</div>
<LoadingComponent :is-visible='isVisible' :text='loadingText'></LoadingComponent>
</div>
</template>

<script lang="ts" setup>

  import { ref } from 'vue'
  import ImportService from '@/services/ImportService'
  import Swal from 'sweetalert2'
  import LoadingComponent from '@/components/LoadingComponent.vue'

  const fileInput = ref<HTMLInputElement | null>(null);
  const files = ref()
  const file = ref()
  let tipocarga = ref('')

  const isVisible = ref(false)
  const loadingText = ref('Loading ...');

  const handleFileUpload = () => {
    files.value = fileInput.value?.files
    file.value = files.value[0]
  }


  const submitFile = async() => {

    try {

      isVisible.value = true
      loadingText.value = 'Importando Archivo ...'

      const response = await ImportService.importSiaf(file.value,tipocarga.value,file.value.name);

      if (response.status == false) {
        Swal.fire({
          icon: 'error',
          text: response.message,
        })
      } else {
        Swal.fire({
          icon: 'success',
          html: response.message+'</br>Numero de registros: '+response.numero
        })
      }
      
    } catch (error) {
      alert('Error al obtener la respuesta: '+error)
    } finally {
      isVisible.value = false
    }
    

  }

</script>

<style scoped>

.container-reportes {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
}

.container-reportes_item {
  width: 50%;
  padding: 10px;
  border: 1px solid #d1cdcd;
  border-radius: 4px;
}

.title-item {
  color: #008CBA;
  padding: 15px 5px;
}

input[type=file]::file-selector-button {
  margin: 5px;
  color: white;
  border: 2px solid #a1c2d8;
  background-color: #a1c2d8;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

input[type=file]::file-selector-button:hover {
  color: white;
  border: 2px solid #457b9d;
  background: #457b9d;
}

input[type=file]::file-selector-button:active {
  color: #ffffff;
  border: 2px solid #274053;
  background-color: #274053;
}

.container-file {
  margin: 7px 0;
  border: 1px solid #e4e7e9;
  border-radius: 4px;
}

.input-file {
  width: 100%;
}

</style>

