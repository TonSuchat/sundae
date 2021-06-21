import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

describe("Options", () => {
  describe("Scoops", () => {
    beforeEach(() => {
      render(<Options optionType="scoops" />);
    });

    test("display image for each scoop option from server", async () => {
      const scoopImages = await screen.findAllByRole("img", {
        name: /scoop$/i,
      });
      expect(scoopImages).toHaveLength(2);

      const altText = scoopImages.map((element) => element.alt);
      expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
    });

    test("not update subtotal when input invalid data", async () => {
      const vanillaInput = await screen.findByRole("spinbutton", {
        name: /vanilla/i,
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, "-1");

      const subtotal = screen.getByText("Scoops total: $0.00", {
        exact: false,
      });
      expect(subtotal).toBeInTheDocument();
    });
  });

  describe("Toppings", () => {
    beforeEach(() => {
      render(<Options optionType="toppings" />);
    });

    test("display image for each topping option from server", async () => {
      const toppingImages = await screen.findAllByRole("img", {
        name: /topping$/i,
      });
      expect(toppingImages).toHaveLength(3);

      const altText = toppingImages.map((element) => element.alt);
      expect(altText).toEqual([
        "Cherries topping",
        "M&Ms topping",
        "Hot fudge topping",
      ]);
    });
  });
});
