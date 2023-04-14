import moment from "moment";
import { useState } from "react";
import { useViewport } from "../../hooks";

function StatusBar({ title }) {
  const [time, setTime] = useState(new Date());
  const viewport = useViewport();
  let rec = moment(time).format("h:mm A, dddd, MMMM Do YYYY");
  return (
    <div className="row g-0 border border-gray-300 rounded bg-white p-3 mx-2 w-100 justify-content-between align-items-center">
      <h6 className="col m-0">{title}</h6>
      {viewport.width >= 768 && <h6 className="col m-0 text-end">{rec}</h6>}
    </div>
  );
}

export default StatusBar;