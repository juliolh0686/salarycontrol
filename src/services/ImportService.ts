import useAuth from "@/store/auth"

class ImportService {

   constructor() {
    
   }

async fetchfile(file:File,tipocarga:string) {

  let formData = new FormData();
  formData.append('file',file);
  formData.append('tipocarga',tipocarga)

    let store = useAuth()
    const url = store.baseURL+'/detalleplanilla/import149'
    
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    const response = await rawResponse.json();

    if(response.status == false) {
      alert(response.message)
      return false
    }else {
      alert(response.res)
      return true
    }

  }

  async import002activos(file:File,tipocarga:string) {

    let formData = new FormData();
    formData.append('file',file);
    formData.append('tipocarga',tipocarga)
  
      let store = useAuth()
      const url = store.baseURL+'/planillaconceptos/import002rem'
      
      const rawResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })
  
      const response = await rawResponse.json();
  
      if(response.status == false) {
        alert(response.message)
        return false
      }else {
        alert(response.res)
        return true
      }
  
    }

}

export default ImportService;