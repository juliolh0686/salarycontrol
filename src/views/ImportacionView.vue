<template>
  <div class="content-import">
    <div class="import-149">
      <select class="form-control" v-model="tipocarga">
        <option disabled value="">Seleccionar</option>
        <option value="continua">Continua</option>
        <option value="ocasional">Ocasional</option>
        <option value="complementaria">complementaria</option>
      </select>
    </div>
    <input type="file" id="file" name="file" ref="fileInput" @change="handleFileUpload()"/>
    <button v-on:click="submitFile()">Importar</button>


    <div class="import-002">
      <select class="form-control" v-model="tipocarga002">
        <option disabled value="">Seleccionar</option>
        <option value="1">CONTINUA</option>
        <option value="2">CONTINUA-B</option>
        <option value="3">OCASIONAL</option>
        <option value="4">COMPLEMENTARIA</option>
      </select>
      <input type="file" id="file002" name="file002" ref="fileInput002" @change="handleFileUpload002()"/>
      <button v-on:click="submitFile002()">Importar</button>
    </div>
    
    
  </div>
  
</template>

<script lang="ts" setup>

  import { ref } from 'vue'
  import ImportService from '@/services/ImportService'
  import useAuth from "@/store/auth"

  const fileInput = ref<HTMLInputElement | null>(null);
  const fileInput002 = ref<HTMLInputElement | null>(null);
  const files = ref()
  const files002 = ref()
  const file = ref()
  const file002 = ref()
  const store = new ImportService()
  let tipocarga = ref('')
  let tipocarga002 = ref('')

  const handleFileUpload = () => {
    files.value = fileInput.value?.files
    file.value = files.value[0]
    //console.log(file.value)
    //alert(file.name.split('.').pop())
    //alert(file.name.substring(0, file.name.lastIndexOf('.')))

  }

  const handleFileUpload002 = () => {
    files002.value = fileInput002.value?.files
    file002.value = files002.value[0]
  }


  const submitFile = async() => {
    
    const response = await store.fetchfile(file.value,tipocarga.value);

    if (response == false) {
      console.log("Error en carga")
    } else {
      console.log("Satisfactorio")
    }

  }

  const submitFile002 = async() => {
    
    const response = await store.import002activos(file002.value,tipocarga002.value);

    if (response == false) {
      console.log("Error en carga")
    } else {
      console.log("Satisfactorio")
    }

  }

</script>

