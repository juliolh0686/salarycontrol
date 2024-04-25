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

  },

  async createPlanilla(periodo:string,descripcion:string) {
    let formData = new FormData()
    formData.append('periodo',periodo.toString())
    formData.append('descripcion',descripcion.toString())
    let store = useAuth();

    const url = store.baseURL+'/planilla/create'

    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    })


    const response = await rawResponse.json()

    return response

  },

  async deletePlanilla(id:number) {

    let formData = new FormData()
    formData.append('id',id.toString())

    let store = useAuth()

    const url = store.baseURL+'/planilla/delete'

    const rawResponse = await fetch(url, {
      method:'POST',
      body: formData
    })

    const response = await rawResponse.json()

    return response
  }


}