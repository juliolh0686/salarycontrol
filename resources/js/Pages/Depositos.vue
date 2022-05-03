<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Jetstream/Welcome.vue';
</script>

<template>
  <AppLayout title="Dashboard">
    <template #header>
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            IMPORTACIÓN DE ARCHIVOS REM 149 - PLANILLA DE ACTIVOS
        </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg flex">
          <div div class="inline-block relative w-64">
            <select class="mx-2 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="tipoarchivo">
              <option disabled value="">Seleccionar</option>
              <option value="a" :key="tipoarchivo">Continua</option>
              <option value="b" :key="tipoarchivo">Ocasional</option>
              <option value="c" :key="tipoarchivo">complementaria</option>
            </select>
          </div>

          <div class="mx-2">
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </div>
          <div class="mx-2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" v-on:click="submitFile()">Importar</button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
    export default {
        data(){
            return{
                tipoarchivo:"",
                file: '',
                ruta:'',
                dirarchivo:'',
                fotopersonal:'',
                variablefoto:0,
                numeracion:0,
                arrayPlanillaactiva:[]
           } 
        },

        computed:{

        },

        methods:{

            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            },

            //Envía el archivo al servidor
      submitFile(){

            //Inicializar los datos del formularios
            let formData = new FormData();

            // Agregue los datos del formulario que necesitamos enviar
            formData.append('file', this.file);
            formData.append('tipoarchivo', this.tipoarchivo);

            alert(this.tipoarchivo);

           // switch(this.tipoarchivo) {
            //case '1':
            //  this.ruta='importpadronpersona';
            //  break;
            //case '2':
            //  this.ruta='importexpnota';
            //  break;
            //case '3':
            //  this.ruta='importexpdoc';
            //  break;
            //case '4':
            //  this.ruta='importexpadj';
             // break;
           // default:
              // code block
          //}
        
            //Haga la solicitud a la POST / URL de un solo archivo
            axios.post('personal/store',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },

             imageChanged(e){
                console.log(e.target.files[0])
                
                var fileReader = new FileReader()

                fileReader.readAsDataURL(e.target.files[0])

                fileReader.onload=(e)=>{
                    this.fotopersonal=e.target.result,
                    this.foto=e.target.files,
                    this.variablefoto=1
                }
                },

            planillaactiva(){
                let me=this;
                var url= 'planilla/planillaactiva';
                axios.get(url).then(function (response) {
                    var respuesta = response.data;
                    me.arrayPlanillaactiva=respuesta.planillaactiva;
                })
                .catch(function (error) {
                    console.log(error);
                });

            },

            registrarPersonal() {
                
            var me = this;

            if (me.tipoarchivo!==""){
            axios.post('personal/store', {
                'fotopersonal':this.fotopersonal,
                'variablefoto':this.variablefoto,
                'cod_planilla':this.planillaactiva.cod_planilla,
                'tipo_archivo':this.tipoarchivo,
            }).then(function (response) {
    
            }).catch(function (error) {
                console.log(error);
                if(error.response.status==422){
                    me.errors=error.response.data.errors;
                }
            });
            }else{
                alert("Seleccionar Un Tipo de Archivo")
            }

        },
        },

        mounted() {
            //this.planillaactiva();
        }
    }
</script>

<style scope>

.button-importar {
  background-color: blue;
}

</style>
