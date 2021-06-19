import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  const subtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(subtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(subtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(subtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  const subtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(subtotal).toHaveTextContent("0.00");

  const cherryInput = await screen.findByRole("checkbox", { name: "Cherries" });
  expect(cherryInput).not.toBeChecked();

  userEvent.click(cherryInput);
  expect(subtotal).toHaveTextContent("1.50");

  const mandmInput = await screen.findByRole("checkbox", { name: "M&Ms" });
  expect(mandmInput).not.toBeChecked();

  userEvent.click(mandmInput);
  expect(subtotal).toHaveTextContent("3.00");

  userEvent.click(cherryInput);
  expect(subtotal).toHaveTextContent("1.50");
});
