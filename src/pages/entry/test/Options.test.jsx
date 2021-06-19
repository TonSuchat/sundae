import { render, screen } from "../../../test-utils/testing-library-utils";
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
