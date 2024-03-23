import { useContext, useState } from "react";
// import orderItems from "../order";
import OrderItems from "../OrderItems";
// import data from "../ViewData";
// import { orderContext } from "../../UserPageNav/orderContect/OrderContext";

const InProgress = ({ OrderedItem }) => {
  // const { orderItem } = useContext(orderContext);

  // console.log(orderItems);

  // const [InprogressItem, setInprogressItem] = useState(data);
  // const [datas, setData] = useState({});
  // console.log(InprogressItem);
  // const [totalPrice, setTotalPrice] = useState();

  let hasInprocessOrders = false;
  const orderItems = OrderedItem.map((orderitem, index) => {
    if (orderitem.orderStatus.length > 0) {
      if (orderitem.orderStatus === "In process") {
        // Set the variable to true if there is at least one canceled order
        hasInprocessOrders = true;
  
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
  const noOrdersMessage = hasInprocessOrders ? null : (
    <div className="noOrders">
      No Orders In Process
    </div>
  );
  

  return (
    <>
      <div className="user-page-order-Inprogress-section">
        {/* {setInprogressItem((prevItem) => {
          ViewData.filter((item) => {
            return item.orderS === "Inprogress";
          });
        })}
      */}

{orderItems}
    {noOrdersMessage}
      </div>
    </>
  );
};

export default InProgress;
