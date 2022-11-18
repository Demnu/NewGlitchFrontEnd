import React from "react";
import ExportButton from "./ExportButton";
import jsPDF from "jspdf";
import "jspdf-autotable";
const RoastingListPDF = ({ isCalculated, blends, title }) => {
  const exportPDF = () => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let newdate = day + "/" + month + "/" + year;
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    let titlePDF = "Roasting Calculation: " + title + "\t\t Date: " + newdate;
    const headers = [
      [
        "Blend",
        "Overflow",
        "Coffee Ordered",
        "Production",
        "Green",
        "Batch Size",
        "Number of Roasts",
      ],
    ];
    const data = blends.map((blend) => [
      blend.blendName,
      blend.overflow,
      blend.coffeeOrdered,
      blend.production,
      blend.green,
      blend.batchSize,
      blend.numberOfRoasts,
    ]);
    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(titlePDF, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Roasting_Calculation_" + newdate + ".pdf");
  };
  return (
    <div>
      {isCalculated ? (
        <ExportButton onClick={exportPDF} className="">
          Roasting Calculation
        </ExportButton>
      ) : (
        <div
          className={`rounded-sm bg-gray-300 py-2 px-2 text-center text-gray-500`}
        >
          Roasting List
        </div>
      )}
    </div>
  );
};
export default RoastingListPDF;
