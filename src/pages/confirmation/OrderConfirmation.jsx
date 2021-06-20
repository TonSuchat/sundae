import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  useEffect(() => {
    const orderRequest = async () => {
      const response = await axios.post(`http://localhost:3030/order`);
      setOrderNumber(response.data.orderNumber);
    };
    orderRequest();
  }, []);

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default OrderConfirmation;
