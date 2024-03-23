import { icons } from "react-icons";
import { AiOutlineFileText } from "react-icons/ai";

const downloadFile = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};
const ExportFile = ({ data, name, exClass }) => {
  const exportJson = (e) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(data),
      fileName: `${name}.json`,
      fileType: "text/json",
    });
  };

  return (
    <button onClick={exportJson} className={`btns btns-ex ${exClass}`}>
      Export{" "}
      <span>
        <AiOutlineFileText />
      </span>
    </button>
  );
};

export default ExportFile;
