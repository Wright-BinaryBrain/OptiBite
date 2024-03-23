import { IoAddCircleOutline } from "react-icons/io5";
import ExportFile from "../../export";

export default function Btns({ add, ex, addClass, exClass, fileName }) {
  return (
    <>
      <div className="btns-container">
        {/* <button onClick={exportFile(ex)} className={`btns btns-ex ${exClass}`}>
          Export
        </button> */}
        <ExportFile data={ex} name={fileName} />
        <button onClick={add} className={`btns btns-add ${addClass}`}>
          Add{" "}
          <span>
            <IoAddCircleOutline />
          </span>
        </button>
      </div>
    </>
  );
}
