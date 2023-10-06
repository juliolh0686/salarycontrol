import useAuth from "@/store/auth";
import * as XLSX from 'xlsx';

export default {

  //Busqueda de personal para el registro de no abono
  async excelAfpnominal(num_id:number) {

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
    XLSX.writeFile(wb, 'DataAFPNominal.xlsx');
  
  
  },
  
  //Registrar el no Abono
  async addNoabono(id:number, motivo:string) {

    let fromData = new FormData()
    fromData.append('dp_id',id.toString())
    fromData.append('dp_motivo_na',motivo)

    let store = useAuth()
    const url = store.baseURL+'/noabonos/addnoabono'

    const rawResponse = await fetch(url, {
      method: 'POST',
      body: fromData
    })

    const response = await rawResponse.json();

    return response;

  },


}