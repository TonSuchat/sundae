import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OptionItem from "../OptionItem";

test.each([["-1"], ["1.5"], ["11"]])(
  "box turns red when typed %i in scoop",
  (invalidData) => {
    render(
      <OptionItem
        optionType="scoops"
        name="Vanilla"
        imagePath="/images/vanilla.png"
        updateItemCount={jest.fn()}
      />
    );
    const vanillaInput = screen.getByRole("spinbutton", { name: /vanilla/i });
    expect(vanillaInput).not.toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, invalidData);
    expect(vanillaInput).toHaveClass("is-invalid");
  }
);
