import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm";
import userEvent from "@testing-library/user-event";

const chkTermsAndCondition = /terms and conditions/i;
const btnConfirmOrder = /confirm order/i;
const popOverText = /no ice cream will actually be delivered/i;

describe("SummaryForm", () => {
  beforeEach(() => {
    render(<SummaryForm />);
  });

  describe("checkbox", () => {
    it("should initial with unchecked", () => {
      const checkbox = screen.getByRole("checkbox", {
        name: chkTermsAndCondition,
      });
      expect(checkbox).not.toBeChecked();
    });

    it("should enabled/disabled button correctly", () => {
      const button = screen.getByRole("button", { name: btnConfirmOrder });
      const checkbox = screen.getByRole("checkbox", {
        name: chkTermsAndCondition,
      });

      expect(button).toBeDisabled();

      userEvent.click(checkbox);
      expect(button).toBeEnabled();

      userEvent.click(checkbox);
      expect(button).toBeDisabled();
    });
  });

  describe("popover", () => {
    test("response to hover", async () => {
      const nullPopover = screen.queryByText(popOverText);
      expect(nullPopover).not.toBeInTheDocument();

      const label = screen.getByText(chkTermsAndCondition);

      userEvent.hover(label);
      const popover = screen.queryByText(popOverText);
      expect(popover).toBeInTheDocument();

      userEvent.unhover(label);
      await waitForElementToBeRemoved(() => screen.queryByText(popOverText));
    });
  });
});
