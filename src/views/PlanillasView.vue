<template>
  <div class="navbar-central">
  <div>
    <div class="titulo-central">Planillas</div>
    <button class="btnj btnj-secundary" @click="Abrirmodal">Nuevo</button>
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
          <td> <button class="btn btn-primary">Editar</button><button class="btn btn-primary">Eliminar</button> </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="myModal" class="modal">
    <div class="modal-content ancho-ventana30">
      <div class="modal-header">
        <span class="close" @click="cerrarmodal">&times;</span>
        <h2>Formulario</h2>
      </div>
      <div class="modal-body">
        <div class="group-01">
          <label for="" class="label">Periodo</label>
          <input type="text" class="form-control" id="" placeholder="Ingresar Periodo">
        </div>
        <div class="group-01">
          <label for="" class="label">Descripción de Planilla</label>
          <input type="email" placeholder="Correo Electronico">
        </div>
      </div>
      <div class="modal-footer">
        <button id="submitBtn" class="btnj btnj-primary">Enviar</button>
        <button class="btnj btnj-primary" @click="cerrarmodal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>


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
    //getmostrarNoabono(page,selectCodperiodo.value);
  }


  const listarPlanillas = async() => {

        const response = await PlanillaService.listarPlanillas();

        if (response.status == false) {
          alert(response.message)
        } else {
          dataPlanillas.value = response.planilla.data

          pagination.value = response.pagination
        }

  }

  onMounted(()=>{
    listarPlanillas()
  })

</script>