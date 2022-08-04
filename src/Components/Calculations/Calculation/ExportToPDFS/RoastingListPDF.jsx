import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExportButton from "./ExportButton";

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
    let beansArray = beans;
    let newBeansArray = [];
    for (let bean of beansArray) {
      let newBeanAmount;
      if (isNaN(bean.amount)) {
        newBeanAmount = Number(bean.amount.replace(" kg", ""));
        newBeanAmount = newBeanAmount.toFixed(2);
      } else {
        newBeanAmount = bean.amount.toFixed(2);
      }
      newBeansArray.push({ id: bean.name || bean.id, amount: newBeanAmount });
    }

    setDataObject(newBeansArray);
  }, []);
  return (
    <ExportButton className="" onClick={exportPDF}>
      Export Roasting List
    </ExportButton>
  );
};
export default RoastingListPDF;
