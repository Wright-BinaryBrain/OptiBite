import { Route, Routes } from "react-router-dom";
import Reviews from "../../Admin-Samyak/Review/Reviews";
import Dashboard from "./dashboard";
import Home from "./homepage";
import Categories from "./categories";
import Products from "./products";
import Customers from "./customerdetails";
import Order from "../../Admin-Samyak/Order/OrderDetails";
import Rider from "../../Admin-Samyak/Rider/Rider";
import Admin2 from "../../Admin-Samyak/Admin2/Admin";

export default function AdminRoute() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customerdetails" element={<Customers />} />
        <Route path="/orderdetails" element={<Order />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin2" element={<Admin2 />} />
        <Route path="/riderdetails" element={<Rider />} />
      </Routes>
    </div>
  );
}
