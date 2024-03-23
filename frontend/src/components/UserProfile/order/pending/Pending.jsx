// import { useContext, useState } from "react";
// import orderItems from "../order";
import OrderItems from "../OrderItems";
// import data from "../ViewData";
// import { orderContext } from "../../UserPageNav/orderContect/OrderContext";

const Pending = ({OrderedItem,changeOrder}) => {
  // const { orderItem } = useContext(orderContext);

  // console.log(orderItem);
  // console.log(OrderedItem);

  // const [pendingItem, setPendingItem] = useState(data);
  // const [datas, setData] = useState({});
  // console.log(pendingItem);
  // const [totalPrice, setTotalPrice] = useState();

console.log(OrderedItem);
let hasPendingOrders = false;
  const orderItems = OrderedItem.map((orderitem, index) => {
    if (orderitem.orderStatus.length > 0) {
      if (orderitem.orderStatus === "Pending") {
        // Set the variable to true if there is at least one canceled order
        hasPendingOrders = true;
  
        // Render the OrderItems component for items with status "Canceled"
        return (
          <OrderItems
            // setTotalPrice={setTotalPrice}
            // totalPrice={totalPrice}
            changeOrder={changeOrder}
            cancel={true}
            orderitem={orderitem}
            orderid={orderitem.id}
            key={index}
          />
        );
      } else {
        return null; // Skip rendering if the orderStatus is not "Canceled"
      }
    } else {
      return null; // Skip rendering if orderStatus has no length
    }
  });
  
  // Render the "No Canceled Orders" message if there are no canceled orders
  const noOrdersMessage = hasPendingOrders ? null : (
    <div className="noOrders">
      No Pending Orders
    </div>
  );
  


  
  return (
    <>
      <div className="user-page-order-pending-section">
        {/* {setPendingItem((prevItem) => {
          ViewData.filter((item) => {
            return item.orderS === "pending";
          });
        })}
      */}
       {orderItems}
    {noOrdersMessage}
      </div>
    </>
  );
};

export default Pending;
