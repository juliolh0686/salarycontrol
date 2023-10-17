import useAuth from "@/store/auth"

export default {

  //Listar Planillas
  async listarPlanillas() {

    let store = useAuth();
    const url = store.baseURL+'/planilla/listplanillas'

    const rawResponse = await fetch(url, {
      method: 'POST'
    })

    const response = await rawResponse.json()

    return response

  }


}