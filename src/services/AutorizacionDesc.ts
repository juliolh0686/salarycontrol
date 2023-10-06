import useAuth from "@/store/auth";

export default {

  //Busqueda de personal
  async searchAutorizaciondesc(num_doc:string) {

    let formData = new FormData()
    formData.append('num_doc',num_doc)

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/autorizacion'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();
  
    return response;
  
  },

}