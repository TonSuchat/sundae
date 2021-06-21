import Button from "react-bootstrap/Button";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  const isDisabled = orderDetails.total.scoops === "$0.00";

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.total.grandTotal}</h2>
      <Button disabled={isDisabled} onClick={() => setOrderPhase("review")}>
        Order sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
