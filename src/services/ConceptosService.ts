import useAuth from "@/store/auth";
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2'

export default {

  async optionConceptos() {

    let store = useAuth()
    const url = store.baseURL+'/planilla/optionconceptos'

    const rawResponse = await fetch(url, {
      method: 'POST'
    })

    const response = await rawResponse.json();

    return response;

  },

   //Reporte por conceptos
   async excelConceptosnominal(id_planilla:number,id_concepto:number,periodo:string,concepto:string) {

    let formData = new FormData()
    formData.append('id_planilla',id_planilla.toString())
    formData.append('id_concepto',id_concepto.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/conceptosExcelnominal'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();

    if(response.status == false) {
      
      Swal.fire({
        icon: 'info',
        text: response.message,
      })

    }else {

      let datatotal = response.arraydata

      const ws = XLSX.utils.aoa_to_sheet(datatotal);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, concepto+'_'+periodo+'.xlsx');

    }
  
  },


}