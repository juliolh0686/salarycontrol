<template>
  <div class="navbar-central">
  <div>
    <div class="titulo-central">No Abonos - Registro</div>
    <div class="container-from-search">
      <div>
        <label>DNI:</label>
      </div>
      <div>
        <input class="inputj" type="text" v-model="numDocumento">
      </div>
      <div>
        <button class="btnj btnj-one" @click="getsearchNoabono(numDocumento)">Buscar</button>
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
          <th>Acciones</th>
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
          <td>
            <template v-if="personal.dp_noabono">
              <button class="btnj btnj-two" @click="abrirModal('remove',personal)"><i class='bx bxs-user-minus'></i></button>
            </template>
            <template v-else>
              <button class="btnj btnj-three" @click="abrirModal('add',personal)"><i class='bx bxs-user-plus' ></i></button>
            </template>
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>

  <div id="myModal" class="modal">
    <div class="modal-content ancho-ventana50">
      <div class="modal-header">
        <span class="close" @click="cerrarmodal">&times;</span>
        <h2>{{tituloModal}}</h2>
      </div>
      <div class="modal-body">
        <div class="group-01">
          <label for="" class="label">Motivo</label>
          <input type="text" class="inputj" id="" placeholder="Ingresar Motivo" v-model="dp_motivo_na">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btnj btnj-three" @click="cerrarmodal">Cerrar</button>
        <button type="button" v-if="tipoAccion==1" class="btnj btnj-one" @click="addNoabono()">Registrar</button>
        <button type="button" v-if="tipoAccion==2" class="btnj btnj-one" @click="removeNoabono()">Retirar</button>
      </div>
    </div>
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
  import {ref } from 'vue'
  import type { Ref } from 'vue'
  import NoabonoService from '@/services/NoabonoService'
  import NoabonoPdfService from '@/services/NoabonoPdfService'
  import type IListapersonal from '@/interfaces/IListapersonal'

  let numDocumento = ref('')
  const lista_personal:Ref<Array<IListapersonal>> = ref([])
  let tituloModal = ref()
  let dp_motivo_na = ref()
  let tipoAccion = ref(0)
  let dp_id = ref()

  const getsearchNoabono = async(numDocumento:string) => {

    lista_personal.value = [];

    const response = await NoabonoService.searchNoabono(numDocumento);

    if (response.status == false) {
      alert(response.message)
    } else {
      lista_personal.value = response.personal
    }

  }

  const cerrarmodal = () => {
    const modal = document.getElementById("myModal") as HTMLDivElement;
    modal.classList.remove("active")
  }

  const abrirModal = (tipo:string, data:IListapersonal) => {

    switch(tipo) {
      case 'add':
        {
          tituloModal.value='Agregar No Abonos'
          dp_motivo_na.value = data['dp_motivo_na']
          dp_id.value = data['dp_id']
          tipoAccion.value=1
          break
        }
      case 'remove':
        {
          tituloModal.value='Retirar No Abonos'
          dp_motivo_na.value = data['dp_motivo_na']
          dp_id.value = data['dp_id']
          tipoAccion.value=2
          break
        }
    }

    const modal = document.getElementById("myModal") as HTMLDivElement;
    modal.classList.add("active")
  }

  const addNoabono = async() => {
    const response = await NoabonoService.addNoabono(dp_id.value,dp_motivo_na.value);
    if (response.status == false) {
      alert(response.message)
    } else {
      alert('procesado')
      cerrarmodal()
      getsearchNoabono(numDocumento.value)
    }
  }

  const removeNoabono = async() => {
    const response = await NoabonoService.removeNoabono(dp_id.value);
    if (response.status == false) {
      alert(response.message)
    } else {
      alert('procesado')
      cerrarmodal()
      getsearchNoabono(numDocumento.value)
    }
  }

</script>