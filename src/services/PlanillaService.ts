import useAuth from "@/store/auth"

export default {

  //Listar Planillas
  async listarPlanillas(page:number) {

    let formData = new FormData()
    formData.append('page',page.toString())

    let store = useAuth();
    const url = store.baseURL+'/planilla/listplanillas'

    const rawResponse = await fetch(url, {
      method: 'POST',
      body:formData
    })

    const response = await rawResponse.json()

    return response

  }


}