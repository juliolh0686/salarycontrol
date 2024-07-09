import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useAuth from "@/store/auth";

  export default async function AutorizacionPDFService (numDocumento:string) {

    let formData = new FormData()
    formData.append('numDocumento',numDocumento)

    let store = useAuth();
  
    const url = store.baseURL+'/planilla/autorizacionPDF'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json()

    //SACAR EL LISTADO DE CONCEPTOS - ENCABEZADOS
    let dataConceptos = response.dataconceptos

    let encabezadoDescuentos = []
  
    for (const item in dataConceptos) {
      encabezadoDescuentos.push(dataConceptos[item].con_concepto+' '+dataConceptos[item].con_nombre)
    }

    //NUMERO DE CONCEPTOS CONSIDERADOS
    let numConceptos = dataConceptos.length;

    //Reporte No abonos
    let dataAutorizacion = response.dataautorizacion

    let data = []

    for (const item in dataAutorizacion){

      let evaluacion = '';
      let suma_ley_judicial=0;
      let suma_terceros=0;
      let suma_sindical=0;
      let montoBrutopersona = 0;

      let dataobjeto = []
      dataobjeto.push(parseInt(item)+1)
      dataobjeto.push(dataAutorizacion[item].p_num_doc)
      dataobjeto.push(dataAutorizacion[item].p_id)
      dataobjeto.push(dataAutorizacion[item].p_a_paterno)
      dataobjeto.push(dataAutorizacion[item].p_a_materno)
      dataobjeto.push(dataAutorizacion[item].p_nombres)
      dataobjeto.push(dataAutorizacion[item].pll_periodo)

      let resConceptos = dataAutorizacion[item].res_conceptos
     
      for(const itemcon in  resConceptos){
          if(resConceptos[itemcon].tipo_conceptos_tc_id==1 && resConceptos[itemcon].conceptos_con_id != 13 && resConceptos[itemcon].conceptos_con_id != 51){
            montoBrutopersona = montoBrutopersona+parseFloat(resConceptos[itemcon].pcon_monto)
          }
        }
      
      dataobjeto.push(montoBrutopersona.toFixed(2))

      //LLENAS LOS CONCEPTOS DESCUENTOS
      for(const itemdc in dataConceptos){
        let monto_concepto = 0
        for(const itemcon in  resConceptos){
            if(dataConceptos[itemdc].con_id == resConceptos[itemcon].conceptos_con_id){

              //MONTO DESCUENTO
              monto_concepto = parseFloat(resConceptos[itemcon].pcon_monto)

              //SUMAR DESCUENTO LEY Y MANDATO JUDICIAL
              if(resConceptos[itemcon].grupos_descuentos_gd_id==1){
                suma_ley_judicial=suma_ley_judicial+parseFloat(resConceptos[itemcon].pcon_monto);
              }

              //SUMAR TERCEROS
              if(resConceptos[itemcon].grupos_descuentos_gd_id != 1 && resConceptos[itemcon].grupos_descuentos_gd_id != 2){
                suma_terceros=suma_terceros+parseFloat(resConceptos[itemcon].pcon_monto);
              }

              //SUMAR SINDICAL
              if(resConceptos[itemcon].grupos_descuentos_gd_id==2){
              suma_sindical=suma_sindical+parseFloat(resConceptos[itemcon].pcon_monto);
              }


            }
          }
        if (!monto_concepto){
          dataobjeto.push('-.-')
        }else{
          dataobjeto.push(monto_concepto.toFixed(2))
        }
      }

      let monto_neto = (montoBrutopersona)-(suma_ley_judicial+suma_sindical);

      dataobjeto.push(monto_neto.toFixed(2))

      let monto_afecto_desc = (monto_neto*50)/100;

      dataobjeto.push(monto_afecto_desc.toFixed(2))
      dataobjeto.push(suma_terceros.toFixed(2))

      let monto_evaluar = monto_afecto_desc-suma_terceros;

      if(monto_evaluar>0){
          evaluacion="APTO";
      }else{
          evaluacion="NO APTO";
      }

      dataobjeto.push(evaluacion)
      dataobjeto.push(monto_evaluar.toFixed(2))

      data.push(dataobjeto)
  
    }

    //Creacion de Documento PDF
    const doc = new jsPDF('l');

    let dataEncabezado = [
      {content:'N°',rowSpan:2},
      {content:'NUM_DOC.',rowSpan:2},
      {content:'COD_MOD',rowSpan:2},
      {content:'APELLIDO PATERNO',rowSpan:2},
      {content:'APELLIDO MATERNO',rowSpan:2},
      {content:'NOMBRES',rowSpan:2},
      {content:'PERIODO',rowSpan:2},
      {content:'REM. BRUTO',rowSpan:2},
      {content:'DESCUENTOS',colSpan:numConceptos},
      {content:'MONTO NETO',rowSpan:2},
      {content:'50% MONTO NETO',rowSpan:2},
      {content:'DESCUENTO DE TERCEROS',rowSpan:2},
      {content:'EVALUACION',rowSpan:2},
      {content:'SALDO PARA OTROS DESCUENTOS',rowSpan:2},
    ]

    //Texto encabezado
    let width = doc.internal.pageSize.getWidth()
    doc.setFontSize(12);
    doc.setFont("Arial", "bold");
    doc.text('ANEXO N°01', width/2, 15, { align: 'center' })
  
    // Creacion de la tabla
    autoTable(doc, {
      startY: 20,
      styles: { fontSize: 5 ,halign: 'center',valign: 'middle',cellPadding: 0.8 },
      headStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      bodyStyles: {lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      footStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      showFoot: 'lastPage',
      head: [ dataEncabezado, encabezadoDescuentos],
      body: data,
    })

    doc.output('dataurlnewwindow');
  
  }



