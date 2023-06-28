import useAuth from "@/store/auth"

class ImportService {

   constructor() {
    
   }

async fetchfile(email:string) {
    let store = useAuth()
    const url = store.baseURL+'/detalleplanilla/import149'
    return url
  }

}

export default ImportService;