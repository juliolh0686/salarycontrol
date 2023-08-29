import useAuth from "@/store/auth";

export default {

  //Busqueda de personal para el registro de no abono
  async searchNoabono(num_doc:string) {

    let formData = new FormData()
    formData.append('num_doc',num_doc)

    let store = useAuth();
  
    const url = store.baseURL+'/noabonos/searchnoabono/'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();
  
    return response;
  
  },
  
  //Registrar el no Abono
  async addNoabono(id:number, motivo:string) {

    let fromData = new FormData()
    fromData.append('dp_id',id)
    fromData.append('dp_motivo_na',motivo)

    let store = useAuth()
    const url = store.baseURL+'/noabonos/addnoabono/'

    const rawResponse = await fetch(url, {
      method: 'POST',
      body: fromData
    })

    const response = await rawResponse.json();

    return response;

  },

  //Retirar del no Abono
  async removeNoabono(id:number) {

    let fromData = new FormData()
    fromData.append('dp_id',id)

    let store = useAuth()
    const url = store.baseURL+'/noabonos/removenoabono/'

    const rawResponse = await fetch(url, {
      method: 'POST',
      body: fromData
    })

    const response = await rawResponse.json();

    return response;

  },

  async periodosNoabono() {

    let store = useAuth()
    const url = store.baseURL+'/noabonos/periodosnoabono/'

    const rawResponse = await fetch(url, {
      method: 'POST'
    })

    const response = await rawResponse.json();

    return response;

  },

   //Busqueda por periodo no abono
   async mostrarNoabono(pll_id:number) {

    let formData = new FormData()
    formData.append('pll_id',pll_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/noabonos/mostrarnoabono/'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();
  
    return response;
  
  },

}