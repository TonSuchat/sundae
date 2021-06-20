import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

  const cherryCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherryCheckbox).not.toBeChecked();

  userEvent.click(cherryCheckbox);
  expect(subtotal).toHaveTextContent("1.50");

  const mandmCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
  expect(mandmCheckbox).not.toBeChecked();

  userEvent.click(mandmCheckbox);
  expect(subtotal).toHaveTextContent("3.00");

  userEvent.click(cherryCheckbox);
  expect(subtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const toppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    userEvent.click(toppingCheckbox);
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const toppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(toppingCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const toppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(toppingCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(toppingCheckbox);
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
