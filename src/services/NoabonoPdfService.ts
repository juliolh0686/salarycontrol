import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useAuth from "@/store/auth";

  export default async function NoabonoPDFService (pll_id:number) {

    let formData = new FormData()
    formData.append('pll_id',pll_id.toString())

    let store = useAuth();
  
    const url = store.baseURL+'/noabonos/noabonopdf/'
  
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
  
    const response = await rawResponse.json()


    //SACAR EL LISTADO DE CONCEPTOS - ENCABEZADOS
    let dataConceptos = response.dataConceptos

    let encabezadoDescuentos = []

    for(let i =0;i<dataConceptos.length;i++) {
      encabezadoDescuentos.push(dataConceptos[i].con_concepto+':'+dataConceptos[i].con_nombre)
    }

    //NUMERO DE CONCEPTOS CONSIDERADOS
    let numConceptos = dataConceptos.length;

    //Reporte No abonos
    let noAbonos = dataConceptos.noabonos

    let data = []

    for(var k in noAbonos) {
      console.log(k, noAbonos[k]);
   }

   return('')

    // for(let i =0;i<noAbonos.length;i++) {
    //   data.push(noAbonos[i].dp_id)
    // }

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF("landscape");
  
    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    //autoTable(doc, { html: '#my-table' })

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
    
    // let data = [
    //   [1,'0H032120', '08226648', 'ZOLEddZZI','LOPddEZ','CARLA MARdddIA','EBR Nivel Primaria','DOCENTE NOMBRADO',3135.00,2037.85,21.45,21.45,21.45,21.45,21.45,21.45,21.45,21.45,303.71,2831.29,183.40,'195652-23 LSG 317al2809'],
    //     [2,'0H032120', '08226648', 'ZOLEddZZI','LOPddEZ','CARLA MARdddIA','EBR Nivel Primaria','DOCENTE NOMBRADO',3135.00,2037.85,21.45,21.45,21.45,21.45,21.45,21.45,21.45,21.45,303.71,2831.29,183.40,'195652-23 LSG 317al2809'],
    //     [3,'0H032120', '08226648', 'ZOLEddZZI','LOPddEZ','CARLA MARdddIA','EBR Nivel Primaria','DOCENTE NOMBRADO',3135.00,2037.85,21.45,21.45,21.45,21.45,21.45,21.45,21.45,21.45,303.71,2831.29,183.40,'195652-23 LSG 317al2809'],
    //     [4,'0H032120', '08226648', 'ZOLEddZZI','LOPddEZ','CARLA MARdddIA','EBR Nivel Primaria','DOCENTE NOMBRADO',3135.00,2037.85,21.45,21.45,21.45,21.45,21.45,21.45,21.45,21.45,303.71,2831.29,183.40,'195652-23 LSG 317al2809'],
    // ]


    // Or use javascript directly:
    autoTable(doc, {
      styles: { fontSize: 5 , lineColor: [5, 5, 5],halign: 'center',valign: 'middle'},
      headStyles: {fillColor: [0, 140, 186],lineWidth:0.1,lineColor:[170, 170, 170]},
      bodyStyles: {lineWidth:0.1,lineColor:[170, 170, 170]},
      head: [ dataEncabezado, encabezadoDescuentos],
      body: data,
    })
    
    doc.output('dataurlnewwindow');
  
  }



