import UploadAds from "../../uploadAds";
import BestSellers from "./bestSeller";
import Products from "./products";
import Package from "../../Admin-Samyak/HomePack/Package";

export default function Home() {
  const headers = ["id", "Name"];

  const rowsPerPage = [50, 100, 200];
  const defaultRowsPerPage = 50;
  return (
    <div>
      <h1 className="admin-title">Ad Section</h1>
      <UploadAds
        dimension="1160*590"
        setMultiple={true}
        uploadBtn={true}
        dropClass="home-img"
        url="getAllAd"
        idTitle="ad-image"
      />

      <div>
        <BestSellers
          headers={headers}
          rowsPerPage={rowsPerPage}
          defaultRowsPerPage={defaultRowsPerPage}
        />
      </div>
      <div>
        <Package/>
      </div>
    </div>
  );
}
