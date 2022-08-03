import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RoastingListPDF = ({ beans }) => {
  const [dataObject, setDataObject] = useState();
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Roasting List";
    const headers = [["Bean", "Amount(kg)"]];
    const data = dataObject.map((row) => [row.id, row.amount]);
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
    doc.save("Roasting_List_" + newdate + ".pdf");
  };
  useEffect(() => {
    let reformattedBeans = [];
    for (let bean of beans) {
      let newBeanAmount = bean.amount.toFixed(2);
      reformattedBeans.push({
        id: bean.name || bean.id,
        amount: newBeanAmount,
      });
    }
    setDataObject(reformattedBeans);
  }, []);
  return (
    <button
      className="bg-blue-700 hover:bg-blue-500 w-4/6 rounded-md py-2 text-white m-1 text-center"
      onClick={() => {
        exportPDF();
      }}
    >
      {" "}
      Export Roasting List
    </button>
  );
};
export default RoastingListPDF;
