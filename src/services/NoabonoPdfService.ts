import jsPDF from "jspdf";

  export default async function NoabonoPDFService () {

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF("landscape");
  
    doc.text("Hello world!", 10, 10);
    doc.output('dataurlnewwindow');
  
  }



