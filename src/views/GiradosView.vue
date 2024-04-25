<template>
  <div class="navbar-central">
  <div>
    <div class="titulo-central">No Abonos - Reportes</div>
    <div class="container-from-search">
      <div>
        <label>DNI:</label>
      </div>
      <div>
        <input class="inputj" type="text" v-model="consulta_dni">
      </div>
      <div>
        <button class="btnj btnj-one" @click="listarDepositos(0,consulta_dni)">Buscar</button>
      </div>
      <div class="text-name">Apellidos y Nombres: <u>{{ datos_personales.pp_nombre }}</u></div>
    </div>
    <table>
      <thead>
        <tr>
          <th>N°</th>
          <th>Año</th>
          <th>Mes</th>
          <th>Expediente SIAF</th>
          <th>Tipo de Planilla</th>
          <th>Clase de Planilla</th>
          <th>Correlativo Planilla</th>
          <th>Ticket Planilla</th>
          <th>Monto Neto</th>
          <th>Banco</th>
          <th>Numero de Cuenta</th>
          <th>Detalle Girado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(personal, index) in lista_personal" :key="personal.pm_id">
          <td> {{ index+pagination.from }} </td>
          <td> {{ personal.pm_anio }} </td>
          <td> {{ personal.pm_mes }} </td>
          <td> {{ personal.ed_expediente }} </td>
          <td> {{ personal.pm_tipoplanilla }} </td>
          <td> {{ personal.pm_claseplanilla }} </td>
          <td>{{ personal.pm_correlativo }}</td>
          <td>{{ personal.pm_ticket }}</td>
          <td class="text-right">{{ personal.pm_montoneto }}</td>
          <td>{{ personal.pm_banco }}</td>
          <td>{{ personal.pm_cuenta }}</td>
          <td>
            <ul v-for="detalledoc in personal.detalledoc" :key="detalledoc.ded_id" class="chart-legend clearfix">
              <li v-text="'Fase: '+detalledoc.ded_fase+' - Fecha: '+detalledoc.ded_fech_doc"></li>
            </ul>
          </td>
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

li {
  list-style: none;
}

.text-name {
  font-size: 15px;
  margin-left: 20px;
}

.text-name u {
  font-size: 15px;
  font-weight: bold;  
  margin-left: 5px;
  text-decoration: none;
}

</style>

<script setup lang="ts">

  import {ref, computed } from 'vue'
  import DepositosService from '@/services/DepositosService'

  let consulta_dni = ref('')

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

  let lista_personal = ref([])
  let datos_personales = ref([])

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
    listarDepositos(page,consulta_dni.value);
  }


  const listarDepositos = async(page:number,dni:string) => {
    
    lista_personal.value = [];
    datos_personales.value = [];

      const response = await DepositosService.mostrarDepositos(page,dni);

      if (response.status == false) {
        alert(response.message)
      } else {
        lista_personal.value = response.listado_personal.data
        datos_personales.value = response.datos_personales
        pagination.value = response.pagination
      }

  }

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