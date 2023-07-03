<template>
  <div class="content-import">
    <div class="import-149">
      <select class="form-control">
        <option disabled value="">Seleccionar</option>
        <option value="a">Continua</option>
        <option value="b">Ocasional</option>
        <option value="c">complementaria</option>
      </select>
    </div>
    <input type="file" id="file" name="file" ref="fileInput" @change="handleFileUpload()"/>
    <button v-on:click="submitFile()">Importar</button>
  </div>
</template>

<script lang="ts" setup>

  import { ref } from 'vue'
  import ImportService from '@/services/ImportService'
  import useAuth from "@/store/auth"

  const fileInput = ref<HTMLInputElement | null>(null);
  const files = ref();
  const file = ref()
  const store = new ImportService()

  const handleFileUpload = () => {
    files.value = fileInput.value?.files
    file.value = files.value[0]
    //console.log(file.value)
    //alert(file.name.split('.').pop())
    //alert(file.name.substring(0, file.name.lastIndexOf('.')))

  }

  const submitFile = async() => {
    
    const response = await store.fetchfile(file.value);

    if (response == false) {
      console.log("login error")
    } else {
      console.log("Satisfactorio")
    }

  }

</script>

