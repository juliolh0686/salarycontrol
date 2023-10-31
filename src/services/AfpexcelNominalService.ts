import useAuth from "@/store/auth";
import * as XLSX from 'xlsx';

export default {

  //Busqueda de personal para el registro de no abono
  async excelAfpnominal(num_id:number,periodo:string) {

    let formData = new FormData()
    formData.append('num_id',num_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/afpExcelnominal'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();

    let datatotal = response.arraydata

    const ws = XLSX.utils.aoa_to_sheet(datatotal);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'DataAFPNominal-'+periodo+'.xlsx');
  
  
  },


}