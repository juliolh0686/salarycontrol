<template>
  <div class="navbar-central">
  <div>
    <div class="titulo-central">Planillas</div>
    <button class="btnj btnj-one" @click="Abrirmodal">Nuevo</button>
    <table>
      <thead>
        <tr>
          <th>Nº</th>
          <th>Periodo</th>
          <th>Monto Bruto</th>
          <th>Descuentos</th>
          <th>liquido</th>
          <th>Aportes</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(planillas,index) in dataPlanillas" :key="planillas.pll_id">
          <td>{{ index+pagination.from }}</td>
          <td>{{ planillas.pll_periodo }}</td>
          <td class="text-right">{{ planillas.pll_bruto }}</td>
          <td class="text-right">{{ planillas.pll_desc }}</td>
          <td class="text-right">{{ planillas.pll_liquido }}</td>
          <td class="text-right">{{ planillas.pll_essalud }}</td>
          <td>{{ planillas.pll_descripcion }}</td>
          <td>{{ planillas.estado_planilla_ep_id }}</td>
          <td> <button class="btnj btnj-one"><i class='bx bxs-edit image-button'></i></button><button class="btnj btnj-two"><i class='bx bxs-trash'></i></button> </td>
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

  <div id="myModal" class="modal">
    <div class="modal-content ancho-ventana30">
      <div class="modal-header">
        <span class="close" @click="cerrarmodal">&times;</span>
        <h2>Planilla</h2>
      </div>
      <div class="modal-body">
        <div class="group-01">
          <label for="" class="label">Periodo</label>
          <input type="text" class="inputj" id="" placeholder="Ingresar Periodo">
        </div>
        <div class="group-01">
          <label for="" class="label">Descripción de Planilla</label>
          <input type="email" class="inputj" placeholder="Ingresar Descripción">
        </div>
      </div>
      <div class="modal-footer">
        <button id="submitBtn" class="btnj btnj-one">Enviar</button>
        <button class="btnj btnj-two" @click="cerrarmodal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>


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

<script setup lang="ts">
  import {ref, onMounted, computed} from 'vue'
  import PlanillaService from '@/services/PlanillaService'

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

  let dataPlanillas = ref([{
    pll_id :'',
    pll_periodo : '',
    pll_bruto : '',
    pll_desc : '',
    pll_liquido : '',
    pll_essalud : '',
    pll_descripcion: '',
    estado_planilla_ep_id: '',
  }])

  const cerrarmodal = () => {
    const modal = document.getElementById("myModal") as HTMLDivElement;
    modal.classList.remove("active")
  }

  const Abrirmodal = () => {
    const modal = document.getElementById("myModal") as HTMLDivElement;
    modal.classList.add("active")
  }

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
    listarPlanillas(page);
  }


  const listarPlanillas = async(page:number) => {

        const response = await PlanillaService.listarPlanillas(page);

        if (response.status == false) {
          alert(response.message)
        } else {
          dataPlanillas.value = response.planilla.data

          pagination.value = response.pagination
        }

  }

  onMounted(()=>{
    listarPlanillas(1)
  })

</script>