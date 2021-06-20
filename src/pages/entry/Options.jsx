import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import { useOrderDetails } from "../../contexts/OrderDetails";
import OptionItem from "./OptionItem";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (error) {
        setError(true);
      }
    };
    request();
  }, [optionType]);

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <OptionItem
      key={item.name}
      optionType={optionType}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  if (error) return <AlertBanner />;

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.total[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
