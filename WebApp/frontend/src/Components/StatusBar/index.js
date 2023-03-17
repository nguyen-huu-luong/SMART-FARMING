import moment from "moment";
import { useState } from "react";

function StatusBar({title}) {
    const [time, setTime] = useState(new Date());
    let rec = moment(time).format('h:mm A, dddd, MMMM Do YYYY');
  return (
    <div
      className="row border border-gray-300 rounded bg-white p-3 mx-2 flex-row w-100 justify-content-between align-items-center"
    >
      <h6 className="col m-0">{title}</h6>
      <h6 className="col m-0 text-end">{rec}</h6>
    </div>
  );
}

export default StatusBar;
