import { AiOutlineLoading } from "react-icons/ai";
import Spin from "../Spin/spin";
import "./Loading.scss";
function Loading() {
  return (
    <div className="loading-container">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  );
}

export default Loading;
