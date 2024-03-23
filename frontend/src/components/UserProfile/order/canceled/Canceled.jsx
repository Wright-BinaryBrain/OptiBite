import { useContext, useState } from "react";
import orderItems from "../order";
import OrderItems from "../OrderItems";
// import data from "../ViewData";
// import { orderContext } from "../../UserPageNav/orderContect/OrderContext";

const Canceled = ({OrderedItem}) => {
  // const { orderItem } = useContext(orderContext);
  // const [totalPrice, setTotalPrice] = useState();
  // console.log(orderItems);

  // const [CanceledItem, setCanceledItem] = useState(data);
  // const [datas, setData] = useState({});
  // console.log(CanceledItem);
  let hasCanceledOrders = false;
  const orderItems = OrderedItem.map((orderitem, index) => {
    if (orderitem.orderStatus.length > 0) {
      if (orderitem.orderStatus === "Cancelled") {
        // Set the variable to true if there is at least one canceled order
        hasCanceledOrders = true;
  
        // Render the OrderItems component for items with status "Canceled"
        return (
          <OrderItems
            // setTotalPrice={setTotalPrice}
            // totalPrice={totalPrice}
            cancel={false}
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
  const noOrdersMessage = hasCanceledOrders ? null : (
    <div className="noOrders">
      No Canceled Orders
    </div>
  );
  





  return (
    <>
      <div className="user-page-order-Canceled-section">
        {/* {setCanceledItem((prevItem) => {
          ViewData.filter((item) => {
            return item.orderS === "Canceled";
          });
        })}
      */}
        {orderItems}
    {noOrdersMessage}
      </div>
    </>
  );
};

export default Canceled;
