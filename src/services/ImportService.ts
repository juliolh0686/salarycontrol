import useAuth from "@/store/auth"

export default {

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

    return response

  },

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
  
      return response
  
    }

}