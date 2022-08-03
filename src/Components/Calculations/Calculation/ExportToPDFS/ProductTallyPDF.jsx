import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProductTallyPDF = ({ products }) => {
  const [dataObject, setDataObject] = useState();
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Product Tally";
    const headers = [["Product", "Amount"]];
    const data = products.map((row) => [row.id, row.amount]);
    let content = {
      startY: 50,
      head: headers,
      body: data,
    };
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let newdate = day + "/" + month + "/" + year;

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Product_Tally_" + newdate + ".pdf");
  };

  return (
    <button
      className="bg-blue-700 hover:bg-blue-500 w-4/6 rounded-md py-2 text-white m-1 text-center"
      onClick={() => {
        exportPDF();
      }}
    >
      {" "}
      Export Product Tally
    </button>
  );
};
export default ProductTallyPDF;
