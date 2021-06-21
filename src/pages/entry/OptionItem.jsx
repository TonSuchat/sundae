import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const OptionItem = ({ optionType, name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    let newItemCount = 0;
    if (optionType === "scoops") {
      newItemCount = event.target.value;
      const currentValue = parseFloat(newItemCount);
      const isValid =
        currentValue >= 0 &&
        currentValue <= 10 &&
        Math.floor(currentValue) === currentValue;
      setIsValid(isValid);
      if (isValid) updateItemCount(name, newItemCount);
    } else {
      newItemCount = event.currentTarget.checked ? 1 : 0;
      updateItemCount(name, newItemCount);
    }
  };

  const scoopForm = (
    <Form.Group
      controlId={`${name}-count`}
      as={Row}
      style={{ marginTop: "10px" }}
    >
      <Form.Label column xs="6" style={{ textAlign: "right" }}>
        {name}
      </Form.Label>
      <Col xs="5" style={{ textAlign: "left" }}>
        <Form.Control
          type="number"
          min={0}
          defaultValue={0}
          onChange={handleChange}
          isInvalid={!isValid}
        />
      </Col>
    </Form.Group>
  );

  const toppingForm = (
    <Form.Group controlId={`${name}-count`} style={{ marginTop: "10px" }}>
      <input id={name} type="checkbox" onChange={handleChange} />
      <label htmlFor={name}>{name}</label>
    </Form.Group>
  );

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} ${optionType?.slice(0, -1)}`}
      />
      {optionType === "scoops" ? scoopForm : toppingForm}
    </Col>
  );
};

export default OptionItem;
