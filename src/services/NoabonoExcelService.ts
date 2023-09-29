import * as XLSX from 'xlsx';
import useAuth from "@/store/auth";

export default async function NoabonoExcelService(pll_id:number) {

  let formData = new FormData()
    formData.append('pll_id',pll_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/noabonos/noabonopdf'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json()


    //SACAR EL LISTADO DE CONCEPTOS - ENCABEZADOS
    let dataConceptos = response.dataConceptos

    //let encabezadoDescuentos = []
    let totalbruto = 0;
    let totalafecto = 0;
    let totaldescuentos = 0;
    let totalliquido = 0;
    let totalessalud = 0;

    let dataEncabezado = ['N°',
      'COD.EST.',
      'DNI',
      'APELLIDO PATERNO',
      'APELLIDO MATERNO',
      'NOMBRES',
      'NIVEL EDUCATIVO',
      'TIPO DE SERVIDOR',
      'REM. BRUTO',
      'REM. AFECTO'
    ]

    for (const item in dataConceptos) {
      dataEncabezado.push(dataConceptos[item].con_concepto+' '+dataConceptos[item].con_nombre)
    }

    dataEncabezado.push('TOTAL DESC.')
    dataEncabezado.push('REM. LIQUIDA')
    dataEncabezado.push('ESSALUD')
    dataEncabezado.push('MOTIVO')

  
    let noAbonos = response.noAbono

    let datamax = []

    datamax.push(dataEncabezado)

    for (const item in noAbonos){
      let dataobjeto = []
      dataobjeto.push(parseInt(item)+1)
      dataobjeto.push(noAbonos[item].establecimiento_est_id)
      dataobjeto.push(noAbonos[item].p_num_doc)
      dataobjeto.push(noAbonos[item].p_a_paterno)
      dataobjeto.push(noAbonos[item].p_a_materno)
      dataobjeto.push(noAbonos[item].p_nombres)
      dataobjeto.push(noAbonos[item].n_nivel)
      dataobjeto.push(noAbonos[item].ts_tipo_servidor)
      dataobjeto.push(parseFloat(noAbonos[item].dp_bruto))
      dataobjeto.push(parseFloat(noAbonos[item].dp_afecto))

      let resConceptos = noAbonos[item].res_conceptos

      //LLENAS LOS CONCEPTOS DESCUENTOS
      for(const itemdc in dataConceptos){
        let monto_concepto = 0
        for(const itemcon in  resConceptos){
            if(dataConceptos[itemdc].con_id == resConceptos[itemcon].conceptos_con_id){
              monto_concepto = parseFloat(resConceptos[itemcon].pcon_monto)
            }
          }
        if (!monto_concepto){
          dataobjeto.push(0.00)
        }else{
          dataobjeto.push(monto_concepto)
        }
      }

      dataobjeto.push(parseFloat(noAbonos[item].dp_desc))
      dataobjeto.push(parseFloat(noAbonos[item].dp_liquido))
      dataobjeto.push(parseFloat(noAbonos[item].dp_essalud))
      dataobjeto.push(noAbonos[item].dp_motivo_na)

      datamax.push(dataobjeto)
  
      totalbruto = totalbruto+parseFloat(noAbonos[item].dp_bruto)
      totalafecto = totalafecto+parseFloat(noAbonos[item].dp_afecto)
      totaldescuentos = totaldescuentos+parseFloat(noAbonos[item].dp_desc)
      totalliquido = totalliquido+parseFloat(noAbonos[item].dp_liquido)
      totalessalud = totalessalud+parseFloat(noAbonos[item].dp_essalud)
    }

    let dataTotales = [,,,,,,,,parseFloat(totalbruto.toFixed(2)),parseFloat(totalafecto.toFixed(2))]

    for (const item in dataConceptos) {
      dataTotales.push(parseFloat(dataConceptos[item].monto))
    }

    dataTotales.push(parseFloat(totaldescuentos.toFixed(2)))
    dataTotales.push(parseFloat(totalliquido.toFixed(2)))
    dataTotales.push(parseFloat(totalessalud.toFixed(2)))

    datamax.push(dataTotales)

  const data = datamax // [
    //dataEncabezado,
   // datamax
  //];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'RepNoAbono');
  XLSX.writeFile(wb, 'NoAbono.xlsx');

}



