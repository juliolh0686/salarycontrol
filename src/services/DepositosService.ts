import useAuth from "@/store/auth";

export default {

   //Busqueda por periodo no abono
   async mostrarDepositos(page:number, dni:string) {

    let formData = new FormData()
    formData.append('pp_num_doc',dni.toString())
    formData.append('page',page.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/planillamcpp/listardepositos/'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();

    return response;

  },

}