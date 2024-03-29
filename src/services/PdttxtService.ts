import useAuth from "@/store/auth";
import * as XLSX from 'xlsx';

export default {

  async fileid(num_id:number,periodo:string) {

    let formData = new FormData()
    formData.append('num_id',num_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/fileide'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();

    let datatotal = response.arraydata

    const ws = XLSX.utils.aoa_to_sheet(datatotal);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'Archivo_IDE-'+periodo+'.xlsx');
  
  },

  async filetra(num_id:number,periodo:string) {

    let formData = new FormData()
    formData.append('num_id',num_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/filetra'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();

    let datatotal = response.arraydata

    const ws = XLSX.utils.aoa_to_sheet(datatotal);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'Archivo_TRA-'+periodo+'.xlsx');
  
  },

  async fileest(num_id:number,periodo:string) {

    let formData = new FormData()
    formData.append('num_id',num_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/fileest'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();

    let datatotal = response.arraydata

    const ws = XLSX.utils.aoa_to_sheet(datatotal);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'Archivo_EST-'+periodo+'.xlsx');
  
  },

  async fileedu(num_id:number,periodo:string) {

    let formData = new FormData()
    formData.append('num_id',num_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/fileedu'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();

    let datatotal = response.arraydata

    const ws = XLSX.utils.aoa_to_sheet(datatotal);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'Archivo_EDU-'+periodo+'.xlsx');
  
  },

  async fileper(num_id:number,periodo:string) {

    let formData = new FormData()
    formData.append('num_id',num_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/fileper'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();

    let datatotal = response.arraydata

    const ws = XLSX.utils.aoa_to_sheet(datatotal);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'Archivo_PER-'+periodo+'.xlsx');
  
  },

}