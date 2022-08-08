import React, { useEffect, useState } from "react";
import { getCalculations } from "../../myApi";
import CalculationsTable from "./CalculationsTable";
const Calculations = ({}) => {
  const [loading, setLoading] = useState(true);
  const [calculations, setCalculations] = useState([]);
  useEffect(() => {
    const response = getCalculations();
    response.then((result) => {
      let responseCalculations = result.data;
      responseCalculations.forEach((calculation) => {
        var date = new Date(calculation.date);
        calculation.date =
          date.toLocaleDateString() + " " + date.toLocaleTimeString();
      });
      responseCalculations = responseCalculations.reverse();
      setCalculations(result.data);
      setLoading(false);
      setLoading(false);
    });
  }, []);

  return (
    <div className=" restOfScreenHeight flex flex-col px-2 py-2">
      <div className=" flex-grow bg-white rounded-sm cursor-pointer">
        <CalculationsTable loading={loading} calculations={calculations} />
      </div>
    </div>
  );
};
export default Calculations;
