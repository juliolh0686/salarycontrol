import useAuth from "@/store/auth";

export default async function Pdtexcel100Service(num_id:number) {

    let formData = new FormData()
    formData.append('num_id',num_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/reporteexcel100/'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json();

    return response

}