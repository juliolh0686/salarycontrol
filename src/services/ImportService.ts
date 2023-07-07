import useAuth from "@/store/auth"

class ImportService {

   constructor() {
    
   }

async fetchfile(file:File) {

  let formData = new FormData();
  formData.append('file',file);

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
      return true
    }

  }

}

export default ImportService;