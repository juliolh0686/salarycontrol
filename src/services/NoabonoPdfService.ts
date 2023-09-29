import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useAuth from "@/store/auth";

  export default async function NoabonoPDFService (pll_id:number) {

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

    let encabezadoDescuentos = []
    let totalbruto = 0;
    let totalafecto = 0;
    let totaldescuentos = 0;
    let totalliquido = 0;
    let totalessalud = 0;

    for (const item in dataConceptos) {
      encabezadoDescuentos.push(dataConceptos[item].con_concepto+' '+dataConceptos[item].con_nombre)
    }

    //NUMERO DE CONCEPTOS CONSIDERADOS
    let numConceptos = dataConceptos.length;

    //Reporte No abonos
    let noAbonos = response.noAbono

    let data = []

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
      dataobjeto.push(noAbonos[item].dp_bruto)
      dataobjeto.push(noAbonos[item].dp_afecto)

      let resConceptos = noAbonos[item].res_conceptos

      //LLENAS LOS CONCEPTOS DESCUENTOS
      for(const itemdc in dataConceptos){
        let monto_concepto = 0
        for(const itemcon in  resConceptos){
            if(dataConceptos[itemdc].con_id == resConceptos[itemcon].conceptos_con_id){
              monto_concepto = resConceptos[itemcon].pcon_monto
            }
          }
        if (!monto_concepto){
          dataobjeto.push('-.-')
        }else{
          dataobjeto.push(monto_concepto)
        }
      }

      dataobjeto.push(noAbonos[item].dp_desc)
      dataobjeto.push(noAbonos[item].dp_liquido)
      dataobjeto.push(noAbonos[item].dp_essalud)
      dataobjeto.push(noAbonos[item].dp_motivo_na)

      data.push(dataobjeto)
  
      totalbruto = totalbruto+parseFloat(noAbonos[item].dp_bruto)
      totalafecto = totalafecto+parseFloat(noAbonos[item].dp_afecto)
      totaldescuentos = totaldescuentos+parseFloat(noAbonos[item].dp_desc)
      totalliquido = totalliquido+parseFloat(noAbonos[item].dp_liquido)
      totalessalud = totalessalud+parseFloat(noAbonos[item].dp_essalud)
    }

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF('l');

    let dataEncabezado = [
      {content:'N°',rowSpan:2},
      {content:'COD.EST.',rowSpan:2},
      {content:'DNI',rowSpan:2},
      {content:'APELLIDO PATERNO',rowSpan:2},
      {content:'APELLIDO MATERNO',rowSpan:2},
      {content:'NOMBRES',rowSpan:2},
      {content:'NIVEL EDUCATIVO',rowSpan:2},
      {content:'TIPO DE SERVIDOR',rowSpan:2},
      {content:'REM. BRUTO',rowSpan:2},
      {content:'REM. AFECTO',rowSpan:2},
      {content:'DESCUENTOS',colSpan:numConceptos},
      {content:'TOTAL DESC.',rowSpan:2},
      {content:'REM. LIQUIDA',rowSpan:2},
      {content:'ESSALUD',rowSpan:2},
      {content:'MOTIVO',rowSpan:2},
    ]

    let dataFoot = [
      ['TOTAL','','','','','','','',totalbruto.toFixed(2),totalafecto.toFixed(2)]
    ]

    for (const item in dataConceptos) {
      dataFoot[0].push(dataConceptos[item].monto)
    }

    dataFoot[0].push(totaldescuentos.toFixed(2))
    dataFoot[0].push(totalliquido.toFixed(2))
    dataFoot[0].push(totalessalud.toFixed(2))

    //Texto encabezad
    let width = doc.internal.pageSize.getWidth()
    doc.setFontSize(12);
    doc.setFont("Arial", "bold");
    doc.text('UNIDAD DE GESTIÓN EDUCATIVA LOCAL N°07 - SAN BORJA', width/2, 15, { align: 'center' })
    doc.text('ANULACIÓN DE ABONOS - CONCEPTOS QUE DEBEN SER REBAJADOS - '+response.planilla.pll_descripcion, width/2, 22, { align: 'center' })
  
    // Or use javascript directly:
    autoTable(doc, {
      startY: 28,
      styles: { fontSize: 4 ,halign: 'center',valign: 'middle',cellPadding: 0.8 },
      headStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      bodyStyles: {lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      footStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      showFoot: 'lastPage',
      head: [ dataEncabezado, encabezadoDescuentos],
      body: data,
      foot: dataFoot,
    })

    doc.addPage("l");

    doc.text('UNIDAD DE GESTIÓN EDUCATIVA LOCAL N°07 - SAN BORJA', width/2, 15, { align: 'center' })
    doc.text('ANULACIÓN DE ABONOS - CONCEPTOS QUE DEBEN SER REBAJADOS - '+response.planilla.pll_descripcion, width/2, 22, { align: 'center' })
    doc.text('RESUMEN DE LOS NO ABONOS POR SECUENCIA FUNCIONAL Y METAS', width/2, 29, { align: 'center' })
    doc.setFontSize(10);
    doc.text('REMUNERACIÓN', 48, 43, { align: 'center' })
    doc.text('SISTEMA PRIVADO DE PENSIONES', 114, 43, { align: 'center' })
    doc.text('SISTEMA NACIONAL DE PENSIONES', 182, 43, { align: 'center' })
    doc.text('ESSALUD', 248, 43, { align: 'center' })

    
    //let pageWidth = doc.internal.pageSize.width
    let tableWidth = (doc.internal.pageSize.width - 40)/4

    let dataEncabezadorem = ['Clasificador','Meta','Bruto','Descuentos','Liquido']

    let noAbonosrem = response.dataRemuneracion

    let dataRem = []
    let brutototalrem = 0
    let descuentototalrem = 0
    let restatotalrem = 0

    for(const item in noAbonosrem) {
      let dataobjetorem = []
      dataobjetorem.push(noAbonosrem[item].cl_clasificador)
      dataobjetorem.push(noAbonosrem[item].sf_secuencia_funcional)
      dataobjetorem.push(noAbonosrem[item].m_bruto)
      dataobjetorem.push(noAbonosrem[item].descuentos)
      dataobjetorem.push(noAbonosrem[item].resta)

      dataRem.push(dataobjetorem)

      brutototalrem = brutototalrem + parseFloat(noAbonosrem[item].m_bruto)
      descuentototalrem = descuentototalrem + parseFloat(noAbonosrem[item].descuentos)
      restatotalrem = restatotalrem + parseFloat(noAbonosrem[item].resta)
    }

    let dataFootrem = [
      ['TOTAL','']
    ]

    dataFootrem[0].push(brutototalrem.toFixed(2))
    dataFootrem[0].push(descuentototalrem.toFixed(2))
    dataFootrem[0].push(restatotalrem.toFixed(2))


    autoTable(doc, {
      startY:48,
      styles: { fontSize: 6 ,halign: 'center',valign: 'middle'},
      headStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      bodyStyles: {lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      footStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      tableWidth: tableWidth,
      head: [ dataEncabezadorem],
      body: dataRem,
      foot: dataFootrem,
    })

    //DATA AFP
    let dataEncabezadoafp = ['AFP','Clasificador','Meta','Monto']

    let noAbonosafp = response.dataAfp

    let dataAfp = []
    let totalAfp = 0

    for(const item in noAbonosafp) {
      let dataobjetoafp = []
      dataobjetoafp.push(noAbonosafp[item].rp_admin_pension)
      dataobjetoafp.push(noAbonosafp[item].cl_clasificador)
      dataobjetoafp.push(noAbonosafp[item].sf_secuencia_funcional)
      dataobjetoafp.push(noAbonosafp[item].monto)

      dataAfp.push(dataobjetoafp)

      totalAfp = totalAfp + parseFloat(noAbonosafp[item].monto)
    }

    let dataFootafp = [
      ['TOTAL','','']
    ]

    dataFootafp[0].push(totalAfp.toFixed(2))

    autoTable(doc, {
      startY:48,
      styles: { fontSize: 6 ,halign: 'center',valign: 'middle'},
      headStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      bodyStyles: {lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      footStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      tableWidth: tableWidth,
      margin: {left: tableWidth+18},
      head: [ dataEncabezadoafp],
      body: dataAfp,
      foot: dataFootafp,
    })

    //DATA ONP
    let dataEncabezadoonp = ['Clasificador','Meta','Monto']

    let noAbonosonp = response.dataOnp

    let dataOnp = []
    let totalOnp = 0

    for(const item in noAbonosonp) {
      let dataobjetoonp = []
      dataobjetoonp.push(noAbonosonp[item].cl_clasificador)
      dataobjetoonp.push(noAbonosonp[item].sf_secuencia_funcional)
      dataobjetoonp.push(noAbonosonp[item].monto)

      dataOnp.push(dataobjetoonp)

      totalOnp = totalOnp + parseFloat(noAbonosonp[item].monto)
    }

    let dataFootonp = [
      ['TOTAL','']
    ]

    dataFootonp[0].push(totalOnp.toFixed(2))

    autoTable(doc, {
      startY:48,
      styles: { fontSize: 6 ,halign: 'center',valign: 'middle'},
      headStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      bodyStyles: {lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      footStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      tableWidth: tableWidth,
      margin: {left: (tableWidth*2)+22},
      head: [ dataEncabezadoonp],
      body: dataOnp,
      foot: dataFootonp,
    })

     //DATA ESSALUD
     let dataEncabezadoessalud = ['Clasificador','Meta','Monto']

     let noAbonosessalud = response.dataEssalud
 
     let dataEssalud = []
     let totalEssalud = 0
 
     for(const item in noAbonosessalud) {
       let dataobjetoessalud = []
       dataobjetoessalud.push(noAbonosessalud[item].cl_clasificador)
       dataobjetoessalud.push(noAbonosessalud[item].sf_secuencia_funcional)
       dataobjetoessalud.push(noAbonosessalud[item].monto)
 
       dataEssalud.push(dataobjetoessalud)
 
       totalEssalud = totalEssalud + parseFloat(noAbonosessalud[item].monto)
     }
 
     let dataFootessalud = [
       ['TOTAL','']
     ]
 
     dataFootessalud[0].push(totalEssalud.toFixed(2))

    autoTable(doc, {
      startY:48,
      styles: { fontSize: 6 ,halign: 'center',valign: 'middle'},
      headStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      bodyStyles: {lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      footStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
      tableWidth: tableWidth,
      margin: {left: (tableWidth*3)+25},
      head: [ dataEncabezadoessalud],
      body: dataEssalud,
      foot: dataFootessalud,
    })

    doc.addPage("l");

    doc.text('UNIDAD DE GESTIÓN EDUCATIVA LOCAL N°07 - SAN BORJA', width/2, 15, { align: 'center' })
    doc.text('ANULACIÓN DE ABONOS - CONCEPTOS QUE DEBEN SER REBAJADOS - '+response.planilla.pll_descripcion, width/2, 22, { align: 'center' })
    doc.text('RESUMEN DE LOS NO ABONOS POR SECUENCIA FUNCIONAL Y METAS', width/2, 29, { align: 'center' })
    doc.setFontSize(10);
    doc.text('RENTA DE QUINTA CATEGORIA', 48, 43, { align: 'center' })

    //DATA QUINTA CATEGORIA
    let dataEncabezadoquinta = ['Clasificador','Meta','Monto']

    let noAbonosquinta = response.dataQuintacat

    let dataQuinta = []
    let totalQuinta = 0

    for(const item in noAbonosquinta) {
      let dataobjetoquinta = []
      dataobjetoquinta.push(noAbonosquinta[item].cl_clasificador)
      dataobjetoquinta.push(noAbonosquinta[item].sf_secuencia_funcional)
      dataobjetoquinta.push(noAbonosquinta[item].monto)

      dataQuinta.push(dataobjetoquinta)

      totalQuinta = totalQuinta + parseFloat(noAbonosquinta[item].monto)
    }

    let dataFootquinta = [
      ['TOTAL','']
    ]

    dataFootquinta[0].push(totalQuinta.toFixed(2))

   autoTable(doc, {
     startY:48,
     styles: { fontSize: 6 ,halign: 'center',valign: 'middle'},
     headStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
     bodyStyles: {lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
     footStyles: {fillColor: [250, 250, 250],lineWidth:0.1,lineColor:[170, 170, 170],textColor: [42, 42, 42]},
     tableWidth: tableWidth,
     //margin: {left: (tableWidth*3)+25},
     head: [ dataEncabezadoquinta],
     body: dataQuinta,
     foot: dataFootquinta,
   })


    
    doc.output('dataurlnewwindow');
  
  }



