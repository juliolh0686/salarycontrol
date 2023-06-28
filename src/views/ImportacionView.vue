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
    <input type="file" id="file" ref="fileInput" @change="handleFileUpload()"/>
    <button v-on:click="submitFile()">Importar</button>
  </div>
</template>

<script lang="ts" setup>

  import { ref } from 'vue'
  //import ImportService from '@/services/ImportService'
  import useAuth from "@/store/auth"

  const fileInput = ref<HTMLInputElement | null>(null);
  const files = ref();
  //const store = new ImportService()

  const handleFileUpload = () => {
    files.value = fileInput.value?.files
    const file = files.value[0]
    alert(file.name)
    //alert(file.name.split('.').pop())
    //alert(file.name.substring(0, file.name.lastIndexOf('.')))

  }

  const submitFile = async() => {

    let formData = new FormData();
    formData.append('file',files.value);


    let store = useAuth()
    const url = store.baseURL+'/detalleplanilla/import149'
    
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          //'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: formData,
      })

      const response = await rawResponse.json();

      alert(response.message);

    // //formData.append('tipoarchivo',..)

    // fetch("api",{
    //   body: formData,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   method:"post"
    // })

    //const response = store.fetchfile();
    //alert(response)
    
    
    

  }

</script>

